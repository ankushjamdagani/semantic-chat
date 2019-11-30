import React, { Component } from "react";
import "./styles.scss";

import { EmailInput, PasswordInput, Validator } from "__COMPONENTS/shared/";

// status - "", "submitting", "submitted"
export default class LoginForm extends Component {
  state = {
    status: "",
    formIsValid: false,
    formControls: {
      email: {
        value: "",
        placeholder: "Enter your email...",
        label: "Email",
        valid: false,
        validationRules: {
          isRequired: true,
          isEmail: true
        },
        touched: false
      },
      password: {
        value: "",
        placeholder: "*********",
        label: "Password",
        valid: false,
        validationRules: {
          minLength: 6,
          maxLength: 15,
          isRequired: true
        },
        touched: false
      }
    }
  };

  changeHandler = event => {
    const name = event.target.name;
    const value = event.target.value;

    const updatedControls = {
      ...this.state.formControls
    };
    const updatedFormElement = {
      ...updatedControls[name]
    };
    updatedFormElement.value = value;
    updatedFormElement.touched = true;
    updatedFormElement.valid = Validator(
      value,
      updatedFormElement.validationRules
    );

    updatedControls[name] = updatedFormElement;

    let formIsValid = !(Object.values(updatedControls).filter(x => !x.valid).length);

    this.setState({
      formControls: updatedControls,
      formIsValid: formIsValid
    });
  };

  formSubmitHandler = () => {
    const { onSubmit } = this.props;
    const formData = {};
    for (let formElementId in this.state.formControls) {
      formData[formElementId] = this.state.formControls[formElementId].value;
    }

    this.setState({
      status: "submitting"
    });

    onSubmit(formData);
  };

  render = () => {
    return (
      <div className="form-component login__form-component border-color-3 clearfix">
        <div className="form-inputs login__form-inputs">
          <EmailInput
            name="email"
            placeholder={this.state.formControls.email.placeholder}
            value={this.state.formControls.email.value}
            onChange={this.changeHandler}
            touched={this.state.formControls.email.touched}
            valid={this.state.formControls.email.valid}
            label={this.state.formControls.email.label}
            isDisabled={this.state.status === "submitting"}
          />
          <PasswordInput
            name="password"
            placeholder={this.state.formControls.password.placeholder}
            value={this.state.formControls.password.value}
            onChange={this.changeHandler}
            touched={this.state.formControls.password.touched}
            valid={this.state.formControls.password.valid}
            label={this.state.formControls.password.label}
            isDisabled={this.state.status === "submitting"}
          />
        </div>

        <div
          className={
            "btn btn__block btn__color-3__filled submit-btn " +
            (this.state.formIsValid ? "" : " disabled ") + 
            (this.state.status == "submitting" ? " loading " : "")
          }
          onClick={this.formSubmitHandler}
        >
          <div className="btn-text">
            {this.state.status == "submitting" ? (
              <span>Please wait...</span>
            ) : (
              <span>Login </span>
            )}
          </div>
        </div>
      </div>
    );
  };
}
