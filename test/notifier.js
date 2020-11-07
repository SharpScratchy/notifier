const assert = require("assert");
const notifier = require("../src/notifier");

describe("Notifier", () => {
  describe("Given basic creation", () => {
    it("Should return [function, function]", () => {
      const [subscribeToValue, setValue] = notifier.create();

      assert(typeof subscribeToValue === "function");
      assert(typeof setValue === "function");
    });
  });

  describe("Given default value", () => {
    it("Should set value with default on subscription", () => {
      let value;
      const [subscribeToValue, setValue] = notifier.create("default");

      subscribeToValue((v) => (value = v));

      assert(value === "default");
    });
    it("Value can be false", () => {
      let value;
      const [subscribeToValue, setValue] = notifier.create(false);

      subscribeToValue((v) => (value = v));

      assert(value === false);
    });
  });

  describe("Given no default value", () => {
    it("Should set value as null by default on subscription", () => {
      let value;
      const [subscribeToValue, setValue] = notifier.create();

      subscribeToValue((v) => (value = v));

      assert(value === null);
    });
  });

  describe("Given an update with setValue", () => {
    it("Should update by calling callbacks", () => {
      let value;
      const [subscribeToValue, setValue] = notifier.create("default");

      subscribeToValue((v) => (value = v));
      setValue("new value");

      assert(value === "new value");
    });

    it("Should set value with the last value set", () => {
      let value;
      const [subscribeToValue, setValue] = notifier.create("default");

      setValue("new value");
      subscribeToValue((v) => (value = v));

      assert(value === "new value");
    });

    it("Should not call the callback if value is the same", () => {
      let haveBeenCalled = 0;
      const [subscribeToValue, setValue] = notifier.create("default");

      subscribeToValue((v) => ++haveBeenCalled);
      setValue("default");

      assert(haveBeenCalled === 1);
    });
  });

  describe("Given unsubscribe", () => {
    it("Should not update value", () => {
      let value;
      const [subscribeToValue, setValue] = notifier.create("default");
      const unsubscribe = subscribeToValue((v) => (value = v));

      unsubscribe();
      setValue("new value");

      assert(value === "default");
    });
  });
});
