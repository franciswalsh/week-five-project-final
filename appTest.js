const express = require('express');
const mustache = require('mustache-express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const session = require('express-session');
const data = require('./models/data.js')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(expressValidator());

app.use(session({
  // genid: function(req),
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

app.use(express.static(__dirname));
app.engine('mustache', mustache());
app.set('view engine', 'mustache');
app.set('views', './views');


app.get('/', function(req, res) {

  console.log(data.correctWord);

  if (req.session) {
    console.log("original", req.session);
    req.session.numberOfGuessesLeft = 8;
    req.session.correctWord = data.getRandomWord();
    req.session.correctGuessesArray = data.makeArrayOfEmptyCharactersSameLengthAsWord(req.session.correctWord);
    req.session.correctWordArray = data.convertWordToArrayOfCharacters(req.session.correctWord);
    req.session.guessesArray = [];
    // req.session.correctWord = data.correctWord;
    // req.session.correctGuessesArray = data.correctGuessesArray;
    // req.session.guessesArray = data.guessesArray;
    // req.session.correctWordArray = data.correctWordArray;
    console.log(data.correctWord);
    console.log("modified req.session: ", req.session);
    res.redirect('/theGame/');
  } else {
    res.send("we are communicating");
  }

});
app.get('/theGame/', function(req, res) {

  let bullshitArray = [req.session.numberOfGuessesLeft];

  res.render('theGame', {
    correctGuessesArray: req.session.correctGuessesArray,
    guessesArray: req.session.guessesArray,
    guessesLeft: req.session
  });
});
app.post('/theGame/', function(req, res) {

  let userGuess = req.body.userGuess.toLowerCase();
  req.checkBody("userGuess", "You must enter a guess").notEmpty();
  var errors = req.validationErrors();

  if (errors) {
    res.redirect('/blankEntry/');
  } else {
    if (userGuess.length > 1) {
      res.redirect('/tooManyCharacters/');
    } else if (data.testingForDuplicateInput(req, userGuess)) {
      res.redirect('/duplicateEntry');
    } else if (data.testingForLetter(req, userGuess)){
      res.redirect('/blankEntry/');
    } else {
      req.session.guessesArray.push(userGuess);
      data.isUserGuessCorrect(req, userGuess);
      let correctArray = data.correctGuessesArray;
      console.log("this is testing for letter: " + data.testingForLetter(req, userGuess));
      req.session.winner = data.didUserWin(req.session.correctGuessesArray);
      if (req.session.numberOfGuessesLeft <= 0) {
        data.whichLettersAreMissing(req);
        res.redirect('/youLose/');
      } else if (req.session.winner === true) {
        res.redirect('/youWin/');
      } else {
        console.log(req.session);
        res.redirect('/theGame/');
      }
      // res.redirect('/theGame/');
    }
  }
});
app.get('/youLose/', function(req, res) {
  res.render('youLoseTest', {
    correctWordWrapper: data.correctWordWrapper,
    correctGuessesArray: req.session.correctGuessesArray,
    guessesArray: req.session.guessesArray,
    guessesLeft: req.session
  });
});
app.get('/youWin/', function(req, res) {
  res.render('youWinTest', {
    correctWordWrapper: data.correctWordWrapper,
    correctGuessesArray: req.session.correctGuessesArray,
    guessesArray: req.session.guessesArray,
    guessesLeft: req.session
  });
});
app.get('/soreLoser/', function(req, res) {
  res.send('something went wrong');
});
app.post('/soreLoser/', function(req, res) {
  res.send("That's a bummer, but I hope you enjoy the rest of your day");
});
app.get('/playAgain/', function(req, res) {
  res.send('something went wrong');
});
app.post('/playAgain/', function(req, res) {
  console.log("during old game", req.session);
  req.session.destroy();
  console.log("starting new game", req.session);
  res.redirect('/');
});
app.get('/tooManyCharacters/', function(req, res) {
  res.render('moreThanOneCharacter');
});
app.post('/tooManyCharacters/', function(req, res) {
  res.redirect('/theGame/');
});
app.get('/duplicateEntry/', function(req, res) {
  res.render('duplicateEntry');
});
app.post('/duplicateEntry/', function(req, res) {
  res.redirect('/theGame/');
});
app.get('/blankEntry/', function(req, res) {
  res.render('blankEntry');
});
app.post('/blankEntry/', function(req, res) {
  res.redirect('/theGame/');
});
app.get('/blankEntry/', function(req, res) {
  res.render('blankEntry');
});
app.post('/blankEntry/', function(req, res) {
  res.redirect('/theGame/');
});
app.listen(3000, function() {
  console.log('Successfully started express application!');
});
