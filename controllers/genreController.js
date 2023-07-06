const Genre = require("../models/genre");
const asyncHandler = require("express-async-handler");
const Book = require("../models/book");

exports.genre_list = async function (req, res) {
    try {
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
  
// Display Genre create form on GET.
exports.genre_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre create GET");
});

// Handle Genre create on POST.
exports.genre_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre create POST");
});

// Display Genre delete form on GET.
exports.genre_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre delete GET");
});

// Handle Genre delete on POST.
exports.genre_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre delete POST");
});

// Display Genre update form on GET.
exports.genre_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre update GET");
});

// Handle Genre update on POST.
exports.genre_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre update POST");
});