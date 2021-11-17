import { Button } from "rsuite";
import { Cell } from "rsuite-table";
import { RowData } from "../../../const/types";

interface ImageCellProps {
  rowData: undefined | RowData;
  dataKey: string;
  onClick: (dbId: string) => void;
  [propName: string]: {};
}
const ImageCell = ({ rowData, dataKey, onClick, ...rest }: ImageCellProps) => {
  return (
    <Cell {...rest} style={{ padding: "6px" }}>
      <Button
        appearance="link"
        onClick={() => {
          if (rowData.imageCount !== 0) {
            onClick(rowData.dbId);
          }
        }}
      >
        {rowData.imageCount === 0 ? "No images" : `Show(${rowData.imageCount})`}
      </Button>
    </Cell>
  );
};
export default ImageCell;
