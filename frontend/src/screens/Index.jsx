import React, { useState } from "react";
import styled from "styled-components";

// import { Routes, Route } from "react-router-dom";

// components
import AuthOption from "../components/Tagline/AuthOption";
import Login from "./Login";
import Register from "./Register";

const Index = () => {
  const [authPage, setAuthPage] = useState(null);

  const handlePage = (page) => {
    setAuthPage(page);
  };

  return (
    <Container $show={authPage}>
      <Text $show={!authPage}>Have the taste of love in a mug</Text>

      {!authPage && <AuthOption handlePage={handlePage} />}
      <Login authPage={authPage} handlePage={handlePage} />
      <Register authPage={authPage} handlePage={handlePage} />
    </Container>
  );
};

export default Index;

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 20%;
  overflow: hidden;

  @media (max-width: 720px) {
    padding-bottom: 50%;
  }
  @media (max-width: 380px) {
    padding-bottom: 80%;
  }
`;
const Text = styled.p`
  font-size: 5rem;
  text-align: center;
  transition: all 300ms ease-in-out;

  @media (max-width: 1100px) {
    font-size: 3rem;
  }
  @media (max-width: 720px) {
    font-size: 2.5rem;
  }
  @media (max-width: 530px) {
    font-size: 2rem;
  }
  @media (max-width: 380px) {
    font-size: 1.5rem;
  }
`;
