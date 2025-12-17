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
} from "devextreme-react/data-grid";

interface PostingPeriodArgs {
  data: any;
  loadingText: string;
  addButtonOptions?: any;
  filterYearComponent?: React.ReactElement | null;
  filterMonthComponent?: React.ReactElement | null;
  isMember: boolean;
}
export const PostingPeriodingsList = ({
  data,
  loadingText,
  addButtonOptions,
  filterYearComponent,
  filterMonthComponent,
  isMember,
}: PostingPeriodArgs) => {
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
        <Paging defaultPageSize={12} />
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
          {filterYearComponent != null && (
            <Item location="before" locateInMenu="auto">
              {filterYearComponent}
            </Item>
          )}
          {filterMonthComponent != null && (
            <Item location="before" locateInMenu="auto">
              {filterMonthComponent}
            </Item>
          )}
          <Item name="columnChooserButton" />
        </Toolbar>
        <Column
          dataField="id"
          caption="ID"
          hidingPriority={12}
          sortOrder="asc"
        ></Column>
        <Column
          dataField="name"
          caption="Name"
          dataType="date"
          format={"MMMM yyy"}
          hidingPriority={11}
          cellRender={(e) => {
            const getLink = () => {
              if (e.data.status == "Draft") {
                return `/admin/posting-periods/edit/${e.data.id}`;
              } else {
                return `/admin/posting-periods/view/${e.data.id}`;
              }
            };

            return <a href={getLink()}>{e.text}</a>;
          }}
        ></Column>
        <Column
          dataField="status"
          caption="Status"
          hidingPriority={10}
          cellRender={(e) => {
            if (e.data.status == "Approved") {
              //draft
              return (
                <a href={`/admin/monthly-postings/ddac-report/${e.data.id}`}>
                  {e.text}, View DDAC
                </a>
              );
            } else {
              return e.text;
            }
          }}
        ></Column>
        <Column dataField="stage" caption="Stage" hidingPriority={9}></Column>
        <Column
          dataField={`sid${Assist.STAGE_AWAITING_SUBMISSION}`}
          caption="Awaiting Submission"
          format={",##0.###"}
          hidingPriority={8}
        ></Column>
        <Column
          dataField={`sid${Assist.STAGE_SUBMITTED}`}
          caption="Submitted"
          format={",##0.###"}
          hidingPriority={7}
        ></Column>
        <Column
          dataField={`sid${Assist.STAGE_PRIMARY_APPROVAL}`}
          caption="Primary Approval"
          format={",##0.###"}
          hidingPriority={6}
        ></Column>
        <Column
          dataField={`sid${Assist.STAGE_SECONDARY_APPROVAL}`}
          caption="Secondary Approval"
          format={",##0.###"}
          hidingPriority={5}
        ></Column>
        <Column
          dataField={`sid${Assist.STAGE_GUARANTOR_APPROVAL}`}
          caption="Guarantor Approval"
          format={",##0.###"}
          hidingPriority={4}
        ></Column>
        <Column
          dataField={`sid${Assist.STAGE_AWAITING_POP_UPLOAD}`}
          caption="Awaiting POP Upload"
          format={",##0.###"}
          hidingPriority={3}
        ></Column>
        <Column
          dataField={`sid${Assist.STAGE_AWAITING_POP_APPROVAL}`}
          caption="Awaiting POP Approval"
          format={",##0.###"}
          hidingPriority={2}
        ></Column>
        <Column
          dataField={`sid${Assist.STAGE_APPROVED}`}
          caption="Approved"
          format={",##0.###"}
          hidingPriority={1}
        ></Column>
      </DataGrid>
    </Card>
  );
};
