export function scorePassword(pass) {
  let score = 0;
  if (!pass) {
    return score;
  }
  const variations = {
    digits: /\d/.test(pass),
    lower: /[a-z]/.test(pass),
    upper: /[A-Z]/.test(pass),
    nonWords: /\W/.test(pass),
  };

  let variationCount = 0;
  for (var check in variations) {
    variationCount += variations[check] === true ? 1 : 0;
  }
  score += variationCount * 10;

  return parseInt(score);
}
