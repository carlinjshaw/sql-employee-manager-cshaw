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
          "Exit Employee Tracker",
        ],
      },
    ])
    .then((data) => {
      console.log(data);

      if (data.globalChoice === "view all departments") {
        viewDepartments();
      }

      if (data.globalChoice === "view all roles") {
        viewRoles();
      }
      if (data.globalChoice === "view all employees") {
        viewEmployees();
      }
      if (data.globalChoice === "add a department") {
        addDepartment();
      }
      if (data.globalChoice === "add a role") {
        addRole();
      }
      if (data.globalChoice === "add an employee") {
        addEmployee();
      }
      if (data.globalChoice === "update an employee role") {
        updateEmployee();
      }
      if (data.globalChoice === "Exit Employee Tracker") {
        console.log("Exited Employee Tracker");
      }
    });
};

welcome = () => {
  console.log("Welcome to the Employee Tracker")
  homeChoice()
}
welcome()

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
    homeChoice()
})
}

updateEmployee = () => {
inquirer
.prompt([

  // somehow the choices in inquirer have to pull from the table of employees
  // then we have to take the ID that is chosen and give the user the option of UPDATING the role
  {
    message: 'What employee would you like to update?',
    type: 'list',
    name: 'employeeNames',
    choices: [
      'all the choices',
      'more choices']
  }
])
.then((data) => {
  homeChoice()
})

}

