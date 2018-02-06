// ====== GAME FUNCTIONS ======
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

module.exports = interface();