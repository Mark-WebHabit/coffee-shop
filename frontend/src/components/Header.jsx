import React from "react";
import styled from "styled-components";

// comonents
import Buttons from "./NavButtons/Buttons";

const Header = () => {
  return (
    <Container>
      <Logo src="/images/templogo.png" alt="Logo" />
      <Buttons />
    </Container>
  );
};

export default Header;

const Container = styled.div`
  height: 13%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  user-select: none;
`;

const Logo = styled.img`
  height: 85%;
  width: auto;
  margin: 1em;

  @media (max-width: 420px) {
    height: 70%;
  }
`;
