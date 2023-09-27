import React from "react";
import styled from "styled-components";

const SubmitButton = ({ onClick }) => {
  return (
    <Container type="submit" onClick={onClick}>
      SUBMIT
    </Container>
  );
};

export default SubmitButton;

const Container = styled.button`
  width: 90%;
  padding: 0.3em;
  font-size: 1.2rem;
  background-color: #36241f;
  margin: 1em auto;
  margin-bottom: 0;
  display: block;
  border: 1px solid gray;
  border-radius: 10px;
  cursor: pointer;
  position: relative;
  outline: none;

  &:hover {
    box-shadow: 0 0 10px black inset;
  }
`;
