import { IDebugger } from "debug";
/** */
export function changeOutput(out: string) {
  return (d: IDebugger) => {
    switch (out) {
      case "stdout": {
        d.log = console.log.bind(console);
        break;
      }
      default: {
        // ....
      }
    }
    return d;
  };
}
