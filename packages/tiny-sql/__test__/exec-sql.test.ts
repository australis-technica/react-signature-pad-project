import { execSql as ExecSql, withConnection, connect } from "../src";
import { Connection, ConnectionConfig } from "tedious";
import { isString } from "util";
import { join } from "path";
/** */
const config = require(join(
  __dirname,
  "../.secrets/",
  "connection-string.json",
));
/** */
function withoutDb(config: ConnectionConfig) {
  const { options, ...rest } = config;
  const { database, ...more } = options;
  return {
    ...rest,
    options: more
  }
}
const TEST_DB_NAME = "testdb";
const TEST_TABLE_NAME = "test_table";

describe("timy-sql-connects", () => {
  it("connects", async () => {
    let connection: Connection;
    try {
      connection = await connect(withoutDb(config));
      const execSql = ExecSql(connection);
      await execSql(`if(exists(select name from sys.databases where name = '${TEST_DB_NAME}')) drop database ${TEST_DB_NAME};`)
      await execSql("create database testdb");
      const database = await execSql<{ name: string }>(`select top 1 name from sys.databases where name = '${TEST_DB_NAME}'`).then(x => x.values[0]);
      expect(database.name).toBe(TEST_DB_NAME);
      await execSql(`if(exists(select top 1 name from sys.tables where name = '${TEST_TABLE_NAME}')) drop table ${TEST_TABLE_NAME}`);
      await execSql(`
      create table ${TEST_TABLE_NAME} (
        [key] varchar(4000) not null UNIQUE, [value] varchar(4000) not null 
      )
      `);
      const table = await execSql<{ name: string }>(`select name from sys.tables where name = '${TEST_TABLE_NAME}'`).then(x => x.values[0]);
      expect(table.name).toBe(TEST_TABLE_NAME);
    }  catch(error){
      throw error;
    }
    
    finally {
      connection && connection.close();
    }
  });
});

describe("exe with connection", async () => {
  let connection: Connection;
  connection = new Connection(config);
  const sqlTxt = "select 'x' as name";
  const result = await withConnection(connection)(ExecSql)
    .then(execSql => execSql<{ name: string }>(sqlTxt))
    .then(x => {
      x.connection.close();
      return x;
    });
  expect(result.values[0].name).toBe("x");
});
/** */
describe("exe with connection config", async () => {
  const sqlTxt = "select 'hello' as name";
  const result = await withConnection(config)(ExecSql)
    .then(execSql => execSql<{ name: string }>(sqlTxt))
    .then(x => {
      x.connection.close();
      return x;
    })
    .catch(x => x && x.connection && x.connection.close());
  expect(result.values[0].name).toBe("hello");
});
/** */
describe("exe with params", async () => {
  let connection: Connection;
  try {
    connection = await connect(config);
    const sqlTxt = "select @name as name";    
    const exec = ExecSql(connection);
    const { values } = await exec<{ name: string }>(sqlTxt, {
      name: TEST_TABLE_NAME
    });    
    expect(values[0].name).toBe(TEST_TABLE_NAME);
  } finally {
    connection && connection.close();
  }
});