const fs = require('fs');

class Employee {
    constructor(type, name, ID, email) {
        this.type = type;
        this.name = name;
        this.ID = ID;
        this.email = email;
    }
}

class Manager extends Employee {
    constructor(type, name, ID, email, phoneNumber) {
        super(type, name, ID, email)
        this.phoneNumber = phoneNumber;
    }
    addHTML(type, name, ID, email, phoneNumber) {
        const htmlPageContent = createHTML(type, name, ID, email, phoneNumber)

        fs.writeFile('index.html', htmlPageContent, (err) =>
             err ? console.log(err) : console.log('Successfully added to index.html!')
        );
    }
}


class Engineer extends Employee {
    constructor(type, name, ID, email, github) {
        super(type, name, ID, email);
        this.github = github;
    }
    addHTML(type, name, ID, email, github) {
        const htmlEngrContent = addToHTML(type, name, ID, email, github)

        fs.appendFile('index.html', htmlEngrContent, (err) =>
        err ? console.log(err) : console.log('Successfully added to index.html!')
   );
    }

}



class Intern extends Employee {
    constructor(type, name, ID, email, school) {
        super(type, name, ID, email);
        this.school = school;
    }
    showIntern() {
        console.log(`The ${this.type}'s employee ID is ${this.ID}, their name is ${this.name}, their email address is ${this.email}, and they attend ${this.school}`);
    }
}


function createHTML(type, name, ID, email, variable) {
    console.log(`The card type should be for: ${type}`);

    let managerCard = `
    <div class="col-md-3">
        <div class="card" style="width: 18rem;">
            <div class="card-body cardHeader">
                <h5 class="card-title">${name}</h5>
                <h5>${type}</h5>
            </div>
            <div class="addPadding">
                <ul class="list-group">
                    <li class="list-group-item">ID: ${ID}</li>
                        <li class="list-group-item">Email: ${email}</li>
                        <li class="list-group-item">Office number: ${variable}</li>
                    </ul>
            </div>
        </div>
    </div>
    `
    let initialHTMLpg = `
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
                    ${managerCard}
            </div>
        </html>
    </body>
`

return initialHTMLpg;
}


function addToHTML (type, name, ID, email, variable) {

    let engineerCard = `
    <div class="col-md-3">
        <div class="card" style="width: 18rem;">
            <div class="card-body cardHeader">
                <h5 class="card-title">${name}</h5>
                <h5>${type}</h5>
            </div>
            <div class="addPadding">
                <ul class="list-group">
                    <li class="list-group-item">ID: ${ID}</li>
                        <li class="list-group-item">Email: ${email}</li>
                        <li class="list-group-item">GitHub: ${variable}</li>
                    </ul>
            </div>
        </div>
    </div>
    `

    let internCard = `
    <div class="col-md-3">
        <div class="card" style="width: 18rem;">
            <div class="card-body cardHeader">
                <h5 class="card-title">${name}</h5>
                <h5>${type}</h5>
            </div>
            <div class="addPadding">
                <ul class="list-group">
                    <li class="list-group-item">ID: ${ID}</li>
                        <li class="list-group-item">Email: ${email}</li>
                        <li class="list-group-item">School: ${variable}</li>
                    </ul>
            </div>
        </div>
    </div>
    `
    return engineerCard;
}



module.exports = {
    Employee,
    Manager,
    Engineer,
    Intern
};