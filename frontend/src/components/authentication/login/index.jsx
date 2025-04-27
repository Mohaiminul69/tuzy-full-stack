import React from "react";
import CreateUpdateForm from "../../shared/forms/create-update-form";
import { useUserLoginMutation } from "../../../api/users";

const formfields = [
  {
    fieldName: "email",
    label: "email",
    placeholder: "Please enter user email",
  },
  {
    fieldName: "password",
    label: "password",
    placeholder: "Please enter a password",
  },
];

const Login = () => {
  const [login] = useUserLoginMutation();

  return (
    <CreateUpdateForm title="login" formfields={formfields} callback={login} />
  );
};

export default Login;

// src="https://img.icons8.com/fluency/50/000000/google-logo.png"
