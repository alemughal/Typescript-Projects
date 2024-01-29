#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";


// Function to display the ATM interface
const displayATMInterface = () => {
    console.log(chalk.blue(`
     _____________________
    /                     \\
    |  ___________________  |
    | |                   | |
    | |   1. Withdraw     | |
    | |   2. Deposit      | |
    | |   3. Balance      | |
    | |   4. Transfer     | |
    | |___________________| |
    |  ________   ________  |
    | |        | |        | |
    | |   [ ]  | |  [ ]   | |
    | |  Card  | |Receipt | |
    | |________| |________| |
    \\_____________________/
    `));
};

// Interface for user input
interface IAnswer {
    userId: string;
    userPin: number;
    accountType: string;
    transactionType: string;
    amount: number;
    destinationUserId?: string; // Added for Transfer
}

// Validation functions
const validateUserId = (input: string) => {
    return input.trim() !== "" ? true : "User ID cannot be empty";
};

const validateUserPin = (input: number) => {
    return Number.isInteger(input) && input >= 1000 && input <= 9999
        ? true
        : "User PIN must be a 4-digit number";
};

const validateAmount = (input: number) => {
    return Number.isInteger(input) && input > 0 ? true : "Amount must be a positive integer";
};

const validateDestinationUserId = (input: string) => {
    return input.trim() !== "" ? true : "Destination User ID cannot be empty";
};

// Prompt user for input
const promptUser = async () => {
    const answers: IAnswer = await inquirer.prompt([
        {
            name: "userId",
            message: "Enter your user id",
            type: "input",
            validate: validateUserId,
        },
        {
            name: "userPin",
            message: "Enter your user pin",
            type: "number",
            validate: validateUserPin,
        },
        {
            name: "accountType",
            message: "Select your account type",
            type: "list",
            choices: ["Savings", "Current"],
        },
        {
            name: "transactionType",
            message: "Select your transaction type",
            type: "list",
            choices: ["Fast Cash", "Withdraw", "Deposit", "Transfer", "Balance"],
        },
        {
            name: "amount",
            type: "list",
            message: "Select your amount",
            choices: [1000, 2000, 3000, 5000, 10000],
            when(answers: IAnswer) {
                return answers.transactionType === "Fast Cash";
            },
        },
        {
            name: "amount",
            message: "Enter your amount",
            type: "number",
            validate: validateAmount,
            when(answers: IAnswer) {
                return answers.transactionType === "Withdraw" || answers.transactionType === "Deposit" || answers.transactionType === "Transfer";
            },
        },
        {
            name: "destinationUserId", // Added for Transfer
            message: "Enter the destination user id",
            type: "input",
            validate: validateDestinationUserId,
            when(answers: IAnswer) {
                return answers.transactionType === "Transfer";
            },
        },
    ]);

    // Check if user ID and PIN are valid
    if (answers.userId && answers.userPin) {
        // Simulate ATM interface
        displayATMInterface();

        // Simulate account balance
        let balance = Math.floor(Math.random() * 1000000);
        console.log(chalk.green(`Your account balance is ${balance}`));

        // Perform transaction based on user input
        switch (answers.transactionType) {
            case "Withdraw":
                // Simulate withdrawal logic
                const withdrawalAmount = answers.amount;
                // Update balance after withdrawal
                balance -= withdrawalAmount;
                console.log(chalk.blue(`Remaining balance after withdrawal: ${balance}`));
                break;
            case "Deposit":
                // Simulate deposit logic
                const depositAmount = answers.amount;
                // Update balance after deposit
                balance += depositAmount;
                console.log(chalk.green(`Remaining balance after deposit: ${balance}`));
                break;
            case "Transfer":
                // Simulate transfer logic
                const transferAmount = answers.amount;
                // Update balance after transfer
                balance -= transferAmount;
                console.log(chalk.bgCyanBright(`Remaining balance after transfer: ${balance}`));
                break;
            case "Balance":
                // Display balance without performing any transaction
                console.log(chalk.blue(`Your account balance is ${balance}`));
                break;
            // Handle
            // Handle additional transaction types here
            // ...
        }
    } else {
        // Clear user input and prompt again
        console.clear();
        console.log(chalk.red("Invalid user ID or PIN. Please try again."));
        await promptUser();
    }
};

// Initial prompt to start the process
promptUser();
