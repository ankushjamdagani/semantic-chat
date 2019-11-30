import React from "react";

import "../base.scss";
import "./styles.scss";

const RadioInput = props => {
  let formControl = "form-control";
  let formGroup = "form-group form-group-radio " + props.name;

  if (props.touched && !props.valid) {
    formControl = "form-control control-error";
  }

  return (
    <div className={formGroup}>
      {props.label && (
        <div className="form-control-label ts-sm">{props.label}</div>
      )}
      {props.options.map(option => (
        <div className="form-group-item" key={option.value}>
          <label className={`${formControl} ts-sm`}>
            <input
              type="radio"
              name={props.name}
              value={option.value}
              onChange={props.onChange}
              className="ts-sm"
            />
            {option.displayValue}
          </label>
        </div>
      ))}
    </div>
  );
};

export default RadioInput;
