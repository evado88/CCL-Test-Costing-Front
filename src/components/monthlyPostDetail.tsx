import React from "react";
import { Link, Route } from "react-router-dom";
import { Card } from "./card";
import Assist from "../classes/assist";
import { Fieldset } from "./fieldset";
import { Field } from "./field";
import { DataGrid } from "devextreme-react";
import { Column, Pager, Paging } from "devextreme-react/data-grid";
import AppInfo from "../classes/app-info";
interface MonthlyPostArgs {
  monthlyPosting: any;
  unsubmitComponent?: React.ReactElement | null;
}
export const MonthlyPostDetail = ({
  monthlyPosting,
  unsubmitComponent,
}: MonthlyPostArgs) => {
  const isMobileMoney = () => {
    //check if there is a loan
    if (monthlyPosting.payment_method_type == null) {
      return false;
    } else {
      return monthlyPosting.payment_method_type != "Bank Transfer";
    }
  };

  return (
    /* start title */
    <Card title="Properties" showHeader={true}>
      <div className="form">
        <Fieldset title="Personal Details">
          <Field title="Full Name" staticContent={true}>
            <strong>
              {monthlyPosting.user.fname} {monthlyPosting.user.lname}
            </strong>
          </Field>
          <Field title="Period" staticContent={true}>
            <strong>{monthlyPosting.period.period_name}</strong>
          </Field>
        </Fieldset>
        <Fieldset title="Savings & Contributions">
          <Field title="Savings" staticContent={true}>
            <strong>
              <strong>{Assist.formatCurrency(monthlyPosting.saving)}</strong>
            </strong>
          </Field>
          <Field title="Shares" staticContent={true}>
            <strong>{Assist.formatCurrency(monthlyPosting.shares)}</strong>
          </Field>
          <Field title="Social Fund" staticContent={true}>
            <strong>{Assist.formatCurrency(monthlyPosting.social)}</strong>
          </Field>
          <Field title="Penalty" staticContent={true}>
            <strong>{Assist.formatCurrency(monthlyPosting.penalty)}</strong>
          </Field>
          <Field title="Payment Method Type" staticContent={true}>
            <strong>{monthlyPosting.payment_method_type}</strong>
          </Field>
          {isMobileMoney() && (
            <Field title="Payment Method Number" staticContent={true}>
              <strong>{monthlyPosting.payment_method_number}</strong>
            </Field>
          )}
          {isMobileMoney() && (
            <Field title="Payment Method Name" staticContent={true}>
              <strong>{monthlyPosting.payment_method_name}</strong>
            </Field>
          )}
        </Fieldset>

        <div className="dx-fieldset">
          <div className="dx-fieldset-header">Interest</div>
          <div className="dx-field">
            <div className="dx-field-label">Loan Interest</div>
            <div className="dx-field-value-static">
              <strong>
                {Assist.formatCurrency(monthlyPosting.loan_interest)}
              </strong>
            </div>
          </div>
        </div>
        <div className="dx-fieldset">
          <div className="dx-fieldset-header">Loan Repayment</div>
          <div className="dx-field">
            <div className="dx-field-label">Loan Payment</div>
            <div className="dx-field-value-static">
              <strong>
                {Assist.formatCurrency(monthlyPosting.loan_month_repayment)}
              </strong>
            </div>
          </div>
        </div>
        <div className="dx-fieldset">
          <div className="dx-fieldset-header">Loan Application</div>
          <div className="dx-field">
            <div className="dx-field-label">Loan Amount</div>
            <div className="dx-field-value-static">
              <strong>
                {Assist.formatCurrency(monthlyPosting.loan_application)}
              </strong>
            </div>
          </div>
          <div className="dx-field">
            <div className="dx-field-label">Require Guarantor Approval</div>
            <div className="dx-field-value-static">
              <strong>
                {monthlyPosting.guarantor_required == Assist.RESPONSE_YES
                  ? "Yes"
                  : "No"}
              </strong>
            </div>
          </div>
        </div>
        {monthlyPosting.stage_id >= 7 &&  <div className="dx-fieldset">
          <div className="dx-fieldset-header">Proof of Payment</div>
          <Field staticContent={true} title="POP Comments / Reference">
            <strong>{monthlyPosting.pop_comments}</strong>
          </Field>

          <div className="dx-field">
            <DataGrid
              className={"dx-card wide-card"}
              dataSource={[monthlyPosting.attachment]}
              keyExpr={"id"}
              noDataText={"No POP uploaded"}
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
        </div>}
        {monthlyPosting.guarantor_required == Assist.RESPONSE_YES && (
          <div className="dx-fieldset">
            <div className="dx-fieldset-header">Guarantor</div>
            <div className="dx-field">
              <div className="dx-field-label">Name</div>
              <div className="dx-field-value-static">
                <strong>
                  {monthlyPosting.member.guar_fname}{" "}
                  {monthlyPosting.member.guar_lname}
                </strong>
              </div>
            </div>
            <div className="dx-field">
              <div className="dx-field-label">Email</div>
              <div className="dx-field-value-static">
                <strong>{monthlyPosting.member.guar_email}</strong>
              </div>
            </div>
            <div className="dx-field">
              <div className="dx-field-label">Phone</div>
              <div className="dx-field-value-static">
                <strong>{monthlyPosting.member.guar_mobile}</strong>
              </div>
            </div>
          </div>
        )}
        <div className="dx-fieldset">
          <div className="dx-fieldset-header">Summary</div>
          <div className="dx-field">
            <div className="dx-field-label">Contribution Total</div>
            <div className="dx-field-value-static">
              <strong>
                {Assist.formatCurrency(monthlyPosting.contribution_total)}
              </strong>
            </div>
          </div>
          <div className="dx-field">
            <div className="dx-field-label">Deposit Total</div>
            <div className="dx-field-value-static">
              <strong className="text-danger">
                {Assist.formatCurrency(monthlyPosting.deposit_total)}
              </strong>
            </div>
          </div>
          <div className="dx-field">
            <div className="dx-field-label">Receive Total</div>
            <div className="dx-field-value-static">
              <strong className="text-success">
                {Assist.formatCurrency(monthlyPosting.receive_total)}
              </strong>
            </div>
          </div>
        </div>
        <div className="dx-fieldset">
          <div className="dx-fieldset-header">Comments & feedback</div>
          <div className="dx-field">
            <div className="dx-field-label">Comments</div>
            <div className="dx-field-value-static">
              {monthlyPosting.comments}
            </div>
          </div>
        </div>
        <div className="dx-fieldset">
          <div className="dx-fieldset-header">Submission</div>
          <div className="dx-field">
            <div className="dx-field-label">Status</div>
            <div className="dx-field-value-static">
              <strong>{monthlyPosting.status.status_name}</strong>
            </div>
          </div>
          <div className="dx-field">
            <div className="dx-field-label">Approval Levels</div>
            <div className="dx-field-value-static">
              <strong>{monthlyPosting.approval_levels}</strong>
            </div>
          </div>
          <div className="dx-field">
            <div className="dx-field-label">Stage</div>
            <div className="dx-field-value-static">
              <strong>{monthlyPosting.stage.stage_name}</strong>
            </div>
          </div>
          <div className="dx-field">
            <div className="dx-field-label">Date Submitted</div>
            <div className="dx-field-value-static">
              <strong>{Assist.getDateText(monthlyPosting.created_at)}</strong>
            </div>
          </div>
          {unsubmitComponent}
        </div>
      </div>
    </Card>
  );
};
