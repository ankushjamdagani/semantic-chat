import React from "react";

import "../base.scss";
import "./styles.scss";

const TextInput = props => {
  const { valid, touched, label, isDisabled, ...restProps } = props;

  let formControl = "form-control";
  let formGroup = "form-group " + props.name;

  if (touched && !valid) {
    formControl = "form-control control-error";
  }

  return (
    <div className={formGroup}>
      {label && <div className="form-control-label ts-sm">{label}</div>}
      <input
        type="text"
        className={formControl + " ts-md"}
        disabled={isDisabled}
        {...restProps}
      />
    </div>
  );
};

export default TextInput;
