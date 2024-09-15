const user = {
  id: 1,
  name: "John Doe",
  isAdmin: false,
  email: "johndoe@google.com",
  age: 25,
};

const proxyUser = new Proxy(user, {
  get(target, prop) {
    if (prop === "isAdmin") {
      return target.isAdmin ? "Admin" : "User";
    }

    return target[prop];
  },
  set(target, prop, value) {
    if (prop === "age") {
      if (typeof value !== "number") {
        throw new Error("Age must be a number");
      }
    }

    if (prop === "email") {
      if (!value.includes("@")) {
        throw new Error("Email must be valid");
      }
    }

    target[prop] = value;
    console.log(`Set ${prop} to ${value}`);
    return true;
  },
});

console.log(proxyUser.isAdmin); // User
// proxyUser.age = "30"; // Error: Age must be a number
proxyUser.age = 30;
