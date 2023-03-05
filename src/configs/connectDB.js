import mysql from "mysql2/promise";

// create the connection to database
const getConnection = async () => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "nodejsbasic",
  });
  return connection;
};

export default getConnection;
