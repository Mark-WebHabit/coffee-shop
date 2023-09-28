export const clearState = (setter, getter) => {
  Object.keys(getter).forEach((key) => {
    setter((oldValue) => ({ ...oldValue, [key]: "" }));
  });
};

export const stateLengthValidator = (state, length) => {
  if (state.length < length) {
    return false;
  }
  return true;
};

export const handleStateChange = (setter, field, val) => {
  setter((oldValue) => ({ ...oldValue, [field]: val }));
};
