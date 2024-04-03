#!/usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";
import chalkAnimation from 'chalk-animation';
import boxen from "boxen";
class Student {
    static idCounter = 0;
    id;
    name;
    courses;
    balance;
    constructor(name) {
        this.id = ++Student.idCounter;
        this.name = name;
        this.courses = [];
        this.balance = 0;
    }
    enroll(course) {
        this.courses.push(course);
        this.displayMessage(`You have enrolled in ${course}`);
    }
    valBalance() {
        this.displayMessage(`Your balance is ${this.balance}`);
    }
    payTuition(amount) {
        this.balance += amount;
        this.displayMessage(`You have paid ${amount}`);
    }
    showCourses() {
        this.displayMessage(`You are enrolled in ${this.courses.join(", ")}`);
    }
    showStatus() {
        this.displayMessage(`Name: ${this.name}`);
        this.displayMessage(`ID: ${this.id}`);
        this.displayMessage(`Courses Enrolled: ${this.courses.join(", ")}`);
        this.displayMessage(`Balance: ${this.balance}`);
    }
    displayMessage(message) {
        console.log(chalk.greenBright(message));
    }
}
const main = async () => {
    async function welcomeScreen() {
        const startingAnimation = chalkAnimation.rainbow(boxen(`
            Welcome to our ⤹★ Student Management System ★⤸  
                      
                .-----------------------.
                |  [ 1 ] Enroll         |
                |  [ 2 ] View Balance   |
                |  [ 3 ] Pay Tuition    |
                |  [ 4 ] Show Status    |
                |  [ 5 ] Exit           |  
                '-----------------------'
          `, {
            title: "Student Management System",
            titleAlignment: "center",
            borderStyle: "classic",
            float: "left",
        }));
        await new Promise(resolve => setTimeout(resolve, 2000));
        startingAnimation.stop();
    }
    await welcomeScreen();
    const students = [];
    const { numberOfStudents } = await inquirer.prompt([
        {
            type: "input",
            name: "numberOfStudents",
            message: "Enter the number of students you want to add:",
            validate: (input) => {
                const parsedInput = parseInt(input);
                if (isNaN(parsedInput) || parsedInput <= 0) {
                    return "Please enter a valid number greater than 0";
                }
                return true;
            },
        },
    ]);
    for (let i = 0; i < numberOfStudents; i++) {
        const { name } = await inquirer.prompt([
            {
                type: "input",
                name: "name",
                message: `Enter the name of student ${i + 1}:`,
                validate: (input) => {
                    if (input.trim() === "") {
                        return "Name cannot be empty";
                    }
                    return true;
                },
            },
        ]);
        const student = new Student(name.trim());
        students.push(student);
    }
    let continueOperations = true;
    while (continueOperations) {
        const choices = [
            "Enroll",
            "View Balance",
            "Pay Tuition",
            "Show Status",
            "Exit",
        ];
        const { action } = await inquirer.prompt([
            {
                type: "list",
                name: "action",
                message: "Select an action:",
                choices: choices,
            },
        ]);
        switch (action) {
            case "Enroll":
                const { subject } = await inquirer.prompt([
                    {
                        type: "input",
                        name: "subject",
                        message: "Enter the subject you want to enroll in:",
                        validate: (input) => {
                            if (input.trim() === "") {
                                return "Subject cannot be empty";
                            }
                            return true;
                        },
                    },
                ]);
                students.forEach((student) => {
                    student.enroll(subject);
                });
                break;
            case "View Balance":
                students.forEach((student) => {
                    student.valBalance();
                });
                break;
            case "Pay Tuition":
                const { amount } = await inquirer.prompt([
                    {
                        type: "input",
                        name: "amount",
                        message: "Enter the amount to pay:",
                        validate: (input) => {
                            if (isNaN(Number(input))) {
                                return "Amount must be a number";
                            }
                            return true;
                        },
                    },
                ]);
                students.forEach((student) => {
                    student.payTuition(Number(amount));
                });
                break;
            case "Show Status":
                students.forEach((student) => {
                    student.showStatus();
                });
                break;
            case "Exit":
                continueOperations = false;
                break;
            default:
                console.log("Invalid action");
        }
    }
};
main();
