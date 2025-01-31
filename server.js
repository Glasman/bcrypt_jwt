// // const express = require('express')
// import express from "express";
// import { fileURLToPath } from "url";
// import path from "path";
// const app = express();

// // const __filename = fileURLToPath(import.meta.url);
// // const __dirname = path.dirname(__filename);

// app.use('/assets', express.static(__dirname + '/dist/assets'))

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });

// const PORT = 3000;
// app.listen(PORT, () => console.log(`listening on port ${PORT}`));

import express from "express";
import { fileURLToPath } from "url";
import path from "path";

const app = express();

// ✅ Correctly define __dirname in an ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Use `path.join()` to ensure cross-platform compatibility
app.use("/assets", express.static(path.join(__dirname, "dist/assets")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/index.html"));
});

app.get("/login", (req, res) => {
  console.log('checking if user is in db')
  res.send({ value: "Logging in" });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
