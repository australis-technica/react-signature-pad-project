/*
 * original: https://github.com/blackjk3/react-signature-pad/blob/master/src/index.js 
 * */
import * as React from "react";
import Bezier from "./bezier";
import Point from "./point";
import passiveSupported from "./passive-supported";
/** */
export type SignaturePadProps = {
  dotSizeMinWidth?: number;
  dotSizeMaxWidth?: number;
  velocityFilterWeight?: number;
  /** Color */
  penColor?: string;
  /**
   * "rgba(0,0,0,0)"
   */
  backgroundColor?: string;
  // clearButton?: boolean;
  onStrokeBegin?(e: HTMLCanvasElement): any;
  onStrokeEnd?(e: HTMLCanvasElement): any;
  /**
   * Canvas
   */
  canvasWidth?: number;
  canvasHeight?: number;
  /**
   * if dotSize number use dotSize and disable speed sensitivity  , else calculate dotSize
   */
  dotSize?: number;
};
/** */
type SignaturePadState = {};
/** */
type DrawingState = {
  points: Point[];
  _lastDotVelocity: number;
  _lastDotWidth: number;
};
//
export default class SignaturePad extends React.Component<SignaturePadProps> {
  velocityFilterWeight = 0.7;
  strokeMinWidth = 0.5;
  strokeMaxWidth = 2.5;
  backgroundColor = "pink";
  _canvas: HTMLCanvasElement;
  _ctx?: CanvasRenderingContext2D | null;
  _mouseButtonDown = false;
  /** */
  state: SignaturePadState = {
    // ...
  };
  /** */
  drawingState: DrawingState = {
    points: [] as Point[],
    _lastDotVelocity: 0,
    _lastDotWidth: 0
  };
  /** */
  componentDidMount() {
    this._canvas = this.refs.cv as HTMLCanvasElement;
    this._ctx = this._canvas.getContext("2d");
    this.clear();
    this._mouseButtonDown = false;
    this._canvas.addEventListener("mousedown", this
      ._handleMouseDown as EventListener);
    this._canvas.addEventListener("mousemove", this
      ._handleMouseMove as EventListener);
    document.addEventListener("mouseup", this._handleMouseUp as EventListener);
    //
    // if (this.props.zoomRatio < 0.1) {            window.addEventListener("resize", this._resizeCanvas.bind(this))        };
    // Pass touch events to canvas element on mobile IE.
    this._canvas.style.msTouchAction = "none";
    // TOUCH
    // TODO:  passive won't be set
    this._canvas.addEventListener("touchstart", this._handleTouchStart, {
      passive: passiveSupported
    });
    this._canvas.addEventListener("touchmove", this._handleTouchMove, {
      passive: passiveSupported
    });
    document.addEventListener("touchend", this._handleTouchEnd);
    this._resizeCanvas();
  }
  /** */
  componentWillUnmount() {
    this._canvas.removeEventListener("mousedown", this
      ._handleMouseDown as EventListener);
    this._canvas.removeEventListener(
      "mousemove",
      this._handleMouseMove.bind(this)
    );
    document.removeEventListener("mouseup", this
      ._handleMouseUp as EventListener);
    this._canvas.removeEventListener("touchstart", this._handleTouchStart);
    this._canvas.removeEventListener("touchmove", this._handleTouchMove);
    document.removeEventListener("touchend", this._handleTouchEnd);
    // window.removeEventListener("resize", this._resizeCanvas);
  }
  /** */
  clear(e?: Event) {
    if (e) {
      e.preventDefault();
    }

    const canvas = this._canvas;

    this._ctx.fillStyle = this.backgroundColor;
    this._ctx.clearRect(0, 0, canvas.width, canvas.height);
    this._ctx.fillRect(0, 0, canvas.width, canvas.height);
    this._reset();
  }
  /**
   * Returns the content of the current canvas as an image that you can use as a source for another canvas or an HTML element.
   * @param type The standard MIME type for the image format to return. If you do not specify this parameter, the default value is a PNG format image.
   */
  toDataURL = (type?: any, ...args: any[]) => {
    return this._canvas.toDataURL(type, args);
  };
  /** */
  _resizeCanvas() {
    let ctx = this._ctx;
    let canvas = this._canvas;
    // When zoomed out to less than 100%, for some very strange reason,
    // some browsers report devicePixelRatio as less than 1
    // and only part of the canvas is cleared then.
    let ratio = Math.max(window.devicePixelRatio || 1, 1);
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    ctx.scale(ratio, ratio);
  }
  /** */
  _reset = () => {
    //
    this.drawingState = {
      points: [],
      _lastDotVelocity: 0,
      _lastDotWidth: this._strokeWidth(0)
    };
    this._ctx.strokeStyle = this.props.penColor || "black";
    this._ctx.strokeRect(1, 1, 1, 1);
    this._ctx.fillStyle = this.props.penColor;
    // this._ctx.scale(0.5, 0.5);
  };
  /** */
  _handleMouseDown = (event: TouchEvent) => {
    if (event.which === 1) {
      this._mouseButtonDown = true;
      this._strokeBegin(event);
    }
  };
  /** */
  _handleMouseMove = (event: Touch | TouchEvent | any) => {
    if (this._mouseButtonDown) {
      this._strokeUpdate(event);
    }
  };

