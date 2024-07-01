import { mysql_connection } from "$lib/server/mysql";

export async function load({ params }) {
  const { team_id } = params;
  const mysqlconn = await mysql_connection();
  const team = await get_team(mysqlconn, team_id);

  return {
    team,
  };
}

async function get_team(conn, team_id) {
  const sql = "SELECT * FROM teams WHERE (team_id) = (?) LIMIT 1";
  const values = [team_id];
  const [result] = await conn.execute(sql, values);
  const first_result = result[0];
  return first_result;
}
