import React from "react";
import {
  ColumnChooser,
  DragDropProvider, ExportPanel,
  Grid, GroupingPanel, PagingPanel, SearchPanel,
  TableColumnVisibility, TableFilterRow, TableGroupRow,
  TableHeaderRow, TableRowDetail, TableSelection, Toolbar,
  VirtualTable, TableEditRow, TableEditColumn
} from "@devexpress/dx-react-grid-material-ui";
import {
  EditingState,
  FilteringState, GroupingState,
  IntegratedFiltering, IntegratedGrouping, IntegratedPaging, IntegratedSelection,
  IntegratedSorting, PagingState, RowDetailState,
  SearchState, SelectionState,
  SortingState
} from "@devexpress/dx-react-grid";
import {GridExporter} from "@devexpress/dx-react-grid-export";
import {Paper} from "@material-ui/core";
import * as Localization from "../Localization/TableLocalization";

export const Table = ({
                        children,
                        rows,
                        columns,
                        loading,
                        grouping,
                        setGrouping,
                        selection,
                        setSelection,
                        rowDetail,
                        pageSizes,
                        startExport,
                        exporterRef,
                        onSave,
                        columnExtensions,
                        editingStateColumnExtensions,
                        commitChanges
                      }) => {

  const {
    tableMessages,
    pagingPanelMessages,
    ColumnChooserMessage,
    ExportPanelMessage,
    GroupingPanelMessages,
    SearchPanelMessages,
    TableEditColumnMessage,
    TableHeaderRowMessage,
    FilterOperationsMessages
  } = Localization;


  return (
    <Paper elevation={3}>
      <Grid rows={rows} columns={columns}>

        {children}

        <EditingState
          onCommitChanges={commitChanges}
          columnExtensions={editingStateColumnExtensions}
        />

        <SortingState defaultSorting={[{columnName: "createDate", direction: "desc"}]}/>
        <IntegratedSorting/>

        <SearchState/>
        {/*<FilteringState defaultFilters={[]}/>*/}
        {/*<IntegratedFiltering/>*/}

        <PagingState defaultCurrentPage={0} defaultPageSize={pageSizes[0]}/>
        <IntegratedPaging/>

        <DragDropProvider/>
        <GroupingState grouping={grouping} onGroupingChange={setGrouping}/>
        <IntegratedGrouping/>

        <RowDetailState/>

        <SelectionState selection={selection} onSelectionChange={setSelection}/>
        <IntegratedSelection/>

        <VirtualTable messages={tableMessages(loading)} height={426} columnExtensions={columnExtensions}/>

        <TableHeaderRow showSortingControls messages={TableHeaderRowMessage}/>
        <TableColumnVisibility/>
        {/*<TableFilterRow showFilterSelector messages={FilterOperationsMessages}/>*/}
        <TableRowDetail contentComponent={rowDetail}/>
        <TableSelection showSelectAll/>
        <TableGroupRow/>
        <TableEditRow/>
        <TableEditColumn
          showEditCommand
          messages={TableEditColumnMessage}
        />


        <PagingPanel pageSizes={pageSizes} messages={pagingPanelMessages}/>

        <Toolbar/>
        <GroupingPanel showGroupingControls messages={GroupingPanelMessages}/>
        <SearchPanel messages={SearchPanelMessages}/>
        <ColumnChooser messages={ColumnChooserMessage}/>
        <ExportPanel startExport={startExport} messages={ExportPanelMessage}/>

      </Grid>
      <GridExporter
        ref={exporterRef}
        rows={rows}
        columns={columns}
        grouping={grouping}
        selection={selection}
        onSave={onSave}
      />
    </Paper>
  );
};
