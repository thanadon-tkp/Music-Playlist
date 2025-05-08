const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  const songs = await prisma.song.findMany();
  res.json(songs);
});

router.post("/create", async (req, res) => {
  const { name, artist, album, genre, imageUrl, duration, releaseDate } =
    req.body;
  const data = {
    name,
    artist,
    album,
    genre,
    imageUrl,
    duration,
    releaseDate,
  };
  const song = await prisma.song.create({ data });
  res.json(song);
});

module.exports = router;
