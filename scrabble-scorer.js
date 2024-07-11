// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system.

const input = require("readline-sync");

const oldPointStructure = {
  1: ["A", "E", "I", "O", "U", "L", "N", "R", "S", "T"],
  2: ["D", "G"],
  3: ["B", "C", "M", "P"],
  4: ["F", "H", "V", "W", "Y"],
  5: ["K"],
  8: ["J", "X"],
  10: ["Q", "Z"],
};

function oldScrabbleScorer(word) {
  word = word.toUpperCase();
  let letterPoints = "";

  for (let i = 0; i < word.length; i++) {
    for (const pointValue in oldPointStructure) {
      if (oldPointStructure[pointValue].includes(word[i])) {
        letterPoints += `Points for '${word[i]}': ${pointValue}\n`;
      }
    }
  }
  return letterPoints;
}

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
  console.log("Let's play some scrabble! Enter a word:");
  let wordEnteredByUser = input.question("Enter a word to score: ");
  console.log(oldScrabbleScorer(wordEnteredByUser));
  //let initialScore = oldScrabbleScorer(wordEnteredByUser);
  //console.log(initialScore);

  //return wordEnteredByUser;
}

let newPointStructure = transform(oldPointStructure);

let simpleScorer = function simpleScore(word) {
  word = word.toUpperCase();
  let letterScore = 0;
  for (let i = 0; i < word.length; i++) {
    letterScore = letterScore + 1;
  }
  return letterScore;
};

let vowelBonusScorer = function vowelBonusScore(word) {
  let letterScore = 0;
  for (let i = 0; i < word.length; i++) {
    if (
      word[i].toLowerCase() === "a" ||
      word[i].toLowerCase() === "e" ||
      word[i].toLowerCase() === "i" ||
      word[i].toLowerCase() === "o" ||
      word[i].toLowerCase() === "u"
    ) {
      letterScore += 3;
    } else {
      letterScore += 1;
    }
  }
  return letterScore;
};

let scrabbleScorer = function oldScrabbleScorer(word) {
  word = word.toUpperCase();
  let letterPoints = "";

  for (let i = 0; i < word.length; i++) {
    for (const pointValue in oldPointStructure) {
      if (oldPointStructure[pointValue].includes(word[i])) {
        letterPoints += `Points for '${word[i]}': ${pointValue}\n`;
      }
    }
  }
  return letterPoints;
};

const scoringAlgorithms = [
  {
    name: "Simple Score",
    description: "Each letter is worth 1 point",
    scoringFunction: simpleScorer,
  },
  {
    name: "Vowel Bonus Score",
    description: "Vowels are 3 pts, consonants are 1 pt.",
    scoringFunction: vowelBonusScorer,
  },
  {
    name: "Scrabble Score",
    description: "The traditional scoring algorithm.",
    scoringFunction: oldScrabbleScorer,
  },
];

function scorerPrompt() {
  console.log("Which scoring algorithm would you like to use? ");
  for (let i = 0; i < scoringAlgorithms.length; i++) {
    console.log(
      `${i} : ${scoringAlgorithms[i].name} - ${scoringAlgorithms[i].description}`
    );
  }
  let userChoiceAlgorithm = input.question("Enter a number from 0 to 2: ");
  while (
    Number(userChoiceAlgorithm) < 0 ||
    Number(userChoiceAlgorithm) >= 3 ||
    isNaN(userChoiceAlgorithm)
  ) {
    userChoiceAlgorithm = input.question(
      "Invalid Number: Please choose a number from 0 - 2: "
    );
  }
  //return scoringAlgorithms[Number(userChoiceAlgorithm)];
  console.log();
  let wordToCalculate = input.question("Enter a word to be scored:  ");
  let wordScore =
    scoringAlgorithms[userChoiceAlgorithm].scoringFunction(wordToCalculate);
  console.log(`Score for ${wordToCalculate} is ${wordScore}`);
}

function transform(oldPointStructure) {
  let newPtStructureObject = {};
  for (let key in oldPointStructure) {
    for (let i = 0; i < oldPointStructure[key].length; i++) {
      newPtStructureObject[oldPointStructure[key][i].toLowerCase()] =
        Number(key);
    }
  }

  return newPtStructureObject;
}

function runProgram(scoringAlgorithms) {
  //initialPrompt();
  //let scoringAlgorithmNumber = scorerPrompt();
  scorerPrompt();
  //console.log();
  //let wordToCalculate = input.question("Enter a word to be scored:  ");
  // let wordScore = scoringAlgorithmNumber.scoringFunction(wordToCalculate);
  //console.log(`Score for ${wordToCalculate} is ${wordScore}`);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
  initialPrompt: initialPrompt,
  transform: transform,
  oldPointStructure: oldPointStructure,
  simpleScorer: simpleScorer,
  vowelBonusScorer: vowelBonusScorer,
  scrabbleScorer: scrabbleScorer,
  scoringAlgorithms: scoringAlgorithms,
  newPointStructure: newPointStructure,
  runProgram: runProgram,
  scorerPrompt: scorerPrompt,
};
