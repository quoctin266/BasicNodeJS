import getConnection from "../configs/connectDB";

let getUserpage = async (req, res) => {
  const searchValue = req.query.searchValue;
  const connection = await getConnection();
  let success = null;

  const [rows] = await connection.execute(
    "SELECT * FROM `users` where `firstName` like ?",
    ["%" + searchValue + "%"]
  );

  res.render("index.ejs", {
    data: rows,
    searchValue: searchValue,
    success: success,
  });
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

let deleteUser = async (req, res) => {
  let id = req.body.id;
  const searchValue = req.body.searchValue;

  const connection = await getConnection();
  await connection.execute("delete from `users` where id = ?", [id]);
  const [rows] = await connection.execute(
    "SELECT * FROM `users` where `firstName` like ?",
    ["%" + searchValue + "%"]
  );
  let success = "Delete user successfully";
  res.render("index.ejs", {
    data: rows,
    searchValue: searchValue,
    success: success,
  });
};

let getUpdatePage = async (req, res) => {
  let userId = req.params.userId;
  let searchValue = req.params.searchValue;

  const connection = await getConnection();
  const [row] = await connection.execute(
    "select * from `users` where `id` = ?",
    [userId]
  );

  const data = row[0];
  res.render("update.ejs", { data: data, searchValue: searchValue });
};

let postUpdateInfo = async (req, res) => {
  const { id, firstName, lastName, email, address, searchValue } = req.body;

  const connection = await getConnection();
  await connection.execute(
    "update `users` set firstName = ?, lastName = ?, email = ?, address = ? where id = ?",
    [firstName, lastName, email, address, id]
  );
  const [rows] = await connection.execute(
    "SELECT * FROM `users` where `firstName` like ?",
    ["%" + searchValue + "%"]
  );
  let success = "Update user successfully";
  res.render("index.ejs", {
    data: rows,
    searchValue: searchValue,
    success: success,
  });
};
module.exports = {
  getUserpage,
  getDetailpage,
  createNewUser,
  deleteUser,
  getUpdatePage,
  postUpdateInfo,
};
