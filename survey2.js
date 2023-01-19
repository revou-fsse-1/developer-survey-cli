import inquirer from "inquirer";

const questions = [
  {
    type: "input",
    name: "languageList",
    message: "List all your favorite Programming Language",
    filter(answer) {
      return answer.split(/[ ,]+/).filter(Boolean);
    },
    validate(answer) {
      if (answer.length < 1) {
        return "Mention at least one Programming Language!";
      }
      return true;
    },
  },
];

function getLangQuestions(answers) {
  const languageList = answers.languageList;
  console.log("YOOO", languageList);
  const languageQuestions = [];
  for (let i = 0; i < languageList.length; i++) {
    const languageName = languageList[i];
    languageQuestions.push({
      type: "input",
      name: `languageList.${languageName}.reason`,
      message: `Why do you like ${languageName}?`,
    });
  }
  return languageQuestions;
}

inquirer
  .prompt(questions)
  .then((answers) => {
    inquirer.prompt(getLangQuestions(answers)).then((fruitAnswers) => {
      console.log(JSON.stringify(fruitAnswers, null, 2));
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log("Your console environment is not supported!");
    } else {
      console.log(error);
    }
  });
