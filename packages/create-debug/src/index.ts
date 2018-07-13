import { default as moduleDebugger } from "./module-debugger";
import { IDebugger } from "debug";
/** */
export function debugModule(m: NodeModule , out?: string) : IDebugger {
  return moduleDebugger(require("debug"), out)(m);
}
