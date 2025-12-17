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
  title: string;
}
export const MonthlyPostingsList = ({
  data,
  loadingText,
  addButtonOptions,
  filterComponent,
  isMember,
  title,
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
        <Column dataField="id" caption="ID" hidingPriority={17}></Column>
        <Column
          dataField="date"
          caption="Name"
          dataType="date"
          format={"MMMM yyy"}
          hidingPriority={16}
          cellRender={(e) => {
            const getLink = () => {
              const viewAdminLink = `/admin/monthly-postings/view/${e.data.id}`;
              const viewMemberLink = `/my/monthly-posting/view/${e.data.id}`;
              const editMemberLink = `/my/monthly-posting/edit/${e.data.id}`;
              const uploadMemberPOPLink = `/my/monthly-posting/pop-upload/${e.data.id}`;

              //check if this is a member
              if (isMember) {
                //member
                //check if draft
                if (e.data.status.status_name == "Draft") {
                  //draft
                  return editMemberLink;
                } else {
                  //check if awaiting POP
                  if (e.data.stage.stage_name == "Awaiting POP Upload") {
                    //pop upload
                    return uploadMemberPOPLink;
                  } else {
                    //view only
                    return viewMemberLink;
                  }
                }
              } else {
                //admin
                return viewAdminLink;
              }
            };

            return <a href={getLink()}>{e.text}</a>;
          }}
        ></Column>
        <Column
          dataField="stage.stage_name"
          caption="Stage"
          hidingPriority={15}
        ></Column>
        <Column
          dataField="status.status_name"
          caption="Status"
          hidingPriority={14}
        ></Column>
        <Column
          dataField="contribution_total"
          caption="Contribution Total"
          format={",##0.###"}
          hidingPriority={12}
        ></Column>
        <Column
          dataField="deposit_total"
          caption="Deposit Total"
          format={",##0.###"}
          hidingPriority={13}
        ></Column>
        <Column
          dataField="receive_total"
          caption="Receive Total"
          format={",##0.###"}
          hidingPriority={12}
        ></Column>
        <Column
          dataField="saving"
          caption="Saving"
          format={",##0.###"}
          hidingPriority={11}
        ></Column>
        <Column
          dataField="shares"
          caption="Shares"
          format={",##0.###"}
          hidingPriority={10}
        ></Column>
        <Column
          dataField="social"
          caption="Social"
          format={",##0.###"}
          hidingPriority={9}
        ></Column>
        <Column
          dataField="missed_meeting_penalty"
          caption="Meeting Penalty"
          format={",##0.###"}
          hidingPriority={8}
          visible={false}
        ></Column>
        <Column
          dataField="late_post_penalty"
          caption="Late Penalty"
          format={",##0.###"}
          hidingPriority={7}
          visible={false}
        ></Column>
        <Column
          dataField="penalty"
          caption="Penalty Other"
          format={",##0.###"}
          hidingPriority={6}
          visible={false}
        ></Column>
        <Column
          dataField="loan_interest"
          caption="Interest"
          format={",##0.###"}
          hidingPriority={5}
        ></Column>
        <Column
          dataField="loan_month_repayment"
          format={",##0.###"}
          caption="Loan Repayment"
          hidingPriority={4}
        ></Column>
        <Column
          dataField="loan_application"
          caption="Loan"
          hidingPriority={3}
        ></Column>
        <Column
          dataField="user.email"
          caption="User"
          minWidth={120}
          hidingPriority={2}
        ></Column>
        <Column
          dataField="created_at"
          caption="Date"
          dataType="date"
          format="dd MMM yyy HH:MM"
          hidingPriority={1}
        ></Column>
        <Summary>
          <TotalItem column="OrderNumber" summaryType="count" />
          <TotalItem
            column="contribution_total"
            summaryType="sum"
            valueFormat={",##0.###"}
            displayFormat="{0}"
          />
          <TotalItem
            column="deposit_total"
            summaryType="sum"
            valueFormat={",##0.###"}
            displayFormat="{0}"
          />
          <TotalItem
            column="receive_total"
            summaryType="sum"
            valueFormat={",##0.###"}
            displayFormat="{0}"
          />
          <TotalItem
            column="saving"
            summaryType="sum"
            valueFormat={",##0.###"}
            displayFormat="{0}"
          />
          <TotalItem
            column="shares"
            summaryType="sum"
            valueFormat={",##0.###"}
            displayFormat="{0}"
          />
          <TotalItem
            column="social"
            summaryType="sum"
            valueFormat={",##0.###"}
            displayFormat="{0}"
          />
          <TotalItem
            column="missed_meeting_penalty"
            summaryType="sum"
            valueFormat={",##0.###"}
            displayFormat="{0}"
          />
          <TotalItem
            column="late_post_penalty"
            summaryType="sum"
            valueFormat={",##0.###"}
            displayFormat="{0}"
          />
          <TotalItem
            column="penalty"
            summaryType="sum"
            valueFormat={",##0.###"}
            displayFormat="{0}"
          />
          <TotalItem
            column="loan_interest"
            summaryType="sum"
            valueFormat={",##0.###"}
            displayFormat="{0}"
          />
          <TotalItem
            column="loan_month_repayment"
            summaryType="sum"
            valueFormat={",##0.###"}
            displayFormat="{0}"
          />
          <TotalItem
            column="loan_application"
            summaryType="sum"
            valueFormat={",##0.###"}
            displayFormat="{0}"
          />
        </Summary>
      </DataGrid>
    </Card>
  );
};
