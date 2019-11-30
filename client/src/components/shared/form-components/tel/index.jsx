import React from "react";

import "../base.scss";
import "./styles.scss";

const TelInput = props => {
  const { valid, touched, prefix, label, isDisabled, ...restProps } = props;

  let formControl = "form-control";
  let formGroup =
    "form-group " +
    props.name +
    " " +
    (props.prefix ? " prefixed-control " : " ");

  if (touched && !valid) {
    formControl = "form-control control-error";
  }

  return (
    <div className={formGroup}>
      {label && <div className="form-control-label ts-sm">{label}</div>}
      {prefix && <div className="prefix-input ts-md">{prefix}</div>}
      <input
        type="tel"
        className={formControl + " ts-md"}
        disabled={isDisabled}
        {...restProps}
      />
    </div>
  );
};

export default TelInput;
