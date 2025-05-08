const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  const playlist = await prisma.playlist.findMany();
  res.json(playlist);
});

router.post("/create", async (req, res) => {
  const { name } = req.body;

  // check duplicate
  const existing = await prisma.playlist.findUnique({
    where: { name },
  });
  if (existing) {
    return res.status(400).json({
      message: "Duplicate playlist",
    });
  }

  const playlist = await prisma.playlist.create({
    data: req.body,
    include: {
      playlistSongs: {
        include: {
          song: true,
        },
      },
    },
  });

  res.json(playlist);
});

router.post("/add-music-by-id", async (req, res) => {
  const { playlistId, songId } = req.body;

  // check duplicate
  const existing = await prisma.playlistSong.findUnique({
    where: {
      playlistId_songId: {
        playlistId,
        songId,
      },
    },
  });
  if (existing) {
    return res.status(400).json({
      message: "Duplicate song",
    });
  }

  const data = {
    playlistId,
    songId,
  };
  const playlistSong = await prisma.playlistSong.create({
    data,
  });
  res.json(playlistSong);
});

router.get("/by-id", async (req, res) => {
  const id = parseInt(req.query.id);
  const playlist = await prisma.playlist.findUnique({
    where: { id },
    include: {
      playlistSongs: {
        include: {
          song: true,
        },
      },
    },
  });

  res.json(playlist);
});

module.exports = router;
