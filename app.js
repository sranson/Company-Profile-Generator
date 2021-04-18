var inquirer = require('inquirer');

class Employee {
    constructor(type, name, ID, email) {
        this.type = type;
        this.name = name;
        this.ID = ID;
        this.email = email;
    }
}

class Engineer extends Employee {
    constructor(type, name, ID, email, github) {
        super(type, name, ID, email);
        this.github = github;
    }
    showEngineer() {
        console.log(`The ${this.type}'s name is ${this.name}. Their email address is ${this.email} and their GitHub username is ${this.github}`);
    }
}

class Intern extends Employee {
    constructor(type, name, ID, email, school) {
        super(type, name, ID, email);
        this.school = school;
    }
    showIntern() {
        console.log(`The ${this.type}'s name is ${this.name}. Their email address is ${this.email} and they attend ${this.school}`);
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
            name: 'employeeType',
            message: 'Would you like to add an employee?',
            choices: ['Engineer', 'Intern', 'I do not want to add an employee']
        }
    ]).then(data => {
        employeeType = data.employeeType
        if (employeeType === 'Engineer' || employeeType === 'Intern') {
            getEmployeeInfo(employeeType);
        } else {
            console.log(`The manager does NOT want to add an additional employee`);
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

  const getEmployeeInfo = function(employeeType) {
        inquirer.prompt([
            {
                type: 'input',
                name: 'employeeName',
                message: `What is the ${employeeType}\'s name?`
            },
            {
                type: 'input',
                name: 'employeeID',
                message: `What is the ${employeeType}\'s employee ID?`
            },
            {
                type: 'input',
                name: 'employeeEmail',
                message: `What is the ${employeeType}\'s email address?`,
            },
        ]).then(function (answers) {
            const {employeeName, employeeID, employeeEmail} = answers;
                if (employeeType === 'Engineer') {
                    inquirer.prompt([
                        {
                            type: 'input',
                            name: 'userName',
                            message: 'What is the Engineer\'s GitHub username?'
                        },
                    ]).then(function(data) {
                        userName = data.userName;
                        let employee = new Engineer(employeeType, employeeName, employeeID, employeeEmail, userName);  
                        employee.showEngineer();
                        addEmployeeMenu()
                    })
                } else if (employeeType === 'Intern') {
                    inquirer.prompt([
                        {
                            type: 'input',
                            name: 'schoolName',
                            message: 'What is the name of the Intern\'s school?'
                        },
                    ]).then(function(data) {
                        schoolName = data.schoolName;
                        let employee = new Intern(employeeType, employeeName, employeeID, employeeEmail, schoolName);  
                        employee.showIntern();
                        addEmployeeMenu()
                    })
                    // Pass the employee object to the Intern class
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
     


  getManagerInfo();