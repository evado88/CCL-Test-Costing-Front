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

const ReagentsDataImport = () => {
  //user
  const navigate = useNavigate();
  const { user } = useAuth();
  const { eId } = useParams(); // Destructure the parameter directly

  //posting
  const [importType, setImportType] = useState<string | undefined>("Tests");
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const [rateList, setRateList] = useState<any[]>([]);

  //service
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);

  const pageConfig = new PageConfig("Reagents", "", "", "", "");

  //columns
  const onFormSubmit = (e: React.FormEvent) => {
    setSaving(true);

    e.preventDefault();

    const postData = {
      user_id: user.userid,
      cat_name: name,
      rate_list: rateList,
    };

    const url =
      pageConfig.Id == 0
        ? `categories/create`
        : `categories/update/${pageConfig.Id}`;

    setTimeout(() => {
      Assist.postPutData(pageConfig.Title, url, postData, pageConfig.Id)
        .then((data: any) => {
          setSaving(false);

          Assist.showMessage(
            `You have successfully updated the ${pageConfig.Title}!`,
            "success",
          );

          if (pageConfig.Id == 0) {
            //navigate
            navigate(`/admin/categories/edit/${data.id}`);
          }
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
        <Col sz={12} sm={12} lg={7}>
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
                            setRateList(res.items);
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
                      dataSource={rateList}
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
                      <Column
                        dataField="no"
                        caption="No"
                        hidingPriority={4}
                      ></Column>
                      <Column
                        dataField="name"
                        caption="Name"
                        hidingPriority={5}
                      ></Column>
                      <Column
                        dataField="description"
                        caption="Description"
                      ></Column>
                      <Column
                        dataField="cost"
                        caption="Cost"
                        hidingPriority={4}
                      ></Column>
                      <Column
                        dataField="expiry_period"
                        caption="Expiry Period"
                        hidingPriority={3}
                      ></Column>
                      <Column
                        dataField="generic_reagent_unit"
                        caption="Generic Reagent Unit (GRU)"
                        hidingPriority={3}
                      ></Column>
                      <Column
                        dataField="quantity_per_gru"
                        caption="Quantity Per (GRU)"
                        hidingPriority={3}
                      ></Column>
                      <Column
                        dataField="tests_per_gru"
                        caption="Tests Per (GRU)"
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

export default ReagentsDataImport;
