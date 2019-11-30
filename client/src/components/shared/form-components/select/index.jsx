import React from "react";

import "../base.scss";
import "./styles.scss";

const SelectInput = props => {
  let formControl = "form-control";
  let formGroup = "form-group " + props.name;

  if (props.touched && !props.valid) {
    formControl = "form-control control-error";
  }

  return (
    <div className={formGroup}>
      {props.label && (
        <div className="form-control-label ts-sm">{props.label}</div>
      )}
      <select
        className={formControl + " ts-md"}
        value={props.value}
        onChange={props.onChange}
        name={props.name}
        disabled={props.isDisabled}
      >
        {props.options.map(option => (
          <option value={option.value}>{option.displayValue}</option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
