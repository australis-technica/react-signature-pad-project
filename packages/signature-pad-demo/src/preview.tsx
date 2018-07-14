import * as React from "react";
import * as classNames from "classnames";
import ImageSize from "./image-size";
/** */
export type PreviewProps  = {
  show: boolean;
  width:number;
  height: number;
  imgSrc: string;
  id: string;
} 
/** */
export default (function Preview(props){
    return props.show && (
        <div className={classNames("column")}>
          <div className={classNames("column", "flex-center")}
            style={{
              border: "1px solid lightblue",
              width: props.width,
              height:props.height
            }}
          >
            <img src={props.imgSrc} />
          </div>
          <ImageSize
            id={props.id}
            imageSrc={props.imgSrc}
          />
        </div>
      );
}) as React.StatelessComponent<PreviewProps>;