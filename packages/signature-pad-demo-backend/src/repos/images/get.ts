import { execSql as ExecSql } from "@australis/tiny-sql";
import { Connection } from "tedious";
import { ImageDto } from "./types";
import { debugModule } from "@australis/create-debug";
import { TABLENAME } from "./constants";
// ...
const debug = debugModule(module);
/** */
export default async function get(
  connection: Connection,
  id: string
): Promise<ImageDto> {
  const execSql = ExecSql(connection);
  let query: string;
  switch (id) {
    case "last": {
        query = `
        select top 1 * from ${TABLENAME} order by updatedAt desc
        `;
        break;
    }
    default: {
      query = `
    select top 1 * from ${TABLENAME} where id = @id
    `;
    }
  }
  return execSql<ImageDto>(query, { id }) // ...
    .then(x => {
      const { error, ...rest } = x;
      if (error) {
        debug(error);
        return Promise.reject(x.error);
      }
      return Promise.resolve(rest.values[0]);
    });
}
