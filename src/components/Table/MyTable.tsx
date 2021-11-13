import React, { useEffect, useState } from "react";
import { Table, Column, HeaderCell } from "rsuite-table";
import { Item } from "../../const/types";
import ActionCell from "./ActionCell";
import EditCell from "./EditCell";
import ImageCell from "./ImageCell";
import { Panel } from "rsuite";

interface MyTableProps {
  passedData: Item[];
  setShowText: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
}

type TableRow = Item & { id: string; status: "EDIT" | null };

const addIds = (originalData: Item[]) => {
  const res: TableRow[] = originalData.map((item, index) => {
    return { ...item, id: index + "", status: null };
  });
  return res;
};

const MyTable = ({
  passedData,
  setShowText,
  setSelectedIndex,
}: MyTableProps) => {
  const [staticData, setStaticData] = useState<TableRow[]>(addIds(passedData));
  const [sortColumn, setSortColumn] = useState("");
  const [sortType, setSortType] = useState<any>("");
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editingCount,setEditingCount] = useState(0)
  useEffect(() => {
  }, [passedData]);
  useEffect(() => {
    if (staticData.length === 0) {
      setStaticData(addIds(passedData));
    } else {
      getData(staticData);
    }
  }, [sortColumn, sortType, editing, passedData]);

  const getData = (data: TableRow[]) => {
    let copy = [...data];
    if (sortColumn && sortType && !editing) {
      // get first char
      copy = copy.sort((a, b) => {
        let x: string | number = a[sortColumn];
        let y: string | number = b[sortColumn];
        let xVal = 0,
          yVal = 0;
        if (typeof x === "string" && typeof y === "string") {
          xVal = x.localeCompare(y);
          yVal = 0;
        } else {
          xVal = a[sortColumn];
          yVal = b[sortColumn];
        }

        if (sortType === "asc") {
          return xVal - yVal;
        } else {
          return yVal - xVal;
        }
      });
    }
    setStaticData(copy);
  };

  const handleSortColumn = (sortColumn, sortType) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSortColumn(sortColumn);
      setSortType(sortType);
    }, 500);
  };

  const handleChange = (id: string, key: string, value: any) => {
    const nextData = Object.assign([], staticData);
    nextData.find((item) => item.id === id)[key] = value;
    setStaticData(nextData);
  };

  const handleEditState = (id: string) => {
    setEditing(!editing);
    const nextData = Object.assign([], staticData);
    const activeItem = nextData.find((item) => item.id === id);
    console.log(activeItem, nextData,"XD",editing);
    // if we are about to save, 
    if(editing){
      // verify if item is correct
    }
    activeItem.status = activeItem.status ? null : "EDIT";

    setStaticData(nextData);
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
      <Table
        autoHeight={true}
        data={staticData}
        sortColumn={sortColumn}
        sortType={sortType}
        onSortColumn={handleSortColumn}
        loading={loading}
        onRowClick={(data) => {
        }}
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
