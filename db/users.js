import { client } from "./client.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const createUser = async (username, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 5);
    console.log(hashedPassword);
    await client.query(`
        INSERT INTO users (username, password)
        VALUES ('${username}', '${hashedPassword}');
        `);
  } catch (error) {}
};

const getUser = async (username, password) => {
  try {
    const {
      rows: [user],
    } = await client.query(`
            SELECT id, username FROM users
            WHERE username='${username}' AND password='${password}'
            `);

    if (user) {
      const assignedToken = jwt.sign(
        { id: user.id, username: user.username },
        "secret"
      );
      return assignedToken;
    } else {
      const error = new Error("bad credentials");
      error.status = 401;
      throw error;
    }
  } catch (err) {
    const error = new Error("bad credentials");
    error.status = 401;
    throw error;
  }
};

const getUserByToken = async (token) => {
  try {
    const myToken = jwt.verify(token, "secret");
    const {
      rows: [user],
    } = await client.query(`
      SELECT id, username FROM users
      WHERE id='${myToken.id}' AND username='${myToken.username}'
      `);
    return user;
  } catch (err) {
    console.log(err);
  }
};

export { createUser, getUser, getUserByToken };
