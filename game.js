// Store Word
const Word = require('./word.js');

// Movie Title Array
var wordArr = ["fargo", "jaws", "alien", "goodfellas", "blade", "magnolia", "chinatown", "manhattan"];
// Select Random
class Game {
	constructor(wordArray) {
		this.wordArray = wordArray;
	}
	randomWord() {
		return this.wordArray[Math.floor(Math.random() * this.wordArray.length + 1) - 1];
	}
}
/////////////////////////////////////////////////
var inquirer = require('inquirer');
var wins = 0;
var losses = 0;
var userGuess;
var guessesRemaining = 15;
var lettersGuessed = [];
var game = new Game(wordArr);
var generatedWord = game.randomWord();
var word = new Word(generatedWord);
var index = wordArr.indexOf(generatedWord);

//console interface
function interface() {
	console.log('\033c');
	console.log('\n')
	console.log("~ WELCOME TO THE THUNDERDOM!!! ~");
	console.log(" This is classic movie Hangman " + "\n");
	console.log("Movie Title: " + word.displayWord() + "\n");
	console.log("Guesses remaining: " + guessesRemaining)
	console.log("Letters Guessed: " + lettersGuessed.join(" ") + "\n");
	console.log("Wins: " + wins);
	console.log("Losses: " + losses);
}

function gameReset() {
	index = "";
	game = new Game(wordArr);
	generatedWord = game.randomWord();
	word = new Word(generatedWord);
	index = wordArr.indexOf(generatedWord);
	lettersGuessed = [];
	guessesRemaining = 10;
	interface();
	guess();
}

function correctWord() {
	if (word.roundFinished()) {
		if (index != -1) {
			wordArr.splice(index, 1);
		}
		if (wordArr.length === 0) {
			console.log("\nYippiekiyay mother fucker! You guessed every word!\n");
			return;
		}
		wins += 1;
		inquirer.prompt([{
			name: "replay",
			message: "Luck guess... Next round? (Y/N)",
			type: "input",
			validate: function (input) {
				if (input === 'Y' || input === 'y' || input === 'n' || input === 'N') {
					return true;
				} else {
					return false;
				}
			}
		}]).then(function (answers) {
			if (answers.replay === 'Y' || answers.replay === 'y') {
				gameReset();
			} else {
				console.log("That'll do, pig... That'll do.!");
			}
		});
		return;
	}
	guess();
}

// Logic
function incorrectWord() {
	losses += 1;
	inquirer.prompt([{
		name: "playagain",
		message: "Game Over, Man! Game Over! Try again? (Y/N)",
		type: "input",
		validate: function (input) {
			if (input === 'Y' || input === 'y' || input === 'n' || input === 'N') {
				return true;
			} else {
				return false;
			}
		}
	}]).then(function (answers) {
		if (answers.playagain === 'Y' || answers.playagain === 'y') {
			gameReset();

		} else {

			console.log("You'll be back, they always come crawling back...");
		}
	});

}
//interface(); Start Game moved to main.js
// Start game with inquirer
function guess() {
	// Letter input prompt
	inquirer.prompt([{
		name: "guess",
		message: "Guess a letter",
		type: "input",
		validate: function (input) {
			if (input.match(/[A-Za-z]+/)) {
				return true;
			} else {
				return false;
			}
		}
	}]).then(function (answers) {
		userGuess = answers.guess;
		if (guessesRemaining > 1) {
			word.playerGuess(userGuess);
			if (lettersGuessed.indexOf(userGuess) === -1) {
				lettersGuessed.push(userGuess);
				guessesRemaining -= 1;
			}

			interface();
			correctWord();
		} else {
			incorrectWord();
		}
	});
}
// guess(); - moved to main.js
///////////////////////////
module.exports = {
	interface,
	guess,
}