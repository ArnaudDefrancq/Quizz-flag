const section = document.getElementById("section");

const answer1 = document.getElementById("answer1");
const answer2 = document.getElementById("answer2");
const answer3 = document.getElementById("answer3");
const answer4 = document.getElementById("answer4");

const imgFlag = document.getElementById("img-flag");

const input1 = document.getElementById("items1");
const input2 = document.getElementById("items2");
const input3 = document.getElementById("items3");
const input4 = document.getElementById("items4");

const score = document.getElementById("score");

let state = {
  point: 0,
};

let question = {
  flag: null,
  answer: null,
  possibility: null,
};

// const vie = [1, 2, 3];
// console.log(vie.length);

const resetQuestion = () => {
  flag = null;
  answer = null;
  possibility = null;
  console.log(question);
};

score.innerHTML = state.point;

const allInput = document.querySelectorAll(`input[name="countrie"]`);

window.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch("https://restcountries.com/v3.1/all");
  const arrayCountries = await response.json();

  generateQuestion(arrayCountries);
});

const generateQuestion = (arrayCountries) => {
  createQuestion(arrayCountries, question);
};

const createQuestion = (arrayCountries) => {
  const random = Math.floor(Math.random() * arrayCountries.length);

  const countrie = arrayCountries[random];

  const possibility = [];
  for (let index = 0; index < 3; index++) {
    const otherCountrie =
      arrayCountries[Math.floor(Math.random() * arrayCountries.length)];
    possibility.push(otherCountrie.translations.fra.common);
  }
  possibility.push(countrie.translations.fra.common);
  possibility.sort();

  question = {
    flag: countrie.flags.png,
    answer: countrie.translations.fra.common,
    possibility,
  };
  console.log(question);
  questionCard(question);

  allInput.forEach((input) => {
    input.addEventListener("click", () => {
      if (input.value === question.answer) {
        state.point++;
        score.innerHTML = state.point;
        console.log("bon");
        question = {
          flag: null,
          answer: null,
          possibility: null,
        };
        console.log(question);
        const random = Math.floor(Math.random() * arrayCountries.length);

        const countrie = arrayCountries[random];

        const possibility = [];
        for (let index = 0; index < 3; index++) {
          const otherCountrie =
            arrayCountries[Math.floor(Math.random() * arrayCountries.length)];
          possibility.push(otherCountrie.translations.fra.common);
        }
        possibility.push(countrie.translations.fra.common);
        possibility.sort();

        question = {
          flag: countrie.flags.png,
          answer: countrie.translations.fra.common,
          possibility,
        };
        questionCard(question);
      } else {
        console.log("faux");
      }
    });
  });
};

const questionCard = ({ flag, possibility }) => {
  imgFlag.setAttribute("src", flag);

  answer1.innerHTML = possibility[0];
  input1.setAttribute("value", possibility[0]);

  answer2.innerHTML = possibility[1];
  input2.setAttribute("value", possibility[1]);

  answer3.innerHTML = possibility[2];
  input3.setAttribute("value", possibility[2]);

  answer4.innerHTML = possibility[3];
  input4.setAttribute("value", possibility[3]);
};
