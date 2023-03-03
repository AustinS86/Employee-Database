// The required dependencies needed to run the program
const inquirer = require("inquirer");
const mysql = require("mysql");

// The connection for mysql
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "employee_db",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id" + connection.threadId);

  startScreen();
});

// These are questions the user will see when they log in
function startScreen() {
  inquirer
    .prompt({
      type: "list",
      choices: [
        "Add Department",
        "Add Role",
        "Add Employee",
        "View departments",
        "View roles",
        "View employees",
        "Update employee role",
        "Quit",
      ],
      message: "What would you like to do?",
      name: "option",
    })
    .then(function (result) {
      console.log("You entered: " + result.option);
      // The code below is what is executed when the user chooses one of the questions above
      switch (result.option) {
        case "Add Department":
          addDepartment();
          break;
        case "Add Role":
          addRole();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "View departments":
          viewDepartment();
          break;
        case "View roles":
          viewRoles();
          break;
        case "View employees":
          viewEmployees();
          break;
        case "Update employee role":
          updateEmployee();
          break;
        case "Quit":
          quit();
      }
    });
}
// This code is what is needed to add dept to your db
function addDepartment() {
  inquirer
    .prompt({
      type: "input",
      message: "What is the name of the department you want to add?",
      name: "deptName",
    })
    .then(function (answer) {
      connection.query(
        "INSERT INTO department (name) VALUES (?)",
        [answer.deptName],
        function (err, res) {
          if (err) throw err;
          console.table(res);
          startScreen();
        }
      );
    });
}
// This code is what is needed to add a role to your db
function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the role?",
        name: "roleName",
      },
      {
        type: "input",
        message: "What is the salary for the role?",
        name: "totalSalary",
      },
      {
        type: "input",
        message: "What is the name of the department ID for the role?",
        name: "deptID",
      },
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO role (title, salary, department_id) VALUES (?,?,?)",
        [answer.roleName, answer.totalSalary, answer.deptID],
        function (err, res) {
          if (err) throw err;
          console.table(res);
          startScreen();
        }
      );
    });
}
// This code is what is needed add an employee to your db
function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the first name of the employee?",
        name: "eeFirstName",
      },
      {
        type: "input",
        message: "What is the last name of the employee?",
        name: "eeLastName",
      },
      {
        type: "input",
        message: "What is the employees role ID number?",
        name: "roleID",
      },
      {
        type: "input",
        message: "What is the manager ID number?",
        name: "managerID",
      },
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)",
        [
          answer.eeFirstName,
          answer.eeLastName,
          answer.roleID,
          answer.managerID,
        ],
        function (err, res) {
          if (err) throw err;
          console.table(res);
          startScreen();
        }
      );
    });
}
// This code is what is needed to update the employee to your db
function updateEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What employee would you like to update?",
        name: "eeUpdate",
      },
      {
        type: "input",
        message: "Where do you want to update to?",
        name: "updateRole",
      },
      {
        type: "input",
        message: "What is the salary of the role?",
        name: "updateSalary",
      },
    ])
    .then(function (answer) {
      connection.query(
        "UPDATE employee SET role_id=? WHERE first_name=?",
        [answer.updateRole, answer.eeUpdate, answer.updateSalary],
        function (err, res) {
          if (err) throw err;
          console.table(res);
          startScreen();
        }
      );
    });
}
// The code below is what shows what tables you chose in the beginning
function viewDepartment() {
  let query = "SELECT * FROM department";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    startScreen();
  });
}

function viewRoles() {
  let query = "SELECT * FROM role";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    startScreen();
  });
}

function viewEmployees() {
  let query = "SELECT * FROM employee";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    startScreen();
  });
}
// This will quit the program from running
function quit() {
  connection.end();
  process.exit();
}
