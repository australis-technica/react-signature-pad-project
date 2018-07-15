import * as React from "react";
import { dataUrlSize } from "@australis/data-url-tools";

export default function ImageSize(props: { imageSrc: string; id: string }) {
  const { imageSrc, id } = props;
  const { bytesLength, sizeKB, sizeMB, fileSize } = dataUrlSize(imageSrc);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        fontSize: "12px",
        border: "1px dotted green",
        textAlign: "left",
        padding: "0.5rem"
      }}
    >
      <span>{id.toUpperCase()}:</span>
      <span>
        Base64 Length {imageSrc.length} c
      </span>
      <span>
        Byte Size {bytesLength}
      </span>
      <span>File Size: {fileSize} b</span>
      <span>File Size: {sizeKB} Kb</span>
      <span>File Size: {sizeMB} Mb</span>
    </div>
  );
}
