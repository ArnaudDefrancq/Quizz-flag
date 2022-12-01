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
const numberLife = document.getElementById("number-life");

let state = {
  point: 0,
};

let question = {
  flag: null,
  answer: null,
  possibility: null,
};

const life = {
  life: 3,
};
score.innerHTML = state.point;
numberLife.innerHTML = life.life;

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
  createOneQuestion(arrayCountries);

  questionCard(question);

  allInput.forEach((input) => {
    input.addEventListener("click", () => {
      if (input.value === question.answer) {
        state.point++;
        score.innerHTML = state.point;
        createOneQuestion(arrayCountries);
        questionCard(question);
      } else {
        deleteLife();
        if (life.life === 0) {
          numberLife.innerHTML = life.life;
        } else if (life.life < 0) {
          alert(`Vous avez trouvé ${state.point} pays`);
          location.reload();
        } else {
          numberLife.innerHTML = life.life;
          console.log(life.life);
        }
      }
    });
  });
};

const createOneQuestion = (arrayCountries) => {
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

const deleteLife = () => {
  life.life--;
};
