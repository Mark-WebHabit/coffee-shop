import React, { useState, useEffect } from "react";
import { instance } from "../api/instance";

// components
import FormTemplate from "../components/Templates/FormTemplate";
import Input from "../components/FormInput/Input";
import SubmitButton from "../components/FormInput/SubmitButton";
import AuthRedirect from "../components/FormInput/AuthRedirect";
import LoadingButton from "../components/FormInput/LoadingButton";

// utilities
import {
  handleStateChange,
  clearState,
  stateLengthValidator,
} from "../utilities/statehandler";

const Register = ({ authPage, handlePage }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    cpass: "",
  });
  const [stateCleared, setStateCleared] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // state desstructuring
  const { username, email, password, cpass } = formData;

  // handle state change when user type
  const handlechange = (field, val) => {
    handleStateChange(setFormData, field, val);
  };

  const handleStateClear = () => {
    clearState(setFormData, formData);
    setStateCleared(true);
    setError(null);
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
      // check if all the fields are empty
      if (username === "" && email === "" && password === "") {
        setError("Fill all the necessary information");
        return;
      }

      //  check if username is empty
      if (username === "") {
        setError("Invalid Username");
        return;
      }
      // check if username is short
      if (!stateLengthValidator(username, 2)) {
        setError("Username too short");
        return;
      }

      //  check if email is empty
      if (email === "") {
        setError("Invalid Email");
        return;
      }
      // check if email is too short
      if (!stateLengthValidator(email, 11)) {
        setError("Email too short");
        return;
      }

      //  check if Password is empty
      if (password === "") {
        setError("Invalid Password");
        return;
      }
      // check if password is too short
      if (!stateLengthValidator(password)) {
        setError("Password must be 6 charcters and above");
        return;
      }

      if (password !== cpass) {
        setError("Passwords don't matched");
        return;
      }

      const response = await instance.post("/auth/register", {
        username,
        email,
        password,
      });
      if (response.data.data) {
        console.log(response);
        handleStateClear();
        handlePage("login");
      }
    } catch (error) {
      if (error.response && error.response.status) {
        // The error is an Axios response error with a status code
        setError(error.response.data.message);
        console.log("Axios Response Error Data:", error.response.data);
      } else {
        // The error is not an Axios response error
        setError("Something went wrong");
        console.error("Non-Axios Error:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormTemplate
      pageName={"Register"}
      show={authPage === "register"}
      error={error}
    >
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
      {loading ? <LoadingButton /> : <SubmitButton onClick={handleSubmit} />}
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
