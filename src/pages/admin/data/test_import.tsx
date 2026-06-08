import React, { useState, useEffect, useMemo } from "react";
import { Titlebar } from "../../../components/titlebar";
import { Card } from "../../../components/card";
import { Row } from "../../../components/row";
import { Col } from "../../../components/column";
import SelectBox from "devextreme-react/select-box";
import { TextBox } from "devextreme-react/text-box";
import {
  Validator,
  RequiredRule,
  AsyncRule,
  CompareRule,
  CustomRule,
} from "devextreme-react/validator";
import TextArea from "devextreme-react/text-area";
import { NumberBox } from "devextreme-react/number-box";
import Button from "devextreme-react/button";
import ValidationSummary from "devextreme-react/validation-summary";
import { LoadPanel } from "devextreme-react/load-panel";
import DateBox from "devextreme-react/date-box";
import { useTheme } from "../../../context/ThemeContext";
import { useAuth } from "../../../context/AuthContext";
import PageConfig from "../../../classes/page-config";
import Assist from "../../../classes/assist";
import axios from "axios";
import { LoadIndicator } from "devextreme-react/load-indicator";
import { useNavigate, useParams } from "react-router-dom";
import HtmlEditor, {
  Toolbar,
  Item,
  MediaResizing,
} from "devextreme-react/html-editor";
import AppInfo from "../../../classes/app-info";
import DataGrid, { Column, Pager, Paging } from "devextreme-react/data-grid";
import FileUploader from "devextreme-react/file-uploader";
import DropDownBox, { DropDownBoxTypes } from "devextreme-react/drop-down-box";
import { confirm } from "devextreme/ui/dialog";
import CostHelper from "../../../classes/costing-helper";

