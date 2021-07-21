const inquirer = require("inquirer");
const db = require('./db/connection.js');
const table = require('console.table');

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
        ]
      },
    ])
    .then((data) => {

// data.globalChoice = ""
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
    // db.query('SELECT * FROM `departments`', (data) => {
    //   console.table(data);
    // })
    db.query(
      'SELECT * FROM `departments`',
      function(err, results) {
        console.table(results); // results contains rows returned by server
        // console.log(fields); // fields contains extra meta data about results, if available
        homeChoice() 
      }
      );
      

}

viewRoles = () => {
    //READ db roles table
    homeChoice() 
}


viewEmployees = () => {
    //READ db employees table
   db.query(
     `SELECT * FROM employees 
     LEFT JOIN roles 
     ON employees.role_id = roles.id 
     LEFT JOIN departments 
     ON roles.department_id = departments.id;`, 
   (err, results) => {
     console.table(results);
     homeChoice() 
   })

// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids,
// first names, last names, job titles, departments, salaries, and managers that the employees report to
// WHEN I choose to add a department

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
        message: "What is the title of the role you would like to add?",
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
  db.query(
    "SELECT CONCAT(first_name, ' ', last_name) AS fullName FROM employees",
    (err, results) => {
      const names = [];
      results.forEach((result) => {
        names.push(result.fullName);
      });

      inquirer
        .prompt([
          {
            message: "What employee would you like to update?",
            type: "list",
            name: "employeeNames",
            choices: names,
          },
        ])
        .then((employeeChoice) => {
          employeeRole(employeeChoice);
        });
    }
  );
};

employeeRole = (employeeChoice) => {
  console.log(employeeChoice);
  const empUpdate = [];
  empUpdate.push(employeeChoice);
  db.query("SELECT title FROM roles", (err, results) => {
    const titles = [];
    results.forEach((result) => {
      titles.push(result.title);
    });

    inquirer
      .prompt([
        {
          message: "What is the new role of this employee?",
          type: "list",
          name: "newRole",
          choices: titles,
        },
      ])
      .then((choice) => {
        empUpdate.push(choice);
        console.log(empUpdate);
        console.log(empUpdate[0].employeeNames);
        employeeId(empUpdate);
      });
  });
};

employeeId = (empData) => {
  const sql = `SELECT id FROM roles WHERE title = ?`;
  const params = empData[1].newRole;
  db.query(sql, params, (err, results) => {
    empData.push(results);
    console.log(empData);
    empUpdateFinal(empData);
  });
};

empUpdateFinal = (empData) => {
  const sql = `UPDATE employees SET role_id = ? WHERE CONCAT(first_name, ' ', last_name) = ?`;
  const params = [empData[2][0].id, empData[0].employeeNames];

  db.query(sql, params, (err, results) => {
    console.log(`${empData[0].employeeNames}s role has been changed to ${empData[1].newRole}`);
    homeChoice()
  });
};

//update employee SET role_id = (id of the name of role) WHERE CONCAT fullname = (the one we have)