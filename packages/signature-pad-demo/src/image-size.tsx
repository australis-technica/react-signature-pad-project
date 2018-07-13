import * as React from "react";
import { dataUrlSize } from "@australis/react-signature-pad";

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
        Base64 Length <strong>{imageSrc.length}</strong>
      </span>
      <span>
        Byte Size <strong>{bytesLength}</strong>
      </span>
      <span>File Size <strong>{fileSize}</strong></span>
      <span>File Size <strong>{sizeKB} KB</strong></span>
      <span>File Size <strong>{sizeMB} MB</strong></span>
    </div>
  );
}
