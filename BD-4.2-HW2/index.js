let express = require("express");
let app = express();
let port = 3000;
let db;
let sqlite3 = require("sqlite3");
let { open } = require("sqlite");
app.listen(port, () => {
  console.log(`The Server is running on port: ${port}`);
});
// Connect to SQLite database
(async () => {
  try {
    db = await open({
      filename: "./BD-4.2-HW2/tracks_database.sqlite",
      driver: sqlite3.Database,
    });
    console.log("Connected to the SQLite database.");
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
  }
})();
//Message
app.get("/", (req, res) => {
  res.status(200).json({ message: "BD 4.2 HW2 Error Handling" });
});
// THE ENPOINTS
//1 /tracks
async function getAllTracks(db) {
  try {
    let query = "SELECT * FROM tracks";
    let response = await db.all(query, []);
    return { tracks: response };
  } catch (error) {
    console.error("Error executing query:", error.message);
    return { error: error.message };
  }
}
app.get("/tracks", async (req, res) => {
  try {
    let result = await getAllTracks(db);
    if (result.tracks.length === 0) {
      return res.status(404).json({ message: "No tracks found." });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
//2 /tracks/artist/Arijit%20Singh
async function getTracksByArtist(artist) {
  let query = "SELECT * FROM tracks WHERE artist = ?";
  let response = await db.all(query, [artist]);
  return { tracks: response };
}
app.get("/tracks/artist/:artist", async (req, res) => {
  try {
    let artist = req.params.artist;
    let result = await getTracksByArtist(artist);
    if (result.tracks.length === 0) {
      return res.status(404).json({ message: "No tracks found for the artist." });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
//3 /tracks/genre/Romantic
async function getTracksByGenre(genre) {
  let query = "SELECT * FROM tracks WHERE genre = ?";
  let response = await db.all(query, [genre]);
  return { tracks: response };
}
app.get("/tracks/genre/:genre", async (req, res) => {
  try {
    let genre = req.params.genre;
    let result = await getTracksByGenre(genre);
    if (result.tracks.length === 0) {
      return res.status(404).json({ message: "No tracks found for the genre." });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
//4 /tracks/release_year/2012
async function getTracksByReleaseYear(releaseYear) {
  let query = "SELECT * FROM tracks WHERE release_year = ?";
  let response = await db.all(query, [releaseYear]);
  return { tracks: response };
}
app.get("/tracks/release_year/:releaseYear", async (req, res) => {
  try {
    let releaseYear = req.params.releaseYear;
    let result = await getTracksByReleaseYear(releaseYear);
    if (result.tracks.length === 0) {
      return res.status(404).json({ message: "No tracks found for the release year." });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});