let shared, me, guests;

let headlineIndex = 0;
let articles = [];
let chosenWord = "____";
const numArticles = 5;

function preload() {
  partyConnect("wss://demoserver.p5party.org", "headlines_game");
  shared = partyLoadShared("globals");
  me = partyLoadMyShared();
  guests = partyLoadGuestShareds();
}

function setup() {
  noCanvas();
  me.headline = {};
  me.points = 0;
  shared.leaderboardHtml = "";
  shared.state = "start";

  select("#next").mousePressed(() => {
    if (chosenWord === "____" || headlineIndex >= numArticles) {
      return;
    }
    if (chosenWord === articles[headlineIndex].word) {
      me.points++;
    }
    chosenWord = "____";
    headlineIndex++;
    me.headline = articles[headlineIndex];
  });

  if (partyIsHost()) {
    select("#startGame").mousePressed(startGame);
  }

  guests.forEach((guest, index) => {
    shared.leaderboardHtml += `<div class="guestScore">Guest ${index + 1}: ${
      guest.points
    }</div>`;
  });
}

function draw() {
  if (shared.state === "start") {
    select("#start").style("display", "block");
    select("#game").style("display", "none");
  } else if (shared.state === "playing") {
    select("#start").style("display", "none");
    select("#game").style("display", "block");
  }

  if (headlineIndex < numArticles) {
    select("#headline").html(
      me.headline?.article?.replace(
        "____",
        `<span class="answer">${chosenWord}</span>`
      )
    );
  } else {
    select("#headline").html(`Game Over! You scored ${me.points} points!`);
    select("#optionsCont").remove();
    select("#next").remove();
    select("#seeScores")
      .style("display", "block")
      .mousePressed(() => {
        select("#headline").remove();
        select("#seeScores").remove();
        select("#leaderboard").style("display", "block");
      });
  }

  select("#scores").html(shared.leaderboardHtml);

  const guestScores = selectAll(".guestScore");
  guests.forEach((guest, index) => {
    guestScores[index].html(`Guest ${index + 1}: ${guest.points}`);
  });
}

function fetchHeadlines() {
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
      articles = shuffle(responseArr);
      me.headline = articles[headlineIndex];
    });
}

function startGame() {
  shared.state = "playing";
  fetchHeadlines();
}
