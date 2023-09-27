import React from "react";
import styled from "styled-components";
const Button = ({ text }) => {
  return <Container>{text}</Container>;
};

export default Button;

const Container = styled.button`
  background: transparent;
  border: none;
  outline: none;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
  text-transform: uppercase;
  transition: all 200ms;

  &:hover {
    transform: scale(1.3);
  }

  @media (max-width: 720px) {
    font-size: 1em;
  }
  @media (max-width: 380px) {
    font-size: 0.9em;
  }
`;
