import { Cell } from "rsuite-table";
import styled from "styled-components";

const MyCell = styled(Cell)`
  & * {
    overflow: visible;
  }
`;

const EditCell = ({
  rowData,
  dataKey,
  onChange,
  handleClick = (arg: string) => {},
  ...props
}) => {
  const editing = rowData.status === "EDIT";
  return (
    <>
      <MyCell
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
          <>
            <span className="table-content-edit-span" title={rowData[dataKey]}>
              {rowData[dataKey]}
            </span>
          </>
        )}
      </MyCell>
    </>
  );
};
export default EditCell;
