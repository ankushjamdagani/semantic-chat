const Validator = (value, rules) => {
  let isValid = true;
  for (let rule in rules) {
    switch (rule) {
      case "minLength": {
        isValid = isValid && minLengthValidator(value, rules[rule]);
        break;
      }
      case "isRequired": {
        isValid = !!(isValid && value);
        break;
      }
      case "maxLength": {
        isValid = isValid && maxLengthValidator(value, rules[rule]);
        break;
      }
      case "isEmail": {
        isValid = isValid && isEmailValidator(value, rules[rule]);
        break;
      }
      default: {
        isValid = isValid;
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

/**
 * maxLength Val
 * @param  value
 * @param  maxLength
 * @return
 */
const maxLengthValidator = (value, maxLength) => {
  return value.length <= maxLength;
};

/**
 * email Val
 * @param  value
 * @param  isEmail
 * @return
 */
const isEmailValidator = (value, isEmail) => {
  if (isEmail) {
    var patt = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/gi;
    return value && patt.test(value);
  } else {
    // why would I want to check if it's not a valid email??????? WTF????/
    return !value || !patt.test(value);
  }
};

export default Validator;
