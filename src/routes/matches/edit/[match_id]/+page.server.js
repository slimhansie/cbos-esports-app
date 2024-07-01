import { mysql_connection } from "$lib/server/mysql";

export async function load({ params }) {
  const { match_id } = params;

  const mysqlconn = await mysql_connection();
  const match = await get_match(mysqlconn, match_id);
  const teams = await get_teams(mysqlconn);
  const outcomes = await get_outcomes(mysqlconn);
  const match_formats = await get_match_formats(mysqlconn);
  const round_formats = await get_round_formats(mysqlconn);
  const rounds = await get_rounds(mysqlconn, match_id);

  return {
    match,
    teams,
    outcomes,
    match_formats,
    round_formats,
    rounds,
  };
}

async function get_match(conn, match_id) {
  const sql =
    "SELECT matches.match_id AS match_id, matches.title AS match_title, matches.match_format_id AS match_format_id, matches.team1_id AS match_team1_id, matches.team2_id AS match_team2_id, matches.outcome_id AS match_outcome_id, match_formats.round_limit AS match_round_limit FROM matches LEFT JOIN match_formats ON matches.match_format_id = match_formats.match_format_id WHERE match_id = ? LIMIT 1";
  const values = [match_id];
  const [result] = await conn.execute(sql, values);
  const first_result = result[0];
  return first_result;
}

async function get_rounds(conn, match_id) {
  const sql =
    "SELECT rounds.round_id AS round_id, rounds.round_format_id AS round_format_id, rounds.outcome_id AS outcome_id, rounds.title AS round_title, team1.title AS team1_title, team2.title AS team2_title, outcome.title AS outcome_title, round_format.title AS round_format_title FROM rounds LEFT JOIN matches ON rounds.match_id = matches.match_id LEFT JOIN teams AS team1 ON matches.team1_id = team1.team_id LEFT JOIN teams AS team2 ON matches.team2_id = team2.team_id LEFT JOIN outcomes AS outcome ON rounds.outcome_id = outcome.outcome_id LEFT JOIN round_formats AS round_format ON rounds.round_format_id = round_format.round_format_id WHERE rounds.match_id = ?";
  const values = [match_id];
  const [result] = await conn.execute(sql, values);
  return result;
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

async function get_round_formats(conn) {
  const sql = "SELECT * FROM round_formats";
  const [result] = await conn.execute(sql);
  return result;
}
