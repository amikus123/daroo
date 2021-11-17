
// used in Fomrs

export type PossibleLocations = "PP" | "PPZ"
export type PossibleCategoties = "nowe" | "odzysk" | "uszkodzone" | "sprawne";

export interface BaseItem {
  location: PossibleLocations;
  category: PossibleCategoties
  name: string;
  description: string;
  // but has to numeric
  count: string;
}

export type Item = BaseItem & { imageCount: number; dbId: string };

export type PossibleRowStatuses = "EDIT" | "NONE" 
export type RowData = Item & { id: string; status: PossibleRowStatuses};

export type PossibleColor = "red"|"green";
export interface SnackbarType{
  show:boolean;
  color:PossibleColor,
  text:string;
  prevTimeoutId : ReturnType<typeof setTimeout> | null;
}
// used in item modal to display data more clearly
export enum PropertyToDisplay  {
count="Ilość",
location="Lokalizacja",
name="Nazwa",
description="Opis",
category="Kategoria"
}

export enum SnackbarTexts {
  wrongEditData="Inncorrect edit data ",
  succesfulImageUpload = "Uploaded imgage succesfuly",
  unsuccesfulImageUpload = "Uploaded imgage unsuccesfuly: ",
  succesfulDbAddition = "Added item to db and uploaded files",
  unsuccesfulDbAddition = "Failed to add item to db: ",
  succesfulItemUpdate = "Updated item in db",
  unsuccesfulItemUpdate = "Failed to update item in db: ",
  // we dont have to show if succeded in fetching
  succesfulInitialFetching = "",
  unsuccesfulInitialFetching = "Failed to fetch initial data: ",


}