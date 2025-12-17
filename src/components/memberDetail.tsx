import React from "react";
import { Link, Route } from "react-router-dom";
import { Card } from "./card";
import Assist from "../classes/assist";
import DataGrid, { Column, Pager, Paging } from "devextreme-react/data-grid";
import AppInfo from "../classes/app-info";
interface MemberArgs {
  member: any;
}
export const MemberDetail = ({ member }: MemberArgs) => {
  return (
    /* start title */
    <Card title="Properties" showHeader={true}>
      <div className="form">
        <div className="dx-fieldset">
          <div className="dx-fieldset-header">Personal Details</div>
          <div className="dx-field">
            <div className="dx-field-label">Full Name</div>
            <div className="dx-field-value-static">
              <strong>
                {member.fname} {member.lname}
              </strong>
            </div>
          </div>
          <div className="dx-field">
            <div className="dx-field-label">Date of Birth</div>
            <div className="dx-field-value-static">
              <strong>{Assist.formatDateLong(member.dob)}</strong>
            </div>
          </div>
          <div className="dx-field">
            <div className="dx-field-label">Email</div>
            <div className="dx-field-value-static">
              <strong>{member.email}</strong>
            </div>
          </div>
        </div>
        <div className="dx-fieldset">
          <div className="dx-fieldset-header">Identity</div>
          <div className="dx-field">
            <div className="dx-field-label">Type of ID</div>
            <div className="dx-field-value-static">
              <strong>{member.id_type}</strong>
            </div>
          </div>
          <div className="dx-field">
            <div className="dx-field-label">ID No</div>
            <div className="dx-field-value-static">
              <strong>{member.id_no}</strong>
            </div>
          </div>
        </div>
        <div className="dx-fieldset">
          <div className="dx-fieldset-header">ID Attachment</div>
          <div className="dx-field">
            <DataGrid
              className={"dx-card wide-card"}
              dataSource={[member.attachment]}
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
          <div className="dx-fieldset-header">Mobile Phone</div>
          <div className="dx-field">
            <div className="dx-field-label">Verification</div>
            <div className="dx-field-value-static">
              <strong>{member.mobile1}</strong>
            </div>
          </div>
          <div className="dx-field">
            <div className="dx-field-label">Mobile Money</div>
            <div className="dx-field-value-static">
              <strong>{member.mobile2}</strong>
            </div>
          </div>
        </div>
        <div className="dx-fieldset">
          <div className="dx-fieldset-header">Guarantor</div>
          <div className="dx-field">
            <div className="dx-field-label">Full names</div>
            <div className="dx-field-value-static">
              <strong>
                {member.guar_fname} {member.guar_lname}
              </strong>
            </div>
          </div>
          <div className="dx-field">
            <div className="dx-field-label">Mobile</div>
            <div className="dx-field-value-static">
              <strong>{member.guar_mobile}</strong>
            </div>
          </div>
          <div className="dx-field">
            <div className="dx-field-label">Email</div>
            <div className="dx-field-value-static">
              <strong>{member.guar_email}</strong>
            </div>
          </div>
        </div>
        <div className="dx-fieldset">
          <div className="dx-fieldset-header">Bank</div>
          <div className="dx-field">
            <div className="dx-field-label">Bank name</div>
            <div className="dx-field-value-static">
              <strong>{member.bank_name}</strong>
            </div>
          </div>
          <div className="dx-field">
            <div className="dx-field-label">Branch name</div>
            <div className="dx-field-value-static">
              <strong>{member.bank_branch_name}</strong>
            </div>
          </div>
          <div className="dx-field">
            <div className="dx-field-label">Branch code</div>
            <div className="dx-field-value-static">
              <strong>{member.bank_branch_code}</strong>
            </div>
          </div>
          <div className="dx-field">
            <div className="dx-field-label">Account name</div>
            <div className="dx-field-value-static">
              <strong>{member.bank_account_name}</strong>
            </div>
          </div>

          <div className="dx-field">
            <div className="dx-field-label">Account number</div>
            <div className="dx-field-value-static">
              <strong>{member.bank_account_no}</strong>
            </div>
          </div>
        </div>
        <div className="dx-fieldset">
          <div className="dx-fieldset-header">Submission</div>
          <div className="dx-field">
            <div className="dx-field-label">Status</div>
            <div className="dx-field-value-static">
              <strong>{member.status.status_name}</strong>
            </div>
          </div>
          <div className="dx-field">
            <div className="dx-field-label">Approval Levels</div>
            <div className="dx-field-value-static">
              <strong>{member.approval_levels}</strong>
            </div>
          </div>
          <div className="dx-field">
            <div className="dx-field-label">Stage</div>
            <div className="dx-field-value-static">
              <strong>{member.stage.stage_name}</strong>
            </div>
          </div>
          <div className="dx-field">
            <div className="dx-field-label">Date Submitted</div>
            <div className="dx-field-value-static">
              <strong>{Assist.getDateText(member.created_at)}</strong>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
