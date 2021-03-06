
const Employee = require('./lib/Employee');
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

// const OUTPUT_DIR = path.resolve(__dirname, "output");
// const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let employees = []

const next = () => {
  inquirer.prompt({
    type: 'list',
    name: 'choice',
    message: 'What would you like to do now?',
    choices: ['Enter another new Employee', 'Finish']
  })
    .then(({ choice }) => {
      switch (choice) {
        case 'Enter another new Employee':
          makeNewEmployee()
          break
        case 'Finish':
          fs.writeFile(path.join(__dirname, 'output', 'index.html'), render(employees), err => {
            if (err) { console.log(err) }
          })
          break
      }
    })
    .catch(err => console.log(err))
  }
const addRole = (employee) => {
  inquirer.prompt([
    {
      type: 'list',
      name: 'role',
      message: 'What is the role of the employee you wish to enter?',
      choices: ['Manager', 'Engineer', 'Intern']
    }
  ])
  .then(({ role }) => {
    switch (role) {
      case 'Manager':
        makeManager(employee)
        break;

      case 'Engineer':
        makeEngineer(employee)
        break;
      case 'Intern':
        makeIntern(employee)
        break;
      }
  })
 .catch(err => console.log(err))
  

}


const makeManager= ({ name, id, email }) => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'officeNumber',
      message: 'Enter the Office Number'
    },
    
  ])
    .then(({ officeNumber}) => {
      employees.push(new Manager(name, id, email, officeNumber))
      next()
    })
  .catch(err => console.log(err))
}
const makeEngineer = ({ name, id, email }) => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'github',
      message: 'Enter the Github page id'
    },

  ])
    .then(({ github }) => {
      employees.push(new Engineer(name, id, email, github))
      next()
    })
    .catch(err => console.log(err))
}
const makeIntern = ({ name, id, email }) => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'school',
      message: 'Enter the name of the School'
    },

  ])
    .then(({ school }) => {
      employees.push(new Intern(name, id, email, school))
      next()
    })
  .catch(err => console.log(err))
}

const makeNewEmployee = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of employee?'
    },
    {
      type: 'input',
      name: 'id',
      message: 'Enter the ID'
    },
    {
      type: 'input',
      name: 'email',
      message: 'Enter the email'
    }
    
  ])
  .then(employee => {
      // employees.push(new Employee(employee.name, employee.id, employee.email))
      addRole(employee)
    })
  
  .catch( err => console.log(err))
}

makeNewEmployee()


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
