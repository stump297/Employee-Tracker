const express = require("express");
const { Pool } = require("pg");

const PORT = process.env.PORT || 3001;
const app = express();

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "employee_db",
  password: "",
});
