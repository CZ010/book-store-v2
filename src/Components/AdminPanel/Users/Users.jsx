import React, {useCallback, useEffect, useRef, useState} from "react";
import * as Firestore from "../../../Services/Firestore/Firestore";
import {Chip, Input, makeStyles, MenuItem, Select, Switch} from "@material-ui/core";
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
  const [roleColumns] = useState(["role"]);
  const [statusColumns] = useState(["status"]);
  const [dateColumns] = useState(["createDate"]);
  const [editingStateColumnExtensions] = useState([
    {columnName: "createDate", editingEnabled: false},
  ]);
  const [roles, setRoles] = useState([]);


  const statusFormatter = ({value, row}) => value ?
    (<Chip component={"span"} label={"Акивен"} className={styles.chip}/>) :
    (<Chip component={"span"} label={"Не активен"} color={"secondary"}/>);

  const statusEditor = ({value, onValueChange}) => (
    <Switch
      checked={value}
      onChange={event => onValueChange(event.target.checked)}
      color={"primary"}
    />
  );

  const StatusTypeProvider = props => (
    <DataTypeProvider
      formatterComponent={statusFormatter}
      editorComponent={statusEditor}
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

  const rolesEditor = ({value, onValueChange}) => {

    const elementsIndex = roles.findIndex(element => element.title === value);
    let df = {...roles[elementsIndex]};

    return <Select
      input={<Input/>}
      onChange={event => onValueChange({...roles[roles.findIndex(element => element.id === event.target.value)]})}
      style={{width: "100%"}}
      defaultValue={df.id}
    >
      {
        roles.map(role => (
          <MenuItem key={role.id} value={role.id}>
            {role.title}
          </MenuItem>
        ))
      }
    </Select>;
  };

  const RolesTypeProvider = props => (
    <DataTypeProvider
      editorComponent={rolesEditor}
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

    Firestore.getRolesCollection().then(collection => {
      setRoles(collection);
    }).catch(error => {
      console.error("ERROR!!! => ", error);
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

  const commitChanges = ({changed}) => {
    let row;
    let id;
    for (const usersKey in users) {
      if (changed[usersKey]) {
        row = users[usersKey];
        id = usersKey;
      }
    }

    if (changed[id]) {
      const changedRows = users.map(user => (row.id === user.id ? {...user, ...changed[id]} : user));
      setUsers(changedRows);
      console.log(changedRows[id]);
      Firestore.updateDocument("users", row.id, {
        id: changedRows[id].id,
        name: changedRows[id].name,
        address: changedRows[id].address,
        phone: changedRows[id].phone,
        email: changedRows[id].email,
        password: changedRows[id].password,
        role: changedRows[id].role.id,
        createDate: changedRows[id].createDate,
        status: changedRows[id].status
      }).catch(error => {
        console.error(error);
      });
    }
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
      commitChanges={commitChanges}
      editingStateColumnExtensions={editingStateColumnExtensions}
    >
      <StatusTypeProvider for={statusColumns}/>
      <DateTypeProvider for={dateColumns}/>
      <RolesTypeProvider for={roleColumns}/>
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