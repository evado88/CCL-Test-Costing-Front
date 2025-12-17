import React from "react";
import { Link, Route } from "react-router-dom";
import { Card } from "./card";
import Assist from "../classes/assist";
import DataGrid, { Column, Pager, Paging } from "devextreme-react/data-grid";
import AppInfo from "../classes/app-info";
import HtmlEditor from "devextreme-react/html-editor";

interface MemberQueryArgs {
  memberQuery: any;
  unsubmitComponent?: React.ReactElement | null;
}
export const MemberQueryDetail = ({
  memberQuery,
  unsubmitComponent,
}: MemberQueryArgs) => {
  return (
    /* start title */
    <Card title="Properties" showHeader={true}>
      <div className="form">
        <div className="dx-fieldset">
          <div className="dx-fieldset-header">Title</div>
          <div className="dx-field">
            <div className="dx-field-label">Title</div>
            <div className="dx-field-value-static">
              <strong>{memberQuery.title}</strong>
            </div>
          </div>
          <div className="dx-field">
            <div className="dx-field-label">Category</div>
            <div className="dx-field-value-static">
              <strong>{memberQuery.type.query_type_name}</strong>
            </div>
          </div>
        </div>
        <div className="dx-fieldset">
          <div className="dx-fieldset-header">Attachment File</div>
          <div className="dx-field">
            <DataGrid
              className={"dx-card wide-card"}
              dataSource={[memberQuery.attachment]}
              keyExpr={"id"}
              noDataText={"No attendance list uploaded"}
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
          <div className="dx-fieldset-header">Content</div>
          <div className="dx-field">
            <HtmlEditor
              height="325px"
              readOnly={true}
              defaultValue={memberQuery.content}
              value={memberQuery.content}
            ></HtmlEditor>
          </div>
        </div>
        {memberQuery.stage_id > 2 && (
          <div className="dx-fieldset">
            <div className="dx-fieldset-header">Response</div>
            <div className="dx-field">
              <HtmlEditor
                height="325px"
                readOnly={true}
                defaultValue={memberQuery.response}
                value={memberQuery.response}
              ></HtmlEditor>
            </div>
          </div>
        )}
        <div className="dx-fieldset">
          <div className="dx-fieldset-header">Submission</div>
          <div className="dx-field">
            <div className="dx-field-label">User</div>
            <div className="dx-field-value-static">
              <strong>{memberQuery.created_by}</strong>
            </div>
          </div>
          <div className="dx-field">
            <div className="dx-field-label">Status</div>
            <div className="dx-field-value-static">
              <strong>{memberQuery.status.status_name}</strong>
            </div>
          </div>
          <div className="dx-field">
            <div className="dx-field-label">Approval Levels</div>
            <div className="dx-field-value-static">
              <strong>{memberQuery.approval_levels}</strong>
            </div>
          </div>
          <div className="dx-field">
            <div className="dx-field-label">Stage</div>
            <div className="dx-field-value-static">
              <strong>{memberQuery.stage.stage_name}</strong>
            </div>
          </div>
          <div className="dx-field">
            <div className="dx-field-label">Date Submitted</div>
            <div className="dx-field-value-static">
              <strong>{Assist.getDateText(memberQuery.created_at)}</strong>
            </div>
          </div>
          {unsubmitComponent}
        </div>
      </div>
    </Card>
  );
};
