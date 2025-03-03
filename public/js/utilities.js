// return a random integer between in range (a, b)
export function randomInt(a, b) {
  return floor(random(a, b));
}

// return a random color (expects colorMode(RGB, 255))
export function randomColor() {
  return color(randomInt(0, 255), randomInt(0, 255), randomInt(0, 255));
}

// returns a random color base on noise inputs
export function noiseColor(a = 0, b = 0, c = 0) {
  return color(
    //
    noise(a, b, c + 100) * 255,
    noise(a, b, c + 200) * 255,
    noise(a, b, c + 300) * 255
  );
}

export function makeId() {
  // 1. Math.random() creates a random number between 0 and 1 (0.123456789)
  // 2. toString(36) converts the number to base-36 (0-9 and a-z) (0.4fzyo6ny8)
  // 3. substring(2, 9) takes 7 characters starting after "0." (4fzyo6n)
  return Math.random().toString(36).substring(2, 9);
}
