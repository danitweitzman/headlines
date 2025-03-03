import { changeScene, scenes } from "./main.js";

export function setup() {
  select("#start").mousePressed(() => {
    changeScene(scenes.play);
  });
}

export function enter() {
  select("#start").style("display", "block");
}

export function exit() {
  select("#start").style("display", "none");
}
