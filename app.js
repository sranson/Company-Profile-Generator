const inquirer = require('inquirer');
const { Employee, Manager, Engineer, Intern } = require('./classes');


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
    const {managerName, managerID, managerEmail, managerOfficeNumber } = answers;
    let manager = new Manager('Manager', managerName, managerID, managerEmail, managerOfficeNumber);  
    manager.showManager();
    addEmployeeMenu()
  })
  .catch(error => {
    if(error.isTtyError) {
      console.log(error);
    } else {
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
          console.log(error);
        } else {
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
                }
          })
          .catch(error => {
            if(error.isTtyError) {
              console.log(error);
            } else {
              // Something else went wrong
              console.log('Something else went wrong');
            }
          });
        }
     


  getManagerInfo();