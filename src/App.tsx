import { useState, useEffect } from "react";
import { CustomProvider } from "rsuite";
import "rsuite-table/dist/css/rsuite-table.css";
import MyForm from "./components/Form/MyForm";
import MyTable from "./components/Table/MyTable";
import { getAll } from "./firebase/fetch";
import styled from "styled-components";
import ItemModal from "./components/ItemModal/ItemModal";

const Wrap = styled.div`
  /* position:relative; */
`;
const TableWrap = styled.div`
  margin: 0 auto;
  max-width: 1000px;

`;
const App = () => {
  const [data, setData] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [showText, setShowText] = useState(false);
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
          <MyTable
            passedData={data}
            setSelectedIndex={setSelectedIndex}
            setShowText={setShowText}
          />
        </TableWrap>
        <ItemModal
          selectedItem={data[selectedIndex]}
          setSelectedIndex={setSelectedIndex}
          showText={showText}
        />
        <MyForm />
      </Wrap>
    </CustomProvider>
  );
};

export default App;
