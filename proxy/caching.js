function expensiveOperation(num) {
  console.log("expensiveOperation is called");
  return num * num;
}

const cache = new Map();

const proxyExpensiveOperation = new Proxy(expensiveOperation, {
  apply(target, thisArg, args) {
    const key = args[0];
    if (cache.has(key)) {
      console.log("Cache hit");
      return cache.get(key);
    }

    const result = Reflect.apply(target, thisArg, args);
    cache.set(key, result);
    console.log("Cache miss");
    return result;
  },
});

console.log(proxyExpensiveOperation(2)); // expensiveOperation is called, 4
console.log(proxyExpensiveOperation(2)); // 4
console.log(proxyExpensiveOperation(2)); // 4
console.log(proxyExpensiveOperation(2)); // 4
