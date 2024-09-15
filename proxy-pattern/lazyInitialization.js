class ExpensiveObject {
  constructor() {
    console.log("ExpensiveObject created");
    this.data = new Array(1000).fill("Some data");
  }

  getData() {
    return this.data;
  }
}

const lazyExpensiveObject = new Proxy(
  {},
  {
    get(target, prop) {
      console.log({ target, prop });
      if (!target.instance) {
        target.instance = new ExpensiveObject();
      }

      return target.instance[prop];
    },
  },
);

console.log("Before accessing data");
console.log(lazyExpensiveObject.getData());

console.log("After accessing data");
