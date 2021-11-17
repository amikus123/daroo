import React from "react";
import { PossibleColors, SnackbarType } from "../../const/types";
import styled from "styled-components";

interface SnackbarProps {
  snackbarValue: SnackbarType;
}

const ContentWrap = styled.div`
  position: absolute;
  bottom: 20px;
  width: 80vw;
  min-height: 60px;
  padding: 1rem;
  font-size: 2rem;
  left: 50%;
  transform: translate(-50%, 0);
  color: white;
`;

const Overlay = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  padding: 1rem;
  pointer-events: none;
`;

const Snackbar = ({ snackbarValue }: SnackbarProps) => {
  const { show, color, text } = snackbarValue;
  return (
    <Overlay style={{ visibility: show ? "visible" : "hidden" }}>
      <ContentWrap style={{ backgroundColor: PossibleColors[color] }}>
        <span>{text}</span>
      </ContentWrap>
    </Overlay>
  );
};

export default Snackbar;
