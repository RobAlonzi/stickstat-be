import mysql, { Query, OkPacket, format } from 'mysql';

const connection = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

export default connection;
export { format };
export type { Query, OkPacket };