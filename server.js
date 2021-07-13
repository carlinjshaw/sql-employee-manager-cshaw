const inquirer = require("inquirer");

homeChoice = () => {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "globalChoice",
        choices: [
          "view all departments",
          "view all roles",
          "view all employees",
          "add a department",
          "add a role",
          "add an employee",
          "update an employee role",
        ],
      },
    ])
    .then((data) => {
      console.log(data);

if (data.globalChoice === 'view all departments'){
    viewDepartments()
}

if (data.globalChoice === 'view all roles') {
    viewRoles()
}
if (data.globalChoice === 'view all employees') {
    viewEmployees()
}
if (data.globalChoice === 'add a department') {
    addDepartment()
}
if (data.globalChoice === 'add a role') {
    addRole()
}
if (data.globalChoice === 'add an employee') {
    addEmployee()
}
if (data.globalChoice === 'update an employee role') {
    updateEmployee()
}


    });
};
homeChoice();

viewDepartments = () => {
    //READ db departments table
    homeChoice() 
}

viewRoles = () => {
    //READ db roles table
    homeChoice() 
}


viewEmployees = () => {
    //READ db employees table
    homeChoice() 
}

addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the department you would like to add",
        name: "addedDepartment"
      }
    ])
    .then((data) => {
      //CREATE new department in the department table

      homeChoice();
    });
};

addRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the role you would like to add?",
        name: "roleName",
      },
      {
        type: "input",
        message: "What is the salary of the role you would like to add",
        name: "roleSalary",
      },
      {
        type: "input",
        message: "What is the department of this role?",
        name: "roleDepartment",
      }
    ])
    .then((data) => {
      //CREATE the new role in the role db table
console.log(data)
      homeChoice();
    });
};

addEmployee = () => {
inquirer
.prompt([
    {
        type: 'input',
        message: 'What is the employees first name?',
        name: 'employeeFirst'
    },
    {
        type: 'input',
        message: 'What is the employees last name?',
        name: 'employeeLast'
    },
    {
        type: 'input',
        message: 'What is the employees role?',
        name: 'employeeRole'
    },
    {
        type: 'input',
        message: 'Who is the employees manager?',
        name: 'employeeManager'
    }
])
.then((data) => {
    //CREATE new employee inside employee table
})
}

updateEmployee = () => {
//
}

// THEN I am prompted to select an employee to update 
// and 
// their new role and this information is updated in the database