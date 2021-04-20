const inquirer = require('inquirer');
const fs = require('fs');
const { Manager, Engineer, Intern } = require('./classes');


let employeesArray = []
let cardsArray = []

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
    employeesArray.push(manager);
    // manager.addHTML('Manager', manager.name, manager.ID, manager.email, manager.phoneNumber)
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
            choices: ['Engineer', 'Intern', 'I am finished Building my Team']
        }
    ]).then(data => {
        employeeType = data.employeeType
        if (employeeType === 'Engineer' || employeeType === 'Intern') {
            getEmployeeInfo(employeeType);
        } else {
            console.log('Please find your company profile at index.html');
            generateHTML(employeesArray);
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
                        let engineer = new Engineer(employeeType, employeeName, employeeID, employeeEmail, userName); 
                        employeesArray.push(engineer);
                        // engineer.addHTML('Engineer', engineer.name, engineer.ID, engineer.email, userName);
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
                        let intern = new Intern(employeeType, employeeName, employeeID, employeeEmail, schoolName); 
                        employeesArray.push(intern); 
                        // intern.addHTML('Intern', intern.name, intern.ID, intern.email, schoolName );
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


  function generateHTML(employeesArray) {
    const htmlPageContent = generateCards(employeesArray)

    fs.writeFile('index.html', htmlPageContent, (err) =>
         err ? console.log(err) : console.log('Successfully added to index.html!')
    );
  }


  function generateCards(employeesArray) {
    console.log(`There are ${employeesArray.length} in the Employees Array`);
    employeesArray.forEach(element => {
      if (element.phoneNumber) {
        label = 'Phone';
        myVar = element.phoneNumber
      } else if (element.github) {
        label = 'GitHub'
        myVar = element.github
      } else if (element.school) {
        label = 'School'
        myVar = element.school
      }
      card = `
          <div class="col-md-3 mySpacing">
            <div class="card" style="width: 18rem;">
                <div class="card-body cardHeader">
                    <h5 class="card-title">${element.name}</h5>
                    <h5>${element.type}</h5>
                </div>
                <div class="addPadding">
                  <ul class="list-group">
                    <li class="list-group-item">Employee ID: ${element.ID}</li>
                      <li class="list-group-item">Email: ${element.email}</li>
                      <li class="list-group-item">${label}: ${myVar}</li>
                  </ul>
                </div>
            </div>
          </div>
      `

    
    cardsArray.push(card);
    })
    newCardArray = cardsArray.join().replace(/,/g," ")
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <!-- CSS only -->
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous">
            <link rel="stylesheet" href="styles.css">
            <title>Company Profile</title>
        </head>
        <body>
            <header>
                <div class="headerClass">
                    <h1 class="headerText">Company Profile</h1>
                </div>
            </header>
        
            <!------------------------------------------------ TOP CARD ROW ------------------------------------------>
            <div id="cardSection" class="CardSection">
                    <!-- APPEND CARD TO THIS SECTION -->
                ${newCardArray}
            </div>
        </body>
      </html>
    `
  }

  getManagerInfo();