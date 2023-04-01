(function () {
  function Person(name, age) {
    this.name = name;
    this.age = age;
    this.hello = function () {
      console.log("name ->", this.name);
    };
  }

  const p1 = new Person("peter", 20);
  const p2 = new Person("jack", 20);
  console.log(p1);
  console.log(p2);

  // code duplication. Both p1 and p2 contains separate but same hello function

  // fix

  function Student(name, age) {
    this.name = name;
    this.age = age;
  }

  Student.prototype.hey = function () {
    console.log("hey", this.name);
  };

  console.log(Student.prototype);
  const student_one = new Student("one", 20);
  const student_two = new Student("two", 20);

  console.log(student_one);
  console.log(student_two);

  /**
   * any of the object does not contains hey function
   */

  student_one.hey();
  student_two.hey();

  console.log(student_one.constructor); // student object
  console.log(Student.constructor); // function
  console.log(Student.prototype); // {hey: f, cons: f}
  console.log(student_one.__proto__ === student_two.__proto__); // true
  console.log(student_one.__proto__.hey === student_two.__proto__.hey); // true
});

(function () {
  function Person(name, age) {
    this.name = name;
    this.age = age;
  }

  const jonas = new Person("jonas", 25);
  const martha = new Person("martha", 23);

  console.log(jonas);
  console.log(martha);

  function explore() {
    console.log(this.name, "exploring the world");
  }

  // [[put]] value
  Person.prototype.explore = explore;
  Person.prototype.location = "winden";
  jonas.explore();
  console.log(martha.location);

  // [[set]] value
  jonas.__proto__.location = "los santos";
  console.log(martha.location);
  /**
   * change in jonas locaiton
   * also changes marthats location
   */

  Person.prototype.location = "washington";
  console.log(jonas.location);

  /**
   * changes in both, replace the value in __proto__
   */
});

/**
 * prototype object way
 */

(function () {
  function Pizza(name, cost) {
    this.name = name;
    this.cost = cost;
  }

  // for this stratigy, instance creation should be after the prototype assignment
  Pizza.prototype = {
    bake: function () {
      console.log(this.name, "is baking");
    },
    pay: function () {
      console.log("plsease pay $", this.cost);
    },
  };

  const vegPizza = new Pizza("vegetable pizza", 20);
  const chickenPizza = new Pizza("chicken pizza", 30);

  vegPizza.pay();
  console.log(vegPizza.name);
})();
