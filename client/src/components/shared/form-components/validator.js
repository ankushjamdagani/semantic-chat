const Validator = (value, rules) => {
  let isValid = true;

  for (let rule in rules) {
    switch (rule) {
      case "minLength": {
        isValid = isValid && minLengthValidator(value, rules[rule]);
        break;
      }
      default: {
        isValid = true;
      }
    }
  }

  return isValid;
};

/**
 * minLength Val
 * @param  value
 * @param  minLength
 * @return
 */
const minLengthValidator = (value, minLength) => {
  return value.length >= minLength;
};

export default Validator;
