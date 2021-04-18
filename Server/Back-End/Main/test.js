// #region Fisher–Yates shuffle Algortihm
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
// #endregion

const first_name = "Fouad";
const last_name = "Abdeen";

const FN = first_name.slice(0, 2);
const LN = last_name.slice(0, 2);

// Use moment.js instead (to format the date in an better way).
const DATE = "2017-12-14T16:34"
  .split("")
  .filter((v) => v !== "-" && v !== ":")
  .join("");

const CH1 = "ABCDEGHIJKLM".slice(0, FN.length);
const CH2 = "nopqrstuvwxyz".slice(0, LN.length);

let RANDOM = Math.random().toString();

if (RANDOM.length % 2 === 0) {
  RANDOM = RANDOM.slice(16);
} else {
  RANDOM = RANDOM.slice(15);
}

console.log(CH1 + FN + DATE + CH2 + LN + RANDOM);

// You can use "Fisher–Yates shuffle" Algortihm to shuffle the array
console.log(
  `Password Reset: ${(CH1 + FN + DATE + CH2 + LN + RANDOM)
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("")}`
);
console.log(
  `Verification: ${(CH1 + FN + DATE + CH2 + LN + RANDOM)
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("")}`
);
