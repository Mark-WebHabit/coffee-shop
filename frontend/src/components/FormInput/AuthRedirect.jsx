import React from "react";
import styled from "styled-components";

const AuthRedirect = ({ text, handlePage }) => {
  return <Redirect onClick={handlePage}>{text}</Redirect>;
};

export default AuthRedirect;

const Redirect = styled.span`
  font-family: "Roboto", sans-serif;
  width: 95%;
  margin: 0.5em auto;
  text-align: center;
  cursor: pointer;
  display: block;
  transition: transform 200ms;

  &:hover {
    transform: scale(1.2);
  }
`;
