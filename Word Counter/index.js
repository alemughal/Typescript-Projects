#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import boxen from "boxen";
import chalkAnimation from "chalk-animation";
async function welcomeAnimation() {
    const startingAnimation = chalkAnimation.neon(boxen(`Word Counter\nProject\nBy\nAli Mughal`, {
        title: "Word Counter",
        titleAlignment: "center",
        textAlignment: "center",
        borderStyle: "double",
        borderColor: "magenta",
    }));
    await new Promise((resolve) => setTimeout(resolve, 3000));
    startingAnimation.stop();
}
await welcomeAnimation();
const wordCount = (string) => {
    const charWithoutSpaces = string.replace(/\s/g, "").length;
    console.log(chalk.blueBright(`Total characters without spaces: ${charWithoutSpaces}`));
    const words = string.trim().split(/\s+/g);
    const char = string.trim().split("");
    console.log(chalk.blueBright(`Total characters: ${char.length}`));
    console.log(chalk.blueBright(`Total words: ${words.length}`));
};
const getInput = async () => {
    const input = await inquirer.prompt({
        name: "para",
        type: "input",
        message: "Enter Your Paragraph: "
    });
    await wordCount(input.para);
};
await getInput();
