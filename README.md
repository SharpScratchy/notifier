# 📦 @sharpscratchy/notifier

In a lot of application, some values needs to be accessed from multiple services and always be up to date.

With `notifier` you can **subscribe** on a specific value **multiple times**, and **propagate change** to all subscriptions **when the value is updated** through callbacks.

# ➕ Installation

```
npm install --save @sharpscratchy/notifier
```

# 🔧 Usage

```js
const notifer = require("@sharpscratchy/notifier");
const service = require("<your-service>");

const [subscribeToValue, setValue] = notifier.create("default");

// Each time setValue is called with new value, print in console.log
const unsubscribeConsole = subscribeToValue((value) => console.log(value));

// Each time setValue is called with new value, update a service
const unsubscribeService = subscribeToValue((value) => service.update(value));

// Print 'foo' in console.log
// Update the service
setValue("foo");

unsubscribeConsole();

// Only update the service since console callback have unsubscribed
setValue("bar");
```
