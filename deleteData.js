const mongoose = require("mongoose");
const Author = require("./models/author");
const Book = require("./models/book");
const BookInstance = require("./models/bookinstance");
const Genre = require("./models/genre");

const mongoDB = "mongodb+srv://flow:Mittra84@tut.jbmtwrs.mongodb.net/tut?retryWrites=true&w=majority";

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Alle Einträge in den Modellen löschen
Promise.all([
  Author.deleteMany({}),
  Book.deleteMany({}),
  BookInstance.deleteMany({}),
  Genre.deleteMany({})
])
  .then(() => {
    console.log("Alle Einträge erfolgreich gelöscht.");
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error("Fehler beim Löschen der Einträge:", err);
    mongoose.disconnect();
  });
