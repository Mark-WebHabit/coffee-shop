import React from "react";
import styled from "styled-components";

const DarkenBg = () => {
  return <Sqaure />;
};

export default DarkenBg;

const Sqaure = styled.div`
  position: absolute;
  top: 0;
  height: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: -10;
`;
