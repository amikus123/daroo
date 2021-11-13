import { Button } from "rsuite";
import { Cell } from "rsuite-table";
import { updateByDbId } from "../../firebase/fetch";
import { verify } from "./verify";

const ActionCell = ({ rowData, dataKey, onClick, staticData, ...props }) => {
  // here we will update the state

  return (
    <Cell {...props} style={{ padding: "6px" }}>
      <Button
        appearance="link"
        onClick={() => {
          console.log(rowData, staticData, "Row");
        
          const isDataCorrent = verify(rowData);
          if (isDataCorrent) {
            // update the state and db
            onClick(rowData.id,"");
            updateByDbId(rowData)
          } else {
            alert("zle dane");
            // dont do the up
          }

          //
        }}
      >
        {rowData.status === "EDIT" ? "Save" : "Edit"}
      </Button>
    </Cell>
  );
};
export default ActionCell;
