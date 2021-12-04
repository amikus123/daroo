import { RowData } from "../../const/types";

interface MyBaseColumnProps {
  dataKey: string;
  header: string;
  width: number;
  rowData: any;
}
export type InteractionOptions = "edit" | "image"| "delete";

export interface TableElementFunctionOptions {
  edit: (id: string, rowData: RowData) => Promise<void>;
  image: (dbId: string) => void;
  click : (dbId: string) => void;
  change: (id: string, key: string, value: any) =>void;
  delete :(id: string) => void
}
export interface MyTextColumnProps extends MyBaseColumnProps {
  sortable: boolean;
}
export interface MyInteractionColumnProps extends MyBaseColumnProps {
  type: InteractionOptions;
}
export const interactionColumnData: MyInteractionColumnProps[] = [
  {
    dataKey: "name",
    header: "Nazwa",
    rowData: undefined,
    width: 80,
    type: "edit",
  },
  {
    dataKey: "count",
    header: "Ilość",
    rowData: undefined,
    width: 100,
    type: "image",
  },
  {
    dataKey: "delete",
    header: "Usun",
    rowData: undefined,
    width: 100,
    type: "delete",
  },
];
export const textColumnData: MyTextColumnProps[] = [
  {
    dataKey: "name",
    header: "Nazwa",
    rowData: undefined,
    width: 120,
    sortable: true,
  },
  {
    dataKey: "count",
    header: "Ilość",
    rowData: undefined,
    width: 80,
    sortable: true,
  },
  {
    dataKey: "category",
    header: "Kategoria",
    rowData: undefined,
    width: 120,
    sortable: true,
  },

  {
    dataKey: "location",
    header: "Miejsce",
    rowData: undefined,
    width: 120,
    sortable: true,
  },
  {
    dataKey: "description",
    header: "Opis",
    rowData: undefined,
    width: 200,
    sortable: true,
  },
];
