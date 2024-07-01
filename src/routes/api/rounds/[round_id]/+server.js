import { mysql_connection } from "$lib/server/mysql";
import { error } from "@sveltejs/kit";

export async function POST({ request, params }) {
  const mysqlconn = await mysql_connection();
  const payload = await request.json();
  const { round_id } = params;
  const { round_format_id, outcome_id } = payload;

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

  let is_edited = await edit_round(mysqlconn, round_id, payload);
  if (!is_edited) {
    error(500, {
      message: "Create failed",
    });
  }
  return new Response({}, { status: 200 });
}

export async function DELETE({ params }) {
  const { round_id } = params;
  let mysqlconn = await mysql_connection();

  let is_deleted = await delete_round(mysqlconn, round_id);
  if (is_deleted) {
    return new Response({}, { status: 200 });
  } else {
    error(500, { message: "Delete failed" });
  }
}

async function edit_round(conn, round_id, round_data) {
  const { title, round_format_id, outcome_id } = round_data;
  const values = [title, round_format_id, outcome_id, round_id];
  const sql =
    "UPDATE rounds SET title = ?, round_format_id = ?, outcome_id = ? WHERE round_id = ?";
  const [result] = await conn.execute(sql, values);
  if (result.affectedRows) {
    return true;
  } else {
    return false;
  }
}

async function delete_round(conn, round_id) {
  const sql = "DELETE FROM rounds WHERE round_id = ?";
  const values = [round_id];
  const [result] = await conn.execute(sql, values);
  if (result.affectedRows) {
    return true;
  } else {
    return false;
  }
}
