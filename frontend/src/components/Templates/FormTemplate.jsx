import React, { useEffect, useState } from "react";
import styled from "styled-components";

const FormTemplate = ({ children, pageName, error, show }) => {
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        setShowForm(true);
      }, 0);
    } else {
      setShowForm(false);
    }
  }, [show]);

  return (
    <Container
      $show={show}
      $translate={showForm}
      onSubmit={(e) => e.preventDefault()}
    >
      <PageName>{pageName}</PageName>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {children}
    </Container>
  );
};
export default FormTemplate;

const Container = styled.form`
  width: 40%;
  border-radius: 20px;
  background-color: rgba(31, 31, 31, 0.5);
  border: 1px solid #707070;
  transition: transform 300ms, opacity 300ms ease-in-out; /* Updated transition properties */
  transform: ${(props) =>
    props.$translate ? "translateX(0)" : "translateX(110vw)"};
  opacity: ${(props) => (props.$translate ? 1 : 0)};
  display: ${(props) => (props.$show ? "unset" : "none")};
  margin-top: 1em;

  @media (min-width: 1380px) {
    width: 30%;
  }
  @media (max-width: 1100px) {
    width: 47%;

    & p {
      font-size: 2rem;
    }
  }
  @media (max-width: 900px) {
    width: 55%;
  }
  @media (max-width: 750px) {
    width: 60%;
  }
  @media (max-width: 600px) {
    width: 67%;
    & p {
      font-size: 1.5rem;
      margin: 0.5em;
    }
  }
  @media (max-width: 520px) {
    width: 73%;
  }
  @media (max-width: 420px) {
    width: 90%;
    & p {
      margin: 0.5em;
    }
    & span {
      font-size: 0.8rem;
    }
  }
  @media (max-width: 360px) {
    width: 100%;
  }
  border-radius: 10px;
`;

const PageName = styled.p`
  text-align: center;
  font-size: 3rem;
  color: #ffffff;
`;

const ErrorMessage = styled.span`
  display: block;
  min-height: 20px;
  text-align: center;
  color: red;
  font-family: "century";
`;
