import { mysql_connection } from "$lib/server/mysql";

export async function load() {
  const mysqlconn = await mysql_connection();
  const teams = await get_teams(mysqlconn);
  const outcomes = await get_outcomes(mysqlconn);
  const match_formats = await get_match_formats(mysqlconn);
  return {
    teams,
    outcomes,
    match_formats,
  };
}

async function get_teams(conn) {
  const sql = "SELECT * FROM teams WHERE is_deleted = 0";
  const [result] = await conn.execute(sql);
  return result;
}

async function get_outcomes(conn) {
  const sql = "SELECT * FROM outcomes";
  const [result] = await conn.execute(sql);
  return result;
}

async function get_match_formats(conn) {
  const sql = "SELECT * FROM match_formats";
  const [result] = await conn.execute(sql);
  return result;
}
