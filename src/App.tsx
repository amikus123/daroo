import { useState, useEffect } from "react";
import { CustomProvider } from "rsuite";
import "rsuite-table/dist/css/rsuite-table.css";
import MyForm from "./components/Form/MyForm";
import ImageModal from "./components/ImageModal/ImageModal";
import MyTable from "./components/Table/MyTable";
import { getAll } from "./firebase/fetch";
import styled from "styled-components";
import TextModal from "./components/TextModal/TextModal";

const Wrap = styled.div`
/* position:relative; */
`;
const TableWrap = styled.div`
  margin: 0 auto;
  max-width: 1000px;
  padding: 1rem;
  & *{
  overflow: visible;
  z-index: 10;
}
`;
const App = () => {
  const [data, setData] = useState([]);
  const [imageNames, setImageNames] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1)
  useEffect(() => {
    const fetch = async () => {
      const res = await getAll();
      setData(res);
      console.log(res, "DOSTALEM");
    };
    fetch();
  }, []);
  return (
    <CustomProvider theme="light">
      <Wrap>
        <TableWrap>
          <MyTable passedData={data} setImageNames={setImageNames}  setSelectedIndex={setSelectedIndex}/>
        </TableWrap>
        <ImageModal imageNames={imageNames} setImageNames={setImageNames} />
        <TextModal  selectedItem={data[selectedIndex]} setSelectedIndex={setSelectedIndex}/>
        <MyForm />
      </Wrap>
    </CustomProvider>
  );
};

export default App;
