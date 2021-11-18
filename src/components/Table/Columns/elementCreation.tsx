import { Column, HeaderCell } from "rsuite-table";
import EditCell from "./EditCell";
import ImageCell from "./ImageCell";
import {
  TableElementFunctionOptions,
  MyInteractionColumnProps,
  MyTextColumnProps,
} from "../tableColumnData";
import TextCell from "./TextCell";

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
  elementFunctions: TableElementFunctionOptions,
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
  canUserEdit:boolean,

) => {
  return data.map((item, index) => {
    let { width, header,type } = item;
    // if user can't edit, we wont even show option to do so
    if(type ==="edit" && !canUserEdit ){
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

//
// <Column width={80}>
// <HeaderCell>Edit</HeaderCell>
// <EditCell
//   dataKey="id"
//   onClick={handleEditState}
//   rowData={undefined}
// />
// </Column>
// <Column width={100}>
// <HeaderCell>Zdjęcia</HeaderCell>
// <ImageCell
//   dataKey="imageCount"
//   onClick={handleImageClick}
//   rowData={undefined}
// />
