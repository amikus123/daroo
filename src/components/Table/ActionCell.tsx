import { Button } from "rsuite";
import { Cell } from "rsuite-table";

const ActionCell = ({ rowData, dataKey, onClick, ...props }) => {
  // here we will update the state

  return (
    <Cell {...props} style={{ padding: "6px" }}>
      <Button
        appearance="link"
        onClick={() => {
          onClick(rowData.id, rowData);
        }}
      >
        {rowData.status === "EDIT" ? "Save" : "Edit"}
      </Button>
    </Cell>
  );
};
export default ActionCell;
