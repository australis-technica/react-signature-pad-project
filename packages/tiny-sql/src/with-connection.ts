import { Connection, ConnectionConfig } from "tedious";
import { connect} from "./connect";
/**
 *  
 */
export const withConnection = (args: ConnectionConfig | Connection) => <R>(
  func: (connection: Connection) => R,
) => connect(args).then(func);
