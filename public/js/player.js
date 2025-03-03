// deno-lint-ignore-file

import { makeId } from "./utilities.js";

let me;
let shared;
let guests;

export function preload() {
  me = partyLoadMyShared({
    id: makeId(), // a unique string id
    score: 0,
  });
  // shared should be written ONLY by host
  shared = partyLoadShared("shared");

  guests = partyLoadGuestShareds();
}

export function setup() {}

export function update() {}
