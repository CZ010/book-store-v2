import React from "react";
import {Chip, makeStyles} from "@material-ui/core";

export const ProductsRowDetail = ({row}) => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <div className={styles.imageBox}>
        <img className={styles.img} src={row.image} alt="book cover"/>
      </div>
      <div>
        <p>
          <strong>ID:</strong>&nbsp;&nbsp;&nbsp;&nbsp;{row.id}
        </p>
        <p>
          <strong>Название:</strong>&nbsp;&nbsp;&nbsp;&nbsp;{row.title}
        </p>
        <p>
          <strong>Автор:</strong>&nbsp;&nbsp;&nbsp;&nbsp;{row.author}
        </p>
        <p>
          <strong>Категория:</strong>&nbsp;&nbsp;&nbsp;&nbsp;{row.category.title}
        </p>
        <p>
          <strong>Описание:</strong>&nbsp;&nbsp;&nbsp;&nbsp;{row.description}
        </p>
        <p>
          <strong>Цена:</strong>&nbsp;&nbsp;&nbsp;&nbsp;{row.price} сом
        </p>
        <p>
          <strong>Количество на скалде:</strong>&nbsp;&nbsp;&nbsp;&nbsp;{row.count} шт.
        </p>
        <p>
          <strong>Дата создания:</strong>&nbsp;&nbsp;&nbsp;&nbsp;{new Date(row.createDate)
          .toLocaleDateString("ru-RU", {
            year: "numeric",
            month: "2-digit",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })}
        </p>
        <p>
          <strong>Статус:</strong>&nbsp;&nbsp;&nbsp;&nbsp;{row.status ? (
            <Chip component={"span"} label={"Акивен"} className={styles.chip}/>) :
          (<Chip component={"span"} label={"Не активен"} color={"secondary"}/>)}
        </p>
      </div>
    </div>
  );
};

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    "&>div>p": {
      padding: "0",
      margin: "0",
      marginBottom: "8px"
    },

  },
  imageBox: {
    marginRight: "20px"
  },
  img: {
    height: "230px"
  },
  chip: {
    background: "#4caf50",
    color: "#fff",
    margin: 0
  }
}));