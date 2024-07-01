import { mysql_connection } from "$lib/server/mysql";

export async function load() {
  let mysqlconn = await mysql_connection();

  const matches = await get_matches(mysqlconn);
  return {
    matches,
  };
}

async function get_matches(conn) {
  const sql =
    "SELECT matches.title AS match_title, matches.starting_time AS match_starting_time, team1.title AS team1_title, team2.title AS team2_title, outcomes.title AS outcome_title, match_formats.title AS match_format_title FROM matches LEFT JOIN teams AS team1 ON matches.team1_id = team1.team_id LEFT JOIN teams AS team2 ON matches.team1_id = team2.team_id LEFT JOIN outcomes ON matches.outcome_id = outcomes.outcome_id LEFT JOIN match_formats ON matches.match_format_id = match_formats.match_format_id";
  const [result] = await conn.execute(sql);
  return result;
}
