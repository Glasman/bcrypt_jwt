import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import { getUser } from "./db/users.js";

import { client } from "./db/client.js";
client.connect();

const app = express();
app.use(express.json());

// ✅ Correctly define __dirname in an ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Use `path.join()` to ensure cross-platform compatibility
app.use("/assets", express.static(path.join(__dirname, "dist/assets")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/index.html"));
});

app.post("/login", async(req, res) => {
  const { username, password } = req.body;
  const user = await getUser(username, password);
  res.send(user)
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
