import { Cell } from "rsuite-table";
import { RowData } from "../../const/types";




interface TextCellProps {
  rowData: undefined | RowData;
  dataKey: string;
  handleClick:(dbId: string) => void;
  onChange:(id: string, key: string, value: any) => void;
  [propName: string]: {};
}


const TextCell = ({
  rowData,
  dataKey,
  onChange,
  handleClick,
  ...props
}:TextCellProps) => {
  const editing = rowData.status === "EDIT";
  return (
    <>
      <Cell
        {...props}
        className={editing ? "table-content-editing" : ""}
        onClick={() => {
          console.log(rowData, "ROW");
          if (!editing) {
            handleClick(rowData.dbId);
          }
        }}
      >
        {editing ? (
          <input
            className="rs-input"
            defaultValue={rowData[dataKey]}
            onChange={(event) => {
              onChange && onChange(rowData.id, dataKey, event.target.value);
            }}
          />  
        ) : (
            <span className="table-content-edit-span" title={rowData[dataKey]}>
              {rowData[dataKey]}
            </span>
        )}
      </Cell>
    </>
  );
};
export default TextCell;
