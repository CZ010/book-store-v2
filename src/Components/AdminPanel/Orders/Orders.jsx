import React, {useCallback, useEffect, useRef, useState} from "react";
import * as Firestore from "../../../Services/Firestore/Firestore";
import {Chip, makeStyles} from "@material-ui/core";
import {DataTypeProvider} from "@devexpress/dx-react-grid";
import {Table, OrdersRowDetail} from "../../../UI-kit/Tables";
import saveAs from "file-saver";

const Orders = () => {
  const styles = useStyles();
  const [orders, setOrders] = useState([]);

  const [columns] = useState([
    // {name: "id", title: "ID"},
    {name: "user", title: "Заказчик", getCellValue: row => (row.user ? row.user.name : undefined)},
    {name: "address", title: "Адрес", getCellValue: row => (row.user ? row.user.address : undefined)},
    {name: "phone", title: "Телефон", getCellValue: row => (row.user ? row.user.phone : undefined)},
    {name: "createDate", title: "Дата"},
    {name: "sum", title: "Сумма к оплате"},
    {name: "status", title: "Статус"},
  ]);
  const [loading, setLoading] = useState(true);
  const [grouping, setGrouping] = useState([]);
  const [selection, setSelection] = useState([]);
  const exporterRef = useRef(null);
  const [pageSizes] = useState([5, 10, 15, 0]);
  const [statusColumns] = useState(["status"]);
  const [dateColumns] = useState(["createDate"]);
  const [sumColumns] = useState(["sum"]);

  const statusFormatter = ({value}) => value ?
    (<Chip component={"span"} label={"Доставлено"} className={styles.chip}/>) :
    (<Chip component={"span"} label={"Не Доставлено"} color={"secondary"}/>);
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

  const sumFormatter = ({value}) => `${value} сом`;
  const SumTypeProvider = props => (
    <DataTypeProvider
      formatterComponent={sumFormatter}
      {...props}
    />
  );

  useEffect(() => {
    Firestore.getOrdersCollection().then(collection => {
      setOrders(collection);
      setLoading(false);
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
      rows={orders}
      columns={columns}
      loading={loading}
      grouping={grouping}
      setGrouping={setGrouping}
      selection={selection}
      setSelection={setSelection}
      rowDetail={OrdersRowDetail}
      pageSizes={pageSizes}
      startExport={startExport}
      exporterRef={exporterRef}
      onSave={onSave}
    >
      <StatusTypeProvider for={statusColumns}/>
      <DateTypeProvider for={dateColumns}/>
      <SumTypeProvider for={sumColumns}/>
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

export default Orders;