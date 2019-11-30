import React, { Component } from "react";
import "./styles.scss";

import {
  Status
} from '__CONSTANTS';

import { EmailInput, PasswordInput, Validator } from "__COMPONENTS/shared/";

export default class LoginForm extends Component {
  state = {
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

    let formIsValid = !Object.values(updatedControls).filter(x => !x.valid)
      .length;

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

    onSubmit(formData);
  };

  render = () => {
    const {
      submissionData,
      status
    } = this.props;

    // if(status === Status.SUCCESS) {
    //   return (
    //     <div className="form-component login__form-component border-color-3 clearfix">
    //       Successfull!!!
    //     </div>
    //   )
    // }

    return (
      <div className="widget__container login-form__container">
        <div className="widget__container-inner">
          <div className="widget__body login-form__body border-color-3 clearfix">
            <div className="form-inputs login-form__inputs">
              <EmailInput
                name="email"
                placeholder={this.state.formControls.email.placeholder}
                value={this.state.formControls.email.value}
                onChange={this.changeHandler}
                touched={this.state.formControls.email.touched}
                valid={this.state.formControls.email.valid}
                label={this.state.formControls.email.label}
                isDisabled={status === Status.LOADING}
              />
              <PasswordInput
                name="password"
                placeholder={this.state.formControls.password.placeholder}
                value={this.state.formControls.password.value}
                onChange={this.changeHandler}
                touched={this.state.formControls.password.touched}
                valid={this.state.formControls.password.valid}
                label={this.state.formControls.password.label}
                isDisabled={status === Status.LOADING}
              />
            </div>

            <div
              className={
                "btn btn__block btn__color-3__filled submit-btn " +
                (this.state.formIsValid ? "" : " disabled ") +
                (status === Status.LOADING ? " loading " : "")
              }
              onClick={this.formSubmitHandler}
            >
              <div className="btn-text">
                {status === Status.LOADING ? (
                  <span>Please wait...</span>
                ) : (
                  <span>Login </span>
                )}
              </div>
            </div>

            { status === Status.ERROR ? (
              <div className="login-form__error-block">
                <div className="login-form__error-text ts-sm">
                  {submissionData}
                </div>
              </div>
            ) : ''}
          </div>
        </div>
      </div>
    );
  };
}
