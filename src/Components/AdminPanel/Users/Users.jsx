import React, {useCallback, useEffect, useRef, useState} from "react";
import * as Firestore from "../../../Services/Firestore/Firestore";
import {Chip, makeStyles} from "@material-ui/core";
import {DataTypeProvider} from "@devexpress/dx-react-grid";
import saveAs from "file-saver";
import {Table, UserRowDetail} from "../../../UI-kit/Tables";

const Users = () => {
  const styles = useStyles();
  const [users, setUsers] = useState([]);
  const [columns] = useState([
    // {name: "id", title: "ID"},
    {name: "name", title: "Имя"},
    {name: "address", title: "Адрес"},
    {name: "phone", title: "Телефон"},
    {name: "email", title: "Почта"},
    {name: "role", title: "Роль", getCellValue: row => (row.role ? row.role.title : undefined)},
    {name: "createDate", title: "Дата регистрации"},
    {name: "status", title: "Статус"},
  ]);
  const [loading, setLoading] = useState(true);
  const [grouping, setGrouping] = useState([]);
  const [selection, setSelection] = useState([]);
  const exporterRef = useRef(null);
  const [pageSizes] = useState([5, 10, 15, 0]);
  const [statusColumns] = useState(["status"]);
  const [dateColumns] = useState(["createDate"]);

  const statusFormatter = ({value}) => value ?
    (<Chip component={"span"} label={"Акивен"} className={styles.chip}/>) :
    (<Chip component={"span"} label={"Не активен"} color={"secondary"}/>);
  const StatusTypeProvider = props => (
    <DataTypeProvider
      formatterComponent={statusFormatter}
      {...props}
    />
  );

  const dateFormatter = ({value}) => new Date(value).toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "2-digit",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const DateTypeProvider = props => (
    <DataTypeProvider
      formatterComponent={dateFormatter}
      {...props}
    />
  );

  useEffect(() => {
    Firestore.getUsersCollection().then(collection => {
      setUsers(collection);
      setLoading(false);
    }).catch(error => {
      console.error(error);
    });
  }, []);

  const startExport = useCallback((options) => {
    exporterRef.current.exportGrid(options);
  }, [exporterRef]);

  const onSave = (workbook) => {
    workbook.xlsx.writeBuffer().then((buffer) => {
      saveAs(new Blob([buffer], {type: "application/octet-stream"}), "DataGrid.xlsx");
    });
  };

  return (
    <Table
      rows={users}
      columns={columns}
      loading={loading}
      grouping={grouping}
      setGrouping={setGrouping}
      selection={selection}
      setSelection={setSelection}
      rowDetail={UserRowDetail}
      pageSizes={pageSizes}
      startExport={startExport}
      exporterRef={exporterRef}
      onSave={onSave}
    >
      <StatusTypeProvider for={statusColumns}/>
      <DateTypeProvider for={dateColumns}/>
    </Table>
  );
};

const useStyles = makeStyles(() => ({
  root: {
    color: "#2c3e50"
  },
  chip: {
    background: "#4caf50",
    color: "#fff",
    margin: 0
  }
}));

export default Users;