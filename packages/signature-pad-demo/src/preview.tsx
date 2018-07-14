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
/** */
export default (function Preview(props) {
  let { imgSrc, id } = props;  
  if(id === "imageSrcResultImg") {
    debugger;
  }
 return (
    props.show && (
      <div className={classNames("column")}>
        <div
          className={classNames("column", "flex-center")}
          style={{
            border: "1px solid lightblue",
            width: props.width,
            height: props.height
          }}
        >
          <img src={imgSrc} />
        </div>
        <ImageSize id={id} imageSrc={(isString(imgSrc) && imgSrc) || ""} />
      </div>
    )
  );
}) as React.StatelessComponent<PreviewProps>;
