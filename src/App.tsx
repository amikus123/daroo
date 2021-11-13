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
const P = styled.p`
  margin: 0 auto;
padding:2rem;
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
          Nie edytuj kilku wartosci naraz, bo chwilow psuje to sortowanie
          <br />
          DO DODANIA
          <br />
          Moge dodac przycisk usuwania, albo ustawic warunek usunieca(np ustawienie nazwy na "")
          <br/>
          Nie ma tez opcji zmiany zdjec przedmiotu, nw czy ta opcja cie interesuje
          <br/>
           Dodam tez rzeczy mowiace o sukcesie oraz o bledach interkacji z basa danych
        </P>
      </Wrap>
    </CustomProvider>
  );
};

export default App;
