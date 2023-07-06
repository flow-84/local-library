const BookInstance = require("../models/bookinstance");
const asyncHandler = require("express-async-handler");

// Anzeige der Liste aller BookInstances.
exports.bookinstance_list = asyncHandler(async (req, res, next) => {
  const allBookInstances = await BookInstance.find().populate("book").exec();

  res.render("bookinstance_list", {
    title: "Liste der Buchinstanzen",
    bookinstance_list: allBookInstances,
  });
});

// Detailseite für eine bestimmte Buchinstanz anzeigen.
exports.bookinstance_detail = asyncHandler(async (req, res, next) => {
  const bookinstance = await BookInstance.findById(req.params.id).populate(
    "book"
  );

  if (bookinstance === null) {
    // Keine Buchinstanz gefunden.
    const err = new Error("Buchinstanz nicht gefunden");
    err.status = 404;
    return next(err);
  }

  res.render("bookinstance_detail", {
    title: "Buchinstanz-Detail",
    bookinstance: bookinstance,
  });
});

// Anzeigen des Buchinstanzen-Erstellungsformulars bei GET.
exports.bookinstance_create_get = asyncHandler(async (req, res, next) => {
  res.render("bookinstance_form", {
    title: "Erstelle Buchinstanz",
  });
});

// Behandlung des Buchinstanzen-Erstellens bei POST.
exports.bookinstance_create_post = asyncHandler(async (req, res, next) => {
  const bookinstance = new BookInstance({
    book: req.body.book,
    imprint: req.body.imprint,
    status: req.body.status,
    due_back: req.body.due_back,
  });

  try {
    const savedBookInstance = await bookinstance.save();
    res.redirect(savedBookInstance.url);
  } catch (err) {
    return next(err);
  }
});

// Anzeigen des Buchinstanzen-Löschformulars bei GET.
exports.bookinstance_delete_get = asyncHandler(async (req, res, next) => {
  const bookinstance = await BookInstance.findById(req.params.id).populate(
    "book"
  );

  if (bookinstance === null) {
    // Keine Buchinstanz gefunden.
    const err = new Error("Buchinstanz nicht gefunden");
    err.status = 404;
    return next(err);
  }

  res.render("bookinstance_delete", {
    title: "Lösche Buchinstanz",
    bookinstance: bookinstance,
  });
});

// Behandlung des Buchinstanzen-Löschens bei POST.
exports.bookinstance_delete_post = asyncHandler(async (req, res, next) => {
  await BookInstance.findByIdAndRemove(req.body.bookinstanceid).exec();
  res.redirect("/catalog/bookinstances");
});

// Anzeigen des Buchinstanzen-Aktualisierungsformulars bei GET.
exports.bookinstance_update_get = asyncHandler(async (req, res, next) => {
  const bookinstance = await BookInstance.findById(req.params.id).populate(
    "book"
  );

  if (bookinstance === null) {
    // Keine Buchinstanz gefunden.
    const err = new Error("Buchinstanz nicht gefunden");
    err.status = 404;
    return next(err);
  }

  res.render("bookinstance_form", {
    title: "Aktualisiere Buchinstanz",
    bookinstance: bookinstance,
  });
});

// Behandlung der Buchinstanzen-Aktualisierung bei POST.
exports.bookinstance_update_post = asyncHandler(async (req, res, next) => {
  const bookinstance = new BookInstance({
    _id: req.params.id,
    book: req.body.book,
    imprint: req.body.imprint,
    status: req.body.status,
    due_back: req.body.due_back,
  });

  try {
    await BookInstance.findByIdAndUpdate(
      req.params.id,
      bookinstance,
      {}
    ).exec();
    res.redirect(bookinstance.url);
  } catch (err) {
    return next(err);
  }
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
