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
  handleClick = (arg: number) => {},
  ...props
}) => {
  const editing = rowData.status === "EDIT";
  return (
    <>
      <MyCell
        {...props}
        className={editing ? "table-content-editing" : ""}
        onClick={() => {
          if (!editing) {
            handleClick(rowData.id);
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
