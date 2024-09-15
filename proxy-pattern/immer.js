function produce(baseState, producer) {
  const proxies = new Map();
  const copies = new Map();

  const handler = {
    get(target, prop) {
      if (copies.has(target)) {
        return copies.get(target)[prop];
      }
      const value = target[prop];
      if (typeof value === "object" && value !== null) {
        if (!proxies.has(value)) {
          proxies.set(value, new Proxy(value, handler));
        }
        return proxies.get(value);
      }
      return value;
    },

    set(target, prop, value) {
      if (!copies.has(target)) {
        copies.set(
          target,
          Array.isArray(target) ? target.slice() : { ...target },
        );
      }
      copies.get(target)[prop] = value;
      return true;
    },
  };

  const proxy = new Proxy(baseState, handler);
  producer(proxy);

  function finalize(oldObject, copies) {
    const newObject = structuredClone(oldObject);

    for (const [key, value] of copies.entries()) {
      for (const prop in oldObject) {
        if (JSON.stringify(oldObject[prop]) === JSON.stringify(key)) {
          newObject[prop] = value;
        }
      }
    }

    return newObject;
  }

  return finalize(baseState, copies);
}

// Example usage
const baseState = {
  user: {
    name: "John Doe",
    age: 30,
  },
  items: ["item1", "item2"],
};

const nextState = produce(baseState, (draft) => {
  draft.user.age = 31;
  draft.items.push("item3");
});

console.log(baseState); // Original state remains unchanged
console.log(nextState); // New state with changes
