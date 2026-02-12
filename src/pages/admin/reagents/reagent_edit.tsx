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

const AdminReagentEdit = () => {
  //user
  const navigate = useNavigate();
  const { user } = useAuth();
  const { eId } = useParams(); // Destructure the parameter directly

  //posting
  const [reagentName, setReagentName] = useState<string | undefined>(undefined);
  const [reagentCost, setReagentCost] = useState<number | undefined>(undefined);
  const [reagentGenericUnit, setReagentGenericUnit] = useState<
    string | undefined
  >(undefined);
  const [reagentQuantityPerGRU, setReagentQuantityPerGRU] = useState<
    number | undefined
  >(undefined);
  const [reagentTestsPerGRU, setReagentTestsPerGRU] = useState<
    number | undefined
  >(undefined);

  const [reagentExpiryPeriod, setReagentExpiryPeriod] = useState<
    number | undefined
  >(undefined);
  const [reagentDescription, setReagentDescription] = useState<
    string | undefined
  >(undefined);

  // simulation
  const [reagentSimActualTest, setReagentSimActualTest] = useState<
    number | undefined
  >(120);
  const [reagentSimDaysInPeriod, setReagentSimDaysInPeriod] = useState<
    number | undefined
  >(30);
  //service
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);

  const pageConfig = new PageConfig("Reagent", "", "", "Reagent", "");

  pageConfig.Id = eId == undefined ? 0 : Number(eId);

  useEffect(() => {
    //only load if updating item
    if (pageConfig.Id != 0) {
      setLoading(true);

      setTimeout(() => {
        Assist.loadData(pageConfig.Title, `reagents/id/${pageConfig.Id}`)
          .then((data) => {
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

  const updateVaues = (data: any) => {
    setReagentName(data.name);
    setReagentCost(data.cost);
    setReagentGenericUnit(data.generic_reagent_unit);
    setReagentQuantityPerGRU(data.quantity_per_gru);
    setReagentTestsPerGRU(data.tests_per_gru);
    setReagentExpiryPeriod(data.expiry_period);
    setReagentDescription(data.description);
  };

  const simulationTestWithinPeriod = () => {
    if (
      reagentSimDaysInPeriod &&
      reagentSimDaysInPeriod > 0 &&
      reagentSimActualTest &&
      reagentExpiryPeriod
    ) {
      return (
        (reagentSimActualTest * reagentExpiryPeriod) / reagentSimDaysInPeriod
      );
    } else {
      return 0;
    }
  };
  const simulationTestsUsable = () => {
    const numbers = [simulationTestWithinPeriod(), reagentTestsPerGRU ?? 0];

    return Math.min(...numbers);
  };
  const reagentUnitsConsumed = () => {
    if (simulationTestsUsable() > 0) {
      return (reagentSimActualTest ?? 0) / simulationTestsUsable();
    } else {
      return 0;
    }
  };
  const costPerTestUnit = () => {
    if (reagentSimActualTest && reagentSimActualTest > 0) {
      return reagentUnitsConsumed() / reagentSimActualTest;
    } else {
      return 0;
    }
  };
  const costPerTestActual = () => {
    return costPerTestUnit() * (reagentCost ?? 0);
  };
  const onFormSubmit = (e: React.FormEvent) => {
    setSaving(true);

    e.preventDefault();

    const postData = {
      user_id: user.userid,
      name: reagentName,
      cost: reagentCost,
      expiry_period: reagentExpiryPeriod,
      generic_reagent_unit: reagentGenericUnit,
      quantity_per_gru: reagentQuantityPerGRU,
      tests_per_gru: reagentTestsPerGRU,
      description: reagentDescription,
    };

    console.log("pd", postData);

    const url =
      pageConfig.Id == 0
        ? `reagents/create`
        : `reagents/update/${pageConfig.Id}`;

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
            navigate(`/admin/reagents/edit/${data.id}`);
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
        <Col sz={12} sm={12} lg={5}>
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
                      value={reagentName}
                      disabled={error || saving}
                      onValueChange={(text) => setReagentName(text)}
                    >
                      <Validator>
                        <RequiredRule message="Name is required" />
                      </Validator>
                    </TextBox>
                  </div>
                  <div className="dx-field">
                    <div className="dx-field-label">Cost (USD)</div>
                    <NumberBox
                      className="dx-field-value"
                      placeholder="Cost"
                      value={reagentCost}
                      disabled={error || saving}
                      onValueChange={(text) => setReagentCost(text)}
                    >
                      <Validator>
                        <RequiredRule message="Cost is required" />
                      </Validator>
                    </NumberBox>
                  </div>
                  <div className="dx-field">
                    <div className="dx-field-label">
                      Generic Reagent Unit (GRU)
                    </div>
                    <SelectBox
                      className="dx-field-value"
                      placeholder="Generic Reagent Unit"
                      dataSource={AppInfo.reagentTypes}
                      value={reagentGenericUnit}
                      itemTemplate={(item) => `${item.name} - ${item.example}`}
                      valueExpr={"name"}
                      displayExpr={"name"}
                      disabled={error || saving}
                      onValueChange={(text) => setReagentGenericUnit(text)}
                    >
                      <Validator>
                        <RequiredRule message="Generic Reagent Unit is required" />
                      </Validator>
                    </SelectBox>
                    <div className="dx-field-value-static">
                      <i>
                       Generic Reagent Unit  - The smallest unit that must be opened and that expires after E days
                      </i>
                    </div>
                  </div>
                  <div className="dx-field">
                    <div className="dx-field-label">
                      Quantity per GRU (ml, g, tests, strips, etc.)
                    </div>
                    <NumberBox
                      className="dx-field-value"
                      placeholder="Quantity per GRU"
                      value={reagentQuantityPerGRU}
                      disabled={error || saving}
                      onValueChange={(text) => setReagentQuantityPerGRU(text)}
                    >
                      <Validator>
                        <RequiredRule message="Quantity per GRU is required" />
                      </Validator>
                    </NumberBox>
                  </div>
                  <div className="dx-field">
                    <div className="dx-field-label">No of tests per GRU</div>
                    <NumberBox
                      className="dx-field-value"
                      placeholder="Tests per GRU"
                      value={reagentTestsPerGRU}
                      disabled={error || saving}
                      onValueChange={(text) => setReagentTestsPerGRU(text)}
                    >
                      <Validator>
                        <RequiredRule message="Tests per GRU is required" />
                      </Validator>
                    </NumberBox>
                  </div>
                  <div className="dx-field">
                    <div className="dx-field-label">Onboarding Expiry Period (Days)</div>
                    <NumberBox
                      className="dx-field-value"
                      placeholder="Expiry Period"
                      value={reagentExpiryPeriod}
                      disabled={error || saving}
                      onValueChange={(text) => setReagentExpiryPeriod(text)}
                    >
                      <Validator>
                        <RequiredRule message="Onboarding expiry period is required" />
                      </Validator>
                    </NumberBox>
                  </div>
                </div>
                <div className="dx-fieldset">
                  <div className="dx-fieldset-header">Description</div>
                  <div className="dx-field">
                    <HtmlEditor
                      height="525px"
                      defaultValue={reagentDescription}
                      value={reagentDescription}
                      toolbar={toolbar}
                      onValueChanged={(e) => setReagentDescription(e.value)}
                    >
                      <MediaResizing enabled={true} />
                    </HtmlEditor>
                  </div>
                </div>
                <div className="dx-field">
                  <div className="dx-field-reagentel">
                    <ValidationSummary id="summaryMain" />
                  </div>
                </div>
                <div className="dx-field">
                  <div className="dx-field-reagentel"></div>
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
        <Col sz={12} sm={12} lg={7}>
          <Card
            title="Simulation (For testing purposes only)"
            showHeader={true}
          >
            <form id="formMain" onSubmit={onFormSubmit}>
              <div className="form">
                <div className="dx-fieldset">
                  <div className="dx-fieldset-header">Details</div>
                  <div className="dx-field">
                    <div className="dx-field-label">
                      Number of days in period <b> (P)</b>
                    </div>
                    <NumberBox
                      className="dx-field-value"
                      placeholder="Number of days in period"
                      value={reagentSimDaysInPeriod}
                      disabled={error || saving}
                      onValueChange={(text) => setReagentSimDaysInPeriod(text)}
                    ></NumberBox>
                  </div>
                  <div className="dx-field">
                    <div className="dx-field-label">
                      Expiry Period <b> (E)</b>
                    </div>
                    <div className="dx-field-value-static">
                      <strong>{reagentExpiryPeriod ?? 0} days</strong>
                    </div>
                  </div>
                  <div className="dx-field">
                    <div className="dx-field-label">
                      Actual tests in period <b> (A)</b>
                    </div>
                    <NumberBox
                      className="dx-field-value"
                      placeholder="Actual tests in period"
                      value={reagentSimActualTest}
                      disabled={error || saving}
                      onValueChange={(text) => setReagentSimActualTest(text)}
                    ></NumberBox>
                  </div>
                  <div className="dx-field">
                    <div className="dx-field-label">
                      Tests within period <b> (AP)</b> ={" "}
                      <b>
                        {" "}
                        (A * (E / P)) = ({reagentSimActualTest} * (
                        {reagentExpiryPeriod} / {reagentSimDaysInPeriod})) =
                      </b>
                    </div>
                    <div className="dx-field-value-static">
                      <strong>
                        {Assist.formatNumber(simulationTestWithinPeriod())}
                      </strong>
                    </div>
                  </div>
                  <div className="dx-field">
                    <div className="dx-field-label">
                      Tests per reagent unit
                      <b> (TRU)</b>
                    </div>
                    <div className="dx-field-value-static">
                      <strong>
                        {Assist.formatNumber(reagentTestsPerGRU ?? 0)}
                      </strong>
                    </div>
                  </div>
                  <div className="dx-field">
                    <div className="dx-field-label">
                      Max tests possible{" "}
                      <b>
                        (TU) = Min(AP, TRU) = Min({" "}
                        {Assist.formatNumber(simulationTestWithinPeriod())},{" "}
                        {Assist.formatNumber(reagentTestsPerGRU ?? 0)})
                      </b>
                    </div>
                    <div className="dx-field-value-static">
                      <strong>
                        {Assist.formatNumber(simulationTestsUsable())}
                      </strong>
                    </div>
                  </div>
                  <div className="dx-field">
                    <div className="dx-field-label">
                      Reagent units consumed <b>(RUC)</b> ={" "}
                      <b>
                        {" "}
                        (A / TU) = ({reagentSimActualTest} /
                        {Assist.formatNumber(simulationTestsUsable())} ) =
                      </b>
                    </div>
                    <div className="dx-field-value-static">
                      <strong>
                        {Assist.formatNumber(reagentUnitsConsumed())}{" "}
                        {reagentGenericUnit}(s)
                      </strong>
                    </div>
                  </div>
                  <div className="dx-field">
                    <div className="dx-field-label">
                      Cost per test (unit-based){" "}
                      <b>
                        {" "}
                        (CTU) = (RUC / A) = (
                        {Assist.formatNumber(reagentUnitsConsumed())} /
                        {Assist.formatNumber(reagentSimActualTest ?? 0)} ) =
                      </b>
                    </div>
                    <div className="dx-field-value-static">
                      <strong>
                        {Assist.formatNumber(costPerTestUnit())}{" "}
                        {reagentGenericUnit}(s) / test
                      </strong>
                    </div>
                  </div>
                  <div className="dx-field">
                    <div className="dx-field-label">
                      Cost per test (Actual){" "}
                      <b>
                        {" "}
                        = (RUC / A) = (
                        {Assist.formatNumber(reagentUnitsConsumed())} /
                        {Assist.formatNumber(reagentSimActualTest ?? 0)} ) =
                      </b>
                    </div>
                    <div className="dx-field-value-static">
                      <strong>
                        {Assist.formatCurrencyUSD(costPerTestActual())}{" "}
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminReagentEdit;
