import getConnection from "../configs/connectDB";

let getHomepage = async (req, res) => {
  const connection = await getConnection();

  const [rows] = await connection.execute("SELECT * FROM `users`");

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

module.exports = {
  getHomepage,
  getDetailpage,
};
