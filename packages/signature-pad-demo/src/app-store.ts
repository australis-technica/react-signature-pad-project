import duckState from "./duck-state";
/** */
export type AppState = {
  showSignature: boolean;
  imageSrcScaledShow: boolean;
  dotSizeMinWidth: number;
  dotSizeMaxWidth: number;
  dotSize: number;
  penColor: string;
  canvasColor: string;
  canvasWidth: number;
  canvasHeight: number;
  resizeRatio: number;
  imageSrc: string;
  busy: boolean;
  error?: string;
  imageSrcScaled: string;
  imageSrcResultID?: string;
  imageSrcResultImg?: any;
  imageSrcResultImgShow: boolean;
};
const initialSizeRatio = 1.5;
// const desiredRatio = 128 / 400;
const defautlState: AppState = {
  showSignature: true,
  imageSrcScaledShow: true,
  dotSizeMinWidth: 0,
  dotSizeMaxWidth: 1.5,
  dotSize: 1,
  penColor: "blue",
  canvasColor: "pink", // "rgba(21, 208, 61, 0)",
  canvasWidth: 128 * initialSizeRatio,
  canvasHeight: 64 * initialSizeRatio,
  resizeRatio: 0.5,
  imageSrc: "",
  busy: false,
  imageSrcScaled: "",
  imageSrcResultID: "last",
  imageSrcResultImg: "",
  imageSrcResultImgShow: true
  // error: "?"
};
const STORE_KEY = "app";
const duck = duckState(STORE_KEY, defautlState);
const setState = duck.action;
const resetState = () => duck.action(defautlState);
export default {
  STORE_KEY,
  setState,
  resetState,
  ...duck
};
