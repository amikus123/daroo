export interface BaseItem {
  location: "PP" | "PPZ";
  category: "nowe" | "odzysk" | "uszkodzone" | "sprawne";
  name: string;
  description: string;
  count: number;
}

export type Item = BaseItem & { imageCount: number; dbId: string };
