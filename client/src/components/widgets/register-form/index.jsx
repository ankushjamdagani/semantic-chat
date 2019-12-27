import React, { Component } from "react";
import "./styles.scss";

import { Status } from "__CONSTANTS";

import {
  EmailInput,
  PasswordInput,
  TelInput,
  TextInput,
  Validator
} from "__COMPONENTS/shared/";

export default class RegisterForm extends Component {
  state = {
    formIsValid: false,
    formTouched: false,
    formControls: {
      username: {
        value: "",
        placeholder: "",
        label: "Username",
        valid: false,
        validationRules: {
          isRequired: true,
          minLength: 3,
          maxLength: 15
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
      },
      email: {
        value: "",
        placeholder: "",
        label: "Email",
        valid: false,
        validationRules: {
          isRequired: true,
          isEmail: true
        },
        touched: false
      },
      phone: {
        value: "",
        placeholder: "",
        label: "Phone",
        prefix: "+91",
        valid: false,
        validationRules: {
          minLength: 10,
          maxLength: 10,
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
      formIsValid: formIsValid,
      formTouched: true
    });
  };

  formSubmitHandler = () => {
    const { onSubmit } = this.props;
    const formData = {};
    for (let formElementId in this.state.formControls) {
      formData[formElementId] = this.state.formControls[formElementId].value;
    }

    this.setState({
      formTouched: false
    });

    onSubmit(formData);
  };

  render = () => {
    const { submissionData, status, goToLoginView } = this.props;

    // if(status === Status.SUCCESS) {
    //   return (
    //     <div className="form-component register__form-component border-color-3 clearfix">
    //       Successfull!!!
    //     </div>
    //   )
    // }

    return (
      <div className="widget__container register-form__container">
        <div className="widget__container-inner">
          <div className="widget__body register-form__body clearfix">
            <div className="form-inputs register-form__inputs">
              <TextInput
                name="username"
                placeholder={this.state.formControls.username.placeholder}
                value={this.state.formControls.username.value}
                onChange={this.changeHandler}
                touched={this.state.formControls.username.touched}
                valid={this.state.formControls.username.valid}
                label={this.state.formControls.username.label}
                isDisabled={status === Status.LOADING}
              />
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
              <TelInput
                name="phone"
                placeholder={this.state.formControls.phone.placeholder}
                value={this.state.formControls.phone.value}
                onChange={this.changeHandler}
                touched={this.state.formControls.phone.touched}
                valid={this.state.formControls.phone.valid}
                label={this.state.formControls.phone.label}
                prefix={this.state.formControls.phone.prefix}
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
                "btn btn__block btn__green__filled submit-btn " +
                (!this.state.formIsValid ||
                (!this.state.formTouched && status === Status.ERROR)
                  ? " disabled "
                  : "") +
                (status === Status.LOADING ? " loading " : "")
              }
              onClick={this.formSubmitHandler}
            >
              <div className="btn-text">
                {status === Status.LOADING ? (
                  <span>Please wait...</span>
                ) : (
                  <span>Register </span>
                )}
              </div>
            </div>

            <div className="alternate-options__container">
              <div className="line-seperator__container">
                <div className="line-seperator__body bg-grey-5">
                  <div className="ts-md">or</div>
                </div>
              </div>
              <div className="alternate-options__body">
                <div className="signin-info__block">
                  <span className="ts-sm">Have an account? </span>
                  <a
                    className="ts-sm tc-color-3 tw-heavy bg-color-4-alpha"
                    onClick={goToLoginView}
                  >
                    Sign In
                  </a>
                </div>
              </div>
            </div>

            {status === Status.ERROR ? (
              <div className="register-form__error-block">
                <div className="register-form__error-text ts-sm">
                  {submissionData.toString()}
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  };
}
