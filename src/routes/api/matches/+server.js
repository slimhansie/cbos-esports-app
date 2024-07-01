import { mysql_connection } from "$lib/server/mysql";
import { error } from "@sveltejs/kit";

export async function POST({ request }) {
  const mysqlconn = await mysql_connection();
  const payload = await request.json();
  const { team1_id, team2_id, outcome_id, match_format_id, title } = payload;

  if (!team1_id) {
    error(400, {
      message: "Team 1 is required",
    });
  }

  if (!team2_id) {
    error(400, {
      message: "Team 2 is required",
    });
  }
  if (!outcome_id) {
    error(400, {
      message: "Outcome is required",
    });
  }

  if (!match_format_id) {
    error(400, {
      message: "Format is required",
    });
  }

  if (!title) {
    error(400, {
      message: "Title",
    });
  }

  let is_created = await create_match(mysqlconn, payload);
  if (!is_created) {
    error(500, {
      message: "Create failed",
    });
  }
  return new Response({}, { status: 200 });
}

async function create_match(conn, match_data) {
  const { team1_id, team2_id, outcome_id, match_format_id, title } = match_data;
  const values = [team1_id, team2_id, outcome_id, match_format_id, title];
  const sql =
    "INSERT INTO matches (team1_id, team2_id, outcome_id, match_format_id, title) VALUES (?, ?, ?, ?, ?)";
  const [result] = await conn.execute(sql, values);
  if (result.insertId) {
    return true;
  } else {
    return false;
  }
}
