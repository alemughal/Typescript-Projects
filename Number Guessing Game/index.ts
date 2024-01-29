#!/usr/bin/env node

import inquirer from "inquirer";
import boxen from "boxen";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";

function startGame() {
  async function runGame() {
    const randomNumber = Math.floor(Math.random() * 10) + 1;

    // Display the greeting message
    const greetingMessage = boxen(
      chalk.blue.bold(`Welcome! My name is Ali`) +
        "\n" +
        chalk.magenta.bold(
          `Let's play a guessing game... \n I'm thinking of a number between 1 and 10. Can you guess it?`
        ) +
        "\n",
      { title: "Number Guessing Game", titleAlignment: "center", "textAlignment": "center", padding: 1, margin: 1, borderStyle: "double" }
    );

    // Start and stop the greeting animation after a duration
    const greetingAnimation = chalkAnimation.neon(greetingMessage);
    greetingAnimation.start();
    const greetingDuration = 1000;
    setTimeout(() => {
      greetingAnimation.stop();
    }, greetingDuration);

    // Display "Let's begin!" message
    const begin = chalkAnimation.rainbow("Let's begin!");
    begin.start();

    // Stop the begin animation after a duration
    const beginDuration = 1000;
    setTimeout(() => {
      begin.stop();
    }, beginDuration);

    // Prompt the user for their guess
    let isValidInput = false;
    let userGuess;

    while (!isValidInput) {
      const answers = await inquirer.prompt([
        {
          type: "input",
          name: "guessNumber",
          message: "What's your guess? ",
          validate: (input) => {
            const isNumber = /^\d+$/.test(input);
            if (isNumber) {
              isValidInput = true;
              userGuess = parseInt(input, 10);
              return true;
            } else {
              isValidInput = false;
              return "Please enter a valid number.";
            }
          },
        },
      ]);

      // Check the user's guess
      if (userGuess === randomNumber) {
        console.log(chalk.green.bold("You guessed it right! "));
        chalkAnimation.rainbow("Congratulations!"); // Rainbow animation
      } else {
        console.log(
          chalk.red.bold(`Sorry, try again!`)
        );
        console.log(chalk.yellow.bold("Better luck next time!")); // Static message
      }
    }

    // Display the random number
    console.log(
      boxen(
        chalk.yellow.bold(`Random Number was ${randomNumber}`),
        { padding: 1, margin: 1, borderStyle: "double" }
      )
    );

    // Ask the user if they want to play again
    const playAgainAnswer = await inquirer.prompt([
      {
        type: "confirm",
        name: "playAgain",
        message: "Do you want to play again?",
      },
    ]);

    if (playAgainAnswer.playAgain) {
      runGame(); // Restart the game
    } else {
      console.log(chalk.magenta("Thanks for playing! Goodbye."));
    }
  }

  // Start the game for the first time
  runGame();
}

// Start the game
startGame();
