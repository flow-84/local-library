var express = require('express');
var router = express.Router();

// GET home page.
router.get("/", function (req, res) {
  res.redirect("/catalog");
});

// Require controller modules.
var genre_controller = require('../controllers/genreController');

// GET request for genre list.
router.get('/genres', genre_controller.genre_list);

// GET request for genre detail.
router.get('/genres/:id', genre_controller.genre_detail);

// Require controller modules.
var book_controller = require('../controllers/bookController');

// GET request for book list.
router.get('/books', book_controller.book_list);

// GET request for book detail.
router.get('/books/:id', book_controller.book_detail);

module.exports = router;
