// deno-lint-ignore-file

let shared;
let guests;

export function preload() {
  // shared should be written ONLY by host
  shared = partyLoadShared("shared", {
    scores: {}, // object of "id: score" pairs
  });

  guests = partyLoadGuestShareds();
}

export function setup() {
  if (!partyIsHost()) return;
}

export function update() {
  if (!partyIsHost()) return;
}
