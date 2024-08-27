const inquirer = require("inquirer");
const express = require("express");
const { Pool } = require("pg");

const PORT = process.env.PORT || 3001;
const app = express();

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "employee_db",
  password: "",
});

pool.connect();

const mainMenu = () => {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee role",
        "Exit",
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case "View all departments":
          viewDepartments();
          break;
        case "View all roles":
          viewRoles();
          break;
        case "View all employees":
          viewEmployees();
          break;
        case "Add a department":
          addDepartment();
          break;
        case "Add a role":
          addRole();
          break;
        case "Add an employee":
          addEmployee();
          break;
        case "Update an employee role":
          updateEmployeeRole();
          break;
        default:
          pool.end();
      }
    });
};

const viewDepartments = () => {
  pool.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    console.table(res.rows);
    mainMenu();
  });
};

const viewRoles = () => {
  pool.query(
    "SELECT role.id, role.title, role.salary, department.name AS department FROM role JOIN department ON role.department_id = department.id",
    (err, res) => {
      if (err) throw err;
      console.table(res.rows);
      mainMenu();
    }
  );
};

const viewEmployees = () => {
  pool.query(
    "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, manager.first_name AS manager FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id",
    (err, res) => {
      if (err) throw err;
      console.table(res.rows);
      mainMenu();
    }
  );
};

const addDepartment = () => {
  inquirer
    .prompt({
      name: "name",
      type: "input",
      message: "Enter the name of the department:",
    })
    .then((answer) => {
      pool.query(
        "INSERT INTO department (name) VALUES ($1)",
        [answer.name],
        (err, res) => {
          if (err) throw err;
          console.log("Department added!");
          mainMenu();
        }
      );
    });
};

const addRole = () => {
  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "Enter the title of the role:",
      },
      {
        name: "salary",
        type: "input",
        message: "Enter the salary for the role:",
      },
      {
        name: "department_id",
        type: "input",
        message: "Enter the department ID for the role:",
      },
    ])
    .then((answers) => {
      pool.query(
        "INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)",
        [answers.title, answers.salary, answers.department_id],
        (err, res) => {
          if (err) throw err;
          console.log("Role added!");
          mainMenu();
        }
      );
    });
};

const addEmployee = () => {
  inquirer
    .prompt([
      {
        name: "first_name",
        type: "input",
        message: "Enter the first name of the employee:",
      },
      {
        name: "last_name",
        type: "input",
        message: "Enter the last name of the employee:",
      },
      {
        name: "role_id",
        type: "input",
        message: "Enter the role ID for the employee:",
      },
      {
        name: "manager_id",
        type: "input",
        message: "Enter the manager ID for the employee (if any):",
      },
    ])
    .then((answers) => {
      pool.query(
        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)",
        [
          answers.first_name,
          answers.last_name,
          answers.role_id,
          answers.manager_id,
        ],
        (err, res) => {
          if (err) throw err;
          console.log("Employee added!");
          mainMenu();
        }
      );
    });
};

const updateEmployeeRole = () => {
  inquirer
    .prompt([
      {
        name: "employee_id",
        type: "input",
        message: "Enter the ID of the employee you want to update:",
      },
      {
        name: "role_id",
        type: "input",
        message: "Enter the new role ID for the employee:",
      },
    ])
    .then((answers) => {
      pool.query(
        "UPDATE employee SET role_id = $1 WHERE id = $2",
        [answers.role_id, answers.employee_id],
        (err, res) => {
          if (err) throw err;
          console.log("Employee role updated!");
          mainMenu();
        }
      );
    });
};

mainMenu();
