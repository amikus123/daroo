import React, { useEffect, useState } from "react";
import { Table, Column, HeaderCell } from "rsuite-table";
import { Item } from "../../const/types";
import ActionCell from "./ActionCell";
import EditCell from "./EditCell";

interface MyTableProps {
  passedData: Item[];
}
type TableRow = Item & { id: string; status: "EDIT" | null };

const addIds = (originalData: Item[]) => {
  const res: TableRow[] = originalData.map((item, index) => {
    return { ...item, id: index + 1 + "", status: null };
  });
  console.log(res);
  return res;
};

const MyTable = ({ passedData }: MyTableProps) => {
  const [staticData, setStaticData] = useState<TableRow[]>(addIds(passedData));
  const [sortColumn, setSortColumn] = useState("");
  const [sortType, setSortType] = useState<any>("");
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  // click to show images
  useEffect(() => {
    console.log("effect");
    getData(staticData);
  }, [sortColumn, sortType, editing]);

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
    console.log(sortColumn, sortType, "XD");
    setTimeout(() => {
      setLoading(false);
      setSortColumn(sortColumn);
      setSortType(sortType);
    }, 500);
  };

  const handleChange = (id: string, key: string, value: any) => {
    console.log("change");
    const nextData = Object.assign([], staticData);
    nextData.find((item) => item.id === id)[key] = value;
    setStaticData(nextData);
  };

  const handleEditState = (id: string) => {
    console.log("edut ");
    setEditing(!editing);
    const nextData = Object.assign([], staticData);
    const activeItem = nextData.find((item) => item.id === id);
    console.log(activeItem, nextData);
    activeItem.status = activeItem.status ? null : "EDIT";
    setStaticData(nextData);
  };

  return (
    <Table
      className=".rs-theme-dark"
      height={420}
      data={staticData}
      sortColumn={sortColumn}
      sortType={sortType}
      onSortColumn={handleSortColumn}
      loading={loading}
      onRowClick={(data) => {
        console.log(data);
      }}
    >
      <Column width={200} sortable >
        <HeaderCell >Lokacja</HeaderCell>
        <EditCell
          dataKey="location"
          onChange={handleChange}
          rowData={undefined}
        />
      </Column>

      <Column width={200} sortable>
        <HeaderCell>Kategoria</HeaderCell>
        <EditCell
          dataKey="category"
          onChange={handleChange}
          rowData={undefined}
        />
      </Column>

      <Column width={300} sortable>
        <HeaderCell>Nazwa</HeaderCell>
        <EditCell dataKey="name" onChange={handleChange} rowData={undefined} />
      </Column>

      <Column flexGrow={1} sortable>
        <HeaderCell>Opis</HeaderCell>
        <EditCell
          dataKey="description"
          onChange={handleChange}
          rowData={undefined}
        />
      </Column>
      <Column flexGrow={1} sortable>
        <HeaderCell>Ilosc</HeaderCell>
        <EditCell dataKey="count" onChange={handleChange} rowData={undefined} />
      </Column>

      <Column flexGrow={1}>
        <HeaderCell>Opis</HeaderCell>
        <ActionCell
          dataKey="id"
          onClick={handleEditState}
          rowData={undefined}
        />
      </Column>
    </Table>
  );
};

export default MyTable;