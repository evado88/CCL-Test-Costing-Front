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

const LabActivityDataImport = () => {
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
    "Lab Test Price Volume",
    "/admin/test-price-volumes/list",
    "",
    "",
    "test-price-volmes/import",
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

  const toolbar: any = useMemo(() => {
    return AppInfo.htmlToolbar;
  }, []);

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
        <Col sz={12} sm={12} lg={10}>
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
                            let isValid = true;
                            items.forEach((element: any) => {
                              //check months
                              const month = Assist.getMonth(element.month_name);
                              if (month == undefined) {
                                isValid = false;
                                Assist.showMessage(
                                  `The month specified month '${element.month_name}' is not valid`,
                                  "error",
                                );
                              } else {
                                element.month_id = month.number;
                              }
                            });

                            if (isValid) {
                              setItemList(items);
                            }
                          }
                        } else {
                          Assist.showMessage(
                            `Unable to upload ${pageConfig.Title} list. Please try again`,
                            "error",
                          );
                        }
                      }}
                      uploadUrl={`${AppInfo.apiUrl}attachments/create/type/importTestPriceVolume/parent/0`}
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
                      <Column dataField="no" caption="No"></Column>
                      <Column dataField="name" caption="Name"></Column>
                      <Column
                        dataField="description"
                        caption="Description"
                      ></Column>
                      <Column dataField="month_name" caption="Month"></Column>
                      <Column dataField="month" caption="Month ID"></Column>
                      <Column dataField="year" caption="Year"></Column>
                      <Column
                        dataField="price"
                        caption="Price USD"
                        format={",##0.###"}
                        hidingPriority={3}
                      ></Column>
                      <Column
                        dataField="volume"
                        caption="Volume"
                        format={",##0.###"}
                        hidingPriority={3}
                      ></Column>
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

export default LabActivityDataImport;
