const inquirer = require("inquirer");
const mysql = require("mysql");
const conTable = require("console.table");


const connection = mysql.createConnection({
  host: "localhost",
  port: 5500,
  user: "root",
  password: "passwordHere",
  database: "employee_db"

});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id" + connection.threadId);
  
  startScreen();

});

function startScreen() {
  inquirer.prompt({
    type: "list",
    choices: [
      "Add Department",
      "Add Role",
      "Add Employee",
      "View departments",
      "View roles",
      "View employees",
      "Update employee role",
      "Quit"
    ],
    message: "What would you like to do?",
    name: "option"
  })
    .then(function (result) {
      console.log("You entered: " + result.option);

      switch (result.option) {
        case "Add deparment":
          addDepartment();
          break;

        case "Add role":
          addRole();
          break;

        case "Add employee":
          addEmployee();
          break;

        case "View department's":
          viewDepartment();
          break;

        case "View roles":
          viewRoles();
          break;
        case "View employee's":
          viewEmployees();
          break;
        case "Update employee role":
          updateEmployee();
          break;

        default:
          quit();
      }
    });
}

function addDepartment() {
  inquirer.prompt({
    type: "input",
    message: "What is the name of the department you want to add?",
    name: "deptName"
  })
    .then(function (answer) {
      connection.query("INSERT INTO department (name) VALUES (?)", [answer.deptName], function (err, res) {
        if (err) throw err;
        console.table(res)
        startScreen()
      })
    })

}

function addRole() {
  inquirer.prompt([
    {
      type: "input",
      message: "What is the name of the role?",
      name: "roleName"
    },
    {
      type: "input",
      message: "What is the salary for the role?",
      name: "totalSalary"
    },
    {
      type: "input",
      message: "What is the name of the department ID for the role?",
      name: "deptID"
    },
  ])
    .then(function (answer) {
      connection.query("INSERT INTO role (title, salary, department_id) VALUES (?,?,?)", [answer.roleName, answer.totalSalary, answer.deptID], function (err, res) {
        if (err) throw err;
        console.table(res)
        startScreen()
      });
    });
}

function addDepartment() {
  inquirer.prompt([
    {
      type: "input",
      message: "What is the first name of the employee?",
      name: "eeEmployeeName"
    },
    {
      type: "input",
      message: "What is the last name of the employee?",
      name: "eeLastName"
    },
    {
      type: "input",
      message: "What is the employees role ID number?",
      name: "roleID"
    },
    {
      type: "input",
      message: "What is the manager ID number?",
      name: "managerID"
    },
  ])
    .then(function (answer) {
      connection.query("INSERT INTO department (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)", [answer.eeFirstName, answer.eeLastName, answer.roleID, answer.managerID], function (err, res) {
        if (err) throw err;
        console.table(res)
        startScreen()
      });
    });
}

function updateEmployee() {
  inquirer.prompt([
    {
      type: "input",
      message: "What employee would you liek to update?",
      name: "eeUpdate"
    },
    {
      type: "input",
      message: "Where do you want to update to?",
      name: "updateRole"
    },
  ])
    .then(function (answer) {
      connection.query("UPDATE employee SET role_id=? WHERE first_name=?", [answer.updateRole, answer. eeUpdate], function (err, res) {
        if (err) throw err;
        console.table(res)
        startScreen()
      });
    });
}

function viewDepartment(){
  let query ="SELECT * FROM department";
  connection.query(query, function(err,res){
    if (err) throw err;
    console.table(res);
    startScreen();
  });
}

function viewRoles(){
  let query ="SELECT * FROM role";
  connection.query(query, function(err,res){
    if (err) throw err;
    console.table(res);
    startScreen();
  });
}

function viewEmployees(){
  let query ="SELECT * FROM employee";
  connection.query(query, function(err,res){
    if (err) throw err;
    console.table(res);
    startScreen();
  });
}

function quit() {
  connection.end();
  process.exit();
}
