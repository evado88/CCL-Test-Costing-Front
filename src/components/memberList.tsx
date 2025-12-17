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

interface MonthlyPostArgs {
  data: any;
  loadingText: string;
  addButtonOptions?: any;
  filterComponent?: React.ReactElement | null;
  title: string
}
export const MemberList = ({
  data,
  loadingText,
  addButtonOptions,
  filterComponent,
  title
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
        <Column dataField="id" caption="ID" hidingPriority={22}></Column>
        <Column
          dataField="email"
          caption="Name"
          hidingPriority={22}
          cellRender={(e) => {
            const getLink = () => {
              return `/admin/members/view/${e.data.id}`;
            };
            return <a href={getLink()}>{e.text}</a>;
          }}
        ></Column>
        <Column
          dataField="stage.stage_name"
          caption="Stage"
          hidingPriority={21}
        ></Column>
        <Column
          dataField="status.status_name"
          caption="Status"
          hidingPriority={20}
        ></Column>
        <Column
          dataField="fname"
          caption="First Name"
          hidingPriority={19}
        ></Column>
        <Column
          dataField="lname"
          caption="Last name"
          hidingPriority={18}
        ></Column>
        <Column
          dataField="dob"
          caption="Date of Birth"
          dataType={"date"}
          format={"dd MMMM yyyy"}
          hidingPriority={17}
        ></Column>
        <Column
          dataField="position"
          caption="Position"
          hidingPriority={16}
          visible={false}
        ></Column>
        <Column
          dataField="id_type"
          caption="ID Type"
          hidingPriority={15}
        ></Column>
        <Column
          dataField="id_no"
          caption="ID No"
          hidingPriority={14}
          visible={false}
        ></Column>
        <Column
          dataField="mobile1"
          caption="Mobile 1"
          hidingPriority={13}
        ></Column>
        <Column
          dataField="mobile2"
          caption="Mobile 2"
          hidingPriority={12}
        ></Column>
        <Column
          dataField="address_physical"
          caption="Physical Aaddress"
          visible={false}
        ></Column>
        <Column
          dataField="address_postal"
          caption="Postal Address"
          visible={false}
        ></Column>
        <Column
          dataField="guar_fname"
          caption="Guarantor First Name"
          hidingPriority={9}
          visible={false}
        ></Column>
        <Column
          dataField="guar_lname"
          caption="Guarantor Last Name"
          hidingPriority={8}
          visible={false}
        ></Column>
        <Column
          dataField="guar_mobile"
          caption="Guarantor Mobile"
          hidingPriority={7}
          visible={false}
        ></Column>
        <Column
          dataField="guar_email"
          caption="Guarantor Email"
          hidingPriority={6}
          visible={false}
        ></Column>
        <Column
          dataField="bank_name"
          caption="Bank Name"
          hidingPriority={5}
          visible={false}
        ></Column>
        <Column
          dataField="bank_branch_name"
          caption="Branch Name"
          hidingPriority={4}
          visible={false}
        ></Column>
        <Column
          dataField="bank_branch_code"
          caption="Branch Code"
          hidingPriority={3}
          visible={false}
        ></Column>
        <Column
          dataField="bank_account_name"
          caption="Account name"
          hidingPriority={2}
          visible={false}
        ></Column>
        <Column
          dataField="created_at"
          caption="Registered"
          dataType="date"
          format="dd MMM yyy HH:MM"
          hidingPriority={1}
        ></Column>
      </DataGrid>
    </Card>
  );
};
