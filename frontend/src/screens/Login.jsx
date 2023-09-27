import React, { useEffect, useState } from "react";
import styled from "styled-components";

// components
import FormTemplate from "../components/Templates/FormTemplate";
import Input from "../components/FormInput/Input";
import SubmitButton from "../components/FormInput/SubmitButton";
import AuthRedirect from "../components/FormInput/AuthRedirect";
import LoadingButton from "../components/FormInput/LoadingButton";

// utilities
import { handleStateChange, clearState } from "../utilities/statehandler";
import { instance } from "../api/instance.js";

const Login = ({ authPage, handlePage }) => {
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
  });
  const [stateCleared, setStateCleared] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // state desstructuring
  const { usernameOrEmail, password } = formData;

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

  // everytime an error occur, erase it after 3 seconds
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  }, [error]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      // check if username or email of the state is empty
      if (!usernameOrEmail || usernameOrEmail === "") {
        setError("Username or email is required");
      }
      const response = await instance.post("/auth/login", {
        usernameOrEmail,
        password,
      });
      if (response.data.data) {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormTemplate pageName={"Login"} show={authPage === "login"} error={error}>
      <Input
        label={"Username or email"}
        value={usernameOrEmail}
        handleStateChange={(e) =>
          handlechange("usernameOrEmail", e.target.value)
        }
        stateCleared={stateCleared}
      />
      <Input
        label={"Password"}
        type="password"
        value={password}
        handleStateChange={(e) => handlechange("password", e.target.value)}
        stateCleared={stateCleared}
      />
      {loading ? <LoadingButton /> : <SubmitButton onClick={handleSubmit} />}
      <Forgotpassword>Forgot Password</Forgotpassword>
      <AuthRedirect
        text={"Create Account"}
        handlePage={() => {
          handleStateClear();
          handlePage("register");
        }}
      />
    </FormTemplate>
  );
};

export default Login;

const Forgotpassword = styled.span`
  font-size: 0.9rem;
  font-family: "Roboto", sans-serif;
  display: block;
  width: 95%;
  text-align: right;
  cursor: pointer;
  margin-top: 0.3em;
  margin-bottom: 2em;
`;
