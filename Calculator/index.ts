#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";

const sleep = () => {
    return new Promise((resolve) => {
        setTimeout(resolve, 2000);
    });
};

async function Welcome() {
    let rainbowTitle = chalkAnimation.rainbow("Let's Start Calculation");
    await sleep();
    rainbowTitle.stop();
    console.log(chalk.blue.bold(
     `_____________________
     |  _________________  |
     | | JO           0. | |
     | |_________________| |
     |  ___ ___ ___   ___  |
     | | 7 | 8 | 9 | | + | |
     | |___|___|___| |___| |
     | | 4 | 5 | 6 | | - | |
     | |___|___|___| |___| |
     | | 1 | 2 | 3 | | x | |
     | |___|___|___| |___| |
     | | . | 0 | = | | / | |
     | |___|___|___| |___| |
     |_____________________|`));
}

await Welcome();

async function askQuestion() {
    await inquirer.prompt([
        {
            type: "list",
            name: "operator",
            message: "Which Operation you want to perform? \n: ",
            choices: ["Addition", "Subtraction", "Multiplication", "Division"]
        },
        {
            type: "input",
            name: "num1",
            message: "Enter your first number: ",
            validate: (value) => {
                const valid = !isNaN(parseFloat(value));
                return valid || 'Please enter a valid number.';
            }
        },
        {
            type: "input",
            name: "num2",
            message: "Enter your second number: ",
            validate: (value) => {
                const valid = !isNaN(parseFloat(value));
                return valid || 'Please enter a valid number.';
            }
        },
    ]).then((answers) => {
        const num1 = parseFloat(answers.num1);
        const num2 = parseFloat(answers.num2);

        if (answers.operator === "Addition") {
            console.log(chalk.green(`Result: ${num1} ${chalk.bold('+')} ${num2} = ${num1 + num2}`));
        } else if (answers.operator === "Subtraction") {
            console.log(chalk.green(`Result: ${num1} ${chalk.bold('-')} ${num2} = ${num1 - num2}`));
        } else if (answers.operator === "Multiplication") {
            console.log(chalk.green(`Result: ${num1} ${chalk.bold('x')} ${num2} = ${num1 * num2}`));
        } else if (answers.operator === "Division") {
            if (num2 === 0) {
                console.log(chalk.red('Error: Cannot divide by zero.'));
            } else {
                console.log(chalk.green(`Result: ${num1} ${chalk.bold('/')} ${num2} = ${num1 / num2}`));
            }
        }
    });
}

async function askAgain() {
    do {
        await askQuestion();
        var again = await inquirer.prompt([
            {
                type: "input",
                name: "restart",
                message: chalk.yellow("Do you want to perform another operation? ")
            }
        ]);
    } while (again.restart.toLowerCase() === "yes" || again.restart.toLowerCase() === "y");
}

askAgain();