
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

export enum propertyToDisplay  {
"count"="Ilość",
"location"="Lokalizacja",
"name"="Nazwa",
"description"="Opis",
"category"="Kategoria"
}