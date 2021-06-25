import React, {useCallback, useEffect, useRef, useState} from "react";
import * as Firestore from "../../../Services/Firestore/Firestore";
import {Table, ProductsRowDetail} from "../../../UI-kit/Tables";
import {DataTypeProvider} from "@devexpress/dx-react-grid";
import saveAs from "file-saver";
import {Chip, Input, makeStyles, MenuItem, Select, Switch} from "@material-ui/core";

const Products = () => {
  const styles = useStyles();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [columns] = useState([
    // {name: "id", title: "ID"},
    {name: "title", title: "Название"},
    {name: "author", title: "Автор"},
    // {name: "description", title: "Описание"},
    {name: "category", title: "Категория", getCellValue: row => (row.category ? row.category.title : undefined)},
    {name: "price", title: "Цена"},
    {name: "count", title: "Количество на скалде"},
    // {name: "image", title: "Обложка"},
    {name: "createDate", title: "Дата создания"},
    {name: "status", title: "Статус"},
  ]);
  const [tableColumnExtensions] = useState([
    {columnName: "title", wordWrapEnabled: true},
    {columnName: "category", wordWrapEnabled: true},
    {columnName: "createDate", wordWrapEnabled: true},
    {columnName: "count", wordWrapEnabled: true},
  ]);

  const [loading, setLoading] = useState(true);
  const [grouping, setGrouping] = useState([]);
  const [selection, setSelection] = useState([]);
  const exporterRef = useRef(null);
  const [pageSizes] = useState([4, 10, 15, 0]);
  const [statusColumns] = useState(["status"]);
  const [dateColumns] = useState(["createDate"]);
  const [priceColumns] = useState(["price"]);
  const [countColumns] = useState(["count"]);
  const [categoryColumns] = useState(["category"]);

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

  const priceFormatter = ({value}) => `${value} сом`;
  const PriceTypeProvider = props => (
    <DataTypeProvider
      formatterComponent={priceFormatter}
      {...props}
    />
  );

  const countFormatter = ({value}) => `${value} шт.`;
  const CountTypeProvider = props => (
    <DataTypeProvider
      formatterComponent={countFormatter}
      {...props}
    />
  );

  const categoryEditor = ({value, onValueChange}) => {

    const elementsIndex = categories.findIndex(element => element.title === value);
    let df = {...categories[elementsIndex]};

    return <Select
      input={<Input/>}
      onChange={event => onValueChange({...categories[categories.findIndex(element => element.id === event.target.value)]})}
      style={{width: "100%"}}
      defaultValue={df.id}
    >
      {
        categories.map(category => (
          <MenuItem key={category.id} value={category.id}>
            {category.title}
          </MenuItem>
        ))
      }
    </Select>;
  };

  const CategoryTypeProvider = props => (
    <DataTypeProvider
      editorComponent={categoryEditor}
      {...props}
    />
  );

  useEffect(() => {
    Firestore.getProductsCollection().then(collection => {
      setProducts(collection);
      setLoading(false);
    }).catch(error => {
      console.error(error);
    });

    Firestore.getCategoriesCollection().then(collection => {
      setCategories(collection);
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
    for (const categoriesKey in products) {
      if (changed[categoriesKey]) {
        row = products[categoriesKey];
        id = categoriesKey;
      }
    }

    if (changed[id]) {
      const changedRows = products.map(user => (row.id === user.id ? {...user, ...changed[id]} : user));
      setProducts(changedRows);
      console.log(changedRows[id]);
      Firestore.updateDocument("products", row.id, {
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
      rows={products}
      columns={columns}
      loading={loading}
      grouping={grouping}
      setGrouping={setGrouping}
      selection={selection}
      setSelection={setSelection}
      rowDetail={ProductsRowDetail}
      pageSizes={pageSizes}
      startExport={startExport}
      exporterRef={exporterRef}
      onSave={onSave}
      columnExtensions={tableColumnExtensions}
      commitChanges={commitChanges}
      editingStateColumnExtensions={editingStateColumnExtensions}
    >
      <StatusTypeProvider for={statusColumns}/>
      <DateTypeProvider for={dateColumns}/>
      <PriceTypeProvider for={priceColumns}/>
      <CountTypeProvider for={countColumns}/>
      <CategoryTypeProvider for={categoryColumns}/>
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

export default Products;