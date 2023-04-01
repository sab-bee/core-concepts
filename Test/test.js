function parameter() {
  let nums = [1, 5, 8, 4, 7, 10, 2, 6];

  nums.sort((f, s) => f - s);
  console.log(nums);

  const fun = new Function("", "console.log(arg)");

  // function arity - number of arugument taken by the function
  console.log(fun.length);
}

function overloading() {
  // js does not have function overloading
  // in other language like c++ or java its called method overlaoding
}

function object_methods() {
  let person = {
    name: "shazam",
    sayMyName: function () {
      console.log(this.name + "!");
    },
  };
  console.log(this); // window in browser
  person.sayMyName();

  function greet() {
    console.log("i am ", this.name);
  }
  let dustin = {
    name: "dustin",
    greet: greet,
  };
  let robin = {
    name: "robin",
    greet: greet,
  };
  dustin.greet();
  robin.greet();
  greet();
}

(function this_manipulate() {
  /**
   *  There are three function methods that allow you to
change the value of this. (Remember that functions are objects, and objects can
have methods, so functions can, too.)
   */

  function sayNameForAll(label) {
    console.log(label + ":" + this.name);
  }
  let person1 = {
    name: "jonas",
  };

  let person2 = {
    name: "noah",
  };

  sayNameForAll.call(this, "from global");
  sayNameForAll.call(person1, "from person1");
  sayNameForAll.call(person2, "from person2");

  function allCars(label) {
    console.log(label + ":" + this.brand);
  }

  let ferrari = {
    brand: "ferrari",
  };
  let lamboo = {
    brand: "lambo",
  };

  allCars.apply(this, ["global car"]);
  allCars.apply(ferrari, ["ferrari car"]);
  allCars.apply(lamboo, ["lambo car"]);
});

(function bind() {
  function sayGlobalName(label) {
    console.log(this.name + label);
  }

  let jonas = {
    name: "jonas",
  };
  let nicolas = {
    name: "nicolas",
  };

  let sayJonas = sayGlobalName.bind(jonas);
  sayJonas(" from jonas global bind");

  let sayNicolas = sayGlobalName.bind(nicolas, " from nicolas global bind");
  sayNicolas();
})();
