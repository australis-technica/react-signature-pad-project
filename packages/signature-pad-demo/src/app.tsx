import * as React from "react";
import "./app.css";
import { SignaturePad } from "@australis/react-signature-pad";
import { resizeToDataUrl } from "@australis/data-url-tools";
import { Dispatch, Action } from "redux";
import appStore, { AppState } from "./app-store";
import ImageSize from "./image-size";
import api from "./api";
import InputBox from "./input-box";
import * as classNames from "classnames";
import Preview from "./preview";
import { isStringNotEmpty } from "@australis/signature-pad-demo/src/util";

const App =
  /** */
  class App extends React.Component<AppState & { dispatch: Dispatch }> {
    /** */
    onSend = async () => {
      try {
        this.setBusy(true);
        this.setError(undefined);
        const { id } = await api.add({ img: this.props.imageSrcScaled });
        this.setState({
          imageSrcResultID: id
        });
      } catch (error) {
        this.setError(error);
      } finally {
        this.setBusy(false);
      }
    };
    onGet = async () => {
      try {
        this.setBusy(true);
        this.setError(undefined);
        const res = await api.get(this.props.imageSrcResultID);
        this.setState({
          // imageSrcResultID: id,
          imageSrcResultImg: res
        });
      } catch (error) {
        this.setError(error);
      } finally {
        this.setBusy(false);
      }
    };
    /** */
    onSignaturePadStrokeEnd = async (canvas: HTMLCanvasElement) => {
      try {
        const imageSrc = canvas.toDataURL();
        this.setState({
          imageSrc
        });
        const imageSrcScaled = await resizeToDataUrl(
          imageSrc,
          this.props.resizeRatio
        );
        this.setState({
          imageSrcScaled
        });
      } catch (error) {
        this.setError(error);
      }
    };
    /** */
    dispatch<A extends Action>(action: A) {
      this.props.dispatch(action);
    }
    /** */
    setBusy = (busy: boolean) => {
      this.setState({ busy });
    };
    /** */
    setError = (e: Error | string) => {
      if (typeof e === "string") {
        return this.setState({ error: e });
      }
      if (e && e.message) {
        return this.setState({ error: e.message });
      }
      return this.setState({ error: undefined });
    };
    /** */
    setState(state: Partial<AppState>) {
      this.dispatch(appStore.setState(state));
    }
    resetState = () => {
      this.dispatch(appStore.resetState());
    };
    /** from ref */
    signaturePad: SignaturePad;
    /** Signature pad ref callback */
    onSignaturePadRef = (x: any)=> this.signaturePad = x;
    /** */
    clearSignature = ()=> {
      this.signaturePad.clear();
    }
    /** */
    public render() {
      const { showSignature } = this.props;
      return (
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Signature Pad Demo</h1>
            <div className={classNames("row")}>
              {this.props.busy && (
                <div className={classNames("busy", "margin-horizontal")}>
                  <span>Busy ...</span>
                </div>
              )}
              {this.props.error && (
                <div className={classNames("error", "margin-horizontal")}>
                  Error: {this.props.error}
                </div>
              )}
            </div>
          </header>
          <div className="wrap">
            <InputBox
              label={"Show Signature"}
              type={"checkbox"}
              checked={showSignature}
              onChange={e => this.setState({ showSignature: e.target.checked })}
            />
            <InputBox
              label={"imageSrcScaled"}
              type={"checkbox"}
              checked={this.props.imageSrcScaledShow}
              onChange={e =>
                this.setState({ imageSrcScaledShow: e.target.checked })
              }
            />
            <InputBox
              label={"imageSrcResultImgShow"}
              type={"checkbox"}
              checked={this.props.imageSrcResultImgShow}
              onChange={e =>
                this.setState({ imageSrcResultImgShow: e.target.checked })
              }
            />
            <InputBox
              label={
                <span>
                  Dot Size {this.props.dotSize <= 0.01 ? " (velocity)" : "px"}
                </span>
              }
              min={0}
              max={5}
              step={0.1}
              type="number"
              value={this.props.dotSize}
              onChange={e => this.setState({ dotSize: Number(e.target.value) })}
            />
            <InputBox
              label="Dot Min Width (not-working-yet)"
              value={this.props.dotSizeMinWidth}
              type="number"
              min={0}
              max={1.5}
              step={0.1}
              onChange={e =>
                this.setState({ dotSizeMinWidth: Number(e.target.value) })
              }
            />
            <InputBox
              label="Dot Max Width (not-working-yet)"
              type="number"
              value={this.props.dotSizeMaxWidth}
              min={0}
              max={1.5}
              step={0.1}
              onChange={e =>
                this.setState({ dotSizeMaxWidth: Number(e.target.value) })
              }
            />
            <InputBox
              type="text"
              label="Pen Color"
              value={this.props.penColor}
              onChange={e => this.setState({ penColor: e.target.value })}
            />
            <InputBox
              type="text"
              label="Canvas Color"
              value={this.props.canvasColor}
              onChange={e => this.setState({ canvasColor: e.target.value })}
            />
            <InputBox
              label="canvas width"
              type="number"
              min={1}
              max={128}
              step={1}
              value={this.props.canvasWidth}
              onChange={e =>
                this.setState({ canvasWidth: Number(e.target.value) })
              }
            />

            <InputBox
              label={"Canvas Height"}
              type="number"
              min={1}
              max={128}
              step={1}
              value={this.props.canvasHeight}
              onChange={e =>
                this.setState({ canvasHeight: Number(e.target.value) })
              }
            />

            <InputBox
              label={"Resize Ratio"}
              type="number"
              min={0.1}
              max={10}
              step={0.1}
              value={this.props.resizeRatio}
              onChange={e =>
                this.setState({ resizeRatio: Number(e.target.value) })
              }
            />

            <div className={classNames("margin1")}>
              <label className={classNames("margin2")}>
                Desired Ratio {128 / 400}
              </label>
            </div>

            <div className={classNames("margin1")}>
              <label className={classNames("margin2")}>
                Current Ratio {this.props.canvasHeight / this.props.canvasWidth}
              </label>
            </div>

            <div style={{ display: "flex", flexDirection: "column" }} />
          </div>
          <div className="row">
            <button
              className={classNames("button", "margin2")}
              children={"reset defaults"}
              onClick={this.resetState}
            />
            <button
              className={classNames("button", "margin2")}
              children={"clear"}
              onClick={this.clearSignature}
            />
            <button
              className={classNames("button ", "button-accent", "margin2")}
              onClick={this.onSend}
              children={"send"}
              disabled={!isStringNotEmpty(this.props.imageSrcScaled)}
            />
            <button
              className={classNames("button ", "button-accent", "margin2")}
              onClick={this.onGet}
              children={"get"}
              disabled={!isStringNotEmpty(this.props.imageSrcResultID)}
            />
          </div>
          <div className={classNames("box-one")}>
            {showSignature && (
              <div style={{ border: "1px solid lightblue" }}>
                <SignaturePad
                  ref={this.onSignaturePadRef}
                  dotSize={this.props.dotSize}
                  penColor={this.props.penColor}
                  dotSizeMaxWidth={this.props.dotSizeMaxWidth}
                  dotSizeMinWidth={this.props.dotSizeMinWidth}
                  canvasWidth={this.props.canvasWidth}
                  canvasHeight={this.props.canvasHeight}
                  backgroundColor={this.props.canvasColor}
                  onStrokeEnd={this.onSignaturePadStrokeEnd}
                />
                <ImageSize id="image-src" imageSrc={this.props.imageSrc} />
                <div className={classNames("margin1")}>
                  <label className={classNames("margin2")}>
                    Canvas: {this.props.canvasWidth}px *{" "}
                    {this.props.canvasHeight}px ={" "}
                    {this.props.canvasWidth * this.props.canvasHeight}px
                  </label>
                </div>
              </div>
            )}
            <Preview
              id="img-src-scaled"
              show={this.props.imageSrcScaledShow}
              width={this.props.canvasWidth}
              height={this.props.canvasHeight}
              imgSrc={this.props.imageSrcScaled}
            />
            <Preview
              id="imageSrcResultImg"
              show={this.props.imageSrcResultImgShow}
              width={this.props.canvasWidth}
              height={this.props.canvasHeight}
              imgSrc={this.props.imageSrcResultImg}
            />
          </div>

          <div
            className={classNames("row", "margin1")}
            style={{ fontSize: "14px" }}
          >
            {this.props.imageSrcResultID && (
              <span>
                <strong>ImageSrcResultID: </strong>
                {this.props.imageSrcResultID}
              </span>
            )}
          </div>
        </div>
      );
    }
  };
/** */
export default App;
