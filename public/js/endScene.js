// deno-lint-ignore-file

import { changeScene, scenes } from "./main.js";

let guests;
let shared;

export function preload() {
  shared = partyLoadShared("shared");
  guests = partyLoadGuestShareds();
}

export function enter() {
  select("#end").style("display", "block");
  guests.forEach((guest, index) => {
    const guestDiv = createDiv(`Player ${index + 1}: <span class=${guest.id}>${guest.score}</span>`);
    guestDiv.parent("#scores");
  });
}

export function update() {
  guests.forEach((guest) => {
    select(`.${guest.id}`).html(guest.score);
  });
}

export function exit() {
  select("#end").style("display", "none");
}
