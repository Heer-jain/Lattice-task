import mysql from "mysql2/promise"

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "JAIN@jain8",
  database: "event_booking",
});

export default pool