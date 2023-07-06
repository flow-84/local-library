const Genre = require("../models/genre");
const asyncHandler = require("express-async-handler");
const Book = require("../models/book");

exports.genre_list = async function (req, res) {
  try {
    // Genres abrufen und auf Duplikate überprüfen
    const genres = await Genre.find().exec();
    const duplicateGenres = [];

    // Überprüfen auf doppelte Genres
    genres.forEach((genre, index) => {
      const duplicateIndex = genres.findIndex((g, i) => g.name === genre.name && i !== index);
      if (duplicateIndex !== -1) {
        duplicateGenres.push(genre);
      }
    });

    // Duplikate entfernen
    duplicateGenres.forEach(async (genre) => {
      await Genre.findByIdAndRemove(genre._id).exec();
    });

    // Genre-Liste abrufen und rendern
    const genre_list = await Genre.find().sort("name").exec();
    res.render("genre_list", { title: "Genre List", genre_list });
  } catch (err) {
    return next(err);
  }
};

// Detailseite für ein bestimmtes Genre anzeigen.
exports.genre_detail = asyncHandler(async (req, res, next) => {
  // Details des Genres und aller zugehörigen Bücher (parallel) abrufen
  const [genre, booksInGenre] = await Promise.all([
    Genre.findById(req.params.id).exec(),
    Book.find({ genre: req.params.id }, "title summary").exec(),
  ]);
  if (genre === null) {
    // Keine Ergebnisse.
    const err = new Error("Genre nicht gefunden");
    err.status = 404;
    return next(err);
  }

  res.render("genre_detail", {
    title: "Genre Detail",
    genre: genre,
    genre_books: booksInGenre,
  });
});

// Weitere Genre-Funktionen...
