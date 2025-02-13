import { client } from "./client.js";
import { createUser } from "./users.js";
import bcrypt from "bcrypt";

async function createTables() {
  try {
    await client.query(`
           CREATE TABLE users (
           id SERIAL PRIMARY KEY,
           username VARCHAR(30) UNIQUE NOT NULL,
           password VARCHAR(60) NOT NULL
           );
            `);
  } catch (error) {
    console.log(error);
  }
}

const dropTables = async () => {
  try {
    await client.query(`
            DROP TABLE IF EXISTS users`);
  } catch (error) {
    console.log(error);
  }
};

const syncAndSeed = async () => {
  try {
    await client.connect();
    console.log("CONNECTED TO DB!");

    await dropTables();
    console.log("TABLES DROPPED");

    await createTables();
    console.log("TABLES CREATED");

    await createUser("curly", "curly");
    await createUser("moe", "moe");
    await createUser("larry", "larry");
    console.log("homies added");
    client.end();
  } catch (error) {
    console.log(error);
  }
};

syncAndSeed();
