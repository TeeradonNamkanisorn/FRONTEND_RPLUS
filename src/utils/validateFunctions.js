const validator = require('validator');

export const isEmail = (string) => {
    return validator.isEmail(string);
}

export const isEmpty = (string) => {
    return validator.isEmpty(string)
}

export const isAtLeastLength = (num, string) => {
    return string.length > num;
}

export const hasAtLeastOneUppercase = (string) => {
    const regex = /[a-z]/;
    return regex.test(string);
}

export const hasAtLeaseOneLowercase = (string) => {
    const regex = /[A-Z]/;
    return regex.test(string);
}

