import React, { useEffect, useState } from "react";
import { getURL } from "../../firebase/fetch";
import styled from "styled-components";

interface ImageModalProps {
  imageNames: string[];
  setImageNames: React.Dispatch<React.SetStateAction<any[]>>;
}

const Image = styled.img`
  width: 500px;
  height: 500px;
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
    <div>
      {JSON.stringify(imageNames)}
      <div>
        {urls.map((item, index) => {
          return <Image key={index} src={item} alt="item" />;
        })}
      </div>
    </div>
  );
};

export default ImageModal;
