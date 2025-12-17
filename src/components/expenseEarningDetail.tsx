import React from "react";
import { Link, Route } from "react-router-dom";
import { Card } from "./card";
import Assist from "../classes/assist";
import DataGrid, { Column, Pager, Paging } from "devextreme-react/data-grid";
import AppInfo from "../classes/app-info";
import HtmlEditor from "devextreme-react/html-editor";

interface ExpenseEarningDetailArgs {
  transaction: any;
  unsubmitComponent?: React.ReactElement | null;
}
export const ExpenseEarningDetail = ({
  transaction: tran,
  unsubmitComponent,
}: ExpenseEarningDetailArgs) => {
  return (
    /* start title */
    <Card title="Properties" showHeader={true}>
      <div className="form">
        <div className="dx-fieldset">
          <div className="dx-fieldset-header">Details</div>
          <div className="dx-field">
            <div className="dx-field-label">Type</div>
            <div className="dx-field-value-static">
              <strong>{tran.type.type_name}</strong>
            </div>
          </div>
          <div className="dx-field">
            <div className="dx-field-label">Date</div>
            <div className="dx-field-value-static">
              <strong>{Assist.getDateText(tran.date)}</strong>
            </div>
          </div>
          <div className="dx-field">
            <div className="dx-field-label">Amount</div>
            <div className="dx-field-value-static">
              <strong>{Assist.formatCurrency(tran.amount)}</strong>
            </div>
          </div>
          <div className="dx-field">
            <div className="dx-field-label">Category</div>
            <div className="dx-field-value-static">
              <strong>{tran.group.group_name}</strong>
            </div>
          </div>
          <div className="dx-field">
            <div className="dx-field-label">Comments</div>
            <div className="dx-field-value-static">
              <strong>{tran.comments}</strong>
            </div>
          </div>
          <div className="dx-field">
            <div className="dx-field-label">Refereence</div>
            <div className="dx-field-value-static">
              <strong>{tran.reference}</strong>
            </div>
          </div>
        </div>
        <div className="dx-fieldset">
          <div className="dx-fieldset-header">Attachment</div>
          <div className="dx-field">
            <DataGrid
              className={"dx-card wide-card"}
              dataSource={[tran.attachment]}
              keyExpr={"id"}
              noDataText={"No attachment list uploaded"}
              showBorders={false}
              focusedRowEnabled={false}
              defaultFocusedRowIndex={0}
              columnAutoWidth={true}
              columnHidingEnabled={true}
            >
              <Paging defaultPageSize={10} />
              <Pager showPageSizeSelector={true} showInfo={true} />
              <Column dataField="id" caption="ID" hidingPriority={7}></Column>
              <Column
                dataField="name"
                caption="Name"
                hidingPriority={4}
                cellRender={(e) => {
                  return (
                    <a
                      href={encodeURI(`${AppInfo.apiUrl}static/${e.data.path}`)}
                      target="_null"
                    >
                      {e.text}
                    </a>
                  );
                }}
              ></Column>
              <Column
                dataField="filesize"
                caption="Size"
                format={",##0.###"}
                hidingPriority={4}
              ></Column>
              <Column
                dataField="filetype"
                caption="Type"
                hidingPriority={5}
              ></Column>
            </DataGrid>
          </div>
        </div>
        <div className="dx-fieldset">
          <div className="dx-fieldset-header">Submission</div>
          <div className="dx-field">
            <div className="dx-field-label">User</div>
            <div className="dx-field-value-static">
              <strong>{tran.created_by}</strong>
            </div>
          </div>
          <div className="dx-field">
            <div className="dx-field-label">Status</div>
            <div className="dx-field-value-static">
              <strong>{tran.status.status_name}</strong>
            </div>
          </div>
          <div className="dx-field">
            <div className="dx-field-label">Approval Levels</div>
            <div className="dx-field-value-static">
              <strong>{tran.approval_levels}</strong>
            </div>
          </div>
          <div className="dx-field">
            <div className="dx-field-label">Stage</div>
            <div className="dx-field-value-static">
              <strong>{tran.stage.stage_name}</strong>
            </div>
          </div>
          <div className="dx-field">
            <div className="dx-field-label">Date Submitted</div>
            <div className="dx-field-value-static">
              <strong>{Assist.getDateText(tran.created_at)}</strong>
            </div>
          </div>
          {unsubmitComponent}
        </div>
      </div>
    </Card>
  );
};
