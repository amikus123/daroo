import React from "react";
import styled from "styled-components";

const P = styled.p`
  margin: 0 auto;
  padding: 2rem;
  font-size: 1.25rem;
`;

const Instructions = () => {
  return (
    <div>
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
        Zeby wartosc zostala zmieniona, nalezy kliknac "Save" (zamkniecie strony
        bez klikania nie zapisuje)
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
        Nie ma tez opcji zmiany zdjec przedmiotu, nw czy ta opcja cie interesuje
      </P>
    </div>
  );
};

export default Instructions;
