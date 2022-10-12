const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const db = require("./db/db.json");
const app = express();
const fs = require("fs");

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/apiNotes.js"))
);

app.get("/api/notes", (req, res) => {
  res.json(db);
});

app.post("/api/notes", (req, res) => {
  db.push(req.body);
  fs.writeFileSync("./db/db.json", JSON.stringify(db));
  res.json(db);
});

// app.delete("/api/notes", (req, res) =>{
//   res.json(db);
// })

app.listen(PORT, () =>
  console.log("listening on port http://localhost:" + PORT)
);
