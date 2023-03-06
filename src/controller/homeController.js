import getConnection from "../configs/connectDB";

let getUserpage = async (req, res) => {
  const searchValue = req.query.searchValue;

  const connection = await getConnection();

  const [rows] = await connection.execute(
    "SELECT * FROM `users` where `firstName` like ?",
    ["%" + searchValue + "%"]
  );

  res.render("index.ejs", { data: rows });
};

let getDetailpage = async (req, res) => {
  let userId = req.params.userId;

  const connection = await getConnection();

  const [row] = await connection.execute(
    "select * from `users` where `id` = ?",
    [userId]
  );

  const data = row[0];

  res.render("detail.ejs", { data: data });
};

let createNewUser = async (req, res) => {
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let email = req.body.email;
  let address = req.body.address;

  const connection = await getConnection();

  await connection.execute(
    "insert into users(firstName,lastName,email,address) values (?,?,?,?)",
    [firstName, lastName, email, address]
  );
  let success = "Create new user successfully";
  res.render("search.ejs", { success: success });
};
module.exports = {
  getUserpage,
  getDetailpage,
  createNewUser,
};
