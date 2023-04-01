const person = {
  name: "jonas",
  age: 25,
  sayMyName: function () {
    console.log("name ->", this.name);
  },
};

console.log(person);
person.sayMyName(); // name -> jonas

const replicaSayMyName = person.sayMyName;
replicaSayMyName(); // name -> undefined

const bindSayMyName = replicaSayMyName.bind(person);
bindSayMyName(); // name -> jonas

function add(num) {
  console.log(this.value + num); // 60
  console.log(this); // {value: 50}
}

var numData = {
  value: 50,
};

add(20); // NaN
const bindAdd = add.bind(numData);
bindAdd(10);

const student_harry = {
  name: "harry",
  print: function () {
    setTimeout(function () {
      console.log(this); // window
      console.log(this.name, "default"); // undefined
    });
  },
};

student_harry.print();
// callback function inside setTimeout refers to window. It has nothing to do it object.

//solve

const bind_student_harry = {
  name: "harry",
  print: function () {
    setTimeout(
      function () {
        console.log(this.name, "with bind");
      }.bind(this)
    );
  },
};

bind_student_harry.print();

const student_jacob = {
  name: "jacob",
  print: function () {
    setTimeout(() => {
      console.log(this); // {"name": "jacob", print: f}
      console.log(this.name, "with arrow callback"); // jacob
    });
  },
};
student_jacob.print();
