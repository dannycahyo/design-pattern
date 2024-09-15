class User {
  constructor(firstName, lastName, email) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }

  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  checkLastOnline() {
    console.log("Checking last online...");
  }

  sendEmail() {
    console.log(`Sending email to ${this.email}`);
  }
}

const user1 = new User("John", "Doe", "johndoe@gmail.com");
const user2 = new User("Alice", "Johnson", "alicejohnson@gmail.com");

// the methods are shared between all instances
console.log(user1.checkLastOnline === user2.checkLastOnline); // true
console.log(user1.sendEmail === user2.sendEmail); // true
