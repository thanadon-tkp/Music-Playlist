const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const initSongs = async () => {
  const count = await prisma.song.count();
  if (count > 0) return;

  const fs = require("fs");
  const rawData = fs.readFileSync("./songs.json", "utf8");
  const songs = JSON.parse(rawData);

  for (const song of songs) {
    song.releaseDate = new Date(song.releaseDate);
    await prisma.song.create({ data: song });
  }
};

initSongs();

module.exports = initSongs;
