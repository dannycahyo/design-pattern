class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    throw new Error("This method should be overridden!");
  }
}

class Dog extends Animal {
  speak() {
    return `${this.name} says Woof!`;
  }
}

class Cat extends Animal {
  speak() {
    return `${this.name} says Meow!`;
  }
}

//  Create a factory class that has a method to create objects of the concrete classes
class AnimalFactory {
  static createAnimal(type, name) {
    switch (type) {
      case "dog":
        return new Dog(name);
      case "cat":
        return new Cat(name);
      default:
        throw new Error("Unknown animal type");
    }
  }
}

// Usage
const dog = AnimalFactory.createAnimal("dog", "Buddy");
console.log(dog.speak()); // Buddy says Woof!

const cat = AnimalFactory.createAnimal("cat", "Whiskers");
console.log(cat.speak()); // Whiskers says Meow!
