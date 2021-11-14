import React, { useEffect, useState } from "react";
import { Table, Column, HeaderCell, SortType } from "rsuite-table";
import { Item, RowData } from "../../const/types";
import ActionCell from "./ActionCell";
import EditCell from "./EditCell";
import ImageCell from "./ImageCell";
import { Panel } from "rsuite";
import { updateByDbId } from "../../firebase/fetch";
import { getData, verifyItemChange } from "./helpers";

interface MyTableProps {
  passedData: Item[];
  setShowText: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
  updateSnackbar: (text: string, color: "red" | "green") => void;
}

const addIds = (originalData: Item[]) => {
  const res: RowData[] = originalData.map((item, index) => {
    return { ...item, id: index + "", status: null };
  });
  return res;
};

const MyTable = ({
  passedData,
  setShowText,
  setSelectedIndex,
  updateSnackbar,
}: MyTableProps) => {
  const [staticData, setStaticData] = useState<RowData[]>(addIds(passedData));
  const [sortColumn, setSortColumn] = useState("");
  const [sortType, setSortType] = useState<SortType>("asc");
  const [editingCount, setEditingCount] = useState(0);

  useEffect(() => {
    // sets data if state is empty
    if (staticData.length === 0) {
      setStaticData(addIds(passedData));
    } else if (sortColumn && sortType && editingCount === 0) {
      // if 0 items are being edited we allow to sort by values
      const newData = getData(staticData, sortColumn, sortType);
      setStaticData(newData);
    } else {
    }
    // inclusion of passedData creates infitine loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortColumn, sortType, editingCount, passedData]);

  const handleSortColumn = (sortColumn: string, sortType: SortType) => {
    setSortColumn(sortColumn);
    setSortType(sortType);
  };

  const handleChange = (id: string, key: string, value: any) => {
    const nextData = Object.assign([], staticData);
    nextData.find((item) => item.id === id)[key] = value;
    setStaticData(nextData);
  };

  const handleEditState = async (id: string, rowData: RowData) => {
    const isDataCorrent = verifyItemChange(rowData);
    if (isDataCorrent) {
      if (rowData.status === "EDIT") {
        setEditingCount(editingCount - 1);
      } else {
        setEditingCount(editingCount + 1);
      }
      const nextData = Object.assign([], staticData);
      const activeItem = nextData.find((item) => item.id === id);
      // we toggle the item status
      activeItem.status = activeItem.status ? null : "EDIT";
      setStaticData(nextData);
      const updateRes = await updateByDbId(rowData);
      if(updateRes ==="success"){
        updateSnackbar("Sucess", "red");

      }else{
        updateSnackbar("Failed to update", "red");

      }
    } else {
      updateSnackbar("Inncorect Data", "red");
      // dont do the up
    }
  };

  const handleRowClick = (id: number) => {
    setShowText(true);
    setSelectedIndex(id);
  };
  const handleImageClick = (id: number) => {
    setShowText(false);
    setSelectedIndex(id);
  };

  return (
    <Panel header="Przedmioty" bordered bodyFill>
      {editingCount}
      <Table
        autoHeight={true}
        data={staticData}
        sortColumn={sortColumn}
        sortType={sortType}
        onSortColumn={handleSortColumn}
      >
        <Column width={120} sortable>
          <HeaderCell>Nazwa</HeaderCell>
          <EditCell
            handleClick={handleRowClick}
            dataKey="name"
            onChange={handleChange}
            rowData={undefined}
          />
        </Column>

        <Column width={80} sortable>
          <HeaderCell>Ilosc</HeaderCell>
          <EditCell
            handleClick={handleRowClick}
            dataKey="count"
            onChange={handleChange}
            rowData={undefined}
          />
        </Column>

        <Column width={120} sortable>
          <HeaderCell>Miejsce</HeaderCell>
          <EditCell
            dataKey="location"
            handleClick={handleRowClick}
            onChange={handleChange}
            rowData={undefined}
          />
        </Column>

        <Column width={120} sortable>
          <HeaderCell>Kategoria</HeaderCell>
          <EditCell
            dataKey="category"
            handleClick={handleRowClick}
            onChange={handleChange}
            rowData={undefined}
          />
        </Column>

        <Column width={200} sortable>
          <HeaderCell>Opis</HeaderCell>
          <EditCell
            dataKey="description"
            handleClick={handleRowClick}
            onChange={handleChange}
            rowData={undefined}
          />
        </Column>

        <Column width={80}>
          <HeaderCell>Edit</HeaderCell>
          <ActionCell
            staticData={staticData}
            dataKey="id"
            onClick={handleEditState}
            rowData={undefined}
          />
        </Column>

        <Column width={80}>
          <HeaderCell>Images</HeaderCell>
          <ImageCell
            dataKey="imageCount"
            onClick={handleImageClick}
            rowData={undefined}
          />
        </Column>
      </Table>
    </Panel>
  );
};

export default MyTable;