  _handleMouseUp = (event: TouchEvent) => {
    if (event.which === 1 && this._mouseButtonDown) {
      this._mouseButtonDown = false;
      this._strokeEnd();
    }
  };
  /** */
  _handleTouchStart = (event: TouchEvent) => {
    let touch = event.changedTouches[0];
    this._strokeBegin(touch);
  };
  /** */
  _handleTouchMove = (event: TouchEvent) => {
    // Prevent scrolling.
    event.preventDefault();

    let touch = event.changedTouches[0];
    this._strokeUpdate(touch);
  };
  /** */
  _handleTouchEnd = (event: Event) => {
    let wasCanvasTouched = event.target === this._canvas;
    if (wasCanvasTouched) {
      this._strokeEnd();
    }
  };
  /** */
  _strokeUpdate(event: Touch | TouchEvent) {
    let point = this._createPoint(event);
    this._addPoint(point);
  }
  /** */
  _strokeBegin(event: Touch | TouchEvent) {
    this._reset();
    this._strokeUpdate(event);
    this.props.onStrokeBegin && this.props.onStrokeBegin(this._canvas);
  }
  /** */
  _strokeDraw(point: Point) {
    this._ctx.beginPath();
    this._drawPoint(point.x, point.y, 0);
    this._ctx.closePath();
    this._ctx.fill();
  }
  /** */
  _strokeEnd() {
    let canDrawCurve = this.drawingState.points.length > 2,
      point = this.drawingState.points[0];

    if (!canDrawCurve && point) {
      this._strokeDraw(point);
    }
    this.props.onStrokeEnd && this.props.onStrokeEnd(this._canvas);
  }
  /** */
  _createPoint(event: Touch | TouchEvent) {
    const rect = this._canvas.getBoundingClientRect();
    const x = (event as any).clientX || 0;
    const y = (event as any).clientY || 0;
    return new Point(x - rect.left, y - rect.top);
  }
  /** */
  _addPoint(point: Point) {
    let points = this.drawingState.points;
    points.push(point);
    if (points.length > 2) {
      // To reduce the initial lag make it work with 3 points
      // by copying the first point to the beginning.
      if (points.length === 3) points.unshift(points[0]);

      let tmp = this._calculateCurveControlPoints(
        points[0],
        points[1],
        points[2]
      );
      let c2 = tmp.c2;
      tmp = this._calculateCurveControlPoints(points[1], points[2], points[3]);
      let c3 = tmp.c1;
      let curve = new Bezier(points[1], c2, c3, points[2]);
      this._addCurve(curve);
      // Remove the first element from the list,
      // so that we always have no more than 4 points in points array.
      points.shift();
    }
  }
  /** */
  _calculateCurveControlPoints(s1: Point, s2: Point, s3: Point) {
    let dx1 = s1.x - s2.x,
      dy1 = s1.y - s2.y,
      dx2 = s2.x - s3.x,
      dy2 = s2.y - s3.y,
      m1 = { x: (s1.x + s2.x) / 2.0, y: (s1.y + s2.y) / 2.0 },
      m2 = { x: (s2.x + s3.x) / 2.0, y: (s2.y + s3.y) / 2.0 },
      l1 = Math.sqrt(dx1 * dx1 + dy1 * dy1),
      l2 = Math.sqrt(dx2 * dx2 + dy2 * dy2),
      dxm = m1.x - m2.x,
      dym = m1.y - m2.y,
      k = l2 / (l1 + l2),
      cm = { x: m2.x + dxm * k, y: m2.y + dym * k },
      tx = s2.x - cm.x,
      ty = s2.y - cm.y;

    return {
      c1: new Point(m1.x + tx, m1.y + ty),
      c2: new Point(m2.x + tx, m2.y + ty)
    };
  }
  /** */
  _calculateDotVelocity(curve: Bezier) {
    const { startPoint, endPoint } = curve;
    let velocity = endPoint.velocityFrom(startPoint);
    return (
      this.velocityFilterWeight * velocity +
      (1 - this.velocityFilterWeight) * this.drawingState._lastDotVelocity
    );
  }
  /** */
  _addCurve(curve: Bezier) {
    //
    const { _lastDotVelocity, _lastDotWidth } = this.drawingState;
    const dotVelocity =
      this.props.dotSize > 0
        ? _lastDotVelocity
        : this._calculateDotVelocity(curve);
    let newWidth = this.props.dotSize
      ? this.props.dotSize
      : this._strokeWidth(dotVelocity);
    //
    this._drawCurve(curve, _lastDotWidth, newWidth);
    //
    this.drawingState._lastDotVelocity = dotVelocity;
    this.drawingState._lastDotWidth = newWidth;
  }
  /** */
  _drawPoint(x: number, y: number, size: number) {
    let ctx = this._ctx;
    ctx.moveTo(x, y);
    ctx.arc(x, y, size, 0, 2 * Math.PI, false);
  }
  /** */
  _drawCurve(curve: Bezier, startWidth: number, endWidth: number) {
    const widthDelta = endWidth - startWidth;
    this._ctx.beginPath();
    //
    const drawSteps = Math.floor(curve.length());
    let i;
    let t;
    let tt;
    let ttt;
    let u;
    let uu;
    let uuu;
    let x;
    let y;
    for (i = 0; i < drawSteps; i++) {
      // Calculate the Bezier (x, y) coordinate for this step.
      t = i / drawSteps;
      tt = t * t;
      ttt = tt * t;
      u = 1 - t;
      uu = u * u;
      uuu = uu * u;

      x = uuu * curve.startPoint.x;
      x += 3 * uu * t * curve.control1.x;
      x += 3 * u * tt * curve.control2.x;
      x += ttt * curve.endPoint.x;

      y = uuu * curve.startPoint.y;
      y += 3 * uu * t * curve.control1.y;
      y += 3 * u * tt * curve.control2.y;
      y += ttt * curve.endPoint.y;

      let width =
        this.props.dotSize > 0
          ? this.props.dotSize
          : startWidth + ttt * widthDelta;
      this._drawPoint(x, y, width);
    }
    this._ctx.closePath();
    this._ctx.fill();
  }
  /** */
  _strokeWidth(velocity: number) {
    return Math.max(this.strokeMaxWidth / (velocity + 1), this.strokeMinWidth);
  }
  /**
   *
   */
  render() {
    const style: React.CSSProperties = {
      width: this.props.canvasWidth,
      height: this.props.canvasHeight,
      backgroundColor: this.props.backgroundColor
    };
    return <canvas style={style} ref="cv" />;
  }
}
