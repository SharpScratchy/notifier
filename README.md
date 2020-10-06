# Package: notifier

In a lot of application, some value needs to be accessed from multiple source and always be up to date.
With `notifier` you can **subscribe** on a specific value **multiple times**, and **propagate change** to all subscriptions when the value is updated.

# Usage

```js
const notifer = require("@sharpscratchy/notifier");

const [subscribeToValue, setValue] = notifier.create("default");
const unsubscribeConsole = subscribeToValue((v) => console.log(v)); // Print 'default' in console.log

setValue("foo"); // Print 'foo' in console.log
unsubscribeConsole();
setValue("bar"); // NO-OP
```
