import React, { useState, useEffect } from "react";

// components
import FormTemplate from "../components/Templates/FormTemplate";
import Input from "../components/FormInput/Input";
import SubmitButton from "../components/FormInput/SubmitButton";
import AuthRedirect from "../components/FormInput/AuthRedirect";

// utilities
import {
  handleStateChange,
  clearState,
  passwordVerifier,
} from "../utilities/statehandler";

const Register = ({ authPage, handlePage }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    cpass: "",
  });
  const [stateCleared, setStateCleared] = useState(false);

  // state desstructuring
  const { username, email, password, cpass } = formData;

  // handle state change when user type
  const handlechange = (field, val) => {
    handleStateChange(setFormData, field, val);
  };

  const handleStateClear = () => {
    clearState(setFormData, formData);
    setStateCleared(true);
  };

  // automatically set the statecleared to false if it was set to true
  useEffect(() => {
    stateCleared && setStateCleared(false);
  }, [stateCleared]);

  return (
    <FormTemplate pageName={"Register"} show={authPage === "register"}>
      <Input
        label={"Username"}
        value={username}
        handleStateChange={(e) => handlechange("username", e.target.value)}
        stateCleared={stateCleared}
      />
      <Input
        label={"Email"}
        value={email}
        handleStateChange={(e) => handlechange("email", e.target.value)}
        stateCleared={stateCleared}
      />
      <Input
        label={"Password"}
        type="password"
        value={password}
        handleStateChange={(e) => handlechange("password", e.target.value)}
        stateCleared={stateCleared}
      />
      <Input
        label={"Confirm Password"}
        type="password"
        value={cpass}
        handleStateChange={(e) => handlechange("cpass", e.target.value)}
        stateCleared={stateCleared}
      />
      <SubmitButton />
      <AuthRedirect
        text={"Already have an account"}
        handlePage={() => {
          handleStateClear();
          handlePage("login");
        }}
      />
    </FormTemplate>
  );
};

export default Register;
