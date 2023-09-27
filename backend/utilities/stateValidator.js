export const isStateEmpty = (...args) => {
  return new Promise((resolve, reject) => {
    const state = args.some(
      (arg) => arg === undefined || arg === "" || arg === null
    );

    if (state) {
      reject(new Error("All fields are required"));
    } else {
      resolve();
    }
  });
};

export const isLengthValid = (field, state, length) => {
  return new Promise((resolve, reject) => {
    if (state.length < length) {
      reject(
        new Error(`${field} too short, must be atleast ${length} characters`)
      );
    } else {
      resolve();
    }
  });
};
