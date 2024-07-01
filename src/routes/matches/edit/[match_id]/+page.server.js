import { mysql_connection } from "$lib/server/mysql";

export async function load({ params }) {
  const { match_id } = params;

  const mysqlconn = await mysql_connection();
  const match = await get_match(mysqlconn, match_id);
  const teams = await get_teams(mysqlconn);
  const outcomes = await get_outcomes(mysqlconn);
  const match_formats = await get_match_formats(mysqlconn);

  return {
    match,
    teams,
    outcomes,
    match_formats,
  };
}

async function get_match(conn, match_id) {
  const sql = "SELECT * FROM matches WHERE match_id = ? LIMIT 1";
  const values = [match_id];
  const [result] = await conn.execute(sql, values);
  const first_result = result[0];
  return first_result;
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
