const notifierFactory = () => {
  const create = (defaultValue) => {
    let value = defaultValue !== undefined ? defaultValue : null;
    const callbacks = {};

    const subscribeToValue = (cb) => {
      const id = Math.random();

      cb(value);
      callbacks[id] = cb;

      return () => delete callbacks[id];
    };

    const setValue = (newValue) => {
      value = newValue;
      Object.values(callbacks).forEach((cb) => cb(newValue));
    };

    return [subscribeToValue, setValue];
  };

  return { create };
};

module.exports = notifierFactory();
