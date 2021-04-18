var inquirer = require('inquirer');

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
            getEngineerInfo();
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

  const getEngineerInfo = function() {
        inquirer.prompt([
            {
                type: 'input',
                name: 'engName',
                message: 'What is the engineer\'s name?'
            },
            {
                type: 'input',
                name: 'engID',
                message: 'What is the engineer\'s employee ID?'
            },
            {
                type: 'input',
                name: 'engEmail',
                message: 'What is the engineer\'s email address?',
            },
            {
                type: 'input',
                name: 'engUsername',
                message: 'What is the engineer\'s GitHub Username?'
            }
        ]).then(answers => {
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