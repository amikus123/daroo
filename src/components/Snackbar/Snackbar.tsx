import React from "react";
import { SnackbarType } from "../../const/types";
import styled from "styled-components";

interface SnackbarProps {
  snackbarValue: SnackbarType;
  setSnackbarValue: React.Dispatch<React.SetStateAction<SnackbarType>>;
}

const ContentWrap = styled.div`
  position: absolute;
  bottom: 20px;
  width: 80vw;
  height: 100px;
  left: 50%;
  transform: translate(-50%, 0);
  background-color: blue;
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

const Snackbar = ({ snackbarValue, setSnackbarValue }: SnackbarProps) => {
  return (
    <Overlay style={{ visibility: snackbarValue.show?"visible":"hidden" }}>
      <ContentWrap style={{ backgroundColor: snackbarValue.color }}>
        <span>{snackbarValue.text}</span>
      </ContentWrap>
    </Overlay>
  );
};

export default Snackbar;
