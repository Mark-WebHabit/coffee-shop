import React from "react";
import styled from "styled-components";

// darken the bg
import DarkenBg from "./DarkenBg";

const MirrorBg = () => {
  return (
    <>
      <MirrorBackground />
      <DarkenBg />
    </>
  );
};

export default MirrorBg;
const MirrorBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(/images/bf.jpg);
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  transform: scaleX(-1);
  z-index: -10;
`;
