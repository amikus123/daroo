import React from "react";
import { Column, HeaderCell } from "rsuite-table";
import ImageCell from "./ImageCell";
import TextCell from "./TextCell";

interface MyColumnProps {
  dataKey: string;
  rowData: any;
  handleClick: (arg: any) => any;
  handleChange: (id: string, key: string, value: any) => void;
  width?: number;
  sortable?: boolean;
}
const MyColumn = ({
  dataKey,
  rowData,
  handleClick,
  handleChange,
  width = 120,
  sortable = true,
}: MyColumnProps) => {
  return (
    <Column width={width} sortable={sortable}>
      <HeaderCell>Zdjęcia</HeaderCell>
      {rowData === undefined ? null : (
        <TextCell
          dataKey={dataKey}
          handleClick={handleClick}
          onChange={handleChange}
          rowData={rowData}
        />
      )}
    </Column>
  );
};

export default MyColumn;


