import { faker } from "@faker-js/faker";
import chalk from "chalk";
import inquirer from "inquirer";


// Customer Class
class Customer {
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  mobNumber: number;
  accNumber: number;

  constructor(
    fName: string,
    lName: string,
    age: number,
    gender: string,
    mob: number,
    acc: number
  ) {
    this.firstName = fName;
    this.lastName = lName;
    this.age = age;
    this.gender = gender;
    this.mobNumber = mob;
    this.accNumber = acc;
  }
}

// Bank Account Interface
interface BankAccount {
  accNumber: number;
  balance: number;
}

class Bank {
  customer: Customer[] = [];
  account: BankAccount[] = [];

  addCustomer(obj: Customer) {
    this.customer.push(obj);
  }

  addAccount(obj: BankAccount) {
    this.account.push(obj);
  }

  transaction(accObj: BankAccount) {
    let NewAccounts = this.account.filter(
      (acc) => acc.accNumber !== accObj.accNumber
    );
    this.account = [...NewAccounts, accObj];
  }
}

let myBank = new Bank();

// Customer Create
for (let i: number = 1; i <= 10; i++) {
  let fName = faker.person.firstName("male");
  let lName = faker.person.lastName();
  let num = parseInt(faker.string.numeric("3#########"));
  const cus = new Customer(fName, lName, 25 * i, "male", num, 1000 + i);
  myBank.addCustomer(cus);
  myBank.addAccount({ accNumber: cus.accNumber, balance: 100 * i });
}

// Bank Functionality
async function bankService(bank: Bank) {
  do {
    let service = await inquirer.prompt({
      type: "list",
      name: "select",
      message: "Please Select the Service",
      choices: ["Deposit", "Withdraw", "Transfer", "Balance", "Exit"],
    });

    if (service.select === "Deposit") {
      let response = await inquirer.prompt({
        type: "input",
        name: "accNum",
        message: "Please Enter Your Account Number:",
      });

      // Convert the user input to a number
      let accountNumber = parseInt(response.accNum);

      let account = bank.account.find((acc) => acc.accNumber === accountNumber);

      if (!account) {
        console.log(chalk.bold.red("Account Not Found"));
      } else if (account) {
        let ans = await inquirer.prompt({
          type: "number",
          name: "amount",
          message: "Please Enter Amount",
        });

        let newBalance = account.balance + ans.amount;

        bank.transaction({ accNumber: account.accNumber, balance: newBalance });
        console.log(newBalance);
      }
    } else if (service.select === "Withdraw") {
      let response = await inquirer.prompt({
        type: "input",
        name: "accNum",
        message: "Please Enter Your Account Number:",
      });

      // Convert the user input to a number
      let accountNumber = parseInt(response.accNum);

      let account = bank.account.find((acc) => acc.accNumber === accountNumber);

      if (!account) {
        console.log(chalk.bold.red("Account Not Found"));
      } else if (account) {
        let ans = await inquirer.prompt({
          type: "number",
          name: "amount",
          message: "Please Enter Amount",
        });

        let newBalance = account.balance - ans.amount;

        if (newBalance < 0) {
          console.log(chalk.bold.red("Insufficient Balance"));
        } else {
          bank.transaction({
            accNumber: account.accNumber,
            balance: newBalance,
          });
          console.log(chalk.blue(`You have withdrawn ${ans.amount}`));
          console.log(chalk.green(`New Balance: ${newBalance}`));
        }
      }
    } else if (service.select === "Transfer") {
      let response = await inquirer.prompt({
        type: "input",
        name: "accNum",
        message: "Please Enter Your Account Number:",
      });

      // Convert the user input to a number
      let accountNumber = parseInt(response.accNum);

      let account = bank.account.find((acc) => acc.accNumber === accountNumber);

      if (!account) {
        console.log(chalk.bold.red("Account Not Found"));
      }

      let response2 = await inquirer.prompt({
        type: "input",
        name: "accNum2",
        message: "Please Enter Account Number to Transfer:",
      });

      // Convert the user input to a number

      let accountNumber2 = parseInt(response2.accNum2);

      let account2 = bank.account.find(
        (acc) => acc.accNumber === accountNumber2
      );

      if (!account2) {
        console.log(chalk.bold.red("Account Not Found"));
      }

      let ans = await inquirer.prompt({
        type: "number",
        name: "amount",
        message: "Please Enter Amount",
      });

      if (account && account2) {
        {
          let newBalance = account.balance - ans.amount;
          if (newBalance < 0) {
            console.log(chalk.bold.red("Insufficient Balance"));
          } else {
            bank.transaction({
              accNumber: account.accNumber,
              balance: newBalance,
            });
            bank.transaction({
              accNumber: account2.accNumber,
              balance: ans.amount,
            });
            console.log(
              chalk.blue(
                `You have Transferred ${ans.amount} to Account: ${account2.accNumber}`
              )
            );
            console.log(chalk.green(`New Balance: ${newBalance}`));
          }
        }
      }
    } else if (service.select === "Balance") {
      let response = await inquirer.prompt({
        type: "input",
        name: "accNum",
        message: "Please Enter Your Account Number:",
      });

      // Convert the user input to a number
      let accountNumber = parseInt(response.accNum);

      let account = bank.account.find((acc) => acc.accNumber === accountNumber);

      if (!account) {
        console.log(chalk.bold.red("Account Not Found"));
      } else {
        let name = bank.customer.find(
          (item) => item.accNumber === accountNumber
        );
        console.log(
          `Dear ${chalk.green.italic(name?.firstName)} ${chalk.green.italic(
            name?.lastName
          )} Your Account ${chalk.green.italic(
            account.accNumber
          )} Balance is ${chalk.blueBright.bold("$" + account.balance)}`
        );
      }
    } else if (service.select === "Exit") {
      return;
    }
  } while (true);
}

bankService(myBank);
