/**
 * TODO: attribute original source/alg credits,
 * just made it async/parametrized
 */
export default function resizeToCanvas(dataUrl: string, ratio: number) {
  /** */
  return new Promise<HTMLCanvasElement>((resolve, reject) => {
    try {
      const img = document.createElement("img");
      img.src = dataUrl;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        // final width
        const width = img.width * ratio;
        canvas.width = width;
        canvas.height = (canvas.width * img.height) / img.width;
        // ...
        var cur = {
          width: Math.floor(img.width * ratio),
          height: Math.floor(img.height * ratio)
        };
        const oc = document.createElement("canvas");
        oc.width = cur.width;
        oc.height = cur.height;
        // ...
        const octx = oc.getContext("2d");
        octx.drawImage(img, 0, 0, cur.width, cur.height);
        while (cur.width * ratio > width) {
          cur = {
            width: Math.floor(cur.width * ratio),
            height: Math.floor(cur.height * ratio)
          };
          octx.drawImage(
            oc,
            0,
            0,
            cur.width * ratio,
            cur.height * ratio,
            0,
            0,
            cur.width,
            cur.height
          );
        }
        // ...
        const ctx = canvas.getContext("2d");
        ctx.drawImage(
          oc,
          0,
          0,
          cur.width,
          cur.height,
          0,
          0,
          canvas.width,
          canvas.height
        );

        resolve(canvas);
      };
    } catch (error) {
      reject(error);
    }
  });
}
