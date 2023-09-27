import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const Input = ({
  label,
  type = "text",
  value,
  handleStateChange,
  stateCleared,
}) => {
  const [isFocus, setIsFocus] = useState(false);
  const ref = useRef(null);

  //   if the input has a value do not set the isFocus to false

  useEffect(() => {
    const inputValue = ref.current.value;

    // force the input state to lose focus if the state is cleared
    if (stateCleared) {
      setIsFocus(false);
    }
    // if there is no focus and the input is not empty
    if (!isFocus) {
      if (inputValue.trim() !== "") {
        setIsFocus(true);
      }
    }
  }, [isFocus, stateCleared]);

  return (
    <Container>
      <Label $focus={isFocus}>{label}</Label>
      <InputBox
        maxLength={40}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        autoComplete="off"
        ref={ref}
        type={type}
        value={value}
        onChange={handleStateChange}
      />
    </Container>
  );
};

export default Input;

const Container = styled.div`
  width: 90%;
  height: auto;
  padding: 0.5em;
  padding-left: 1em;
  background-color: #563d29;
  margin: 0.7em auto;
  border-radius: 10px;
  cursor: pointer;
  position: relative;

  @media (max-width: 500px) {
    & label {
      font-size: 1rem;
    }
  }
`;

const Label = styled.label`
  font-size: 1.2rem;
  user-select: none;
  pointer-events: none;
  position: absolute;
  transition: transform 200ms; /* Adjusted transition */
  transform: ${(props) =>
    props.$focus
      ? "translateY(-1.3em) scale(0.8)"
      : "translateY(0) scale(1)"}; /* Adjusted transform */
`;

const InputBox = styled.input`
  height: 100%;
  width: 100%;
  border: none;
  background: transparent;
  font-size: 1rem;
  font-family: "Roboto", sans-serif;

  &:focus {
    outline: none;
  }
`;
