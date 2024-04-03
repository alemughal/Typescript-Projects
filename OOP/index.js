import inquirer from 'inquirer';
import chalk from 'chalk';
class Student {
    name;
    constructor(n) {
        this.name = n;
    }
}
class Person {
    students = [];
    addStudent(obj) {
        this.students.push(obj);
    }
}
const persons = new Person();
const programStart = async (person) => {
    do {
        console.log(chalk.green(`Welcome Guest`));
        const answer = await inquirer.prompt({
            name: 'select',
            type: 'list',
            message: 'Ap kis sy bat krna chahty hn?',
            choices: ['Self', 'Student'],
        });
        if (answer.select === 'Self') {
            console.log(chalk.yellow('Ma khud sy bat kr rha hu'));
            console.log(chalk.yellow('Meri tabiyat achi ha'));
        }
        if (answer.select === 'Student') {
            const answer = await inquirer.prompt({
                name: 'name',
                type: 'input',
                message: 'Ap kis Student sy bat krna chahty hn?',
            });
            const student = persons.students.find((val) => val.name == answer.name);
            if (!student) {
                const newStudent = new Student(answer.name);
                persons.addStudent(newStudent);
                console.log(chalk.green(`Welcome ${answer.name}`));
                console.log(chalk.yellow('Meri tabiyat achi ha'));
                console.log(chalk.blue(JSON.stringify(persons.students)));
            }
            if (student) {
                console.log(chalk.green(`Welcome ${student.name}`));
                console.log(chalk.yellow('Meri tabiyat achi ha.....'));
                console.log(chalk.blue(JSON.stringify(persons.students)));
            }
        }
    } while (true);
};
programStart(persons);
