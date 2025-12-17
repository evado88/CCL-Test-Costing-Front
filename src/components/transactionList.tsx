import Assist from "../classes/assist";
import { Card } from "./card";
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
interface MonthlyPostArgs {
  data: any;
  loadingText: string;
  addButtonOptions?: any;
  isLoan: boolean;
  isPenalty: boolean;
  isExpenseEarning?: boolean;
  title: string;
}
export const TransactionList = ({
  data,
  loadingText,
  addButtonOptions,
  isLoan,
  isPenalty,
  isExpenseEarning,
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
        <Column dataField="id" caption="ID" hidingPriority={13}></Column>
        <Column
          dataField="date"
          caption="Date"
          dataType="date"
          format={"dd MMMM yyy"}
          hidingPriority={12}
          cellRender={(e) => {
            if (isExpenseEarning) {
              const getLink = () => {
                if (e.data.status.status_name == "Draft") {
                  return `/admin/expenses-earnings/edit/${e.data.id}`;
                } else {
                  return `/admin/expenses-earnings/view/${e.data.id}`;
                }
              };

              return <a href={getLink()}>{e.text}</a>;
            } else {
              return e.text;
            }
          }}
        ></Column>
        <Column
          dataField="post.period_id"
          caption="Period"
          hidingPriority={11}
        ></Column>
        <Column
          dataField="type.type_name"
          caption="Type"
          hidingPriority={11}
        ></Column>
        {isExpenseEarning && (
          <Column
            dataField="group.group_name"
            caption="Group"
            hidingPriority={11}
          ></Column>
        )}
        {isPenalty && (
          <Column
            dataField="ptype.type_name"
            caption="Penalty Type"
            hidingPriority={11}
          ></Column>
        )}
        <Column
          dataField="stage.stage_name"
          caption="Stage"
          hidingPriority={11}
        ></Column>
        <Column
          dataField="status.status_name"
          caption="Status"
          hidingPriority={11}
        ></Column>
        <Column
          dataField="amount"
          caption="Amount"
          format={",##0.###"}
          hidingPriority={10}
        ></Column>
        {isLoan && (
          <Column
            dataField="interest_rate"
            caption="Interest Rate"
            format={",##0.###"}
            hidingPriority={10}
          ></Column>
        )}
        {isLoan && (
          <Column
            dataField="term_months"
            caption="Duration"
            format={",##0.###"}
            hidingPriority={10}
          ></Column>
        )}
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
      </DataGrid>
    </Card>
  );
};
