import React, { useEffect, useState } from "react";
import { getURL } from "../../firebase/fetch";
import styled from "styled-components";

interface ImageModalProps {
  imageNames: string[];
  setImageNames: React.Dispatch<React.SetStateAction<any[]>>;
}

const Image = styled.img`
  max-width: min(500px, 66vw);
  max-height: min(300px, 66vh);
  padding: 1rem;
`;
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
  overflow-y: scroll;
  max-width: 600px;
  margin: 0 auto;
  max-height: 90vh;

`;
const ImageWrap = styled.div`
  background-color: #d3c3c3ab;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: auto;
`;

const ImageModal = ({ imageNames, setImageNames }: ImageModalProps) => {
  const [urls, setUrls] = useState<string[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const res: string[] = [];
      for (let i = 0; i < imageNames.length; i++) {
        const trueUrl = await getURL(imageNames[i]);
        res.push(trueUrl);
      }
      setUrls(res);
    };
    fetch();
  }, [imageNames]);
  return (
    <Overlay
      style={{ display: urls.length === 0 ? "none" : "block" }}
      onClick={() => {
        setUrls([]);
      }}
    >
      <ContentWrap>
        <ImageWrap>
          {urls.map((item, index) => {
            return <Image key={index} src={item} alt="item" />;
          })}
        </ImageWrap>
      </ContentWrap>
    </Overlay>
  );
};

export default ImageModal;
