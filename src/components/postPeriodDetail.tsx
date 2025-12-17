import React from "react";
import { Link, Route } from "react-router-dom";
import { Card } from "./card";
import Assist from "../classes/assist";
import { MonthlyPostingsList } from "./monthlyPostingList";
interface PostingPeriodArgs {
  postingPeriod: any;
  postingsData: any;
  loadingText: string;
}
export const PostingPeriodDetail = ({
  postingPeriod,
  postingsData: data,
  loadingText,
}: PostingPeriodArgs) => {
  return (
    /* start title */
    <Card title="Properties" showHeader={true}>
      <div className="form">
        <div className="dx-fieldset">
          <div className="dx-fieldset-header">Period Details</div>
          <div className="dx-field">
            <div className="dx-field-label">Name</div>
            <div className="dx-field-value-static">
              <strong>{postingPeriod.name}</strong>
            </div>
          </div>
          <div className="dx-field">
            <div className="dx-field-label">Year</div>
            <div className="dx-field-value-static">
              <strong>{postingPeriod.year}</strong>
            </div>
          </div>
          <div className="dx-field">
            <div className="dx-field-label">Month</div>
            <div className="dx-field-value-static">
              <strong>{postingPeriod.month}</strong>
            </div>
          </div>
          <div className="dx-field">
            <div className="dx-field-label">Cash at Bank</div>
            <div className="dx-field-value-static">
              <strong>
                {Assist.formatCurrency(postingPeriod.cash_at_bank)}
              </strong>
            </div>
          </div>
        </div>
        <div className="dx-fieldset">
          <div className="dx-fieldset-header">Configuration</div>
          <div className="dx-field">
            <div className="dx-field-label">Late Posting Start Day</div>
            <div className="dx-field-value-static">
              <strong>
                {Assist.getDateDay(postingPeriod.late_posting_date_start)}
              </strong>
            </div>
          </div>
          <div className="dx-field">
            <div className="dx-field-label">Savings Multiple</div>
            <div className="dx-field-value-static">
              <strong>{Assist.formatCurrency(postingPeriod.saving_multiple)}</strong>
            </div>
          </div>
          <div className="dx-field">
            <div className="dx-field-label">Shares Multiple</div>
            <div className="dx-field-value-static">
              <strong>{Assist.formatCurrency(postingPeriod.shares_multiple)}</strong>
            </div>
          </div>
          <div className="dx-field">
            <div className="dx-field-label">Social Fund Minimum</div>
            <div className="dx-field-value-static">
              <strong>
                {Assist.formatCurrency(postingPeriod.social_min)}
              </strong>
            </div>
          </div>
          <div className="dx-field">
            <div className="dx-field-label">Loan Interest Percentage</div>
            <div className="dx-field-value-static">
              <strong>{postingPeriod.loan_interest_rate}</strong>
            </div>
          </div>
          <div className="dx-field">
            <div className="dx-field-label">Loan Payment Percentage</div>
            <div className="dx-field-value-static">
              <strong>{postingPeriod.loan_repayment_rate}</strong>
            </div>
          </div>
          <div className="dx-field">
            <div className="dx-field-label">Loan Savings Ratio</div>
            <div className="dx-field-value-static">
              <strong>
                {postingPeriod.loan_saving_ratio}
              </strong>
            </div>
          </div>
             <div className="dx-field">
            <div className="dx-field-label">Loan Duraton (Months)</div>
            <div className="dx-field-value-static">
              <strong>
                {postingPeriod.loan_duration}
              </strong>
            </div>
          </div>
          <div className="dx-field">
            <div className="dx-field-label">Loan Guarantor Limit</div>
            <div className="dx-field-value-static">
              <strong>{Assist.formatCurrency(postingPeriod.loan_apply_limit)}</strong>
            </div>
          </div>
          <div className="dx-field">
            <div className="dx-field-label">Late Posting Fee</div>
            <div className="dx-field-value-static">
              <strong>{Assist.formatCurrency(postingPeriod.late_posting_rate)}</strong>
            </div>
          </div>
          <div className="dx-field">
            <div className="dx-field-label">Missed Meeting Fee</div>
            <div className="dx-field-value-static">
              <strong>
                {Assist.formatCurrency(postingPeriod.missed_meeting_rate)}
              </strong>
            </div>
          </div>
          <div className="dx-field">
            <div className="dx-field-label">Late Meeting Attendance Fee</div>
            <div className="dx-field-value-static">
              <strong>
                {Assist.formatCurrency(postingPeriod.late_meeting_rate)}
              </strong>
            </div>
          </div>
        </div>
        <div className="dx-fieldset">
          <div className="dx-fieldset-header">Monthly Postings</div>
          <div className="dx-field">
            <MonthlyPostingsList
              data={data}
              loadingText={loadingText}
              isMember={false}
              title={""}
            />
          </div>
        </div>
        <div className="dx-fieldset">
          <div className="dx-fieldset-header">Statistics</div>
          <div className="dx-field">
            <div className="dx-field-label">Awaiting Submission</div>
            <div className="dx-field-value-static">
              <strong>{postingPeriod.sid1}</strong>
            </div>
          </div>
          <div className="dx-field">
            <div className="dx-field-label">Submitted</div>
            <div className="dx-field-value-static">
              <strong>{postingPeriod.sid2}</strong>
            </div>
          </div>
          <div className="dx-field">
            <div className="dx-field-label">Primary Approval</div>
            <div className="dx-field-value-static">
              <strong>{postingPeriod.sid3}</strong>
            </div>
          </div>
          <div className="dx-field">
            <div className="dx-field-label">Secondary Approval</div>
            <div className="dx-field-value-static">
              <strong>{postingPeriod.sid4}</strong>
            </div>
          </div>
          <div className="dx-field">
            <div className="dx-field-label">Guarantor Approval</div>
            <div className="dx-field-value-static">
              <strong>{postingPeriod.sid5}</strong>
            </div>
          </div>
          <div className="dx-field">
            <div className="dx-field-label">Awaiting POP Upload</div>
            <div className="dx-field-value-static">
              <strong>{postingPeriod.sid6}</strong>
            </div>
          </div>
          <div className="dx-field">
            <div className="dx-field-label">Awaiting POP Approval</div>
            <div className="dx-field-value-static">
              <strong>{postingPeriod.sid7}</strong>
            </div>
          </div>
          <div className="dx-field">
            <div className="dx-field-label">Approved</div>
            <div className="dx-field-value-static">
              <strong>{postingPeriod.sid8}</strong>
            </div>
          </div>
        </div>
        <div className="dx-fieldset">
          <div className="dx-fieldset-header">Submission</div>
          <div className="dx-field">
            <div className="dx-field-label">Status</div>
            <div className="dx-field-value-static">
              <strong>{postingPeriod.status}</strong>
            </div>
          </div>
          <div className="dx-field">
            <div className="dx-field-label">Approval Levels</div>
            <div className="dx-field-value-static">
              <strong>{postingPeriod.approval_levels}</strong>
            </div>
          </div>
          <div className="dx-field">
            <div className="dx-field-label">Stage</div>
            <div className="dx-field-value-static">
              <strong>{postingPeriod.stage}</strong>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
