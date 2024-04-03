import chalk from "chalk";
import inquirer from "inquirer";
class Player {
    name;
    power = 100;
    constructor(name) {
        this.name = name;
    }
    powerUp() {
        this.power = 100;
    }
    powerDown() {
        let power = this.power - 25;
        this.power = power;
    }
}
class Oponent {
    name;
    power = 100;
    constructor(name) {
        this.name = name;
    }
    powerDown() {
        let power = this.power - 25;
        this.power = power;
    }
}
let player = await inquirer.prompt({
    type: "input",
    name: "name",
    message: "Enter your name:",
});
console.log(player.name);
let opponent = await inquirer.prompt({
    type: "list",
    name: "select",
    message: "Select your opponent:",
    choices: ["Sekelton", "Assassin", "Zombie"],
});
let p1 = new Player(player.name);
let o1 = new Player(opponent.select);
do {
    // Sekelton
    if (opponent.select == "Sekelton") {
        let ask = await inquirer.prompt({
            type: "list",
            name: "option",
            message: "Select your Action:",
            choices: ["Attack", "Drink Portion", "Run for your life!"],
        });
        if (ask.option == "Attack") {
            let num = Math.floor(Math.random() * 2);
            if (num > 0) {
                p1.powerDown();
                console.log(`${chalk.bold.green(p1.name)}: ${chalk.bold.green(p1.power)}`);
                console.log(`${chalk.bold.red(o1.name)}: ${chalk.bold.red(o1.power)}`);
                if (p1.power <= 0) {
                    console.log(chalk.bold.red("You loose, Better luck next time"));
                    process.exit();
                }
            }
            if (num <= 0) {
                o1.powerDown();
                console.log(`${chalk.bold.green(p1.name)}: ${chalk.bold.green(p1.power)}`);
                console.log(`${chalk.bold.red(o1.name)}: ${chalk.bold.red(o1.power)}`);
                if (o1.power <= 0) {
                    console.log(chalk.bold.green("You win, Better luck next time"));
                    process.exit();
                }
            }
        }
        if (ask.option == "Drink Portion") {
            p1.powerUp();
            console.log(chalk.bold.italic.green("Portion Drank.. You are full"));
        }
        if (ask.option == "Run for your life!") {
            console.log(chalk.red.bold.italic("You loose, Better luck next time"));
            process.exit();
        }
    }
    // Assassin
    if (opponent.select == "Assassin") {
        let ask = await inquirer.prompt({
            type: "list",
            name: "option",
            message: "Select your Action:",
            choices: ["Attack", "Drink Portion", "Run for your life!"],
        });
        if (ask.option == "Attack") {
            let num = Math.floor(Math.random() * 2);
            if (num > 0) {
                p1.powerDown();
                console.log(`${chalk.bold.green(p1.name)}: ${chalk.bold.green(p1.power)}`);
                console.log(`${chalk.bold.red(o1.name)}: ${chalk.bold.red(o1.power)}`);
                if (p1.power <= 0) {
                    console.log(chalk.bold.red("You loose, Better luck next time"));
                    process.exit();
                }
            }
            if (num <= 0) {
                o1.powerDown();
                console.log(`${chalk.bold.green(p1.name)}: ${chalk.bold.green(p1.power)}`);
                console.log(`${chalk.bold.red(o1.name)}: ${chalk.bold.red(o1.power)}`);
                if (o1.power <= 0) {
                    console.log(chalk.bold.green("You win, Better luck next time"));
                    process.exit();
                }
            }
        }
        if (ask.option == "Drink Portion") {
            p1.powerUp();
            console.log(chalk.bold.italic.green("Portion Drank.. You are full"));
        }
        if (ask.option == "Run for your life!") {
            console.log(chalk.red.bold.italic("You loose, Better luck next time"));
            process.exit();
        }
    }
    // Zombie
    if (opponent.select == "Zombie") {
        let ask = await inquirer.prompt({
            type: "list",
            name: "option",
            message: "Select your Action:",
            choices: ["Attack", "Drink Portion", "Run for your life!"],
        });
        if (ask.option == "Attack") {
            let num = Math.floor(Math.random() * 2);
            if (num > 0) {
                p1.powerDown();
                console.log(`${chalk.bold.green(p1.name)}: ${chalk.bold.green(p1.power)}`);
                console.log(`${chalk.bold.red(o1.name)}: ${chalk.bold.red(o1.power)}`);
                if (p1.power <= 0) {
                    console.log(chalk.bold.red("You loose, Better luck next time"));
                    process.exit();
                }
            }
            if (num <= 0) {
                o1.powerDown();
                console.log(`${chalk.bold.green(p1.name)}: ${chalk.bold.green(p1.power)}`);
                console.log(`${chalk.bold.red(o1.name)}: ${chalk.bold.red(o1.power)}`);
                if (o1.power <= 0) {
                    console.log(chalk.bold.green("You win, Better luck next time"));
                    process.exit();
                }
            }
        }
        if (ask.option == "Drink Portion") {
            p1.powerUp();
            console.log(chalk.bold.italic.green("Portion Drank.. You are full"));
        }
        if (ask.option == "Run for your life!") {
            console.log(chalk.red.bold.italic("You loose, Better luck next time"));
            process.exit();
        }
    }
} while (true);
