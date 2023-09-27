import React from "react";
import styled, { keyframes } from "styled-components";

const LoadingButton = () => {
  return <Container />;
};

export default LoadingButton;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Container = styled.div`
  width: 40px;
  height: 40px;
  margin: 0 auto;
  animation: ${spin} 2s linear infinite;
  border-left: 3px solid red; /* Add transparent borders on the left and right */
  border-right: 3px solid transparent;
  border-top: 3px solid red; /* Add a red border on the top */
  border-bottom: 3px solid red; /* Add a red border on the bottom */
  border-radius: 50%;
`;
