var inquirer = require('inquirer');

class Employee {
    constructor(type, name, ID, email) {
        this.type = type;
        this.name = name;
        this.ID = ID;
        this.email = email;
    }
    employeeDetails() {
        console.log(`Employee Type: ${this.type}`);
        console.log(`Employee Name: ${this.name}`);
        console.log(`Employee ID: ${this.ID}`);
        console.log(`Employee Email: ${this.email}`);
    }
}


const getManagerInfo = function() {
    inquirer.prompt([
    {
        type: 'Input',
        name: 'managerName',
        message: 'What is the team manager\'s name?'
    },
    {
        type: 'input',
        name: 'managerID',
        message: 'What is the team manager\'s employee ID?'
    },
    {
        type: 'input',
        name: 'managerEmail',
        message: 'What is the manager\'s email address?' 
    },
    {
        type: 'input',
        name: 'managerOfficeNumber',
        message: 'What is the manager\'s office number?'
    },
  ])
  .then(answers => {
    addEmployeeMenu();
  })
  .catch(error => {
    if(error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
      console.log(error);
    } else {
      // Something else went wrong
      console.log('Something else went wrong');
    }
  });
}

 const addEmployeeMenu = function() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'addEmployee',
            message: 'Would you like to add an employee?',
            choices: ['Engineer', 'Intern', 'I do not want to add an employee']
        }
    ]).then(data => {
        if (data.addEmployee === 'Engineer') {
            getEmployeeInfo();
        } else if (data.addEmployee === 'Inter') {
            console.log('The manager wants to add an Intern');
        } else {
            console.log('The manager does NOT want to add additional employees');
        }
      })
      .catch(error => {
        if(error.isTtyError) {
          // Prompt couldn't be rendered in the current environment
          console.log(error);
        } else {
          // Something else went wrong
          console.log('Something else went wrong');
        }
      });
 }

  const getEmployeeInfo = function() {
        inquirer.prompt([
            {
                type: 'input',
                name: 'employeeName',
                message: 'What is the engineer\'s name?'
            },
            {
                type: 'input',
                name: 'employeeID',
                message: 'What is the engineer\'s employee ID?'
            },
            {
                type: 'input',
                name: 'employeeEmail',
                message: 'What is the engineer\'s email address?',
            },
        ]).then(answers => {
            const {employeeName, employeeID, employeeEmail} = answers;
            let employee = new Employee('Engineer', employeeName, employeeID, employeeEmail);
            console.log(employee);
            // Show the user the main menu
            addEmployeeMenu()
          })
          .catch(error => {
            if(error.isTtyError) {
              // Prompt couldn't be rendered in the current environment
              console.log(error);
            } else {
              // Something else went wrong
              console.log('Something else went wrong');
            }
          });
        }
     



  getManagerInfo();