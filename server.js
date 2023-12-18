const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
require("dotenv").config();

const app = express();

app.use(express.json());

app.use(cors());

const port = process.env.PORT;

const db = mysql.createConnection(
  {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DBNAME,
  },
  console.log("connected to db")
);

app.get("/getall_user", (req, res) => {
  const sql = "SELECT * FROM user";
  db.query(sql, (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  });
});

app.post("/create_user", (req, res) => {
  const sql =
    "INSERT INTO user (`first_name`,`last_name`, `email_id`, `mobile_no`, `address_1`, `country`, `state`, `zip_code`) VALUES (?)";
  const values = [
    req.body.first_name,
    req.body.last_name,
    req.body.email_id,
    req.body.mobile_no,
    req.body.address_1,
    req.body.country,
    req.body.state,
    req.body.zip_code,
  ];

  db.query(sql, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.put("/update_user/:id", (req, res) => {
  const sql =
    "update user set `first_name`=?, `last_name`=?, `email_id`=?, `mobile_no`=?, `address_1`=?, `country`=?, `state`=?, `zip_code`=?  where ID=?";
  const values = [
    req.body.first_name,
    req.body.last_name,
    req.body.email_id,
    req.body.mobile_no,
    req.body.address_1,
    req.body.country,
    req.body.state,
    req.body.zip_code,
  ];

  const id = req.params.id;

  db.query(sql, [...values, id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.delete("/delete_user/:id", (req, res) => {
  const sql = "DELETE FROM user   WHERE ID = ?";
  const id = req.params.id;

  db.query(sql, [id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.listen(port, () => {
  console.log("listening", port);
});
