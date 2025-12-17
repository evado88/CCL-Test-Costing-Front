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

interface MonthlyPostArgs {
  data: any;
  loadingText: string;
  addButtonOptions?: any;
  filterComponent?: React.ReactElement | null;
  isMember: boolean;
}
export const MonthlyPostingsListDDAC = ({
  data,
  loadingText,
  addButtonOptions,
  filterComponent,
  isMember,
}: MonthlyPostArgs) => {
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
        <LoadPanel enabled={true} />
        <ColumnChooser enabled={true} mode="select"></ColumnChooser>
        <Toolbar>
          {addButtonOptions != null && (
            <Item
              location="before"
              locateInMenu="auto"
              showText="always"
              widget="dxButton"
              options={addButtonOptions}
            />
          )}
          {filterComponent != null && (
            <Item location="before" locateInMenu="auto">
              {filterComponent}
            </Item>
          )}
          <Item name="columnChooserButton" />
        </Toolbar>
        <Column dataField="id" caption="ID" hidingPriority={13}></Column>
        <Column
          dataField="date"
          caption="Period"
          dataType="date"
          format={"MMMM yyy"}
          hidingPriority={15}
        ></Column>
        <Column
          dataField="stage.stage_name"
          caption="Stage"
          hidingPriority={141}
          visible={false}
        ></Column>
        <Column
          dataField="status.status_name"
          caption="Status"
          hidingPriority={13}
          visible={false}
        ></Column>
        <Column
          dataField="contribution_total"
          caption="Contribution Total"
          format={",##0.###"}
          hidingPriority={12}
          visible={false}
        ></Column>
        <Column
          dataField="member.fname"
          caption="First Name"
          minWidth={120}
          hidingPriority={2}
        ></Column>
        <Column
          dataField="member.lname"
          caption="Last Name"
          minWidth={120}
          hidingPriority={2}
        ></Column>
        <Column
          dataField="payment_method_type"
          caption="Pay Method"
          minWidth={120}
          hidingPriority={2}
        ></Column>
        <Column
          dataField="payment_method_number"
          caption="Phone Number"
          minWidth={120}
          hidingPriority={2}
        ></Column>
        <Column
          dataField="payment_method_name"
          caption="Phone Name"
          minWidth={120}
          hidingPriority={2}
        ></Column>
        <Column
          dataField="member.bank_name"
          caption="Bank"
          minWidth={120}
          hidingPriority={2}
        ></Column>
        <Column
          dataField="member.bank_branch_name"
          caption="Branch Name"
          minWidth={120}
          hidingPriority={2}
        ></Column>
        <Column
          dataField="member.bank_branch_code"
          caption="Branch Code"
          minWidth={120}
          hidingPriority={2}
        ></Column>
        <Column
          dataField="member.bank_account_no"
          caption="Account No"
          minWidth={120}
          hidingPriority={2}
        ></Column>
        <Column
          dataField="member.bank_account_name"
          caption="Account Name"
          minWidth={120}
          hidingPriority={2}
        ></Column>
        <Column
          dataField="receive_total"
          caption="Amount ZMW"
          format={",##0.###"}
          hidingPriority={11}
        ></Column>
        <Summary>
          <TotalItem
            column="receive_total"
            summaryType="sum"
            valueFormat={",##0.###"}
            displayFormat="{0}"
          />
        </Summary>
      </DataGrid>
    </Card>
  );
};
