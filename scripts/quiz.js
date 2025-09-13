// ---------------------------------------------------------------------------
// declaring variables
// ---------------------------------------------------------------------------

// A tiny set of questions. Keep answer as the zero-based index.
const data = [
  {
    prompt: "Mooncakes are...",
    options: ["DELICIOUS", "Not nice", "I don't want to get fat"],
    answer: 0,
    fact: "Mooncakes are delish~",
  },

  {
    prompt: "What does the full moon symbolize during Mid-Autumn?",
    options: ["Prosperity", "Reunion", "Competition"],
    answer: 1,
    fact: "Families gather to feel close under the full moon.",
  },

  {
    prompt: "How much calories does a one salted egg yolk contains?",
    options: ["1250", "460", "790"],
    answer: 2,
    fact: "Its nice and all but don't eat too much unless you're bulking :D",
  },

  {
    prompt: "Traditional mooncakes are...",
    options: [
      "Baked pastries with fillings",
      "Frozen desserts",
      "Savory pancakes",
    ],
    answer: 0,
    fact: "Common fillings include lotus paste and salted egg yolk",
  },

  {
    prompt: "Lanterns often represent...",
    options: ["Hope and guidance", "Wealth", "Weather"],
    answer: 0,
    fact: "lantern walks are about wishes and guidance.",
  },
];

// 1) Cache the element we'll touch repeatedly
const qNum = document.getElementById("qNum");
const qTotal = document.getElementById("qTotal");
const promptEl = document.getElementById("prompt");
const choices = document.getElementById("choices");
const result = document.getElementById("result");
const nextBtn = document.getElementById("next");

// 2) Basic state
let i = 0;
let score = 0;

// 3) Show total count immediately
qTotal.textContent = data.length;

// ----------------------------------------------------------------------------
// functions
// ----------------------------------------------------------------------------

// 4) Render the current question and build the option buttons.
function render() {
  const q = data[i];

  // Header info
  qNum.textContent = i + 1;
  promptEl.textContent = q.prompt;

  // Clear old stuff so that when we switch to a new question, the leftover UI from previous question wont be there
  result.textContent = "";
  nextBtn.classList.add("d-none");
  choices.innerHTML = "";

  // Build buttons using Bootstrap styles. This will go to the id choices in html
  q.options.forEach((text, id) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "btn btn-outline-light text-start";
    btn.textContent = text;
    btn.addEventListener("click", () => onPick(id));
    choices.appendChild(btn);
  });
}

function onPick(chosenId) {
  const q = data[i];
  const buttons = [...choices.children]; // converting the collection of answer elements into an array

  // 1) Lock all buttons so they can't spam guesses
  buttons.forEach((b) => (b.disabled = true));

  // 2) Check correctness and show feedback text
  const isCorrect = chosenId === q.answer;

  if (isCorrect) {
    score++;
    result.textContent = `Correct~ ${q.fact}`;
  } else {
    result.innerHTML = `Nope. Answer: ${q.options[q.answer]}. ${q.fact}`;
  }

  // 3) Color the buttons using Boostrap
  buttons.forEach((btn, id) => {
    btn.classList.remove("btn-outline-light");
    if (id === q.answer) btn.classList.add("btn-success");
    else if (id === chosenId) btn.classList.add("btn-danger");
    else btn.classList.add("btn-outline-secondary");
  });

  // 4) Reveal the Next button with the right label
  nextBtn.textContent = i === data.length - 1 ? "See result" : "Next";
  nextBtn.classList.remove("d-none");
}

nextBtn.addEventListener("click", () => {
  // If not at the last question, move forward and redraw
  if (i < data.length - 1) {
    i++;
    render();
    return;
  }

  promptEl.textContent = "Quiz complete!";
  choices.innerHTML = "";
  result.textContent = `Score: ${score}/${data.length}`;
  nextBtn.classList.add("d-none"); // hide Next so users don't keep messing with it

  // Adding restart feature
  const restart = document.createElement("button");
  restart.id = "restartBtn";
  restart.textContent = "Restart";
  restart.className = "btn btn-warning p-2 mt-2";
  restart.addEventListener("click", () => {
    i = 0;
    score = 0;
    render();
    restart.remove();
  });
  // document.querySelector("#quizSection .card-body").appendChild(restart);
});

// ----------------------------------------------------------------------------
// calling functions
// ----------------------------------------------------------------------------
render();
