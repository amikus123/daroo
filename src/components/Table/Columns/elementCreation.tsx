import { Column, HeaderCell } from "rsuite-table";
import EditCell from "./EditCell";
import ImageCell from "./ImageCell";
import {
  TableElementFunctionOptions,
  MyInteractionColumnProps,
  MyTextColumnProps,
} from "../tableColumnData";
import TextCell from "./TextCell";
import DeleteCell from "./DeleteCell";

export const createTextColumn = (
  data: MyTextColumnProps[],
  elementFunctions: TableElementFunctionOptions
) => {
  return data.map((item, index) => {
    const { rowData, width, sortable, header, dataKey } = item;
    return (
      <Column width={width} sortable={sortable} key={index}>
        <HeaderCell>{header}</HeaderCell>
        <TextCell
          handleClick={elementFunctions.click}
          dataKey={dataKey}
          onChange={elementFunctions.change}
          rowData={rowData}
        />
      </Column>
    );
  });
};

export const getElementFromType = (
  item: MyInteractionColumnProps,
  elementFunctions: TableElementFunctionOptions
) => {
  const { dataKey, type, rowData } = item;
  if (type === "edit") {
    return (
      <EditCell
        dataKey={dataKey}
        onClick={elementFunctions[type]}
        rowData={rowData}
      />
    );
  } else if (type === "delete") {
    return (
      <DeleteCell
        onClick={elementFunctions[type]}
        dataKey={dataKey}
        rowData={rowData}
      />
    );
  } else {
    return (
      <ImageCell
        onClick={elementFunctions[type]}
        dataKey={dataKey}
        rowData={rowData}
      />
    );
  }
};
export const crateInteractionColumns = (
  data: MyInteractionColumnProps[],
  elementFunctions: TableElementFunctionOptions,
  canUserEdit: boolean
) => {
  return data.map((item, index) => {
    let { width, header, type } = item;
    // if user can't edit, we wont even show option to do so
    if ((type === "edit" || type==="delete") && !canUserEdit) {
      width = 0;
    }
    return (
      <Column width={width} key={index}>
        <HeaderCell>{header}</HeaderCell>
        {getElementFromType(item, elementFunctions)}
      </Column>
    );
  });
};
