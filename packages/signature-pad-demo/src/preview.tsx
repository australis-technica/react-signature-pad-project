import * as React from "react";
import * as classNames from "classnames";
import ImageSize from "./image-size";
import { isString } from "util";
/** */
export type PreviewProps = {
  show: boolean;
  width: number;
  height: number;
  imgSrc: any;
  id: string;
};

class Preview extends React.Component<PreviewProps> {
  state = {
    width: 0,
    height: 0
  };
  onRef = (x: HTMLImageElement) => {
    if (!x) return;
    x.onload = () => {
      const { width, height } = x;
      if (width && height) {
        this.setState({
          width,
          height
        });
      }
    };
  };
  render() {
    let { imgSrc, id, show, width, height } = this.props;
    //if (id === "imageSrcResultImg") {      debugger;    }
    return (
      show && (
        <div className={classNames("column")}>
          <div
            className={classNames("column", "flex-center")}
            style={{
              border: "1px solid lightblue",
              width,
              height
            }}
          >
            <img src={imgSrc} ref={this.onRef} />
          </div>
          <ImageSize id={id} imageSrc={(isString(imgSrc) && imgSrc) || ""} />
          <div className={classNames("margin1")}>
            <label className={classNames("margin2")}>
              {this.state.width}px * {this.state.height}px ={" "}
              {this.state.width * this.state.height}px
            </label>
          </div>
        </div>
      )
    );
  }
}
/** */
export default Preview;
