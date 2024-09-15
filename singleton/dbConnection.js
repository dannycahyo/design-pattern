let instance = null;

class DBConnection {
  constructor(uri) {
    if (instance) {
      throw new Error("Only one instance of DBConnection is allowed");
    }

    this.uri = uri;
    instance = this;
  }

  connect() {
    console.log(`Connecting to ${this.uri}`);
  }

  disconnect() {
    console.log(`Disconnecting from ${this.uri}`);
  }
}

export const dbConnection = Object.freeze(
  new DBConnection("mongodb://localhost:27017"),
);
