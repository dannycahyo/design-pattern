// Subject => This will maintain a list of observers and send notifications when the state changes.

class WeatherStation {
  constructor() {
    this.observers = [];
    this.weatherData = null;
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notify() {
    this.observers.forEach((observer) =>
      observer.update(this.weatherData),
    );
  }

  setWeatherData(data) {
    this.weatherData = data;
    this.notify();
  }
}

//  Observer Interface
class Observer {
  update(data) {
    throw new Error("Observer.update() must be implemented");
  }
}

// Concrete Observers
class PhoneDisplay extends Observer {
  update(data) {
    console.log(`Phone Display: Weather data updated to: ${data}`);
  }
}

class WebDisplay extends Observer {
  update(data) {
    console.log(`Web Display: Weather data updated to: ${data}`);
  }
}

class DesktopDisplay extends Observer {
  update(data) {
    console.log(`Desktop Display: Weather data updated to: ${data}`);
  }
}

// Usage
const weatherStation = new WeatherStation();

const phoneDisplay = new PhoneDisplay();
const webDisplay = new WebDisplay();
const desktopDisplay = new DesktopDisplay();

weatherStation.subscribe(phoneDisplay);
weatherStation.subscribe(webDisplay);
weatherStation.subscribe(desktopDisplay);

weatherStation.setWeatherData("Sunny, 25°C");

weatherStation.unsubscribe(webDisplay);

weatherStation.setWeatherData("Rainy, 18°C");