const TestsDataImport = () => {
  //user
  const navigate = useNavigate();
  const { user } = useAuth();
  const { eId } = useParams(); // Destructure the parameter directly

  //posting
  const [importType, setImportType] = useState<string | undefined>("Tests");
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const [itemList, setItemList] = useState<any[]>([]);

  //service
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);

  const pageConfig = new PageConfig(
    "Tests",
    "/admin/tests/list",
    "",
    "",
    "tests/import",
  );

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (itemList.length == 0) {
      Assist.showMessage(
        `Please upload a list of ${pageConfig.Title} first`,
        "warning",
      );
      return;
    }

    let result = confirm(
      `Are you sure you want to import this list of ${pageConfig.Title}?`,
      "Confirm submission",
    );
    result.then((dialogResult) => {
      if (dialogResult) {
        submitUploadItems();
      }
    });
  };

  const submitUploadItems = () => {
    setSaving(true);

    const postData = {
      user_id: user.userid,
      items: itemList,
    };

    setTimeout(() => {
      Assist.postPutData(
        pageConfig.Title,
        pageConfig.UpdateUrl,
        postData,
        pageConfig.Id,
      )
        .then((data: any) => {
          setSaving(false);

          Assist.showMessage(data.message, "success");

          //navigate
          navigate(pageConfig.Url);
        })
        .catch((message) => {
          setSaving(false);
          Assist.showMessage(message, "error");
        });
    }, Assist.DEV_DELAY);
  };

  const columns = [
    { dataField: "id", caption: "No", hidingPriority: 24 },
    {
      dataField: "name",
      caption: "Name",
      hidingPriority: 23,
      sortOrder: "asc",
    },
    {
      dataField: "annual_nhima",
      caption: "Annual NHIMA",
      format: ",##0.###",
    },
    {
      dataField: "annual_credit",
      caption: "Annual Credit",
      format: ",##0.###",
    },
    {
      dataField: "annual_research",
      caption: "Annual Research",
      format: ",##0.###",
    },
    {
      dataField: "annual_walkins",
      caption: "Annual Walkins",
      format: ",##0.###",
    },
    {
      dataField: "annual_shift",
      caption: "Projected % Shift to Testing",
      format: ",##0.###",
    },
    {
      dataField: "annual_total",
      caption: "Anticipated Annual Volume",
      format: ",##0.###",
    },
    {
      dataField: "sites_no",
      caption: "Sites Performing Test",
      format: ",##0.###",
    },
    {
      dataField: "staff_no",
      caption: "Staff Performing Test",
      format: ",##0.###",
    },
    {
      dataField: "runs_day_week",
      caption: "No of Days Per Week Test is Run",
      format: ",##0.###",
    },
    {
      dataField: "runs_shift_day",
      caption: "No of Shifts Per Day Rest is Run",

      format: ",##0.###",
    },
    {
      dataField: "runs_annual",
      caption: "Annual # Runs",
      format: ",##0.###",
    },
    {
      dataField: "runs_average_volume",
      caption: "Average Test Volume Per Run",
      format: ",##0.###",
    },
    {
      dataField: "avg_hr_wage_analysis",
      caption: "Average Hourly Wage for Staff Performing Analysis",
      format: ",##0.###",
    },
    {
      dataField: "setup_min",
      caption: "Set Up (hands on min)",
      format: ",##0.###",
    },
    {
      dataField: "analysis_min",
      caption: "Analysis (hands on min)",
      format: ",##0.###",
    },
    {
      dataField: "result_review_min",
      caption: "Result Review (min)",
      format: ",##0.###",
    },
    {
      dataField: "result_doc_min",
      caption: "Result Documentation (min)",
      format: ",##0.###",
    },
    {
      dataField: "retention",
      caption: "Retention",
      format: ",##0.###",
    },
    {
      dataField: "total_labor_analysis_min",
      caption: "Total labor (min)",
      format: ",##0.###",
    },
    {
      dataField: "total_labor_analysis_year",
      caption: "Total Labor Per Year",
      format: ",##0.###",
    },
    {
      dataField: "avg_hr_wage_report",
      caption: "Average Hourly Wage for Staff Producing Reports",
      format: ",##0.###",
    },
    {
      dataField: "result_entry_min",
      caption: "Result Entry (min)",
      format: ",##0.###",
    },
    {
      dataField: "report_preparation_min",
      caption: "Report Preparation (min)",
      format: ",##0.###",
    },
    {
      dataField: "report_distribution_min",
      caption: "Report Distribution (min)",
      format: ",##0.###",
    },
    {
      dataField: "total_labor_result_min",
      caption: "Total labor (min)",
      format: ",##0.###",
    },
    {
      dataField: "total_labor_result_year",
      caption: "Total labor Cost/Test)",
      format: ",##0.###",
    },
  ];

  return (
    <div id="pageRoot" className="page-content">
      <LoadPanel
        shadingColor="rgba(0,0,0,0.4)"
        position={{ of: "#pageRoot" }}
        visible={loading}
        showIndicator={true}
        shading={true}
        showPane={true}
        hideOnOutsideClick={false}
      />
      <Titlebar
        title={`${pageConfig.Title}`}
        section={"Configuration"}
        icon={"gear"}
        url="#"
      ></Titlebar>
      {/* end widget */}

      {/* chart start */}
      <Row>
        <Col sz={12} sm={12} lg={12}>
          <Card title="Properties" showHeader={true}>
            <form id="formMain" onSubmit={onFormSubmit}>
              <div className="form">
                <div className="dx-fieldset">
                  <div className="dx-fieldset-header">
                    Import {pageConfig.Title}
                  </div>
                  <div className="dx-field">
                    <div className="dx-field-label">Upload File (5MB Max)</div>
                    <FileUploader
                      className="dx-field-value"
                      multiple={false}
                      accept="*"
                      name="file"
                      uploadMode="instantly"
                      onUploaded={(e) => {
                        if (e.request.status === 200) {
                          const res = JSON.parse(e.request.response);

                          if (res === null) {
                            Assist.showMessage(
                              `The response from the server is invalid. Please try again`,
                              "error",
                            );
                          } else {
                            const items = Array.from(res.items);

                            items.forEach((item: any) => {
                              const itemAnnualTestVolume =
                                CostHelper.getTestAnnualVolume(
                                  item.annual_nhima,
                                  item.annual_credit,
                                  item.annual_research,
                                  item.annual_walkins,
                                );

                              item.annual_total =
                                CostHelper.getTestAnticipatedAnnualTestVolume(
                                  itemAnnualTestVolume,
                                  item.annual_shift,
                                );

                              item.runs_annual = CostHelper.getTestAnnualRuns(
                                item.runs_day_week,
                                item.runs_shift_day,
                              );

                              item.runs_average_volume =
                                CostHelper.getTestVolumePerRun(
                                  item.annual_total,
                                  item.runs_annual,
                                );

                              item.total_labor_analysis_min =
                                CostHelper.getTestSampleTotalLaborMinutesPerYear(
                                  item.setup_min,
                                  item.analysis_min,
                                  item.result_review_min,
                                  item.result_doc_min,
                                  item.retention,
                                );

                              item.total_labor_analysis_year =
                                CostHelper.getTestSampleTotalLaborPerYear(
                                  item.total_labor_analysis_min,
                                  item.annual_total,
                                );

                              item.total_labor_result_min =
                                CostHelper.getTestResultTotalLaborMinutesPerYear(
                                  item.result_entry_min,
                                  item.report_preparation_min,
                                  item.report_distribution_min,
                                )

                              item.total_labor_result_year =
                                CostHelper.getTestResultTotalLaborPerYear(
                                  item.total_labor_result_min,
                                  item.avg_hr_wage_report,
                                );
                            });

                            setItemList(items);
                          }
                        } else {
                          Assist.showMessage(
                            `Unable to upload ${pageConfig.Title} list. Please try again`,
                            "error",
                          );
                        }
                      }}
                      uploadUrl={`${AppInfo.apiUrl}attachments/create/type/import${pageConfig.Title}/parent/0`}
                      onUploadError={(e) => {
                        const error = JSON.parse(e.error.response);

                        Assist.showMessage(error.detail, "error");
                      }}
                    />
                  </div>
                  <div className="dx-field">
                    <DataGrid
                      className={"dx-card wide-card"}
                      dataSource={itemList}
                      keyExpr={"no"}
                      noDataText={`No import file uploaded`}
                      showBorders={false}
                      focusedRowEnabled={false}
                      defaultFocusedRowIndex={0}
                      columnAutoWidth={true}
                      columnHidingEnabled={true}
                    >
                      <Paging defaultPageSize={10} />
                      <Pager showPageSizeSelector={true} showInfo={true} />
                      {columns.map((col, index) => (
                        <Column
                          key={col.dataField}
                          dataField={col.dataField}
                          caption={col.caption}
                          hidingPriority={columns.length - index}
                          format={col.format}
                        />
                      ))}
                    </DataGrid>
                  </div>
                </div>
                <div className="dx-field">
                  <div className="dx-field-label">
                    <ValidationSummary id="summaryMain" />
                  </div>
                </div>
                <div className="dx-field">
                  <div className="dx-field-label"></div>
                  <Button
                    width="100%"
                    type={saving ? "normal" : "default"}
                    disabled={loading || error || saving}
                    useSubmitBehavior={true}
                  >
                    <LoadIndicator
                      className="button-indicator"
                      visible={saving}
                    />
                    <span className="dx-button-text">
                      Import {pageConfig.Title}
                    </span>
                  </Button>
                </div>
              </div>
            </form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default TestsDataImport;
