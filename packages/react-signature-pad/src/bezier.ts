import Point from "./point";

export default class Bezier {
    constructor(
        public startPoint: Point,
        public control1: Point,
        public control2: Point,
        public endPoint: Point) {
    }

    length() {
        var steps = 10,
            length = 0,
            i, t, cx, cy, px, py, xdiff, ydiff;

        for (i = 0; i <= steps; i++) {
            t = i / steps;
            cx = this._point(t, this.startPoint.x, this.control1.x, this.control2.x, this.endPoint.x);
            cy = this._point(t, this.startPoint.y, this.control1.y, this.control2.y, this.endPoint.y);
            if (i > 0) {
                xdiff = cx - px;
                ydiff = cy - py;
                length += Math.sqrt(xdiff * xdiff + ydiff * ydiff);
            }
            px = cx;
            py = cy;
        }
        return length;
    }

    _point(t: number, start: number, c1: number, c2: number, end: number) {
        return start * (1.0 - t) * (1.0 - t) * (1.0 - t)
            + 3.0 * c1 * (1.0 - t) * (1.0 - t) * t
            + 3.0 * c2 * (1.0 - t) * t * t
            + end * t * t * t;
    }

}