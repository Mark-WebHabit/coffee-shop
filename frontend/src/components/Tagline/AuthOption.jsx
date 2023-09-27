import React from "react";
import styled from "styled-components";

const AuthOption = ({ handlePage }) => {
  return (
    <Container>
      <Buttons>
        <Button onClick={() => handlePage("login")}>LOGIN</Button>
        <Button2 onClick={() => handlePage("register")}>REGISTER</Button2>
      </Buttons>
    </Container>
  );
};

export default AuthOption;

const Container = styled.div`
  height: auto;
  width: auto;
  user-select: none;
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;'
`;
const Button = styled.p`
  width: 200px;
  background-color: #201e1f;
  border: 1px solid #664a35;
  color: #fff;
  text-align: center;
  padding: 2em;
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 5px white inset;
  }

  @media (max-width: 530px) {
    padding: 1em;
  }
  @media (max-width: 480px) {
    width: 150px;
  }
`;
const Button2 = styled(Button)`
  background-color: #664a35;
  border: 1px solid #201e1f;
`;
