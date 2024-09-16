class Person {
  constructor(builder) {
    this.name = builder.name;
    this.city = builder.city;
    this.jobs = builder.jobs;
  }

  static get Builder() {
    class Builder {
      constructor() {
        this.jobs = [];
      }

      name(name) {
        this.name = name;
        return this;
      }

      city(city) {
        this.city = city;
        return this;
      }

      job(job) {
        this.jobs.push(job);
        return this;
      }

      build() {
        return new Person(this);
      }
    }
    return Builder;
  }

  show() {
    console.log(`Name: ${this.name}`);
    console.log(`City: ${this.city}`);
    console.log(`Jobs: ${this.jobs.join(", ")}`);
  }
}

// Usage

const person = new Person.Builder()
  .name("John")
  .city("New York")
  .job("Developer")
  .job("Designer")
  .build();

person.show();
