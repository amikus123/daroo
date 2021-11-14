import React, { useEffect, useState } from "react";
import { getURL } from "../../firebase/fetch";
import styled from "styled-components";
import { propertyToDisplay, RowData } from "../../const/types";

interface ItemModalProps {
  selectedItem: RowData | null;
  setSelectedIndex: React.Dispatch<React.SetStateAction<string>>;
  showText: boolean;
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
  overflow-y: scroll;
  max-height: 90vh;
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

const Image = styled.img`
  max-width: min(500px, 66vw);
  max-height: min(300px, 66vh);
  padding: 1rem;
`;

const ImageWrap = styled.div`
  background-color: #d3c3c3ab;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: auto;
`;

const ItemModal = ({
  selectedItem,
  setSelectedIndex,
  showText,
}: ItemModalProps) => {
  const [urls, setUrls] = useState<string[]>([]);
  const [fetchedImages, setFetchedImages] = useState<Record<string, string>>(
    {}
  );

  useEffect(() => {
    const setImages = async () => {
      const imagesNames: string[] = [];
      for (let i = 0; i < selectedItem.imageCount; i++) {
        imagesNames.push(selectedItem.dbId + "-" + i);
      }
      const res: string[] = [];
      for (let i = 0; i < imagesNames.length; i++) {
        const currentimageName = imagesNames[i];
        if (currentimageName in fetchedImages) {
          res.push(fetchedImages[currentimageName]);
        } else {
          const trueUrl = await getURL(currentimageName);
          setFetchedImages({ ...fetchedImages, [currentimageName]: trueUrl });
          res.push(trueUrl);
        }
      }
      setUrls(res);
    };
    if (selectedItem !== null) {
      setImages();
    }
    // creates infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItem]);
  return (
    <>
      {selectedItem === null ? null : (
        <Overlay
          style={{ display: selectedItem === undefined ? "none" : "block" }}
          onClick={() => {
            setSelectedIndex("");
            setUrls([]);
          }}
        >
          <ContentWrap>
            {showText ? (
              <TextWrap>
                {Object.keys(selectedItem)
                  .sort()
                  .map((key, index) => {
                    return propertyToDisplay[key] ? (
                      <p key={index}>
                        {propertyToDisplay[key]}: {selectedItem[key]}
                      </p>
                    ) : null;
                  })}
              </TextWrap>
            ) : null}

            <ImageWrap>
              {urls.map((item, index) => {
                return <Image key={index} src={item} alt="item" />;
              })}
            </ImageWrap>
          </ContentWrap>
        </Overlay>
      )}
    </>
  );
};

export default ItemModal;
