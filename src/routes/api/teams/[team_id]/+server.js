import { mysql_connection } from "$lib/server/mysql";
import { error } from "@sveltejs/kit";

export async function POST({ params, request }) {
  const { team_id } = params;
  let mysqlconn = await mysql_connection();

  const body = await request.json();
  const { title } = body;

  let is_edited = await edit_team(mysqlconn, team_id, title);
  if (is_edited) {
    return new Response({}, { status: 200 });
  } else {
    error(500, { message: "Edit failed" });
  }
}

export async function DELETE({ params }) {
  const { team_id } = params;
  let mysqlconn = await mysql_connection();

  let is_deleted = await delete_team(mysqlconn, team_id);
  if (is_deleted) {
    return new Response({}, { status: 200 });
  } else {
    error(500, { message: "Delete failed" });
  }
}

async function edit_team(conn, team_id, title) {
  const sql = "UPDATE teams SET title = ? WHERE team_id = ? LIMIT 1";
  const values = [title, team_id];
  const [result] = await conn.execute(sql, values);
  if (result.affectedRows) {
    return true;
  } else {
    return false;
  }
}

async function delete_team(conn, team_id) {
  const sql = "UPDATE teams SET is_deleted = 1 WHERE team_id = ?";
  const values = [team_id];
  const [result] = await conn.execute(sql, values);
  if (result.affectedRows) {
    return true;
  } else {
    return false;
  }
}
