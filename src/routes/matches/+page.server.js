import { mysql_connection } from "$lib/server/mysql";

export async function load() {
  const mysqlconn = await mysql_connection();
  const matches = await get_matches(mysqlconn);

  return {
    matches,
  };
}

async function get_matches(conn) {
  const sql = "SELECT * FROM matches WHERE is_deleted = 0";
  const [result] = await conn.execute(sql);
  return result;
}
