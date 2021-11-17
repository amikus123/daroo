import React, { useEffect, useState } from "react";
import { Table, SortType } from "rsuite-table";
import { PossibleColor, RowData, SnackbarTexts } from "../../const/types";

import { Input, Panel } from "rsuite";
import { getData, verifyItemChange } from "./helpers";
import {
  textColumnData,
  interactionColumnData,
  TableElementFunctionOptions,
} from "./tableColumnData";
import {
  createTextColumn,
  crateInteractionColumns,
} from "./Columns/elementCreation";
import { updateByDbId } from "../../firebase/database/edit";
interface MyTableProps {
  tableData: RowData[];
  setTableData: React.Dispatch<React.SetStateAction<RowData[]>>;
  setShowText: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedIndex: React.Dispatch<React.SetStateAction<string>>;
  updateSnackbar: (text: string, color: PossibleColor) => void;
}

const MyTable = ({
  tableData,
  setTableData,
  setShowText,
  setSelectedIndex,
  updateSnackbar,
}: MyTableProps) => {
  const [sortColumn, setSortColumn] = useState("");
  const [sortType, setSortType] = useState<SortType>("asc");
  // makes sure that array is not sorted while something is being edited
  const [editingCount, setEditingCount] = useState(0);

  // this data is modified for sorting purposes
  const [filteredTableData, setFilteredTableData] = useState<RowData[]>([]);
  const [searchedText, setSearchedText] = useState("");

  // update array from the top
  useEffect(() => {
    if (editingCount === 0) {
      setFilteredTableData(tableData);
    }
  }, [tableData, editingCount]);

  // update shown array
  useEffect(() => {
    if (editingCount === 0) {
      setFilteredTableData(filterArray());
    }
  }, [searchedText, editingCount]);

  useEffect(() => {
    if (sortColumn && sortType && editingCount === 0) {
      // if 0 items are being edited we allow to sort by values
      const newData = getData(tableData, sortColumn, sortType);
      setFilteredTableData(filterArray(newData));
    } else {
    }
    // inclusion of tableData creates infitine loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortColumn, sortType, editingCount, searchedText]);
  // update arr based on fillert
  const filterArray = (arr: RowData[] = tableData) => {
    return [...arr].filter((item) =>
      item.name.toLowerCase().includes(searchedText.toLowerCase())
    );
  };

  const handleSortColumn = (sortColumn: string, sortType: SortType) => {
    setSortColumn(sortColumn);
    setSortType(sortType);
  };

  const handleChange = (id: string, key: string, value: any) => {
    // const nextData = Object.assign([], tableData);
    console.log("handleChange");

    const nextData = [...tableData];
    nextData.find((item) => item.id === id)[key] = value;
    setTableData(nextData);
  };

  const handleEditState = async (id: string, rowData: RowData) => {
    // const nextData = Object.assign([], tableData);
    const nextData = [...tableData];
    const activeItem = nextData.find((item) => item.id === id);
    console.log("handleEditState");

    if (rowData.status === "EDIT") {
      const isDataCorrent = verifyItemChange(rowData);
      if (isDataCorrent) {
        // we toggle the item status
        setTableData(nextData);
        const updateRes = await updateByDbId(rowData);
        if (updateRes.error) {
          // firebase erorr
          updateSnackbar(updateRes.text, "red");
        } else {
          //
          // successful
          updateSnackbar(updateRes.text, "green");
          setEditingCount(editingCount - 1);
          activeItem.status = activeItem.status === "NONE" ? "EDIT" : "NONE";
        }
      } else {
        updateSnackbar(SnackbarTexts.wrongEditData, "red");
        // dont do the up
      }
    } else {
      setEditingCount(editingCount + 1);
      activeItem.status = activeItem.status === "NONE" ? "EDIT" : "NONE";
      // nic sie nie zmienia
    }
  };

  const handleRowClick = (dbId: string) => {
    setShowText(true);
    setSelectedIndex(dbId);
  };
  const handleImageClick = (dbId: string) => {
    setShowText(false);
    setSelectedIndex(dbId);
  };
  // object which holds all functions which can be used in table columns
  const tableElementFunctions: TableElementFunctionOptions = {
    edit: handleEditState,
    image: handleImageClick,
    click: handleRowClick,
    change: handleChange,
  };

  return (
    <Panel header="Przedmioty" bordered bodyFill>
      <Input
        placeholder="Default Input"
        value={searchedText}
        onChange={(value) => {
          setSearchedText(value);
        }}
      />

      <Table
        virtualized
        height={600}
        data={filteredTableData}
        sortColumn={sortColumn}
        sortType={sortType}
        onSortColumn={handleSortColumn}
      >
        {/* creates columns based on data in "tableColumnData" 
        and functions in "element creation" */}
        {createTextColumn(textColumnData, tableElementFunctions)}
        {crateInteractionColumns(interactionColumnData, tableElementFunctions)}
      </Table>
    </Panel>
  );
};

export default MyTable;
