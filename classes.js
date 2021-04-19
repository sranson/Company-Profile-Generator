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
}




class Engineer extends Employee {
    constructor(type, name, ID, email, github) {
        super(type, name, ID, email);
        this.github = github;
    }
}



class Intern extends Employee {
    constructor(type, name, ID, email, school) {
        super(type, name, ID, email);
        this.school = school;
    }
}


module.exports = {
    Employee,
    Manager,
    Engineer,
    Intern
};