import inquirer from "inquirer";
import { differenceInSeconds } from "date-fns";
import chalk from "chalk";
const res = await inquirer.prompt({
    type: "number",
    name: "userInput",
    message: "Please Enter the amount of second",
    validate: (input) => {
        if (isNaN(input)) {
            return "Please Enter a number";
        }
        else if (input > 60) {
            return "Please Enter a valid number";
        }
        else {
            return true;
        }
    }
});
let input = res.userInput;
function startTime(val) {
    const intTime = new Date().setSeconds(new Date().getSeconds() + val);
    const intervalTime = new Date(intTime);
    setInterval(() => {
        const currentTime = new Date();
        const timeDiff = differenceInSeconds(intervalTime, currentTime);
        if (timeDiff <= 0) {
            console.log(chalk.green("Timer Has expired"));
            process.exit(0);
        }
        const minute = Math.floor((timeDiff % (3600 * 24)) / 3600);
        const second = Math.floor((timeDiff % 60));
        console.log(chalk.yellow(`${minute.toString().padStart(2, "0")}:${second.toString().padStart(2, "0")}`));
    }, 1000);
}
startTime(input);
