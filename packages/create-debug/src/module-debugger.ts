import { IDebug, IDebugger } from "debug";
import { moduleInfo } from "./module-info";
import { changeOutput } from "./change-output";
import moduleInfoName from "./module-info-name";
/**
 *
 */
export default function createDebug(Debug: IDebug, out = process.env.DEBUG_TO) {
  //
  return (target: NodeModule): IDebugger =>
    changeOutput(out)(Debug(moduleInfoName(moduleInfo(target))+":"));
}
