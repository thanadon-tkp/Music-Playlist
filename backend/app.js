const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const init = require("./init");
const songsRouter = require("./routes/songs");
const playlistRouter = require("./routes/playlist");

const port = 4000;

app.use("/api/songs", songsRouter);
app.use("/api/playlist", playlistRouter);

// health check
app.get("/health", (req, res) => {
  res.send("OK");
});

init;

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
