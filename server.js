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
  db.query(
      'SELECT * FROM `departments`',
      function(err, results) {
        console.table(results); 
        homeChoice() 
      }
      );
}

viewRoles = () => {
    //READ db roles table
    db.query(
      `SELECT * FROM roles 
      LEFT JOIN departments 
      ON roles.department_id = departments.id;`, 
    (err, results) => {
      console.table(results);
      homeChoice() 
    }) 
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
}

addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the department you would like to add",
        name: "addedDepartment",
      },
    ])
    .then((data) => {
      //CREATE new department in the department table
      const sql = `INSERT INTO departments (name) VALUES (?);`;
      const params = data.addedDepartment;
      db.query(sql, params, (err, results) => {
        homeChoice();
      });
    });
};

// const empUpdate = [];
//   empUpdate.push(employeeChoice);
//   db.query("SELECT title FROM roles", (err, results) => {
//     const titles = [];
//     results.forEach((result) => {
//       titles.push(result.title);
//     });

addRole = () => {

db.query(`SELECT name FROM departments`, (err, results) =>{
  const roleNames = [];
  results.forEach((result)=> {
    roleNames.push(result.name);
  })

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
      type: "list",
      message: "What is the department of this role?",
      name: "roleDepartment",
      choices: roleNames,
    }
  ])
  .then((data) => {
    addRoleId(data)
  })
    
});
};

addRoleId = (data) => {
  
  const roleData = [];
  roleData.push(data);

  const sql = `SELECT id FROM departments WHERE name = ?`
  const params = data.roleDepartment

  db.query(sql, params, (err, results) => {
    console.log(results)
    roleData.push(results)
    console.log(roleData)
    addRoleFinal(roleData)
  })
}

addRoleFinal = (roleData) => {

  const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`
  const params = [roleData[0].roleName, roleData[0].roleSalary, roleData[1][0].id]

  db.query(sql, params, (err, results) => {

console.log(results)
    homeChoice();
  })

}

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
])
.then((data) => {
    //CREATE new employee inside employee table
    addEmpRole(data)
})
}

addEmpRole = (data) =>{

  const newEmpData = [];
  newEmpData.push(data);
  db.query("SELECT title FROM roles", (err, results) => {
    const titles = [];
    results.forEach((result) => {
      titles.push(result.title);
    });

    inquirer
      .prompt([
        {
          message: "What is the role of this employee?",
          type: "list",
          name: "newRole",
          choices: titles,
        },
        {
message: "Who will be the manager of this employee?",
type: "list",
name: "empManager",
choices: [
  'John Williams',
  'Edward Snowden',
  'Krista Jones'
]
        },
      ])
      .then((choice) => {
        newEmpData.push(choice);
        console.log(newEmpData);
        findIdEmp(newEmpData)
      });
  });
}


findIdEmp = (data) => {
  
  

  const sql = `SELECT id FROM roles WHERE title = ?`
  const params = data[1].newRole
  db.query(sql, params, (err, results) => {
    
    data.push(results)
    console.log(data)
    addEmpManager(data)
  })
}

addEmpManager = (data) => {
  
  const sql = `SELECT id FROM employees WHERE CONCAT(first_name, ' ', last_name) = ?`
  const params = data[1].empManager
  db.query(sql, params, (err, results) => {
    
    data.push(results)
    console.log(data)
    addEmpFinal(data)
  })

}

addEmpFinal = (data) => {

  const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`
  const params = [data[0].employeeFirst, data[0].employeeLast, data[2][0].id, data[3][0].id]

  db.query(sql, params, (err, results) => {

console.log(results)
    homeChoice();
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