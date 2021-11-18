import { Button } from "rsuite";
import { Cell } from "rsuite-table";
import { RowData } from "../../../const/types";


interface EditCellProps {
  rowData: undefined | RowData;
  dataKey: string;
  onClick: (id: string,rowData:RowData) => void;
  [propName: string]: {};
}

const EditCell = ({ rowData, dataKey, onClick, ...props }:EditCellProps) => {
  // here we will update the state

  return (
    <Cell {...props} style={{ padding: "6px" }}>
      <Button
        appearance="link"
        onClick={() => {
          onClick(rowData.id, rowData);
        }}
      >
        {rowData.status === "EDIT" ? "Zapisz" : "Edytuj"}
      </Button>
    </Cell>
  );
};
export default EditCell;
