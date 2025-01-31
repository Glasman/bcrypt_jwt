import { client } from "./client.js";

async function createTables() {
  try {
    await client.query(`
           CREATE TABLE users (
           id SERIAL PRIMARY KEY,
           username VARCHAR(30) UNIQUE NOT NULL,
           password VARCHAR(30) NOT NULL
           );
            `);
  } catch (error) {
    console.log(error);
  }
}

const dropTables = async() => {
    try {
        
    } catch (error) {
        console.log(error)
    }
}

const syncAndSeed = async () => {
  try {
    await client.connect();
    console.log("CONNECTED TO DB!");

    await dropTables();
    console.log('TABLES DROPPED')

    await createTables();
    console.log("TABLES CREATED");
  } catch (error) {
    console.log(error);
  }
};

syncAndSeed();