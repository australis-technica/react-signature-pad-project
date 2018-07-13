import { ModuleInfo } from "./module-info";
import idName from "./id-name";

export default function moduleInfoName(info: ModuleInfo): string {
    if (!info.parent) {
      return idName(info.id);
    }
    return moduleInfoName(info.parent) + "/" + idName(info.id);
  }