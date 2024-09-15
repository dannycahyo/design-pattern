const observers = [];

export const Observer = Object.freeze({
  notify: (data) => {
    observers.forEach((observer) => observer(data));
  },
  subscribe: (func) => {
    observers.push(func);
  },
  unsubscribe: (func) => {
    const unsubscribeIndex = observers.indexOf(func);
    if (unsubscribeIndex !== -1) {
      const totalDelete = 1;
      observers.splice(unsubscribeIndex, totalDelete);
    }
  },
});

function sendAnalyticsToGoogle(data) {
  console.log("Sending data to google", data);
}

function sendAnalyticsToFacebook(data) {
  console.log("Sending data to facebook", data);
}

function sendAnalyticsToTwitter(data) {
  console.log("Sending data to twitter", data);
}

Observer.subscribe(sendAnalyticsToGoogle);
Observer.subscribe(sendAnalyticsToFacebook);
Observer.subscribe(sendAnalyticsToTwitter);

Observer.notify("User logged in");

Observer.unsubscribe(sendAnalyticsToFacebook);

Observer.notify("User logged out");
