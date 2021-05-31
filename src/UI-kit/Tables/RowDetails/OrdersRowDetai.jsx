import React from "react";
import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow, Typography
} from "@material-ui/core";

export const OrdersRowDetail = ({row}) => {
  const styles = useStyles();

  return (
    <Paper>
      <Typography variant="subtitle2" className={styles.title}>№ заказа: {row.id}</Typography>
      <TableContainer>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Название</TableCell>
              <TableCell align="left">Автор</TableCell>
              <TableCell align="left">Цена</TableCell>
              <TableCell align="left">Количество</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {row.books.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row"> {row.book.title}</TableCell>
                <TableCell align="left">{row.book.author}</TableCell>
                <TableCell align="left">{row.book.price} сом</TableCell>
                <TableCell align="left">{row.quantity}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={2} align="left"><b>Сумма</b></TableCell>
              <TableCell colSpan={4} align="left"><b>{row.sum} сом</b></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

const useStyles = makeStyles(() => ({
  title: {
    padding: "6px 0 6px 16px"
  }
}));