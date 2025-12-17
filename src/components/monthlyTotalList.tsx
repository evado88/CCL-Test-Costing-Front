import React from "react";
import { Card } from "./card";
import DataGrid, {
  Column,
  Pager,
  Paging,
  FilterRow,
  ColumnChooser,
  Editing,
  Toolbar,
  Item,
  Summary,
  TotalItem,
} from "devextreme-react/data-grid";
import Assist from "../classes/assist";

interface MonthlyTotalArgs {
  data: any;
  loadingText: string;
  addButtonOptions?: any;
  filterComponent?: React.ReactElement | null;
  showId?: boolean;
  title: string;
}
export const MonthlyTotalList = ({
  data,
  loadingText,
  addButtonOptions,
  filterComponent,
  showId,
  title,
}: MonthlyTotalArgs) => {
  return (
    /* start title */

    <Card showHeader={false}>
      <DataGrid
        className={"dx-card wide-card"}
        dataSource={data}
        keyExpr={"m1"}
        noDataText={loadingText}
        showBorders={false}
        focusedRowEnabled={true}
        defaultFocusedRowIndex={0}
        columnAutoWidth={true}
        columnHidingEnabled={true}
      >
        <Paging defaultPageSize={10} />
        <Editing
          mode="row"
          allowUpdating={false}
          allowDeleting={false}
          allowAdding={false}
        />
        <Pager showPageSizeSelector={true} showInfo={true} />
        <FilterRow visible={true} />
        <ColumnChooser enabled={true} mode="select"></ColumnChooser>
        <Toolbar>
          <Item name="columnChooserButton" />
          <Item
            location="after"
            locateInMenu="auto"
            showText="always"
            widget="dxButton"
            options={{
              icon: "save",
              text: " Excel Export",
              onClick: () => Assist.downloadExcel(title, data),
            }}
          />
        </Toolbar>
        {showId != false && (
          <Column dataField={`id`} caption="ID" hidingPriority={14}></Column>
        )}
        <Column
          dataField={`m1`}
          caption="Jan"
          format={",##0.######"}
          hidingPriority={13}
        ></Column>
        <Column
          dataField={`m2`}
          caption="Feb"
          format={",##0.######"}
          hidingPriority={12}
        ></Column>
        <Column
          dataField={`m3`}
          caption="Mar"
          format={",##0.######"}
          hidingPriority={11}
        ></Column>
        <Column
          dataField={`m4`}
          caption="Apr"
          format={",##0.######"}
          hidingPriority={10}
        ></Column>
        <Column
          dataField={`m5`}
          caption="May"
          format={",##0.######"}
          hidingPriority={9}
        ></Column>
        <Column
          dataField={`m6`}
          caption="Jun"
          format={",##0.######"}
          hidingPriority={8}
        ></Column>
        <Column
          dataField={`m7`}
          caption="Jul"
          format={",##0.######"}
          hidingPriority={7}
        ></Column>
        <Column
          dataField={`m8`}
          caption="Aug"
          format={",##0.######"}
          hidingPriority={6}
        ></Column>
        <Column
          dataField={`m9`}
          caption="Sep"
          format={",##0.######"}
          hidingPriority={5}
        ></Column>
        <Column
          dataField={`m10`}
          caption="Oct"
          format={",##0.######"}
          hidingPriority={4}
        ></Column>
        <Column
          dataField={`m11`}
          caption="Nov"
          format={",##0.######"}
          hidingPriority={3}
        ></Column>
        <Column
          dataField={`m12`}
          caption="Dec"
          format={",##0.######"}
          hidingPriority={2}
        ></Column>
      </DataGrid>
    </Card>
  );
};
