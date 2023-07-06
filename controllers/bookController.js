const Book = require("../models/book");
const Author = require("../models/author");
const Genre = require("../models/genre");
const BookInstance = require("../models/bookinstance");

const asyncHandler = require("express-async-handler");

// Display detail page for a specific book.
exports.book_detail = asyncHandler(async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id)
      .populate("author genre")
      .exec();

    if (book === null) {
      // Kein Buch gefunden.
      const err = new Error("Buch nicht gefunden");
      err.status = 404;
      return next(err);
    }

    res.render("book_detail", {
      title: "Buchdetail",
      book: book,
    });
  } catch (err) {
    return next(err);
  }
});

exports.index = asyncHandler(async (req, res, next) => {
  // Details von Büchern, Buchinstanzen, Autoren und Genre-Zählungen holen (parallel)
  const [
    numBooks,
    numBookInstances,
    numAvailableBookInstances,
    numAuthors,
    numGenres,
  ] = await Promise.all([
    Book.countDocuments({}).exec(),
    BookInstance.countDocuments({}).exec(),
    BookInstance.countDocuments({ status: "Available" }).exec(),
    Author.countDocuments({}).exec(),
    Genre.countDocuments({}).exec(),
  ]);

  res.render("index", {
    title: "Local Library Home",
    book_count: numBooks,
    book_instance_count: numBookInstances,
    book_instance_available_count: numAvailableBookInstances,
    author_count: numAuthors,
    genre_count: numGenres,
  });
});

// Liste aller Bücher anzeigen.
exports.book_list = asyncHandler(async (req, res, next) => {
  const allBooks = await Book.find({}, "title author")
    .sort({ title: 1 })
    .populate("author")
    .exec();

  res.render("book_list", { title: "Buchliste", book_list: allBooks });
});

// Display book create form on GET.
exports.book_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Book create GET");
});

// Handle book create on POST.
exports.book_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Book create POST");
});

// Display book delete form on GET.
exports.book_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Book delete GET");
});

// Handle book delete on POST.
exports.book_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Book delete POST");
});

// Display book update form on GET.
exports.book_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Book update GET");
});

// Handle book update on POST.
exports.book_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Book update POST");
});
// Detailseite für ein bestimmtes Buch anzeigen.
exports.book_detail = asyncHandler(async (req, res, next) => {
    try {
      const [book, bookinstances] = await Promise.all([
        Book.findById(req.params.id).populate("author genre").exec(),
        BookInstance.find({ book: req.params.id }).exec(),
      ]);
  
      if (book === null) {
        // Kein Buch gefunden.
        const err = new Error("Buch nicht gefunden");
        err.status = 404;
        return next(err);
      }
  
      res.render("book_detail", {
        title: "Buchdetail",
        book: book,
        bookinstances: bookinstances,
      });
    } catch (err) {
      return next(err);
    }
  });
  