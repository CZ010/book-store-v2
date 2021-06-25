import React, {useCallback, useEffect, useRef, useState} from "react";
import * as Firestore from "../../../Services/Firestore/Firestore";
import {Table, CategoriesRowDetail} from "../../../UI-kit/Tables";
import {DataTypeProvider} from "@devexpress/dx-react-grid";
import saveAs from "file-saver";
import {Chip, makeStyles, Switch} from "@material-ui/core";

const Categories = () => {
  const styles = useStyles();
  const [categories, setCategories] = useState([]);
  const [columns] = useState([
    // {name: "id", title: "ID"},
    {name: "title", title: "Название"},
    {name: "createDate", title: "Дата создания"},
    {name: "status", title: "Статус"},
  ]);

  const [loading, setLoading] = useState(true);
  const [grouping, setGrouping] = useState([]);
  const [selection, setSelection] = useState([]);
  const exporterRef = useRef(null);
  const [pageSizes] = useState([5, 10, 15, 0]);
  const [statusColumns] = useState(["status"]);
  const [dateColumns] = useState(["createDate"]);

  const [editingStateColumnExtensions] = useState([
    {columnName: "createDate", editingEnabled: false},
  ]);

  const statusFormatter = ({value}) => value ?
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

  useEffect(() => {
    Firestore.getCategoriesCollection().then(collection => {
      setCategories(collection);
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

  const commitChanges = ({changed}) => {
    let row;
    let id;
    for (const categoriesKey in categories) {
      if (changed[categoriesKey]) {
        row = categories[categoriesKey];
        id = categoriesKey;
      }
    }

    if (changed[id]) {
      const changedRows = categories.map(user => (row.id === user.id ? {...user, ...changed[id]} : user));
      setCategories(changedRows);
      console.log(changedRows[id]);
      Firestore.updateDocument("categories", row.id, {
        id: changedRows[id].id,
        title: changedRows[id].title,
        createDate: changedRows[id].createDate,
        status: changedRows[id].status
      }).catch(error => {
        console.error(error);
      });
    }
  };

  return (
    <Table
      rows={categories}
      columns={columns}
      loading={loading}
      grouping={grouping}
      setGrouping={setGrouping}
      selection={selection}
      setSelection={setSelection}
      rowDetail={CategoriesRowDetail}
      pageSizes={pageSizes}
      startExport={startExport}
      exporterRef={exporterRef}
      onSave={onSave}
      commitChanges={commitChanges}
      editingStateColumnExtensions={editingStateColumnExtensions}
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

export default Categories;