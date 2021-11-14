import { SortType } from "rsuite-table";
import { RowData } from "../../const/types";

export const isPositiveInteger = (n: string | number) => {
  return !isNaN(Number(n));
};
export const getItemWithDbId = (
  data: RowData[],
  dbId: string
): RowData | null => {
  let res: RowData | null = null;
  if (dbId !== "") {
    data.forEach((item) => {
      if (item.dbId === dbId) {
        res = item;
      }
    });
  }
  return res;
};
export const verifyItemChange = (rowData: RowData) => {
  // check if passed item has corret values
  const { location, category, name, description, count } = rowData;
  const locationCopy = location.toUpperCase();
  const categoryCopy = category.toLowerCase();
  if (typeof name !== "string") return false;
  if (!isPositiveInteger(count)) return false;
  if (typeof description !== "string") return false;
  if (locationCopy !== "PP" && locationCopy !== "PPZ") return false;
  if (
    categoryCopy !== "nowe" &&
    categoryCopy !== "odzysk" &&
    categoryCopy !== "uszkodzone" &&
    categoryCopy !== "sprawne"
  )
    return false;
  return true;
};

// return sorted data
export const getData = (
  data: RowData[],
  sortColumn: string,
  sortType: SortType
) => {
  let copy = [...data];
  // get first char
  copy = copy.sort((a, b) => {
    let x: string = a[sortColumn];
    let y: string = b[sortColumn];
    let xVal = 0,
      yVal = 0;
    if (sortColumn !== "count") {
      xVal = x.localeCompare(y);
      yVal = 0;
      // true if asc
    } else {
      xVal = Number(a[sortColumn]);
      yVal = Number(b[sortColumn]);
    }

    if (sortType === "asc") {
      return xVal - yVal;
    } else {
      return yVal - xVal;
    }
  });
  console.log(data, sortColumn, sortType, copy, "sord");

  return copy;
};
