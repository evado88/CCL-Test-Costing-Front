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

const AdminInstrumentEdit = () => {
  //user
  const navigate = useNavigate();
  const { user } = useAuth();
  const { eId } = useParams(); // Destructure the parameter directly

  //posting
  const [instrumentName, setInstrumentName] = useState<string | undefined>(
    undefined,
  );
  const [instrumentCost, setInstrumentCost] = useState<number | undefined>(
    undefined,
  );
  const [instrumentAmortization, setInstrumentAmortization] = useState<
    number | undefined
  >(undefined);
  const [instrumentAnnualMaintenanceCost, setInstrumentAnnualMaintenanceCost] =
    useState<number | undefined>(undefined);
  const [instrumentDescription, setInstrumentDescription] = useState<
    string | undefined
  >(undefined);

  //service
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);

  const pageConfig = new PageConfig("Instrument", "", "", "Instrument", "");

  pageConfig.Id = eId == undefined ? 0 : Number(eId);

  useEffect(() => {
    //only load if updating item
    if (pageConfig.Id != 0) {
      setLoading(true);

      setTimeout(() => {
        Assist.loadData(pageConfig.Title, `instruments/id/${pageConfig.Id}`)
          .then((data: any) => {
            setLoading(false);
            updateVaues(data);
            setError(false);
          })
          .catch((message) => {
            setLoading(false);
            setError(true);
            Assist.showMessage(message, "error");
          });
      }, Assist.DEV_DELAY);
    }
  }, []);

  //Calculate annual instrument cost
  const getAnnualInstrumentCost = () => {
    if (
      instrumentAmortization != undefined &&
      instrumentAmortization > 0 &&
      instrumentCost != undefined &&
      instrumentCost > 0
    ) {
      const annualCost = instrumentCost / instrumentAmortization;

      return annualCost;
    } else {
      return 0;
    }
  };

  //Calculate total annual instrument cost
  const getTotalAnnualInstrumentCost = () => {
    if (
      instrumentAmortization != undefined &&
      instrumentAmortization > 0 &&
      instrumentCost != undefined &&
      instrumentCost > 0
    ) {
      const annualCost = instrumentCost / instrumentAmortization;

      if (instrumentAnnualMaintenanceCost != undefined) {
        return annualCost + instrumentAnnualMaintenanceCost;
      } else {
        return annualCost;
      }
    } else {
      return 0;
    }
  };

  const updateVaues = (data: any) => {
    setInstrumentName(data.name);
    setInstrumentCost(data.cost);
    setInstrumentAmortization(data.amortization);
    setInstrumentAnnualMaintenanceCost(data.maintenance_cost);
    setInstrumentDescription(data.description);
  };

  const onFormSubmit = (e: React.FormEvent) => {
    setSaving(true);

    e.preventDefault();

    const postData = {
      user_id: user.userid,
      name: instrumentName,
      cost: instrumentCost,
      amortization: instrumentAmortization,
      maintenance_cost: instrumentAnnualMaintenanceCost,
      annual_cost: getAnnualInstrumentCost(),
      total_cost: getTotalAnnualInstrumentCost(),
      description: instrumentDescription,
    };

    const url =
      pageConfig.Id == 0
        ? `instruments/create`
        : `instruments/update/${pageConfig.Id}`;

    setTimeout(() => {
      Assist.postPutData(pageConfig.Title, url, postData, pageConfig.Id)
        .then((data: any) => {
          setSaving(false);
          updateVaues(data);

          Assist.showMessage(
            `You have successfully updated the ${pageConfig.Title}!`,
            "success",
          );

          if (pageConfig.Id == 0) {
            //navigate
            navigate(`/admin/instruments/edit/${data.id}`);
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
        title={`${pageConfig.verb()} ${pageConfig.Title}`}
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
                  <div className="dx-fieldset-header">Details</div>
                  <div className="dx-field">
                    <div className="dx-field-label">Name</div>
                    <TextBox
                      className="dx-field-value"
                      placeholder="Name"
                      value={instrumentName}
                      disabled={error || saving}
                      onValueChange={(text) => setInstrumentName(text)}
                    >
                      <Validator>
                        <RequiredRule message="Name is required" />
                      </Validator>
                    </TextBox>
                  </div>
                  <div className="dx-field">
                    <div className="dx-field-label">Cost</div>
                    <NumberBox
                      className="dx-field-value"
                      placeholder="Cost"
                      value={instrumentCost}
                      disabled={error || saving}
                      onValueChange={(text) => setInstrumentCost(text)}
                    >
                      <Validator>
                        <RequiredRule message="Cost is required" />
                      </Validator>
                    </NumberBox>
                  </div>
                  <div className="dx-field">
                    <div className="dx-field-label">Amortization</div>
                    <NumberBox
                      className="dx-field-value"
                      placeholder="Amortization"
                      value={instrumentAmortization}
                      disabled={error || saving}
                      onValueChange={(text) => setInstrumentAmortization(text)}
                    >
                      <Validator>
                        <RequiredRule message="Amortization is required" />
                      </Validator>
                    </NumberBox>
                  </div>
                  <div className="dx-field">
                    <div className="dx-field-label">Annual Instrument Cost</div>
                    <div className="dx-field-value-static">
                      <strong>
                        {Assist.formatCurrencyUSD(getAnnualInstrumentCost())}
                      </strong>
                    </div>
                  </div>
                  <div className="dx-field">
                    <div className="dx-field-label">
                      Annual Maintenance Cost
                    </div>
                    <NumberBox
                      className="dx-field-value"
                      placeholder="Annual Maintenance Cost"
                      value={instrumentAnnualMaintenanceCost}
                      disabled={error || saving}
                      onValueChange={(text) =>
                        setInstrumentAnnualMaintenanceCost(text)
                      }
                    >
                      <Validator>
                        <RequiredRule message="Annual maintenance Cost is required" />
                      </Validator>
                    </NumberBox>
                  </div>
                  <div className="dx-field">
                    <div className="dx-field-label">
                      Total Annual Instrument Cost
                    </div>
                    <div className="dx-field-value-static">
                      <strong>
                        {Assist.formatCurrencyUSD(
                          getTotalAnnualInstrumentCost(),
                        )}
                      </strong>
                    </div>
                  </div>
                </div>

                <div className="dx-fieldset">
                  <div className="dx-fieldset-header">Description</div>
                  <div className="dx-field">
                    <HtmlEditor
                      height="525px"
                      defaultValue={instrumentDescription}
                      value={instrumentDescription}
                      toolbar={toolbar}
                      onValueChanged={(e) => setInstrumentDescription(e.value)}
                    >
                      <MediaResizing enabled={true} />
                    </HtmlEditor>
                  </div>
                </div>
                <div className="dx-field">
                  <div className="dx-field-instrumentel">
                    <ValidationSummary id="summaryMain" />
                  </div>
                </div>
                <div className="dx-field">
                  <div className="dx-field-instrumentel"></div>
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
                      {pageConfig.verb()} {pageConfig.Title}
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

export default AdminInstrumentEdit;
