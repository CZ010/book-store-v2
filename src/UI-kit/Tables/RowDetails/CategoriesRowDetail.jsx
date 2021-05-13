import React from "react";
import {Chip, makeStyles} from "@material-ui/core";

export const CategoriesRowDetail = ({row}) => {
  const styles = useStyles();
  return (
    <div>
      <p>
        <strong>ID:</strong>&nbsp;&nbsp;&nbsp;&nbsp;{row.id}
      </p>
      <p>
        <strong>Название:</strong>&nbsp;&nbsp;&nbsp;&nbsp;{row.title}
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
  );
};
const useStyles = makeStyles(() => ({
  chip: {
    background: "#4caf50",
    color: "#fff",
    margin: 0
  }
}));