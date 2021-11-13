import React, { useEffect, useState } from "react";
import { getURL } from "../../firebase/fetch";
import styled from "styled-components";
import { propertyToDisplay } from "../../const/types";

interface ImageModalProps {
  selectedItem: any[];
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
}

const Overlay = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: #00000060;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  padding: 1rem;
`;
const ContentWrap = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;
const TextWrap = styled.div`
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: auto;
  padding: 1rem;
`;

const TextModal = ({ selectedItem, setSelectedIndex }: ImageModalProps) => {
  return (
    <>
      {selectedItem === undefined ? null : (
        <Overlay
          style={{ display: selectedItem === undefined ? "none" : "block" }}
          onClick={() => {
            setSelectedIndex(-1);
          }}
        >
          <ContentWrap>
            <TextWrap>
              {Object.keys(selectedItem).map((key, index) => {
                return propertyToDisplay[key] ? (
                  <p key={index}>
                    {propertyToDisplay[key]}: {selectedItem[key]}
                  </p>
                ) : null;
              })}
            </TextWrap>
          </ContentWrap>
        </Overlay>
      )}
    </>
  );
};

export default TextModal;
