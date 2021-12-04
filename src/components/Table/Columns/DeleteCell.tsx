import { Button } from "rsuite";
import { Cell } from "rsuite-table";
import { RowData } from "../../../const/types";

interface ImageCellProps {
  rowData: undefined | RowData;
  dataKey: string;
  onClick: (dbId: string) => void;
  [propName: string]: {};
}
const DeleteCell = ({ rowData, dataKey, onClick, ...rest }: ImageCellProps) => {
  return (
    <Cell {...rest} style={{ padding: "6px" }}>
      <Button
        appearance="link"
        onClick={() => {
          onClick(rowData.dbId);
        }}
      >
       Usuń
      </Button>
    </Cell>
  );
};
export default DeleteCell;
