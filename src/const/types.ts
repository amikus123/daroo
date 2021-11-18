
export type PossibleLocations = "PP" | "PPZ";
export type PossibleCategoties = "nowe" | "odzysk" | "uszkodzone" | "sprawne";

// Base item is used in Forms 
export interface BaseItem {
  location: PossibleLocations;
  category: PossibleCategoties;
  name: string;
  description: string;
  // but has to numeric
  count: string;
}
// it is fetched and uploaded to db, extra keys are added during upload
export type Item = BaseItem & { imageCount: number; dbId: string };

export type PossibleRowStatuses = "EDIT" | "NONE";
export type RowData = Item & { id: string; status: PossibleRowStatuses };

// used to set snackbar color
export type PossibleColor = keyof typeof PossibleColors;
export enum PossibleColors {
  green = "#189306",
  red = "#930606",
}

export interface SnackbarType {
  show: boolean;
  color: PossibleColor;
  text: string;
  prevTimeoutId: ReturnType<typeof setTimeout> | null;
}
// used in item modal to display data more clearly
export enum PropertyToDisplay {
  count = "Ilość",
  location = "Lokalizacja",
  name = "Nazwa",
  description = "Opis",
  category = "Kategoria",
}

export enum SnackbarTexts {
  wrongEditData = "Złe dane w edytowanym przedmiocie",
  succesfulImageUpload = "Udało się przesłać zdjęcie",
  unsuccesfulImageUpload = "Nie dało się przesłać zdjęcia: ",
  succesfulDbAddition = "Dodano przedmiot do bazy i przesłano zdjęcia",
  unsuccesfulDbAddition = "Nie dodano przedmiotu do bazy: ",
  succesfulItemUpdate = "Edytowano przedmiot w bazie",
  unsuccesfulItemUpdate = "Nie udało sie edytować przedmiotu w bazie: ",
  editWithoutChanges = "Nowe dane są takie same jak stare",
  // we dont have to show if succeded in fetching
  succesfulInitialFetching = "",
  unsuccesfulInitialFetching = "Nie udało się pobrać danych z bazy: ",
  unsuccesfulImageFetching="Nie udało się pobrać zdjęcia z bazy: "
}

// only those users can update the data
export const authorizedEmails = ["amikusek123@gmail.com","darekpuzio@gmail.com"]
