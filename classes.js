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
        console.log(`The ${this.type}'s employee ID is ${this.ID}, their name is ${this.name}, their email address is ${this.email}, and their GitHub username is ${this.github}`);
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


module.exports = {
    Employee,
    Engineer,
    Intern
};