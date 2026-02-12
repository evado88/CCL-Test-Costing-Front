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
import DataGrid, {
  Column,
  Pager,
  Paging,
  Summary,
  GroupItem,
  TotalItem,
  Editing,
} from "devextreme-react/data-grid";
import AppInfo from "../../../classes/app-info";

const AdminTestEdit = () => {
  //user
  const navigate = useNavigate();
  const { user } = useAuth();
  const { eId } = useParams(); // Destructure the parameter directly

  //test
  const [testName, setTestName] = useState<string | undefined>(undefined);
  const [testLab, setTestLab] = useState<number | undefined>(undefined);
  const [testDescription, setTestDescription] = useState<string | undefined>(
    undefined,
  );
  //volumes
  const [testNHIMA, setTestNHIMA] = useState<number | undefined>(undefined);
  const [testCredit, setTestCredit] = useState<number | undefined>(undefined);
  const [testWalkin, setTestWalkin] = useState<number | undefined>(undefined);
  const [testResearch, setTestResearch] = useState<number | undefined>(
    undefined,
  );
  const [testPercentShift, setTestPercentShift] = useState<number | undefined>(
    undefined,
  );
  //plans
  const [testSitesNo, setTestSitesNo] = useState<number | undefined>(undefined);
  const [testStaffNo, setTestStaffNo] = useState<number | undefined>(undefined);

  //runs
  const [testRunsDayPerWeek, setTestRunsDayPerWeek] = useState<
    number | undefined
  >(undefined);
  const [testRunsShiftPerWeek, setTestRunsShiftPerWeek] = useState<
    number | undefined
  >(undefined);

  //lists
  const [labData, setLabData] = useState<any[]>([]);
  const [reagentData, setReagentData] = useState<any[]>([]);
  const [instrumentData, setInstrumentData] = useState<any[]>([]);

  //service
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);

  const pageConfig = new PageConfig("Test", "", "", "Test", "");

  pageConfig.Id = eId == undefined ? 0 : Number(eId);

  useEffect(() => {
    //only load if updating item
    setLoading(true);

    if (pageConfig.Id != 0) {
      setTimeout(() => {
        Assist.loadData(pageConfig.Title, `tests/detail/${pageConfig.Id}`)
          .then((data: any) => {
            setLoading(false);
            updateVaues(data.test);
            loadLists(data);
            setError(false);
          })
          .catch((message) => {
            setLoading(false);
            setError(true);
            Assist.showMessage(message, "error");
          });
      }, Assist.DEV_DELAY);
    } else {
      setTimeout(() => {
        Assist.loadData(pageConfig.Title, `tests/param`)
          .then((data: any) => {
            setLoading(false);
            loadLists(data);
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

  //Calculate annual test volume
  const annualTestVolume =
    (testCredit ?? 0) +
    (testNHIMA ?? 0) +
    (testWalkin ?? 0) +
    (testResearch ?? 0);

  const anticipatedAnnualTestVolume = Assist.applyPercent(
    annualTestVolume,
    testPercentShift ?? 0,
  );

  useEffect(() => {
    const testVolume = anticipatedAnnualTestVolume;

    if (testVolume > 0) {
      Assist.log("Updating tables with new test volume: " + testVolume);

      setInstrumentData(instrumentData);
    }
  }, [testCredit, testNHIMA, testWalkin, testResearch, testPercentShift]);

  const annualRuns =
    52 * (testRunsDayPerWeek ?? 0) * (testRunsShiftPerWeek ?? 0);

  const testVolumePerRun =
    annualRuns == 0 ? 0 : anticipatedAnnualTestVolume / annualRuns;

  const updateVaues = (data: any) => {
    // details
    setTestName(data.name);
    setTestDescription(data.description);

    // annual volumes
    setTestNHIMA(data.annual_nhima);
    setTestCredit(data.annual_credit);
    setTestWalkin(data.annual_walkins);
    setTestResearch(data.annual_research);
    setTestPercentShift(data.annual_shift);

    //plans
    setTestSitesNo(data.sites_no);
    setTestStaffNo(data.staff_no);

    //runs
    setTestRunsDayPerWeek(data.runs_day_week);
    setTestRunsShiftPerWeek(data.runs_shift_day);
  };

  const loadLists = (data: any) => {
    const reagentData = data.reagents.map((item: any) => ({
      id: item.id,
      name: item.name,
      cost: item.cost,
      expiry_period: item.expiry_period,
      generic_reagent_unit: item.generic_reagent_unit,
      quantity_per_gru: item.quantity_per_gru,
      tests_per_gru: item.tests_per_gru,
      test_actual: 0,
      gru_consumed: 0,
      cost_per_test: 0,
      total_cost: 0,
    }));

    //merge with whast is applicable to the test if updating
    if (
      data.test &&
      data.test.reagent_list &&
      data.test.reagent_list.length > 0
    ) {
      data.test.reagent_list.forEach((reagent: any) => {
        const index = reagentData.findIndex(
          (item: any) => item.id === reagent.id,
        );
        if (index !== -1) {
          const reagentItem = reagentData[index];

          const updatedItem = {
            ...reagentItem,
            test_actual: reagent.test_actual,
            gru_consumed: reagent.gru_consumed,
            cost_per_test: reagent.cost_per_test,
            total_cost: reagent.total_cost,
          };

          reagentData[index] = updatedItem;
        }
      });
    }

    const instrumentData = data.instruments.map((item: any) => ({
      id: item.id,
      name: item.name,
      total_cost: item.total_cost,
      is_applicable: false,
      annual_percent: 0,
      annual_cost: 0,
    }));

    //merge with whast is applicable to the test if updating
    if (
      data.test &&
      data.test.instrument_list &&
      data.test.instrument_list.length > 0
    ) {
      data.test.instrument_list.forEach((instrument: any) => {
        const index = instrumentData.findIndex(
          (item: any) => item.id === instrument.id,
        );

        if (index !== -1) {
          const instrumentItem = instrumentData[index];

          const updatedItem = {
            ...instrumentItem,
            is_applicable: instrument.is_applicable,
            annual_percent: instrument.annual_percent,
            annual_cost: instrument.annual_cost,
          };
          instrumentData[index] = updatedItem;
        }
      });
    }

    setReagentData(reagentData);
    setInstrumentData(instrumentData);
    //labs
    setLabData(data.labs);
  };

  const onFormSubmit = (e: React.FormEvent) => {
    setSaving(true);

    e.preventDefault();

    const postData = {
      // user
      user_id: user.userid,
      // details
      name: testName,
      lab_id: testLab,
      description: testDescription,
      // annuall volumes
      annual_nhima: testNHIMA,
      annual_credit: testCredit,
      annual_research: testResearch,
      annual_walkins: testWalkin,
      // totals
      annual_shift: testPercentShift,
      annual_total: anticipatedAnnualTestVolume,

      //plans
      sites_no: testSitesNo,
      staff_no: testStaffNo,

      //runs
      runs_day_week: testRunsDayPerWeek,
      runs_shift_day: testRunsShiftPerWeek,
      runs_annual: annualRuns,
      runs_average_volume: testVolumePerRun,

      //lists
      reagent_list: reagentData.filter(
        (item) => item.test_actual && item.test_actual > 0,
      ),
      instrument_list: instrumentData.filter((item) => item.is_applicable),
    };

    const url =
      pageConfig.Id == 0 ? `tests/create` : `tests/update/${pageConfig.Id}`;

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
            navigate(`/admin/tests/edit/${data.id}`);
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

  const calculateCustomSummary = (options: any) => {
    if (options.name === "instrumentCost") {
      if (options.summaryProcess === "start") {
        options.totalValue = 0;
      }

      if (options.summaryProcess === "calculate") {
        options.totalValue += options.value;
      }

      if (options.summaryProcess === "finalize") {
        // Optional: round to 2 decimals
        if (anticipatedAnnualTestVolume > 0) {
          options.totalValue = Number(
            options.totalValue / anticipatedAnnualTestVolume,
          );
        } else {
          options.totalValue = 0;
        }
      }
    }
  };

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
        <Col sz={12} sm={12} lg={4}>
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
                      value={testName}
                      disabled={error || saving}
                      onValueChange={(text) => setTestName(text)}
                    >
                      <Validator>
                        <RequiredRule message="Name is required" />
                      </Validator>
                    </TextBox>
                  </div>
                  <div className="dx-field">
                    <div className="dx-field-label">Lab</div>
                    <SelectBox
                      className="dx-field-value"
                      placeholder="Lab"
                      dataSource={labData}
                      valueExpr={"id"}
                      displayExpr={"name"}
                      value={testLab}
                      disabled={error || saving}
                      onValueChange={(text) => setTestLab(text)}
                    >
                      <Validator>
                        <RequiredRule message="Lab is required" />
                      </Validator>
                    </SelectBox>
                  </div>
                </div>
                <div className="dx-fieldset">
                  <div className="dx-fieldset-header">Annual Volume</div>

                  <div className="dx-field">
                    <div className="dx-field-label">Credit</div>
                    <NumberBox
                      className="dx-field-value"
                      placeholder="Credit"
                      value={testCredit}
                      disabled={error || saving}
                      onValueChange={(text) => setTestCredit(text)}
                    >
                      <Validator>
                        <RequiredRule message="Credit is required" />
                      </Validator>
                    </NumberBox>
                  </div>
                  <div className="dx-field">
                    <div className="dx-field-label">NHIMA</div>
                    <NumberBox
                      className="dx-field-value"
                      placeholder="NHIMA"
                      value={testNHIMA}
                      disabled={error || saving}
                      onValueChange={(text) => setTestNHIMA(text)}
                    >
                      <Validator>
                        <RequiredRule message="NHIMA is required" />
                      </Validator>
                    </NumberBox>
                  </div>
                  <div className="dx-field">
                    <div className="dx-field-label">Research</div>
                    <NumberBox
                      className="dx-field-value"
                      placeholder="Research"
                      value={testResearch}
                      disabled={error || saving}
                      onValueChange={(text) => setTestResearch(text)}
                    >
                      <Validator>
                        <RequiredRule message="Research is required" />
                      </Validator>
                    </NumberBox>
                  </div>
                  <div className="dx-field">
                    <div className="dx-field-label">Walk-Ins</div>
                    <NumberBox
                      className="dx-field-value"
                      placeholder="Walk-Ins"
                      value={testWalkin}
                      disabled={error || saving}
                      onValueChange={(text) => setTestWalkin(text)}
                    >
                      <Validator>
                        <RequiredRule message="Walk-Ins is required" />
                      </Validator>
                    </NumberBox>
                  </div>
                  <div className="dx-field">
                    <div className="dx-field-label">
                      Total Annual Test Volume
                    </div>
                    <div className="dx-field-value-static">
                      <strong>{Assist.formatNumber(annualTestVolume)}</strong>
                    </div>
                  </div>
                  <div className="dx-field">
                    <div className="dx-field-label">
                      Projected % Shift to Testing
                    </div>
                    <NumberBox
                      className="dx-field-value"
                      placeholder="Projected % Shift to Testing"
                      value={testPercentShift}
                      disabled={error || saving}
                      onValueChange={(text) => setTestPercentShift(text)}
                    >
                      <Validator>
                        <RequiredRule message="Projected % Shift to Testing is required" />
                      </Validator>
                    </NumberBox>
                  </div>
                  <div className="dx-field">
                    <div className="dx-field-label">
                      Anticipated Annual Volume
                    </div>
                    <div className="dx-field-value-static">
                      <strong>
                        {Assist.formatNumber(anticipatedAnnualTestVolume)}
                      </strong>
                    </div>
                  </div>
                </div>
                <div className="dx-fieldset">
                  <div className="dx-fieldset-header">Lab Plans</div>

                  <div className="dx-field">
                    <div className="dx-field-label">Sites Performing Test</div>
                    <NumberBox
                      className="dx-field-value"
                      placeholder="Sites Performing Test"
                      value={testSitesNo}
                      disabled={error || saving}
                      onValueChange={(text) => setTestSitesNo(text)}
                    >
                      <Validator>
                        <RequiredRule message="Sites Performing Test is required" />
                      </Validator>
                    </NumberBox>
                  </div>
                  <div className="dx-field">
                    <div className="dx-field-label">Staff Performing Test</div>
                    <NumberBox
                      className="dx-field-value"
                      placeholder="Staff Performing Test"
                      value={testStaffNo}
                      disabled={error || saving}
                      onValueChange={(text) => setTestStaffNo(text)}
                    >
                      <Validator>
                        <RequiredRule message="Staff Performing Test is required" />
                      </Validator>
                    </NumberBox>
                  </div>
                </div>
                <div className="dx-fieldset">
                  <div className="dx-fieldset-header">Instrument Usage</div>

                  <div className="dx-field">
                    <div className="dx-field-label">
                      Number of Days Per Week Test is 'run'
                    </div>
                    <NumberBox
                      className="dx-field-value"
                      placeholder="Number of Days Per Week Test is 'run'"
                      value={testRunsDayPerWeek}
                      disabled={error || saving}
                      onValueChange={(text) => setTestRunsDayPerWeek(text)}
                    >
                      <Validator>
                        <RequiredRule message="Number of Days per week test is 'run' is required" />
                      </Validator>
                    </NumberBox>
                  </div>
                  <div className="dx-field">
                    <div className="dx-field-label">
                      Number of Shifts Per Day Rest is 'Run'
                    </div>
                    <NumberBox
                      className="dx-field-value"
                      placeholder="Number of Shifts Per Day Rest is 'Run'"
                      value={testRunsShiftPerWeek}
                      disabled={error || saving}
                      onValueChange={(text) => setTestRunsShiftPerWeek(text)}
                    >
                      <Validator>
                        <RequiredRule message="Number of Shifts Per Day Rest is 'Run' is required" />
                      </Validator>
                    </NumberBox>
                  </div>
                  <div className="dx-field">
                    <div className="dx-field-label">Annual # 'Runs'</div>
                    <div className="dx-field-value-static">
                      <strong>{Assist.formatNumber(annualRuns)}</strong>
                    </div>
                  </div>
                  <div className="dx-field">
                    <div className="dx-field-label">
                      Average Test Volume per 'Run'
                    </div>
                    <div className="dx-field-value-static">
                      <strong>{Assist.formatNumber(testVolumePerRun)}</strong>
                    </div>
                  </div>
                </div>
                <div className="dx-fieldset">
                  <div className="dx-fieldset-header">Description</div>
                  <div className="dx-field">
                    <HtmlEditor
                      height="225px"
                      defaultValue={testDescription}
                      value={testDescription}
                      toolbar={toolbar}
                      onValueChanged={(e) => setTestDescription(e.value)}
                    >
                      <MediaResizing enabled={true} />
                    </HtmlEditor>
                  </div>
                </div>
                <div className="dx-field">
                  <div className="dx-field-testel">
                    <ValidationSummary id="summaryMain" />
                  </div>
                </div>
                <div className="dx-field">
                  <div className="dx-field-testel"></div>
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
        <Col sz={12} sm={12} lg={8}>
          <Card title="Reagents & Instruments" showHeader={true}>
            <div className="dx-fieldset">
              <div className="dx-fieldset-header">Instruments</div>
              <div className="dx-field">
                <DataGrid
                  className={"dx-card wide-card"}
                  dataSource={instrumentData}
                  keyExpr={"id"}
                  noDataText={"You have no active instruments"}
                  showBorders={false}
                  focusedRowEnabled={false}
                  defaultFocusedRowIndex={0}
                  columnAutoWidth={true}
                  columnHidingEnabled={true}
                  onRowUpdated={(e) => {
                    // Only quantity can be updated; recalculate totalPrice
                    const index = instrumentData.findIndex(
                      (item: any) => item.id === e.key,
                    );

                    const applies = e.data.is_applicable ?? false;

                    if (index !== -1) {
                      const updatedItem = {
                        ...instrumentData[index],
                        is_applicable: applies,
                        annual_percent: applies ? 100 : 0,
                        annual_cost: applies
                          ? instrumentData[index].total_cost
                          : 0,
                      };

                      const newData = [...instrumentData];
                      newData[index] = updatedItem;
                      setInstrumentData(newData);
                    }
                  }}
                >
                  <Editing mode="row" allowUpdating={true} />
                  <Paging defaultPageSize={10} />
                  <Pager showPageSizeSelector={true} showInfo={true} />
                  <Column
                    dataField="id"
                    caption="ID"
                    visible={false}
                    hidingPriority={7}
                  ></Column>
                  <Column
                    dataField="name"
                    caption="Name"
                    format={",##0.###"}
                    allowEditing={false}
                  ></Column>
                  <Column
                    dataField="total_cost"
                    caption="Instrument Cost"
                    format={",##0.###"}
                    allowEditing={false}
                  ></Column>
                  <Column
                    dataField="is_applicable"
                    caption="Is Applicable"
                    dataType="boolean"
                  ></Column>
                  <Column
                    dataField="annual_percent"
                    caption="% of Instrument Test Volume"
                    format={",##0.###"}
                    allowEditing={false}
                  ></Column>
                  <Column
                    dataField="annual_cost"
                    caption="Annual instrument cost attributed to test"
                    format={",##0.###"}
                    allowEditing={false}
                  ></Column>
                  <Summary calculateCustomSummary={calculateCustomSummary}>
                    <TotalItem
                      name="instrumentCost"
                      valueFormat={{ type: "fixedPoint", precision: 2 }} // summary also formatted
                      column="annual_cost" // column to summarize
                      summaryType="custom" // type of summary
                      displayFormat="Instrument cost per test: {0}" // format for display
                    />
                  </Summary>
                </DataGrid>
              </div>
              <div className="dx-fieldset-header">Reagents</div>
              <div className="dx-field">
                <DataGrid
                  className={"dx-card wide-card"}
                  dataSource={reagentData}
                  keyExpr={"id"}
                  noDataText={"You have no active reagents"}
                  showBorders={false}
                  focusedRowEnabled={false}
                  defaultFocusedRowIndex={0}
                  columnAutoWidth={true}
                  columnHidingEnabled={true}
                  onRowUpdated={(e) => {
                    const reagentSimDaysInPeriod = 30;
                    const reagentSimActualTest = e.data.test_actual;
                    const reagentExpiryPeriod = e.data.expiry_period;
                    const reagentTestsPerGRU = e.data.tests_per_gru;
                    const reagentCost = e.data.cost;

                    const simulationTestWithinPeriod = () => {
                      if (
                        reagentSimDaysInPeriod &&
                        reagentSimDaysInPeriod > 0 &&
                        reagentSimActualTest &&
                        reagentExpiryPeriod
                      ) {
                        return (
                          (reagentSimActualTest * reagentExpiryPeriod) /
                          reagentSimDaysInPeriod
                        );
                      } else {
                        return 0;
                      }
                    };
                    const simulationTestsUsable = () => {
                      const numbers = [
                        simulationTestWithinPeriod(),
                        reagentTestsPerGRU ?? 0,
                      ];

                      return Math.min(...numbers);
                    };
                    const reagentUnitsConsumed = () => {
                      if (simulationTestsUsable() > 0) {
                        return (
                          (reagentSimActualTest ?? 0) / simulationTestsUsable()
                        );
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
                    // Only quantity can be updated; recalculate totalPrice
                    const index = reagentData.findIndex(
                      (item: any) => item.id === e.key,
                    );
                    if (index !== -1) {
                      const updatedItem = {
                        ...reagentData[index],
                        gru_consumed: reagentUnitsConsumed(),
                        cost_per_test: costPerTestActual(),
                        total_cost:
                          costPerTestActual() * (e.data.test_actual ?? 0),
                      };

                      const newData = [...reagentData];
                      newData[index] = updatedItem;
                      setReagentData(newData);
                    }
                  }}
                >
                  <Editing mode="row" allowUpdating={true} />
                  <Paging defaultPageSize={10} />
                  <Pager showPageSizeSelector={true} showInfo={true} />
                  <Column
                    dataField="id"
                    caption="ID"
                    visible={false}
                    hidingPriority={7}
                  ></Column>
                  <Column
                    dataField="name"
                    caption="Name"
                    format={",##0.###"}
                    allowEditing={false}
                  ></Column>
                  <Column
                    dataField="cost"
                    caption="Cost"
                    format={",##0.###"}
                    allowEditing={false}
                  ></Column>
                  <Column
                    dataField="expiry_period"
                    caption="Expiry Period"
                    format={",##0.###"}
                    allowEditing={false}
                  ></Column>
                  <Column
                    dataField="generic_reagent_unit"
                    caption="GRU"
                    hidingPriority={3}
                    allowEditing={false}
                  ></Column>
                  <Column
                    dataField="quantity_per_gru"
                    caption="Qty / GRU"
                    hidingPriority={3}
                    allowEditing={false}
                  ></Column>
                  <Column
                    dataField="tests_per_gru"
                    caption="Tests / GRU"
                    hidingPriority={3}
                    allowEditing={false}
                  ></Column>
                  <Column
                    dataField="test_actual"
                    caption="Test Actual"
                    format={",##0.###"}
                  ></Column>
                  <Column
                    dataField="gru_consumed"
                    caption="GRU Consumed"
                    format={",##0.###"}
                    allowEditing={false}
                  ></Column>
                  <Column
                    dataField="cost_per_test"
                    caption="Cost / Test"
                    format={",##0.###"}
                    allowEditing={false}
                  ></Column>
                  <Column
                    dataField="total_cost"
                    caption="Total Cost"
                    format={",##0.###"}
                    allowEditing={false}
                  ></Column>
                </DataGrid>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminTestEdit;
