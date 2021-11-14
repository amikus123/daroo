import { SortType } from "rsuite-table";
import { RowData } from "../../const/types";

export const verifyItemChange = (rowData: RowData) => {
  // check if passed item has corret values
  const { location, category, name, description, count } = rowData;
  if (typeof name !== "string") return false;
  if (isNaN(count - 1)) return false;
  if (typeof description !== "string") return false;
  if (location !== "PP" && location !== "PPZ") return false;
  if (
    category !== "nowe" &&
    category !== "odzysk" &&
    category !== "uszkodzone" &&
    category !== "sprawne"
  )
    return false;
  return true;
};

// return sorted data
export const getData = (data: RowData[],sortColumn:string,sortType:SortType) => {
  let copy = [...data];
  // get first char
  copy = copy.sort((a, b) => {
    let x: string | number = a[sortColumn];
    let y: string | number = b[sortColumn];
    let xVal = 0,
      yVal = 0;
    if (typeof x === "string" && typeof y === "string") {
      xVal = x.localeCompare(y);
      yVal = 0;
    } else {
      xVal = a[sortColumn];
      yVal = b[sortColumn];
    }

    if (sortType === "asc") {
      return xVal - yVal;
    } else {
      return yVal - xVal;
    }
  });

  return copy 
};
