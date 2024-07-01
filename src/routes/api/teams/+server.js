import { mysql_connection } from "$lib/server/mysql";
import { error } from "@sveltejs/kit";

export async function POST({ request }) {
  const mysqlconn = await mysql_connection();
  const payload = await request.json();
  const { title } = payload;

  if (!title) {
    error(400, {
      message: "Title is required",
    });
  }

  let is_created = await create_team(mysqlconn, title);
  if (!is_created) {
    error(500, {
      message: "Create failed",
    });
  }
  return new Response({}, { status: 200 });
}

async function create_team(conn, title) {
  const sql = "INSERT INTO `teams`(`title`) VALUES (?)";
  const values = [title];
  const [result] = await conn.execute(sql, values);
  if (result.insertId) {
    return true;
  } else {
    return false;
  }
}
