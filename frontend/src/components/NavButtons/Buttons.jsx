import React from "react";
import styled from "styled-components";

// components
import Button from "./Button";

const Buttons = () => {
  return (
    <Container>
      <Button text={"Home"} />
      <Button text={"about"} />
      <Button text={"products"} />
      <Button text={"orders"} />
    </Container>
  );
};

export default Buttons;

const Container = styled.div`
  height: 100%;
  width: auto;
  display: flex;
  align-items: center;
  gap: 3em;
  margin-right: 7%;

  @media (max-width: 520px) {
    gap: 1em;
  }
  @media (max-width: 400px) {
    gap: 0.5em;
    margin-right: 2%;
  }
  @media (max-width: 380px) {
    gap: 1em;
  }
`;
