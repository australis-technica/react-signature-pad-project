import * as React from "react";
import "./app.css";
import { SignaturePad, resizeDataUrl } from "@australis/react-signature-pad";
import { Dispatch, Action } from "redux";
import appStore, { AppState } from "./app-store";
import ImageSize from "./image-size";
import api from "./api";

const App =
  /** */
  class App extends React.Component<AppState & { dispatch: Dispatch }> {
    /** */
    onSend = async () => {
      try {
        this.setError(undefined);
        const { id } = await api.add({ img: this.props.imageSrcScaled });
        this.setState({
          imageSrcResultID: id
        });
      } catch (error) {
        this.setError(error);
      }
    };
    /** */
    onSignaturePadStrokeEnd = async (canvas: HTMLCanvasElement) => {
      try {
        const imageSrc = canvas.toDataURL();
        this.setState({
          imageSrc
        });
        const imageSrcScaled = await resizeDataUrl(
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

    /** */
    public render() {
      const { showSignature } = this.props;
      return (
        <div className="App">
          <header className="App-header">
            {/* <img src={logo} className="App-logo" alt="logo" /> */}
            <h1 className="App-title">Signature Pad Demo</h1>
            <div style={{ color: "red" }}>{this.props.error}</div>
          </header>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-around",
              margin: "1rem"
            }}
          >
            <div style={{ margin: "0.5rem" }}>
              <label
                htmlFor="show-signature"
                children="Show Signature"
                style={{ margin: "0.5rem" }}
              />
              <input
                id="show-signature"
                type={"checkbox"}
                checked={showSignature}
                onChange={e =>
                  this.setState({ showSignature: e.target.checked })
                }
                style={{ margin: "0.5rem" }}
              />
            </div>

            <div style={{ margin: "0.5rem" }}>
              <label style={{ margin: "0.5rem" }}>
                Dot Size {this.props.dotSize <= 0.01 ? " (velocity)" : "px"}
              </label>
              <input
                min={0}
                max={5}
                step={0.1}
                type="number"
                value={this.props.dotSize}
                onChange={e =>
                  this.setState({ dotSize: Number(e.target.value) })
                }
                style={{ margin: "0.5rem" }}
              />
            </div>

            <div style={{ margin: "0.5rem" }}>
              <label
                children={"Dot Min Width (not-working-yet)"}
                style={{ margin: "0.5rem" }}
              />
              <input
                value={this.props.dotSizeMinWidth}
                type="number"
                min={0}
                max={1.5}
                step={0.1}
                onChange={e =>
                  this.setState({ dotSizeMinWidth: Number(e.target.value) })
                }
                style={{ margin: "0.5rem" }}
              />
            </div>

            <div style={{ margin: "0.5rem" }}>
              <label
                children={"Dot Max Width (not-working-yet)"}
                style={{ margin: "0.5rem" }}
              />
              <input
                type="number"
                value={this.props.dotSizeMaxWidth}
                min={0}
                max={1.5}
                step={0.1}
                onChange={e =>
                  this.setState({ dotSizeMaxWidth: Number(e.target.value) })
                }
                style={{ margin: "0.5rem" }}
              />
            </div>

            <div style={{ margin: "0.5rem" }}>
              <label children={"Pen Color"} style={{ margin: "0.5rem" }} />
              <input
                value={this.props.penColor}
                onChange={e => this.setState({ penColor: e.target.value })}
                style={{ margin: "0.5rem" }}
              />
            </div>

            <div style={{ margin: "0.5rem" }}>
              <label children={"Canvas Width"} style={{ margin: "0.5rem" }} />
              <input
                type="number"
                min={1}
                max={128}
                step={1}
                value={this.props.canvasWidth}
                onChange={e =>
                  this.setState({ canvasWidth: Number(e.target.value) })
                }
                style={{ margin: "0.5rem" }}
              />
            </div>

            <div style={{ margin: "0.5rem" }}>
              <label children={"Canvas Height"} style={{ margin: "0.5rem" }} />
              <input
                type="number"
                min={1}
                max={128}
                step={1}
                value={this.props.canvasHeight}
                onChange={e =>
                  this.setState({ canvasHeight: Number(e.target.value) })
                }
                style={{ margin: "0.5rem" }}
              />
            </div>

            <div style={{ margin: "0.5rem" }}>
              <label children={"Resize Ratio"} style={{ margin: "0.5rem" }} />
              <input
                type="number"
                min={0.1}
                max={10}
                step={0.1}
                value={this.props.resizeRatio}
                onChange={e =>
                  this.setState({ resizeRatio: Number(e.target.value) })
                }
                style={{ margin: "0.5rem" }}
              />
            </div>

            <div style={{ margin: "1rem" }}>
              <label style={{ margin: "0.5rem" }}>
                Canvas Size {this.props.canvasWidth * this.props.canvasHeight}px
              </label>
            </div>

            <div style={{ margin: "1rem" }}>
              <label style={{ margin: "0.5rem" }}>
                Desired Ratio {128 / 400}
              </label>
            </div>

            <div style={{ margin: "1rem" }}>
              <label style={{ margin: "0.5rem" }}>
                Current Ratio {this.props.canvasHeight / this.props.canvasWidth}
              </label>
            </div>

            <div style={{ display: "flex", flexDirection: "column" }} />

            <div style={{ margin: "0.5rem" }}>
              <button children={"RESET"} onClick={this.resetState} />
            </div>

            <div style={{ margin: "0.5rem" }}>
              <button style={{ fontWeight: "bolder" }} onClick={this.onSend}>
                SEND
              </button>
            </div>
          </div>
          <div
            style={{
              border: "1px solid gray",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              alignContent: "center",
              alignItems: "center"
            }}
          >
            {showSignature && (
              <div style={{ border: "1px solid lightblue" }}>
                <SignaturePad
                  dotSize={this.props.dotSize}
                  penColor={this.props.penColor}
                  dotSizeMaxWidth={this.props.dotSizeMaxWidth}
                  dotSizeMinWidth={this.props.dotSizeMinWidth}
                  canvasWidth={this.props.canvasWidth}
                  canvasHeight={this.props.canvasHeight}
                  backgroundColor={this.props.backgroundColor}
                  onStrokeEnd={this.onSignaturePadStrokeEnd}
                />
              </div>
            )}
            <div
              style={{
                border: "1px solid lightblue",
                minWidth: this.props.canvasWidth * this.props.resizeRatio,
                minHeight: this.props.canvasHeight * this.props.resizeRatio
              }}
            >
              <img src={this.props.imageSrcScaled} />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              margin: "1rem"
            }}
          >
            <ImageSize id="source" imageSrc={this.props.imageSrc} />
            <ImageSize id="translated" imageSrc={this.props.imageSrcScaled} />
          </div>
          <div style={{ fontSize: "14px" }}>
            <span>
              <strong>ImageSrcResultID: </strong>
              {this.props.imageSrcResultID}
            </span>
          </div>
        </div>
      );
    }
  };
/** */
export default App;
