import React from "react";
import { Link, Route } from "react-router-dom";
import { Card } from "./card";
import Assist from "../classes/assist";
import DataGrid, {
  Column,
  Pager,
  Paging,
  FilterRow,
  LoadPanel,
  ColumnChooser,
  Editing,
  Toolbar,
  Item,
  Summary,
  TotalItem,
} from "devextreme-react/data-grid";
import SelectBox, { type SelectBoxTypes } from "devextreme-react/select-box";

interface InterestSharingArgs {
  data: any;
  loadingText: string;
  showSavings?: boolean;
  title: string
}
export const InterestSharingList = ({
  data,
  loadingText,
  title
}: InterestSharingArgs) => {
  return (
    /* start title */

    <Card showHeader={false}>
      <DataGrid
        className={"dx-card wide-card"}
        dataSource={data}
        keyExpr={"id"}
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
        <Column
          dataField="id"
          caption="ID"
          sortOrder="asc"
          hidingPriority={18}
        ></Column>
        <Column
          dataField="fname"
          caption="First Name"
          hidingPriority={17}
        ></Column>
        <Column
          dataField="lname"
          caption="Last name"
          hidingPriority={16}
          visible={false}
        ></Column>
        <Column
          dataField="email"
          caption="Email"
          visible={false}
          hidingPriority={15}
        ></Column>
        <Column
          dataField="phone"
          caption="Phone"
          visible={false}
          hidingPriority={14}
        ></Column>
        <Column
          dataField={`isharing.m1`}
          caption="Jan"
          format={",##0.##"}
          hidingPriority={13}
        ></Column>
        <Column
          dataField={`isharing.m2`}
          caption="Feb"
          format={",##0.##"}
          hidingPriority={12}
        ></Column>
        <Column
          dataField={`isharing.m3`}
          caption="Mar"
          format={",##0.##"}
          hidingPriority={11}
        ></Column>
        <Column
          dataField={`isharing.m4`}
          caption="Apr"
          format={",##0.##"}
          hidingPriority={10}
        ></Column>
        <Column
          dataField={`isharing.m5`}
          caption="May"
          format={",##0.##"}
          hidingPriority={9}
        ></Column>
        <Column
          dataField={`isharing.m6`}
          caption="Jun"
          format={",##0.##"}
          hidingPriority={8}
        ></Column>
        <Column
          dataField={`isharing.m7`}
          caption="Jul"
          format={",##0.##"}
          hidingPriority={7}
        ></Column>
        <Column
          dataField={`isharing.m8`}
          caption="Aug"
          format={",##0.##"}
          hidingPriority={6}
        ></Column>
        <Column
          dataField={`isharing.m9`}
          caption="Sep"
          format={",##0.##"}
          hidingPriority={5}
        ></Column>
        <Column
          dataField={`isharing.m10`}
          caption="Oct"
          format={",##0.##"}
          hidingPriority={4}
        ></Column>
        <Column
          dataField={`isharing.m11`}
          caption="Nov"
          format={",##0.##"}
          hidingPriority={3}
        ></Column>
        <Column
          dataField={`isharing.m12`}
          caption="Dec"
          format={",##0.##"}
          hidingPriority={2}
        ></Column>
        <Column
          dataField={`itotal`}
          caption="Total"
          format={",##0.##"}
          hidingPriority={1}
        ></Column>
        <Summary>
          <TotalItem
            column="isharing.m1"
            summaryType="sum"
            valueFormat={",##0.###"}
            displayFormat="{0}"
          />
          <TotalItem
            column="isharing.m2"
            summaryType="sum"
            valueFormat={",##0.###"}
            displayFormat="{0}"
          />
          <TotalItem
            column="isharing.m3"
            summaryType="sum"
            valueFormat={",##0.###"}
            displayFormat="{0}"
          />
          <TotalItem
            column="isharing.m4"
            summaryType="sum"
            valueFormat={",##0.###"}
            displayFormat="{0}"
          />
          <TotalItem
            column="isharing.m5"
            summaryType="sum"
            valueFormat={",##0.###"}
            displayFormat="{0}"
          />
          <TotalItem
            column="isharing.m6"
            summaryType="sum"
            valueFormat={",##0.###"}
            displayFormat="{0}"
          />
          <TotalItem
            column="isharing.m7"
            summaryType="sum"
            valueFormat={",##0.###"}
            displayFormat="{0}"
          />
          <TotalItem
            column="isharing.m8"
            summaryType="sum"
            valueFormat={",##0.###"}
            displayFormat="{0}"
          />
          <TotalItem
            column="isharing.m9"
            summaryType="sum"
            valueFormat={",##0.###"}
            displayFormat="{0}"
          />
          <TotalItem
            column="isharing.m10"
            summaryType="sum"
            valueFormat={",##0.###"}
            displayFormat="{0}"
          />
          <TotalItem
            column="isharing.m11"
            summaryType="sum"
            valueFormat={",##0.###"}
            displayFormat="{0}"
          />
          <TotalItem
            column="isharing.m12"
            summaryType="sum"
            valueFormat={",##0.###"}
            displayFormat="{0}"
          />
          <TotalItem
            column="itotal"
            summaryType="sum"
            valueFormat={",##0.###"}
            displayFormat="{0}"
          />
        </Summary>
      </DataGrid>
    </Card>
  );
};
