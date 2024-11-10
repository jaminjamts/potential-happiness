import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
config();

const server = express();
const PORT = 5678;
const sql = neon(`${process.env.DATABASE_URL}`);
server.use(cors());
server.use(bodyParser.json());

server.get("/", (_, res) => {
  res.send("worked");
});

server.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existEmail = await sql`SELECT * FROM users WHERE email=${email}`;
    if (existEmail.length > 0) {
      return res
        .status(400)
        .json({ success: false, message: "burtgeltei email baina" });
    }
    const response = await sql`INSERT INTO users(name, email,password) 
      VALUES(${name}, ${email}, ${password});`;
    res.status(201).json({ success: true });
  } catch (error) {
    throw new error();
  }
});

server.post("/signin", async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await sql`SELECT * FROM users WHERE name = ${name}`;
    if (user.length === 0) {
      return res
        .status(200)
        .json({ success: false, message: "user not exist" });
    }

    if (user[0].password === password) {
      res.status(200).json({ success: true, user: user });
    } else {
      return res
        .status(200)
        .json({ success: false, message: "password is incorrect" });
    }
  } catch (error) {
    throw new error();
  }
});

server.get("/user", async (req, res) => {
  const userID = req.query.userID;
  try {
    res.status(200).send("server is worked");
  } catch (error) {
    throw new error();
  }
});

server.listen(PORT, () => {
  console.log("server is working");
});
