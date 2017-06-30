
// const possibleWordsArray = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");
// let guessesArray = [];
// let correctGuessesArray = [];
// let correctWordArray = [];
// let correctWord;
// let numberOfGuessesLeft = 8;

const fs = require('fs');

function getRandomWord(){
  const possibleWordsArray = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");
  let randomIndex = Math.floor(Math.random() * (possibleWordsArray.length+1));
  return possibleWordsArray[randomIndex];
}

function convertWordToArrayOfCharacters(word){
  let newArray = [];
  for (let i = 0; i < word.length; i++){
    newArray.push(word.charAt(i));
  }
  return newArray;
}
function makeArrayOfEmptyCharactersSameLengthAsWord(word){
  let newArray = [];
  for (let i = 0; i < word.length; i++){
    newArray.push({guess: '*'});
  }
  return newArray;
}
function isUserGuessCorrect(req, guess){
  let wasGuessCorrect = false;
  // for (let i = 0; i < correctWordArray.length; i++)
  for (guessed in req.session.correctWordArray){
    if (guess === req.session.correctWordArray[guessed]){
      // correctGuessesArray[guessed].guess = guess;
      req.session.correctGuessesArray[guessed].guess = guess;
      wasGuessCorrect = true;
    }
  }
  if (!wasGuessCorrect){
    req.session.numberOfGuessesLeft-=1;
  }
  // req.session.numberOfGuessesLeft = numberOfGuessesLeft;
  return;
}
function didUserWin(array){
  let counter = 0;
  for (let i in array){
    if (array[i].guess === '*'){
      counter++;
    }
  }
  if (counter === 0){
    return true;
  }
  else {
    return false;
  }
}

function testingForDuplicateInput(req, userGuess){
  let duplicate = false
  for (let i in req.session.guessesArray){
    if (req.session.guessesArray[i] === userGuess){
      duplicate = true;
    }
  }
  return duplicate;
}

function testingForLetter(req, userGuess){
  const alphabet = [ 'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z' ];
  let tester = true;
  for (let i in alphabet){
    if (userGuess === alphabet[i]){
      tester = false;
    }
  }
  return tester;
}
function whichLettersAreMissing(req){
  for (let i in req.session.correctGuessesArray){
    if (req.session.correctGuessesArray[i].guess === '*'){
      req.session.correctGuessesArray[i].guess = req.session.correctWordArray[i];
      req.session.correctGuessesArray[i].correct = false;
    }
    else {
      req.session.correctGuessesArray[i].correct = true;
    }
  }
  console.log(req.session.correctGuessesArray);
  return;
}

// correctWord = getRandomWord();
// let correctWordWrapper = [correctWord];
// correctGuessesArray = makeArrayOfEmptyCharactersSameLengthAsWord(correctWord);
// correctWordArray = convertWordToArrayOfCharacters(correctWord);

// let bullshitArray = [req.session.numberOfGuessesLeft]

module.exports = {
  isUserGuessCorrect: isUserGuessCorrect,
  didUserWin: didUserWin,
  getRandomWord: getRandomWord,
  makeArrayOfEmptyCharactersSameLengthAsWord: makeArrayOfEmptyCharactersSameLengthAsWord,
  convertWordToArrayOfCharacters: convertWordToArrayOfCharacters,
  testingForDuplicateInput: testingForDuplicateInput,
  testingForLetter: testingForLetter,
  whichLettersAreMissing: whichLettersAreMissing
  // possibleWordsArray: possibleWordsArray,
  // guessesArray: guessesArray,
  // correctWordArray: correctWordArray,
  // correctWord: correctWord,
  // correctGuessesArray: correctGuessesArray,
  // numberOfGuessesLeft: numberOfGuessesLeft,
  // correctWordWrapper: correctWordWrapper
  // bullshitArray: bullshitArray
}



// This code below works and the code above is a test-------------------------


// const fs = require('fs');
// const possibleWordsArray = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");
// let guessesArray = [];
// let correctGuessesArray = [];
// let correctWordArray = [];
// let correctWord;
// let numberOfGuessesLeft = 8;
//
//
// function getRandomWord(){
//   const possibleWordsArray = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");
//   let randomIndex = Math.floor(Math.random() * (possibleWordsArray.length+1));
//   return possibleWordsArray[randomIndex];
// }
//
// function convertWordToArrayOfCharacters(word){
//   let newArray = [];
//   for (let i = 0; i < word.length; i++){
//     newArray.push(word.charAt(i));
//   }
//   return newArray;
// }
// function makeArrayOfEmptyCharactersSameLengthAsWord(word){
//   let newArray = [];
//   for (let i = 0; i < word.length; i++){
//     newArray.push({guess: '*'});
//   }
//   return newArray;
// }
// function isUserGuessCorrect(req, guess){
//   let wasGuessCorrect = false;
//   // for (let i = 0; i < correctWordArray.length; i++)
//   for (guessed in correctWordArray){
//     if (guess === correctWordArray[guessed]){
//       correctGuessesArray[guessed].guess = guess;
//       wasGuessCorrect = true;
//     }
//   }
//   if (!wasGuessCorrect){
//     numberOfGuessesLeft-=1;
//   }
//   req.session.numberOfGuessesLeft = numberOfGuessesLeft;
//   return;
// }
// function didUserWin(array){
//   let counter = 0;
//   for (let i in array){
//     if (array[i].guess === '*'){
//       counter++;
//     }
//   }
//   if (counter === 0){
//     return true;
//   }
//   else {
//     return false;
//   }
// }
//
// function testingForDuplicateInput(userGuess){
//   let duplicate = false
//   for (let i in guessesArray){
//     if (guessesArray[i] === userGuess){
//       duplicate = true;
//     }
//   }
//   return duplicate;
// }
//
//
//
// correctWord = getRandomWord();
// let correctWordWrapper = [correctWord];
// correctGuessesArray = makeArrayOfEmptyCharactersSameLengthAsWord(correctWord);
// correctWordArray = convertWordToArrayOfCharacters(correctWord);
//
// // let bullshitArray = [req.session.numberOfGuessesLeft]
//
// module.exports = {
//   possibleWordsArray: possibleWordsArray,
//   guessesArray: guessesArray,
//   correctWordArray: correctWordArray,
//   correctWord: correctWord,
//   correctGuessesArray: correctGuessesArray,
//   isUserGuessCorrect: isUserGuessCorrect,
//   numberOfGuessesLeft: numberOfGuessesLeft,
//   didUserWin: didUserWin,
//   getRandomWord: getRandomWord,
//   makeArrayOfEmptyCharactersSameLengthAsWord: makeArrayOfEmptyCharactersSameLengthAsWord,
//   convertWordToArrayOfCharacters: convertWordToArrayOfCharacters,
//   testingForDuplicateInput: testingForDuplicateInput,
//   correctWordWrapper: correctWordWrapper
//   // bullshitArray: bullshitArray
// }
