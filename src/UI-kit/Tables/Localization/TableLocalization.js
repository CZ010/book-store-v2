import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";

export const tableMessages = loading => ({
  noData: loading ? <CircularProgress/> : "Нет данных"
});

export const pagingPanelMessages = {
  showAll: "Все",
  rowsPerPage: "Количество строк",
  info: "{from} - {to} (из {count})",
};

export const FilterOperationsMessages = {
  filterPlaceholder: "Фильтер",
  equal: "Равно",
  notEqual: "Не равно",
  contains: "Содержит",
  notContains: "Не содержит",
  startsWith: "Начинается с",
  endsWith: "Заканчивается на",
};

export const SearchPanelMessages = {
  searchPlaceholder: "Поиск...",
};

export const GroupingPanelMessages = {
  groupByColumn: `Перетащите сюда заголовок столбца,
    чтобы сгруппировать по этому столбцу`,
};

export const TableHeaderRowMessage = {
  sortingHint: "Сортировать",
};

export const ExportPanelMessage = {
  showExportMenu: "Экспорт",
  exportAll: "Экспорт всех данных",
  exportSelected: "Экспорт выбранных строк",
};

export const TableEditColumnMessage = {
  editCommand: <EditIcon color="action"/>,
  deleteCommand: <DeleteIcon color="action"/>,
  commitCommand: <SaveIcon color="primary"/>,
  cancelCommand: <CancelIcon color="secondary"/>,
};

export const ColumnChooserMessage = {
  showColumnChooser: "Показать средство выбора столбца",
};