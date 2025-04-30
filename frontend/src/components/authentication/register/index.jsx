import React from "react";
import CreateUpdateForm from "../../shared/forms/create-update-form";
import { useUserRegisterMutation } from "../../../api/users";

const formfields = [
  {
    fieldName: "first_name",
    label: "first name",
    placeholder: "Please enter first name",
  },
  {
    fieldName: "last_name",
    label: "last name",
    placeholder: "Please enter last name",
  },
  {
    fieldName: "email",
    label: "email",
    placeholder: "Please enter user email",
  },
  {
    fieldName: "date_of_birth",
    label: "date of birth",
    placeholder: "Please enter your date of birth",
  },
  {
    fieldName: "img_src",
    label: "profile pic",
    placeholder: "Please enter profile pic URL",
  },
  {
    fieldName: "password",
    label: "password",
    placeholder: "Please enter a password",
  },
  {
    fieldName: "password_confirmation",
    label: "password confirmation",
    placeholder: "Please re-enter password",
  },
];

const Register = () => {
  const [register] = useUserRegisterMutation();

  return (
    <CreateUpdateForm
      title="register"
      formfields={formfields}
      callback={register}
      alertText="user registered"
    />
  );
};

export default Register;
