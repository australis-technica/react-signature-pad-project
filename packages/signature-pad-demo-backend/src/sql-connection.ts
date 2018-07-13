import { connect } from "@australis/tiny-sql";
import dbConnectionConfig, { withoutDB  } from "./db-connection-config";
export default ()=> connect(dbConnectionConfig);
export const connectToServer = ()=> connect(withoutDB);