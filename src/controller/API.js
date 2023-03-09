import getConnection from "../configs/connectDB";

let getUserpage = async (req, res) => {
  const searchValue = req.query.searchValue;
  const connection = await getConnection();
  let success = null;

  const [rows] = await connection.execute(
    "SELECT * FROM `users` where `firstName` like ?",
    ["%" + searchValue + "%"]
  );

  res.status(200).json({
    data: rows,
  });
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

  res.status(200).json({
    data: "created new",
  });
};

let deleteUser = async (req, res) => {
  let id = req.body.id;

  const connection = await getConnection();

  await connection.execute("delete from `users` where id = ?", [id]);

  res.status(200).json({
    mess: "deleted user",
  });
};

let updateInfo = async (req, res) => {
  const { id, firstName, lastName, email, address } = req.body;

  const connection = await getConnection();
  await connection.execute(
    "update `users` set firstName = ?, lastName = ?, email = ?, address = ? where id = ?",
    [firstName, lastName, email, address, id]
  );

  res.status(200).json({
    mess: "updated user",
  });
};

module.exports = {
  getUserpage,
  createNewUser,
  deleteUser,
  updateInfo,
  // postUpdateInfo,
};
