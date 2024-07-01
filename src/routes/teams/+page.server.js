import { mysql_connection } from "$lib/server/mysql";

export async function load() {
  const mysqlconn = await mysql_connection();
  const teams = await get_teams(mysqlconn);

  return {
    teams,
  };
}

async function get_teams(conn) {
  const sql = "SELECT * FROM teams WHERE is_deleted = 0";
  const [result] = await conn.execute(sql);
  return result;
}
