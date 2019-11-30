import React, { Component } from "react";
import "./styles.scss";

import {
  EmailInput,
  RadioInput,
  SelectInput,
  TelInput,
  TextInput,
  Validator
} from "__COMPONENTS/shared/";

export default class FormComponent extends Component {
  state = {
    formIsValid: false,
    formControls: {
      name: {
        value: "",
        placeholder: "",
        label: "Ваше Имя",
        valid: false,

        validationRules: {
          minLength: 4,
          isRequired: true
        },
        touched: false
      },
      preferredChannel: {
        value: "",
        placeholder: "",
        label: "Как вам удобнее общаться?",
        valid: false,
        touched: false,
        validationRules: {
          isRequired: true
        },
        options: [
          { value: "viber", displayValue: "Viber" },
          { value: "telegram", displayValue: "Telegram" },
          { value: "email", displayValue: "Email" },
          { value: "phone", displayValue: "Телефон" }
        ]
      },
      phone: {
        value: "",
        placeholder: "",
        label: "Телефон",
        valid: false,
        prefix: "+380",
        validationRules: {
          minLength: 10,
          maxLength: 10,
          isRequired: true
        },
        touched: false
      },
      email: {
        value: "",
        placeholder: "test@example.com",
        label: "Email",
        valid: false,
        validationRules: {
          isRequired: true,
          isEmail: true
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

    let formIsValid =
      updatedControls.email.value || updatedControls.phone.value;

    this.setState({
      formControls: updatedControls,
      formIsValid: formIsValid
    });
  };

  formSubmitHandler = () => {
    const formData = {};
    for (let formElementId in this.state.formControls) {
      formData[formElementId] = this.state.formControls[formElementId].value;
    }

    this.setState({
      status: "submitting"
    });

    fetch("/api/contact-us", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    }).then(() =>
      this.setState({
        status: "submitted"
      })
    );
  };

  render = () => {
    if (this.state.status == "submitted") {
      return (
        <div className="form-component contact-form-component">
          <div className="contact-form-thankyou ts-h3">
            Спасибо! Мы в ближайшее время с вами свяжемся.
          </div>
        </div>
      );
    } else {
      return (
        <div className="form-component contact-form-component clearfix">
          <div className="contact-form-inputs">
            <TextInput
              name="name"
              placeholder={this.state.formControls.name.placeholder}
              value={this.state.formControls.name.value}
              onChange={this.changeHandler}
              touched={this.state.formControls.name.touched}
              valid={this.state.formControls.name.valid}
              label={this.state.formControls.name.label}
            />

            <RadioInput
              name="preferredChannel"
              value={this.state.formControls.preferredChannel.value}
              onChange={this.changeHandler}
              options={this.state.formControls.preferredChannel.options}
              touched={this.state.formControls.preferredChannel.touched}
              valid={this.state.formControls.preferredChannel.valid}
              label={this.state.formControls.preferredChannel.label}
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
              isDisabled={
                !this.state.formControls.preferredChannel.value ||
                this.state.formControls.preferredChannel.value == "email"
              }
            />

            <EmailInput
              name="email"
              placeholder={this.state.formControls.email.placeholder}
              value={this.state.formControls.email.value}
              onChange={this.changeHandler}
              touched={this.state.formControls.email.touched}
              valid={this.state.formControls.email.valid}
              label={this.state.formControls.email.label}
              isDisabled={
                !this.state.formControls.preferredChannel.value ||
                this.state.formControls.preferredChannel.value != "email"
              }
            />
          </div>

          <div
            className={
              "btn btn-block btn-yellow-filled submit-btn " +
              (this.state.formIsValid ? "" : "disabled")
            }
            onClick={this.formSubmitHandler}
          >
            <div className="btn-text">
              {this.state.status == "submitting" ? (
                <span>Отправляем...</span>
              ) : (
                <span>
                  Отправить{" "}
                  {this.state.formIsValid ? "" : "(нужен email или телефон)"}
                </span>
              )}
            </div>
          </div>
        </div>
      );
    }
  };
}
