let shared, me;

function preload() {
  partyConnect("wss://demoserver.p5party.org", "headlines");
  shared = partyLoadShared("globals");
  me = partyLoadMyShared();
}

function setup() {
  noCanvas();
  partySetShared(shared, {
    headline: "",
  });

  select("#send").mousePressed(fetchHeadline);
}

function draw() {
  select("#headline").html(shared.headline);
}

function fetchHeadline() {
  fetch("/api/headline")
    .then((response) => response.json())
    .then((responseObj) => {
      shared.headline = responseObj.title;
    });
}
