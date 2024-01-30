#!/usr/bin/env node
import inquirer from "inquirer";
import boxen from "boxen";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
let todos = [];
async function main() {
    async function welcomeScreen() {
        const startingAnimation = chalkAnimation.rainbow(boxen(`
      Welcome to our ⤹★ TODO App ★⤸  
                
          .------------------.
          |  [ 1 ] Add       |
          |  [ 2 ] View      |
          |  [ 3 ] Update    |
          |  [ 4 ] Delete    |
          |  [ 5 ] Exit      |
          '------------------'
    `, {
            title: "TODO App Project",
            titleAlignment: "center",
            borderStyle: "classic",
            float: "left",
        }));
        await new Promise(resolve => setTimeout(resolve, 2000));
        startingAnimation.stop();
    }
    await welcomeScreen();
    let loop = true;
    while (loop) {
        const operationAnswer = await inquirer.prompt([
            {
                type: "list",
                name: "operation",
                message: "Which operation would you like to perform?",
                choices: ["Add", "Delete", "Update", "View", "Exit"]
            }
        ]);
        const { operation } = operationAnswer;
        switch (operation) {
            case "Add":
                const addAnswer = await inquirer.prompt([
                    {
                        type: "input",
                        name: "Todo",
                        message: "Enter your todo: ",
                        validate: (input) => {
                            if (input.trim() === "") {
                                return "Please enter a valid todo item.";
                            }
                            return true;
                        }
                    },
                    {
                        type: "confirm",
                        name: "addMore",
                        message: "Do you want to add more todo?",
                        default: false
                    }
                ]);
                const { Todo, addMore } = addAnswer;
                loop = addMore;
                if (Todo) {
                    todos.push(Todo);
                }
                else {
                    console.log("Kindly enter valid input");
                }
                break;
            case "Delete":
                if (todos.length > 0) {
                    console.log(boxen(chalk.blue("Your Todo list:"), { padding: 1, borderStyle: "double" }));
                    todos.forEach((todo, index) => {
                        console.log(`${index + 1}. ${todo}`);
                    });
                    console.log("\n");
                    const deleteAnswer = await inquirer.prompt([
                        {
                            type: "number",
                            name: "deleteIndex",
                            message: "Enter the number of the todo item you want to delete: ",
                            validate: (input) => {
                                if (input < 1 || input > todos.length) {
                                    return `Please enter a number between 1 and ${todos.length}.`;
                                }
                                return true;
                            }
                        }
                    ]);
                    const { deleteIndex } = deleteAnswer;
                    todos.splice(deleteIndex - 1, 1); // Remove the selected todo item from the array
                    console.log("Todo item deleted successfully.");
                }
                else {
                    console.log("No todo items to delete");
                }
                break;
            case "Update":
                if (todos.length > 0) {
                    console.log(boxen(chalk.bold("Your Todo list:"), { padding: 1, borderStyle: "double" }));
                    todos.forEach((todo, index) => {
                        console.log(`${index + 1}. ${todo}`);
                    });
                    console.log("\n");
                    const updateAnswer = await inquirer.prompt([
                        {
                            type: "number",
                            name: "updateIndex",
                            message: "Enter the number of the todo item you want to update: ",
                            validate: (input) => {
                                if (input < 1 || input > todos.length) {
                                    return `Please enter a number between 1 and ${todos.length}.`;
                                }
                                return true;
                            }
                        },
                        {
                            type: "input",
                            name: "updatedTodo",
                            message: "Enter the updated todo item: ",
                            validate: (input) => {
                                if (input.trim() === "") {
                                    return "Please enter a valid todo item.";
                                }
                                return true;
                            }
                        }
                    ]);
                    const { updateIndex, updatedTodo } = updateAnswer;
                    todos[updateIndex - 1] = updatedTodo; // Update the selected todo item in the array
                    console.log("Todo item updated successfully.");
                }
                else {
                    console.log("No todo items to update");
                }
                break;
            case "View":
                if (todos.length > 0) {
                    console.log(boxen(chalk.bold("Your Todo list:"), { padding: 1, borderStyle: "double" }));
                    todos.forEach((todo, index) => {
                        console.log(`${index + 1}. ${todo}`);
                    });
                }
                else {
                    console.log("No todo items to view");
                }
                break;
            case "Exit":
                loop = false;
                break;
        }
    }
}
main().catch((error) => {
    console.error(error);
});
