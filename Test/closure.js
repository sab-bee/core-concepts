/**
 * how to protect your girlfriend from her ex
 */

/** this is your girlfriend
 * she has 5% love for you
 */
let yourGf = {
  boyfriend: "you",
  sheLovesYou: true,
  lovePercentage: 5,
};

/**
 * every time u give her a rose
 * percentage of loves increases by 2 times
 */
function giveHerRose() {
  return (yourGf.lovePercentage *= 2);
}
/**
 * while you are giving rose daily
 * and increasing love
 */

console.log("love", giveHerRose(), "%"); //love 10%
console.log("love", giveHerRose(), "%"); //love 20%
console.log("love", giveHerRose(), "%"); //love 40%

/**
 * meanwhile her ex comes back with a manipulate spell
 * and started to manipulate her
 * which complitely destroys your relationship
 */

(function manipulateByEx() {
  yourGf.boyfriend = null;
  yourGf.sheLovesYou = false;
  yourGf.lovePercentage = 0;
})();

/**
 * at this moment sure you can give her rose daily
 * but that wont change anything...
 * basically you are doomed bro!
 */
console.log("love", giveHerRose(), "%"); //love 0%
console.log("love", giveHerRose(), "%"); //love 0%
console.log("love", giveHerRose(), "%"); //love 0%

/**
 * so, how can you protect your gf
 * introducing marriage(closure)
 */

/**
 * first of all dont leave er at global scope.
 * put her into your private scope
 * for that you need to marry her
 */

function married() {
  let wife = {
    husband: "you",
    sheLovesYou: true,
    lovePercentage: 5,
  };

  return function giveHerRose() {
    return (wife.lovePercentage *= 2);
  };
}

const dailyRose = married();
console.log("love percentage " + dailyRose() + "%"); //love percentage 10%
console.log("love percentage " + dailyRose() + "%"); //love percentage 20%

/**
 * lets see if ex can manipulate her now
 */
(function manipulateAtSteroid() {
  try {
    wife.boyfriend = null;
    wife.sheLovesYou = false;
    wife.lovePercentage = 0;
  } catch (e) {
    console.log("idiot you cant manipulate others wife"); // idiot you cant manipulate others wife
  }
})();

/**
 * as u can see it did not work...ur gf is protected now
 * and u have passed 100% love scale
 */

console.log("love percentage " + dailyRose() + "%"); //love percentage 40%
console.log("love percentage " + dailyRose() + "%"); //love percentage 80%
console.log("love percentage " + dailyRose() + "%"); //love percentage 160%
