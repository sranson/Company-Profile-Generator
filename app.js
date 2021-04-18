var inquirer = require('inquirer');


inquirer
  .prompt([
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
    {
        type: 'list',
        name: 'addEmployee',
        choices: ['Engineer', 'Intern', 'I do not want to add an employee']
    }
  ])
  .then(answers => {
    getManagerInfo(answers)
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

  const getManagerInfo = function(answers) {
      if (answers.addEmployee === 'Engineer') {
          console.log('The manager wants to add an Engineer');
      } else if (answers.addEmployee === 'Intern') {
         console.log('The manager wants to add an Intern');
      } else {
          console.log('The manager does not want to add another employee');
      }
  }