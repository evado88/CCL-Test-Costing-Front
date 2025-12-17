import Assist from "../classes/assist";
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

interface MemberMonthlySavingsArgs {
  data: any;
  loadingText: string;
  title: string;
}
export const MemberMonthlySavingsList = ({
  data,
  loadingText,
  title,
}: MemberMonthlySavingsArgs) => {
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
          dataField={`tsavings.m1`}
          caption="Jan"
          format={",##0.##"}
          hidingPriority={13}
        ></Column>
        <Column
          dataField={`tsavings.m2`}
          caption="Feb"
          format={",##0.##"}
          hidingPriority={12}
        ></Column>
        <Column
          dataField={`tsavings.m3`}
          caption="Mar"
          format={",##0.##"}
          hidingPriority={11}
        ></Column>
        <Column
          dataField={`tsavings.m4`}
          caption="Apr"
          format={",##0.##"}
          hidingPriority={10}
        ></Column>
        <Column
          dataField={`tsavings.m5`}
          caption="May"
          format={",##0.##"}
          hidingPriority={9}
        ></Column>
        <Column
          dataField={`tsavings.m6`}
          caption="Jun"
          format={",##0.##"}
          hidingPriority={8}
        ></Column>
        <Column
          dataField={`tsavings.m7`}
          caption="Jul"
          format={",##0.##"}
          hidingPriority={7}
        ></Column>
        <Column
          dataField={`tsavings.m8`}
          caption="Aug"
          format={",##0.##"}
          hidingPriority={6}
        ></Column>
        <Column
          dataField={`tsavings.m9`}
          caption="Sep"
          format={",##0.##"}
          hidingPriority={5}
        ></Column>
        <Column
          dataField={`tsavings.m10`}
          caption="Oct"
          format={",##0.##"}
          hidingPriority={4}
        ></Column>
        <Column
          dataField={`tsavings.m11`}
          caption="Nov"
          format={",##0.##"}
          hidingPriority={3}
        ></Column>
        <Column
          dataField={`tsavings.m12`}
          caption="Dec"
          format={",##0.##"}
          hidingPriority={2}
        ></Column>
        <Column
          dataField={`stotal`}
          caption="Total"
          format={",##0.##"}
          hidingPriority={1}
        ></Column>
        <Summary>
          <TotalItem
            column="tsavings.m1"
            summaryType="sum"
            valueFormat={",##0.###"}
            displayFormat="{0}"
          />
          <TotalItem
            column="tsavings.m2"
            summaryType="sum"
            valueFormat={",##0.###"}
            displayFormat="{0}"
          />
          <TotalItem
            column="tsavings.m3"
            summaryType="sum"
            valueFormat={",##0.###"}
            displayFormat="{0}"
          />
          <TotalItem
            column="tsavings.m4"
            summaryType="sum"
            valueFormat={",##0.###"}
            displayFormat="{0}"
          />
          <TotalItem
            column="tsavings.m5"
            summaryType="sum"
            valueFormat={",##0.###"}
            displayFormat="{0}"
          />
          <TotalItem
            column="tsavings.m6"
            summaryType="sum"
            valueFormat={",##0.###"}
            displayFormat="{0}"
          />
          <TotalItem
            column="tsavings.m7"
            summaryType="sum"
            valueFormat={",##0.###"}
            displayFormat="{0}"
          />
          <TotalItem
            column="tsavings.m8"
            summaryType="sum"
            valueFormat={",##0.###"}
            displayFormat="{0}"
          />
          <TotalItem
            column="tsavings.m9"
            summaryType="sum"
            valueFormat={",##0.###"}
            displayFormat="{0}"
          />
          <TotalItem
            column="tsavings.m10"
            summaryType="sum"
            valueFormat={",##0.###"}
            displayFormat="{0}"
          />
          <TotalItem
            column="tsavings.m11"
            summaryType="sum"
            valueFormat={",##0.###"}
            displayFormat="{0}"
          />
          <TotalItem
            column="tsavings.m12"
            summaryType="sum"
            valueFormat={",##0.###"}
            displayFormat="{0}"
          />
          <TotalItem
            column="stotal"
            summaryType="sum"
            valueFormat={",##0.###"}
            displayFormat="{0}"
          />
        </Summary>
      </DataGrid>
    </Card>
  );
};
