import { mysql_connection } from "$lib/server/mysql";
import { error } from "@sveltejs/kit";

export async function POST({ request }) {
  const mysqlconn = await mysql_connection();
  const payload = await request.json();
  const { match_id, round_format_id, outcome_id } = payload;
  if (!match_id) {
    error(400, {
      message: "Match ID is required",
    });
  }

  if (!round_format_id) {
    error(400, {
      message: "Round Format is required",
    });
  }
  if (!outcome_id) {
    error(400, {
      message: "Outcome is required",
    });
  }

  if (!outcome_id) {
    error(400, {
      message: "Outcome is required",
    });
  }

  // TODO: Fail if over the match's round limit

  let is_created = await create_round(mysqlconn, payload);
  if (!is_created) {
    error(500, {
      message: "Create failed",
    });
  }
  return new Response({}, { status: 200 });
}

async function create_round(conn, round_data) {
  const { match_id, title, round_format_id, outcome_id } = round_data;
  const values = [match_id, title, round_format_id, outcome_id];
  const sql =
    "INSERT INTO rounds (match_id, title, round_format_id, outcome_id) VALUES (?, ?, ?, ?)";
  const [result] = await conn.execute(sql, values);
  if (result.insertId) {
    return true;
  } else {
    return false;
  }
}
