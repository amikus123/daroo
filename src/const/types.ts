
// used in Fomrs
export interface BaseItem {
  location: "PP" | "PPZ";
  category: "nowe" | "odzysk" | "uszkodzone" | "sprawne";
  name: string;
  description: string;
  // but has to numeric
  count: string;
}

export type Item = BaseItem & { imageCount: number; dbId: string };
export type RowData = Item & { id: string; status: "EDIT" | "NONE" };

export interface SnackbarType{
  show:boolean;
  color:"red"|"green";
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