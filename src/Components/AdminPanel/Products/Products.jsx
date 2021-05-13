import React, {useCallback, useEffect, useRef, useState} from "react";
import * as Firestore from "../../../Services/Firestore/Firestore";
import {Table, ProductsRowDetail} from "../../../UI-kit/Tables";
import {DataTypeProvider} from "@devexpress/dx-react-grid";
import saveAs from "file-saver";
import {Chip, makeStyles} from "@material-ui/core";

const Products = () => {
  const styles = useStyles();
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

  useEffect(() => {
    Firestore.getProductsCollection().then(collection => {
      setProducts(collection);
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
    >
      <StatusTypeProvider for={statusColumns}/>
      <DateTypeProvider for={dateColumns}/>
      <PriceTypeProvider for={priceColumns}/>
      <CountTypeProvider for={countColumns}/>
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