export const verify = (rowData: any) => {
  const { location, category, name, description, count } = rowData;
  console.log(rowData)
  if (typeof name !== "string") return false;
  if (isNaN(count - 1)) return false;
  if (typeof description !== "string") return false;
  if (location !== "PP"  && location !== "PPZ") return false;
  if (
    category !== "nowe" &&
    category !== "odzysk" &&
    category !== "uszkodzone" &&
    category !== "sprawne"
  )
    return false;
  return true;
};
