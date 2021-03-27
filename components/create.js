console.log("javascript loaded");

const start = document.querySelector("#start");

start.addEventListener("click", handleClick);

function handleClick(event) {
  console.log("start has been clicked");
}

const bars = document.querySelectorAll(".bar");

bars.forEach(element => {
  element.addEventListener("click", handleBarClick);
});

function handleBarClick(event) {
  const qbox = document.getElementById("questions");

  const isAlreadySelected = event.target.classList.contains("selected");

  const allSelected = document.querySelectorAll(".selected");
  allSelected.forEach(element => element.classList.remove("selected"));

  if (qbox) {
    qbox.classList.add("slide-out-animated");
    setTimeout(() => {
      qbox.remove();
    }, 150);
  }
  if (!isAlreadySelected) {
    event.target.classList.add("selected");
    const parent = document.getElementsByClassName("bars")[0];
    createQuestionsBox(event.target, parent);
  }
}

function createQuestionsBox(beforeElement, parent) {
  const box = document.createElement("div");
  box.id = "questions";
  box.classList.add("slide-in-animated");
  for (i = 1; i < 11; i++) {
    createQuestion(
      "Q" +
        i +
        ": Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut",
      box
    );
  }
  parent.insertBefore(box, beforeElement.nextSibling);
}

function createQuestion(text, parent) {
  const question = document.createElement("div");
  question.append(document.createTextNode(text));
  parent.append(question);
}

function createQuestionDetails(text, parent) {
  const details = document.createElement("div");
  details.classList.add("details");
  details.append;
}
