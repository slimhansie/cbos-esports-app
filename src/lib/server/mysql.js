import { env } from "$env/dynamic/private";
import mysql from "mysql2/promise";

const MYSQL_HOST = env.MYSQL_HOST;
const MYSQL_USER = env.MYSQL_USER;
const MYSQL_PASSWORD = env.MYSQL_PASSWORD;
const MYSQL_DATABASE = env.MYSQL_DATABASE;

let mysqlconn = null;

export function mysql_connection() {
  if (mysqlconn) {
    return mysqlconn;
  }
  mysqlconn = mysql.createConnection({
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE,
  });
  return mysqlconn;
}
