#!/usr/bin/env node
import axios from "axios";
import inquirer from 'inquirer';
import chalk from "chalk";
import boxen from "boxen";
import chalkAnimation from "chalk-animation";
const currencies = [
    "AUD",
    "BGN",
    "BRL",
    "CAD",
    "CHF",
    "CNY",
    "CZK",
    "DKK",
    "EUR",
    "GBP",
    "HKD",
    "HUF",
    "IDR",
    "ILS",
    "INR",
    "ISK",
    "JPY",
    "KRW",
    "MXN",
    "MYR",
    "NOK",
    "NZD",
    "PHP",
    "PLN",
    "RON",
    "SEK",
    "SGD",
    "THB",
    "TRY",
    "USD",
    "ZAR"
];
async function welcomeAnimation() {
    const startingAnimation = chalkAnimation.neon(boxen(`Currency\nConverter\nProject\nBy\nAli Mughal`, {
        title: "Currency Converter",
        titleAlignment: "center",
        textAlignment: "center",
        borderStyle: "double",
        borderColor: "magenta",
    }));
    await new Promise((resolve) => setTimeout(resolve, 3000));
    startingAnimation.stop();
}
const questions = [
    {
        type: "list",
        name: "from",
        message: "Convert From: ",
        choices: currencies,
    },
    {
        type: "list",
        name: "to",
        message: "Convert To: ",
        choices: currencies,
    },
    {
        type: "number",
        name: "amount",
        message: "Amount to Convert: ",
        validate: (value) => {
            if (!isNaN(value)) {
                return true;
            }
            return "Please enter a valid number";
        },
    },
];
const convertCurrency = async (from, to, amount) => {
    const response = await axios.get(`https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`);
    const result = response.data.rates[to];
    return result.toFixed(2);
};
const run = async () => {
    console.log(chalk.blue.bold("💰 Currency Converter"));
    const answers = await inquirer.prompt(questions);
    const { from, to, amount } = answers;
    const convertedAmount = await convertCurrency(from, to, amount);
    console.log(`${amount} ${chalk.green(from)} = ${chalk.green(convertedAmount)} ${chalk.green(to)}`);
};
const startApp = async () => {
    await welcomeAnimation();
    await run();
};
startApp();
