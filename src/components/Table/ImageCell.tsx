import { Button } from "rsuite";
import { Cell } from "rsuite-table";

interface ActionCellProps {}

const ImageCell = ({ rowData, dataKey, onClick, ...props }) => {
  return (
    <Cell {...props} style={{ padding: "6px" }}>
      <Button
        appearance="link"
        onClick={() => {
          onClick && onClick(rowData.dbId, rowData.imageCount);
        }}
      >
        {rowData.imageCount === 0 ? "No images" : `Show(${rowData.imageCount})`}
      </Button>
    </Cell>
  );
};
export default ImageCell;
