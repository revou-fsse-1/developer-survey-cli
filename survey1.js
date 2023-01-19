import inquirer from "inquirer";

const questions = [
  {
    type: "input",
    name: "name",
    message: "What's your first name?",
    validate(answer) {
      if (!answer) {
        return "Please, fill your name!";
      }
      return true;
    },
  },
  {
    type: "input",
    name: "email",
    message(answers) {
      return `Hello ${answers.name}! What's your email address?`;
    },
    validate: (email) => {
      if (!email) {
        return "Please, fill your email!";
      }
      return true;
    },
  },
  {
    type: "list",
    name: "survey",
    message: "Are you experienced Developer?",
    choices: ["yes", "no"],
  },
  {
    type: "list",
    name: "experience",
    message: "How many years of experience you have with JavaScript?",
    choices: ["0-1", "1-3", "3-5", "5-10", "10+"],
    when(answers) {
      return answers.survey === "yes";
    },
  },

  {
    type: "checkbox",
    name: "technologies",
    message: "What JavaScript library do you know?",
    choices: ["React.js", "Vue", "Angular", "Node.js", "jQuery", "D3.js"],
    when(answers) {
      return answers.survey === "yes";
    },
    validate(answer) {
      if (answer.length < 1) {
        return "Mention at least one Programming Language!";
      }
      return true;
    },
  },
  {
    type: "number",
    name: "salary",
    message: "What is your desired salary?",
    validate: (salary) => {
      if (salary <= 0) {
        return "Please, fill your salary more than zero";
      }
      return true;
    },
    when(answers) {
      return answers.survey === "yes";
    },
  },
];

inquirer
  .prompt(questions)
  .then((answers) => {
    console.log(JSON.stringify(answers, null, 2));
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log("Your console environment is not supported!");
    } else {
      console.log(error);
    }
  });
