import { mysql_connection } from "$lib/server/mysql";

export async function load() {
  let mysqlconn = await mysql_connection();

  const matches = await get_matches(mysqlconn);
  const rounds = await get_rounds(mysqlconn);
  const match_outcomes = await get_match_outcomes(mysqlconn);

  return {
    matches,
    rounds,
    match_outcomes,
  };
}

async function get_matches(conn) {
  const sql =
    "SELECT matches.match_id AS match_id, matches.title AS match_title, matches.starting_time AS match_starting_time, team1.title AS team1_title, team2.title AS team2_title, outcomes.title AS outcome_title, match_formats.title AS match_format_title FROM matches LEFT JOIN teams AS team1 ON matches.team1_id = team1.team_id LEFT JOIN teams AS team2 ON matches.team2_id = team2.team_id LEFT JOIN outcomes ON matches.outcome_id = outcomes.outcome_id LEFT JOIN match_formats ON matches.match_format_id = match_formats.match_format_id WHERE matches.is_deleted = 0";
  const [result] = await conn.execute(sql);
  return result;
}

async function get_match_outcomes(conn) {
  const sql =
    "SELECT matches.match_id AS match_id, rounds.outcome_id AS outcome_id, COUNT(rounds.round_id) AS count FROM rounds LEFT JOIN matches ON rounds.match_id = matches.match_id GROUP BY matches.match_id, rounds.outcome_id";
  const [result] = await conn.execute(sql);
  return result;
}

async function get_rounds(conn) {
  const sql =
    "SELECT rounds.round_id, rounds.title, rounds.match_id, rounds.starting_time, outcomes.title AS outcome_title, round_formats.title AS round_format_title, rounds.outcome_id FROM rounds LEFT JOIN outcomes ON rounds.outcome_id = outcomes.outcome_id LEFT JOIN round_formats ON rounds.round_format_id = round_formats.round_format_id";
  const [result] = await conn.execute(sql);
  return result;
}
