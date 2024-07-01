import { mysql_connection } from "$lib/server/mysql";
import { error } from "@sveltejs/kit";

export async function POST({ request, params }) {
  const mysqlconn = await mysql_connection();
  const payload = await request.json();
  const { match_id } = params;
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

  let is_edited = await edit_match(mysqlconn, match_id, payload);
  if (!is_edited) {
    error(500, {
      message: "Create failed",
    });
  }
  return new Response({}, { status: 200 });
}

export async function DELETE({ params }) {
  const { match_id } = params;
  let mysqlconn = await mysql_connection();

  let is_deleted = await delete_match(mysqlconn, match_id);
  if (is_deleted) {
    return new Response({}, { status: 200 });
  } else {
    error(500, { message: "Delete failed" });
  }
}

async function edit_match(conn, match_id, match_data) {
  const { team1_id, team2_id, outcome_id, match_format_id, title } = match_data;
  const values = [
    team1_id,
    team2_id,
    outcome_id,
    match_format_id,
    title,
    match_id,
  ];
  const sql =
    "UPDATE matches SET team1_id = ?, team2_id = ?, outcome_id = ?, match_format_id = ?, title = ? WHERE match_id = ?";
  const [result] = await conn.execute(sql, values);
  if (result.affectedRows) {
    return true;
  } else {
    return false;
  }
}

async function delete_match(conn, match_id) {
  const sql = "UPDATE matches SET is_deleted = 1 WHERE match_id = ?";
  const values = [match_id];
  const [result] = await conn.execute(sql, values);
  if (result.affectedRows) {
    return true;
  } else {
    return false;
  }
}
