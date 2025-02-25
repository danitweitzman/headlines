let shared, me;

let headlineIndex = 0;
let articles = [];
let chosenWord = "____";
const numArticles = 5;

function preload() {
  partyConnect("wss://demoserver.p5party.org", "headlines");
  shared = partyLoadShared("globals");
  me = partyLoadMyShared();
}

function setup() {
  noCanvas();
  fetchHeadline();
  me.headline = {};
  me.points = 0;

  select("#next").mousePressed(() => {
    if (chosenWord === "____") {
      return;
    }
    if (chosenWord === articles[headlineIndex].word) {
      me.points++;
    }
    chosenWord = "____";
    headlineIndex++;
    me.headline = articles[headlineIndex];
  });
}

function draw() {
  select("#points").html(me.points);
  if (headlineIndex < numArticles) {
    select("#headline").html(me.headline?.article?.replace("____", chosenWord));
  } else {
    select("#headline").html(`Game Over! You scored ${me.points} points!`);
    select("#optionsCont").remove();
  }
}

function fetchHeadline() {
  fetch("/api/headline")
    .then((response) => response.json())
    .then((responseArr) => {
      console.log(responseArr);
      responseArr.forEach((responseObj) => {
        const newButton = createButton(responseObj.word);
        newButton.mousePressed(() => {
          chosenWord = responseObj.word;
          console.log(chosenWord);
        });
        newButton.parent("#optionsCont");
      });
      me.headline = responseArr[headlineIndex];
      articles = responseArr;
    });
}
