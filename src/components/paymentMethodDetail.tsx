import React from "react";
import { Link, Route } from "react-router-dom";
import { Card } from "./card";
import Assist from "../classes/assist";
import DataGrid, { Column, Pager, Paging } from "devextreme-react/data-grid";
import AppInfo from "../classes/app-info";
import HtmlEditor from "devextreme-react/html-editor";

interface PaymentMethodArgs {
  paymentMethod: any;
  unsubmitComponent?: React.ReactElement | null;
}
export const PaymentMethodDetail = ({
  paymentMethod: memberQuery,
  unsubmitComponent,
}: PaymentMethodArgs) => {
  return (
    /* start title */
    <Card title="Properties" showHeader={true}>
      <div className="form">
        <div className="dx-fieldset">
          <div className="dx-fieldset-header">Title</div>
          <div className="dx-field">
            <div className="dx-field-label">Name</div>
            <div className="dx-field-value-static">
              <strong>{memberQuery.name}</strong>
            </div>
          </div>
          <div className="dx-field">
            <div className="dx-field-label">Type</div>
            <div className="dx-field-value-static">
              <strong>{memberQuery.type}</strong>
            </div>
          </div>
        </div>
        {memberQuery.type == "Mobile" && (
          <div className="dx-fieldset">
            <div className="dx-fieldset-header">Mobile Money</div>
            <div className="dx-field">
              <div className="dx-field-label">Name</div>
              <div className="dx-field-value-static">
                <strong>{memberQuery.method_name}</strong>
              </div>
            </div>
            <div className="dx-field">
              <div className="dx-field-label">Number</div>
              <div className="dx-field-value-static">
                <strong>{memberQuery.method_number}</strong>
              </div>
            </div>
          </div>
        )}
        {memberQuery.type != "Mobile" && (
          <div className="dx-fieldset">
            <div className="dx-fieldset-header">Bank Details</div>
            <div className="dx-field">
              <div className="dx-field-label">Bank</div>
              <div className="dx-field-value-static">
                <strong>{memberQuery.bank_name}</strong>
              </div>
            </div>
            <div className="dx-field">
              <div className="dx-field-label">Branch Name</div>
              <div className="dx-field-value-static">
                <strong>{memberQuery.bank_branch_name}</strong>
              </div>
            </div>
            <div className="dx-field">
              <div className="dx-field-label">Branch Code</div>
              <div className="dx-field-value-static">
                <strong>{memberQuery.bank_branch_code}</strong>
              </div>
            </div>
            <div className="dx-field">
              <div className="dx-field-label">Account Name</div>
              <div className="dx-field-value-static">
                <strong>{memberQuery.bank_account_name}</strong>
              </div>
            </div>
            <div className="dx-field">
              <div className="dx-field-label">Account No</div>
              <div className="dx-field-value-static">
                <strong>{memberQuery.bank_account_no}</strong>
              </div>
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
