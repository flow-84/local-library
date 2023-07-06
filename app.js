var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("mongoose");

var app = express();

// Konfigurieren Sie die pug-Template-Engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Importieren des Mongoose-Moduls
// Setzen von `strictQuery: false`, um global die Filterung von Eigenschaften zu ermöglichen, die nicht im Schema vorhanden sind
// Hinzugefügt, um vorbereitende Warnungen für Mongoose 7 zu entfernen.
// Siehe: https://mongoosejs.com/docs/migrating_to_6.html#strictquery-is-removed-and-replaced-by-strict
mongoose.set("strictQuery", false);

// Definieren der Datenbank-URL, zu der eine Verbindung hergestellt werden soll.
const mongoDB = "mongodb+srv://flow:Mittra84@tut.jbmtwrs.mongodb.net/tut?retryWrites=true&w=majority";

// Auf Verbindung zur Datenbank warten und bei Problemen einen Fehler protokollieren
async function main() {
  try {
    await mongoose.connect(mongoDB);
    console.log('Verbindung zur Datenbank hergestellt');
  } catch (error) {
    console.error('Fehler beim Verbinden zur Datenbank:', error);
  }
}
main().catch((err) => console.log(err));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Fügen Sie Ihre Routen und andere Konfigurationen hinzu
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const catalogRouter = require("./routes/catalog"); //Import routes for "catalog" area of site

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/catalog', catalogRouter); // Add catalog routes to middleware chain.

// Starten Sie den Server
app.listen(5000, () => {
  console.log('Server gestartet auf Port 5000');
});

module.exports = app;
