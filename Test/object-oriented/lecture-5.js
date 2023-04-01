// bind
function printName() {
  console.log("name ->", this.name);
}

const person = {
  name: "jonas",
};

const fun = printName.bind(person);
fun();

// call
const pizza = {
  name: "pepperoni pizza",
  cost: 100,
};

function vat(amount) {
  return this.cost * (1 + amount / 100);
}

const res = vat.call(pizza, 50);
console.log(res);

// apply

const cpu = {
  core: 2,
  clock: 2.5,
};

function threads(c1, c2, c3, c4) {
  console.log(c1 + c2 + c3 + c4);
}

threads.apply(cpu, [1.2, 2.4, 1.3, 2.6]);
