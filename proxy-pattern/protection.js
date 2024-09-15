class SensitiveData {
  constructor() {
    this.data = "Sensitive Data";
  }

  getData() {
    return this.data;
  }
}

const protectionProxy = new Proxy(new SensitiveData(), {
  get(target, prop, receiver) {
    if (prop === "getData" && !receiver.isAdmin) {
      throw new Error("Access denied");
    }
    return target[prop];
  },
});

const admin = { isAdmin: true, __proto__: protectionProxy };
const user = { isAdmin: false, __proto__: protectionProxy };

try {
  console.log(admin.getData()); // Sensitive Data
} catch (e) {
  console.error(e.message);
}

try {
  console.log(user.getData()); // Access denied
} catch (e) {
  console.error(e.message);
}
