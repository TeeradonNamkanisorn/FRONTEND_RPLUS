import validator from "validator";

export const isEmail = (string) => {
  return validator.isEmail(string);
};

export const isEmpty = (string) => {
  return validator.isEmpty(string);
};

export const isValidPassword = (string) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/
  return regex.test(string);
}

export const isCreditCard = (string) => validator.isCreditCard(string);

