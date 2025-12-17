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
}
export const MemberTimeValueList = ({
  data,
  loadingText,
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
        onCellPrepared={(e) => {
          if (
            e.rowType === "data" &&
            e.column.dataField === "payout_balance" &&
            e.data.payout_balance < 0
          ) {
            e.cellElement.style.cssText = `color: white; background-color:#FFB8B8`;
          }
        }}
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
          dataField={`stotal`}
          caption="Total Savings"
          format={",##0.##"}
          hidingPriority={1}
        ></Column>
        <Column
          dataField={`itotal`}
          caption="Monthly Interest Accrued"
          format={",##0.##"}
          hidingPriority={1}
        ></Column>
        <Column
          dataField={`time_value_total`}
          caption="Time Value Total"
          format={",##0.##"}
          hidingPriority={1}
        ></Column>
        <Column
          dataField={`proportional_final_share`}
          caption="Proportional Final Share"
          format={",##0.##"}
          hidingPriority={1}
        ></Column>
        <Column
          dataField={`loan_balance`}
          caption="Loan Balance"
          format={",##0.##"}
          hidingPriority={1}
        ></Column>
        <Column
          dataField={`payout_balance`}
          caption="Payout Balance"
          format={",##0.##"}
          hidingPriority={1}
        ></Column>
        <Column
          dataField="bank_name"
          caption="Bank"
          minWidth={120}
          hidingPriority={2}
          visible={false}
        ></Column>
        <Column
          dataField="bank_branch_name"
          caption="Branch Name"
          minWidth={120}
          hidingPriority={2}
          visible={false}
        ></Column>
        <Column
          dataField="bank_branch_code"
          caption="Branch Code"
          minWidth={120}
          hidingPriority={2}
          visible={false}
        ></Column>
        <Column
          dataField="bank_account_no"
          caption="Account No"
          minWidth={120}
          hidingPriority={2}
          visible={false}
        ></Column>
        <Column
          dataField="bank_account_name"
          caption="Account Name"
          minWidth={120}
          hidingPriority={2}
          visible={false}
        ></Column>
        <Summary>
          <TotalItem
            column="stotal"
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
          <TotalItem
            column="loan_balance"
            summaryType="sum"
            valueFormat={",##0.###"}
            displayFormat="{0}"
          />
          <TotalItem
            column="time_value_total"
            summaryType="sum"
            valueFormat={",##0.###"}
            displayFormat="{0}"
          />
          <TotalItem
            column="proportional_final_share"
            summaryType="sum"
            valueFormat={",##0.###"}
            displayFormat="{0}"
          />
          <TotalItem
            column="payout_balance"
            summaryType="sum"
            valueFormat={",##0.##"}
            displayFormat="{0}"
          />
        </Summary>
      </DataGrid>
    </Card>
  );
};
