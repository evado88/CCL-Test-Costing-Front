import React from "react";
import { Link, Route } from "react-router-dom";
import { Card } from "./card";
import Assist from "../classes/assist";
import DataGrid, { Column, Pager, Paging } from "devextreme-react/data-grid";
import AppInfo from "../classes/app-info";
import HtmlEditor from "devextreme-react/html-editor";

interface AnnouncementArgs {
  announcement: any;
  unsubmitComponent?: React.ReactElement | null;
}
export const AnnouncementDetail = ({
  announcement,
  unsubmitComponent,
}: AnnouncementArgs) => {
  return (
    /* start title */
    <Card title="Properties" showHeader={true}>
      <div className="form">
        <div className="dx-fieldset">
          <div className="dx-fieldset-header">Title</div>
          <div className="dx-field">
            <div className="dx-field-label">Title</div>
            <div className="dx-field-value-static">
              <strong>{announcement.title}</strong>
            </div>
          </div>
        </div>
        <div className="dx-fieldset">
          <div className="dx-fieldset-header">Attachment File</div>
          <div className="dx-field">
            <DataGrid
              className={"dx-card wide-card"}
              dataSource={[announcement.attachment]}
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
              height="525px"
              readOnly={true}
              defaultValue={announcement.content}
              value={announcement.content}
            ></HtmlEditor>
          </div>
        </div>
        <div className="dx-fieldset">
          <div className="dx-fieldset-header">Submission</div>
          <div className="dx-field">
            <div className="dx-field-label">User</div>
            <div className="dx-field-value-static">
              <strong>{announcement.created_by}</strong>
            </div>
          </div>
          <div className="dx-field">
            <div className="dx-field-label">Status</div>
            <div className="dx-field-value-static">
              <strong>{announcement.status.status_name}</strong>
            </div>
          </div>
          <div className="dx-field">
            <div className="dx-field-label">Approval Levels</div>
            <div className="dx-field-value-static">
              <strong>{announcement.approval_levels}</strong>
            </div>
          </div>
          <div className="dx-field">
            <div className="dx-field-label">Stage</div>
            <div className="dx-field-value-static">
              <strong>{announcement.stage.stage_name}</strong>
            </div>
          </div>
          <div className="dx-field">
            <div className="dx-field-label">Date Submitted</div>
            <div className="dx-field-value-static">
              <strong>{Assist.getDateText(announcement.created_at)}</strong>
            </div>
          </div>
          {unsubmitComponent}
        </div>
      </div>
    </Card>
  );
};
