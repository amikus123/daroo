import { useState, useEffect, useContext } from "react";
import { CustomProvider } from "rsuite";
import "rsuite-table/dist/css/rsuite-table.css";
import MyForm from "./components/Form/MyForm";
import MyTable from "./components/Table/MyTable";
import { getAll } from "./firebase/database/fetch";
import styled from "styled-components";
import ItemModal from "./components/ItemModal/ItemModal";
import { Item, PossibleColor, RowData, SnackbarType } from "./const/types";
import Snackbar from "./components/Snackbar/Snackbar";
import { getItemWithDbId } from "./components/Table/helpers";
import LoginButton from "./components/Login/LoginButton";
import { UserContext } from "./context/UserContext";
import Instructions from "./components/Instructions/Instructions";

const Wrap = styled.div``;
const TableWrap = styled.div`
  margin: 0 auto;
  max-width: 1000px;
`;

const App = () => {
  // data initiallly fetched from db
  const [tableData, setTableData] = useState<RowData[]>([]);
  // used in Item Modal
  const [selectedDbId, setSelectedDbId] = useState("");
  const [showText, setShowText] = useState(false);
  // used in  Status Modal
  // map of already fetched images
  const [snackbarValue, setSnackbarValue] = useState<SnackbarType>({
    show: false,
    color: "red",
    text: "",
    prevTimeoutId: null,
  });
  const { currentUser, canUserEdit } = useContext(UserContext);

  const updateSnackbar = (text: string, color: PossibleColor = "green") => {
    // if there is no previous timeout, we set it
    // else we remove it and then set it
    if (snackbarValue.prevTimeoutId !== null) {
      clearTimeout(snackbarValue.prevTimeoutId);
    }

    const newTimeoutId = setTimeout(() => {
      setSnackbarValue({ ...snackbarValue, show: false, prevTimeoutId: null });
    }, 5000);
    setSnackbarValue({ color, text, show: true, prevTimeoutId: newTimeoutId });
  };

  // fetch initial data
  useEffect(() => {
    const addIds = (originalData: Item[]) => {
      const res: RowData[] = originalData.map((item, index) => {
        return { ...item, id: index + "", status: "NONE" };
      });
      return res;
    };
    const fetch = async () => {
      const res = await getAll();
      if (res.error) {
        updateSnackbar(res.text, "red");
      } else {
        const arr = addIds(res.items);
        setTableData(arr);
      }
    };
    fetch();
  }, []);

  return (
    <CustomProvider theme="light">
      <Wrap>
        {currentUser ? "in" : "out"}
        <TableWrap>
          <LoginButton />
          <MyTable
            tableData={tableData}
            setTableData={setTableData}
            setSelectedIndex={setSelectedDbId}
            setShowText={setShowText}
            updateSnackbar={updateSnackbar}
          />
        </TableWrap>
        <ItemModal
          selectedItem={getItemWithDbId(tableData, selectedDbId)}
          setSelectedIndex={setSelectedDbId}
          showText={showText}
          updateSnackbar={updateSnackbar}
        />

        <Snackbar snackbarValue={snackbarValue} />
        {canUserEdit ? <MyForm updateSnackbar={updateSnackbar} /> : null}

        <Instructions />
      </Wrap>
    </CustomProvider>
  );
};

export default App;
