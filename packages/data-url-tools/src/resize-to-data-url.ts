import resizeToCanvas from "./resize-to-canvas";

/** */
export default function resizeToDataUrl(dataUrl: string, resizeRatio: number = 1) {
  return new Promise<string>(async (resolve, reject) => {
    try {
      const result = await resizeToCanvas(dataUrl, resizeRatio).then(canvas =>
        canvas.toDataURL()
      );
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}