
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
  wrongEditData = "Inncorrect edit data ",
  succesfulImageUpload = "Uploaded imgage succesfuly",
  unsuccesfulImageUpload = "Uploaded imgage unsuccesfuly: ",
  succesfulDbAddition = "Added item to db and uploaded files",
  unsuccesfulDbAddition = "Failed to add item to db: ",
  succesfulItemUpdate = "Updated item in db",
  unsuccesfulItemUpdate = "Failed to update item in db: ",
  editWithoutChanges = "New data is the same as the previous one",

  // we dont have to show if succeded in fetching
  succesfulInitialFetching = "",
  unsuccesfulInitialFetching = "Failed to fetch initial data: ",
  unsuccesfulImageFetching="Failed to fetch image from storage: "
}
