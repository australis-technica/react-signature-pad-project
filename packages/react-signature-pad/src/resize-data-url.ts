// import fromDataUrl from "./from-data-url";

// /** */
// export default function resizeToDataUrl(dataUrl: string, resizeRatio: number = 1) {
//   return new Promise<string>(async (resolve, reject) => {
//     try {
//       const result = await fromDataUrl(dataUrl, resizeRatio).then(canvas =>
//         canvas.toDataURL()
//       );
//       resolve(result);
//     } catch (error) {
//       reject(error);
//     }
//   });
// }