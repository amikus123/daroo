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
import { myAuth } from "./firebase/main";
import { init } from "./firebase/auth";
import { UserContext } from "./context/UserContext";

const Wrap = styled.div`
  /* position:relative; */
`;
const TableWrap = styled.div`
  margin: 0 auto;
  max-width: 1000px;
`;
const P = styled.p`
  margin: 0 auto;
  padding: 2rem;
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
  const { currentUser } = useContext(UserContext);

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
      await init();

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
        {JSON.stringify(myAuth.currentUser)}
        <br/>
        {JSON.stringify(currentUser)}

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
        <MyForm updateSnackbar={updateSnackbar} />
        <P>
          Klikniecie na nazwe kolumny sortuje wg wartosci kolumny(rosnąco albo
          malejąco)
          <br />
          Kilkniecie na wartosci tabeli(gdy nie jest w trybie edycji) pokazuje
          wartosci przedmiotu
          <br />
          (np gdyby "nazwa" sie nie miescila na telefonie), oraz zdjęcia
          <br />
          Klikniecie na wartośc z kolumny "Images" pokazuje same zdjęcia (jeśli
          przedmiot je posiada)
          <br />
          TRYB EDYCJI
          <br />
          Klikniecie na "Edit" zmienia wartosci w pola do wpisania
          <br />
          Zeby wartosc zostala zmieniona, nalezy kliknac "Save" (zamkniecie
          strony bez klikania nie zapisuje)
          <br />
          Po kliknieciu wartosci są sprawdzane (czy ilosc to liczba itd)
          <br />
          Jezeli sa nie prawidlowe, powiadamia sie komunikat
          <br />
          Jezeli są prawidlowe, dane w bazie ulegaja zmianie
          <br />
          Wartosci poł "Miejsce" i "Kategoria" nie zwracaja uwagi na wielkosc
          liter podczas edycji
          <br />
          Przy zapisie do bazy rozmiar liter jest zmieniany automatycznie
          <br />
          DO DODANIA
          <br />
          Moge dodac przycisk usuwania, albo ustawic warunek usunieca(np
          ustawienie nazwy na "")
          <br />
          Nie ma tez opcji zmiany zdjec przedmiotu, nw czy ta opcja cie
          interesuje
        </P>
      </Wrap>
    </CustomProvider>
  );
};

export default App;
