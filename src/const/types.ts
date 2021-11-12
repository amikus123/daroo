export interface  BaseItem {
  location: "PP" | "PPZ";
  category: "nowe" | "odzysk" | "uszkodzone" | "sprawne";
  name: string;
  description: string;
  count: number;
}

export type Item = BaseItem & {images: string[]}
export type FormItem = BaseItem & {images: FileList[]}

export const data: Item[] = [
  {
    location: "PP",
    category: "nowe",
    name: "Płyta główna",
    description: "płyta główna awz200",
    count: 1,
    images: ["1"],
  },
  
  {
    location: "PPZ",
    category: "odzysk",
    name: "ałyta główna",
    description: "ałyta główna awz200",
    count: 3,
    images: ["2"],
  },
  {
    location: "PP",
    category: "nowe",
    name: "słyta główna",
    description: "płyta główna awz200",
    count: 1,
    images: ["1"],
  },
  {
    location: "PPZ",
    category: "odzysk",
    name: "załyta główna",
    description: "ałyta główna awz200",
    count: 5,
    images: ["2"],
  },
];
