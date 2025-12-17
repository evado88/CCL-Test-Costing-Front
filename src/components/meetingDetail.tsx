import React from "react";
import { Link, Route } from "react-router-dom";
import { Card } from "./card";
import Assist from "../classes/assist";
import DataGrid, { Column, Pager, Paging } from "devextreme-react/data-grid";
import AppInfo from "../classes/app-info";
import HtmlEditor from "devextreme-react/html-editor";

interface MeetingArgs {
  meeting: any;
  attendanceList: any;
  unsubmitComponent?: React.ReactElement | null;
}
export const MeetingDetail = ({
  meeting,
  attendanceList,
  unsubmitComponent,
}: MeetingArgs) => {
  return (
    /* start title */
    <Card title="Properties" showHeader={true}>
      <div className="form">
        <div className="dx-fieldset">
          <div className="dx-fieldset-header">Title</div>
          <div className="dx-field">
            <div className="dx-field-label">Title</div>
            <div className="dx-field-value-static">
              <strong>{meeting.title}</strong>
            </div>
          </div>
          <div className="dx-field">
            <div className="dx-field-label">Date</div>
            <div className="dx-field-value-static">
              <strong>{Assist.getDateText(meeting.date)}</strong>
            </div>
          </div>
        </div>
        <div className="dx-fieldset">
          <div className="dx-fieldset-header">Attendance List</div>
          <div className="dx-field">
            <DataGrid
              className={"dx-card wide-card"}
              dataSource={[meeting.attachment]}
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
          <div className="dx-fieldset-header">Attendance List</div>
          <div className="dx-field">
            <DataGrid
              className={"dx-card wide-card"}
              dataSource={attendanceList}
              keyExpr={"user"}
              noDataText={"No attendance list uploaded"}
              showBorders={false}
              focusedRowEnabled={false}
              defaultFocusedRowIndex={0}
              columnAutoWidth={true}
              columnHidingEnabled={true}
            >
              <Paging defaultPageSize={10} />
              <Pager showPageSizeSelector={true} showInfo={true} />
              <Column
                dataField="id"
                caption="Member ID"
                hidingPriority={6}
              ></Column>
              <Column
                dataField="user"
                caption="Member"
                hidingPriority={5}
              ></Column>
              <Column
                dataField="type"
                caption="Type"
                hidingPriority={4}
              ></Column>
              <Column
                dataField="typeId"
                caption="Type ID"
                visible={false}
                hidingPriority={3}
              ></Column>
              <Column
                dataField="penalty"
                format={",##0.###"}
                caption="Penalty ZMW"
                hidingPriority={2}
              />
              <Column
                dataField="penaltyId"
                format={",##0.###"}
                caption="Penalty ID"
                hidingPriority={1}
              />
            </DataGrid>
          </div>
        </div>
        <div className="dx-fieldset">
          <div className="dx-fieldset-header">Content</div>
          <div className="dx-field">
            <HtmlEditor
              height="525px"
              readOnly={true}
              defaultValue={meeting.content}
              value={meeting.content}
            ></HtmlEditor>
          </div>
        </div>
        <div className="dx-fieldset">
          <div className="dx-fieldset-header">Submission</div>
          <div className="dx-field">
            <div className="dx-field-label">User</div>
            <div className="dx-field-value-static">
              <strong>{meeting.created_by}</strong>
            </div>
          </div>
          <div className="dx-field">
            <div className="dx-field-label">Status</div>
            <div className="dx-field-value-static">
              <strong>{meeting.status.status_name}</strong>
            </div>
          </div>
          <div className="dx-field">
            <div className="dx-field-label">Approval Levels</div>
            <div className="dx-field-value-static">
              <strong>{meeting.approval_levels}</strong>
            </div>
          </div>
          <div className="dx-field">
            <div className="dx-field-label">Stage</div>
            <div className="dx-field-value-static">
              <strong>{meeting.stage.stage_name}</strong>
            </div>
          </div>
          <div className="dx-field">
            <div className="dx-field-label">Date Submitted</div>
            <div className="dx-field-value-static">
              <strong>{Assist.getDateText(meeting.created_at)}</strong>
            </div>
          </div>
          {unsubmitComponent}
        </div>
      </div>
    </Card>
  );
};
