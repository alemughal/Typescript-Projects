// Install required packages:
// npm install inquirer chalk
import inquirer from 'inquirer';
import chalk from 'chalk';
// Define a Question class to represent each question
class Question {
    questionText;
    options;
    correctOptionIndex;
    constructor(questionText, options, correctOptionIndex) {
        this.questionText = questionText;
        this.options = options;
        this.correctOptionIndex = correctOptionIndex;
    }
}
// Function to display the quiz questions
function displayQuiz(questions) {
    questions.forEach((question, index) => {
        console.log(chalk.bold(`\nQuestion ${index + 1}: ${question.questionText}`));
        question.options.forEach((option, i) => {
            console.log(`${i + 1}. ${option}`);
        });
    });
}
// Function to take user input for each question
async function takeQuiz(questions) {
    let score = 0;
    for (const [index, question] of questions.entries()) {
        const answer = await inquirer.prompt([
            {
                type: 'list',
                name: 'userAnswer',
                message: chalk.bold(`Question ${index + 1}: ${question.questionText}`),
                choices: question.options.map((option, i) => ({ name: `${i + 1}. ${option}`, value: i })),
            },
        ]);
        if (answer.userAnswer === question.correctOptionIndex) {
            console.log(chalk.green('Correct!\n'));
            score++;
        }
        else {
            console.log(chalk.red(`Incorrect. The correct answer is: ${question.options[question.correctOptionIndex]}\n`));
        }
    }
    return score;
}
// Function to display the quiz results
function displayResults(totalQuestions, score) {
    console.log(chalk.bold(`\nQuiz Completed!\nYour Score: ${score} out of ${totalQuestions}`));
    const percentage = (score / totalQuestions) * 100;
    console.log(`Percentage: ${percentage.toFixed(2)}%\n`);
    // Customize messages based on the score
    if (percentage === 100) {
        console.log(chalk.green.bold('Congratulations! You got a perfect score!'));
    }
    else if (percentage >= 70) {
        console.log(chalk.green.bold('Well done! You passed the quiz.'));
    }
    else {
        console.log(chalk.red.bold('Keep practicing. You can do better next time.'));
    }
}
// Sample quiz questions
const quizQuestions = [
    new Question('What is the capital of France?', ['Berlin', 'Paris', 'Rome', 'Madrid'], 1),
    new Question('Which planet is known as the Red Planet?', ['Venus', 'Mars', 'Jupiter', 'Saturn'], 1),
    new Question('What is the largest mammal?', ['Elephant', 'Blue Whale', 'Giraffe', 'Hippopotamus'], 1),
];
// Main function to run the quiz
async function main() {
    console.log(chalk.bold('Welcome to the Quiz App!\n'));
    // Display quiz questions
    displayQuiz(quizQuestions);
    // Take the quiz
    const userScore = await takeQuiz(quizQuestions);
    // Display results
    displayResults(quizQuestions.length, userScore);
}
// Run the quiz
main();
