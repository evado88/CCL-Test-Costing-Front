import React, { useState, useEffect, useMemo, useCallback } from "react";
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
import CostHelper from "../../../classes/costing-helper";
import axios from "axios";
import { LoadIndicator } from "devextreme-react/load-indicator";
import { useNavigate, useParams } from "react-router-dom";
import HtmlEditor, {
  Toolbar,
  Item,
  MediaResizing,
} from "devextreme-react/html-editor";
import AppInfo from "../../../classes/app-info";
import DropDownBox from "devextreme-react/drop-down-box";
import DataGrid, {
  Column,
  Selection,
  Pager,
  Paging,
  Summary,
  GroupItem,
  TotalItem,
  Editing,
  Scrolling,
  FilterRow,
} from "devextreme-react/data-grid";
import type { DropDownBoxTypes } from "devextreme-react/drop-down-box";
import type { DataGridTypes } from "devextreme-react/data-grid";

const AdminTestPriceVolumeEdit = () => {
  //user
  const navigate = useNavigate();
  const { user } = useAuth();
  const { eId } = useParams(); // Destructure the parameter directly

  //posting
  const [instrumentName, setInstrumentName] = useState<string | undefined>(
    undefined,
  );
  const [instrumentSerialNo, setInstrumentSerialNo] = useState<
    string | undefined
  >(undefined);
  const [instrumentCost, setInstrumentCost] = useState<number | undefined>(
    undefined,
  );
  const [instrumentAmortization, setInstrumentAmortization] = useState<
    number | undefined
  >(undefined);
  const [instrumentAnnualMaintenanceCost, setInstrumentAnnualMaintenanceCost] =
    useState<number | undefined>(undefined);

  // calibration
  const [instrumentCalibrationCycle, setInstrumentCalibrationCycle] = useState<
    number | undefined
  >(undefined);

  const [instrumentCalibrationKitCost, setInstrumentCalibrationKitCost] =
    useState<number | undefined>(undefined);

  const [
    instrumentCalibrationServiceCost,
    setInstrumentCalibrationServiceCost,
  ] = useState<number | undefined>(undefined);

  const [instrumentDescription, setInstrumentDescription] = useState<
    string | undefined
  >(undefined);

  const [selectedLabIds, setSelectedLabIds] = useState<number[]>([]);
  const [labsData, setLabsData] = useState<any[]>([]);
  //service
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);

  const pageConfig = new PageConfig("Test Price Volume", "", "", "Test Price Volume", "");

  pageConfig.Id = eId == undefined ? 0 : Number(eId);

  useEffect(() => {
    //only load if updating item
    if (pageConfig.Id != 0) {
      setLoading(true);

      setTimeout(() => {
        Assist.loadData(pageConfig.Title, `test-price-volmes/id/${pageConfig.Id}`)
          .then((data: any) => {
            setLoading(false);
            setLabsData(data.labs);         
            updateVaues(data.instrument);
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
   return CostHelper.getInstrumentAnnualCost(instrumentAmortization, instrumentCost);
  };

  //Calculate instrument maintenance cost
  const getAnnualMaintenanceCost = () => {
    return CostHelper.getInstrumentAnnualMaintenanceCost(instrumentAnnualMaintenanceCost);
  };

  //calibration cost
  const getInstrumentCalibrationCost = () => {
    return CostHelper.getInstrumentAnnualCalibrationCost(instrumentCalibrationCycle, instrumentCalibrationKitCost, instrumentCalibrationServiceCost);
    
  };

  //Calculate total annual instrument cost
  const getTotalAnnualInstrumentCost = () => {
    const totalCost =
      getAnnualInstrumentCost() +
      getAnnualMaintenanceCost() +
      getInstrumentCalibrationCost();

    return totalCost;
  };

  const updateVaues = (data: any) => {
    setInstrumentName(data.name);
    setInstrumentSerialNo(data.serial_no);
    setInstrumentCost(data.cost);
    setInstrumentAmortization(data.amortization);
    setInstrumentAnnualMaintenanceCost(data.maintenance_cost);
    setInstrumentDescription(data.description);

    setInstrumentCalibrationCycle(data.calibration_cycle);
    setInstrumentCalibrationKitCost(data.calibration_kit_cost);
    setInstrumentCalibrationServiceCost(data.calibration_service_cost);

    //update selected ids
    if (data.lab_list) {
      const ids = data.lab_list.map((l: any) => l.id);
      setSelectedLabIds(ids);
    }
  };

  const onFormSubmit = (e: React.FormEvent) => {
    setSaving(true);

    e.preventDefault();

    const selectedLabs: any[] = labsData.filter((value: any) =>
      selectedLabIds.includes(value.id),
    );

    const postData = {
      // user
      user_id: user.userid,
      // details
      name: instrumentName,
      serial_no: instrumentSerialNo,
      description: instrumentDescription,
      // costs
      cost: instrumentCost,
      amortization: instrumentAmortization,
      maintenance_cost: instrumentAnnualMaintenanceCost,
      annual_cost: getAnnualInstrumentCost(),
      total_cost: getTotalAnnualInstrumentCost(),
      // calibration
      calibration_cycle: instrumentCalibrationCycle,
      calibration_kit_cost: instrumentCalibrationKitCost,
      calibration_service_cost: instrumentCalibrationServiceCost,
      calibration_annual_cost: getInstrumentCalibrationCost(),
      // lists
      lab_list: selectedLabs,
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

  const calibrationFrequencyData = [
    { name: "Monthly", cycle: 12 },
    { name: "Quarterly", cycle: 4 },
    { name: "Semi-Annually", cycle: 2 },
    { name: "Annually", cycle: 1 },
  ];

  const syncDataGridSelection = useCallback(
    (e: DropDownBoxTypes.ValueChangedEvent): void => {
      setSelectedLabIds(e.value || []);
    },
    [],
  );

  const dataGridOnSelectionChanged = useCallback(
    (e: DataGridTypes.SelectionChangedEvent): void => {
      setSelectedLabIds((e.selectedRowKeys.length && e.selectedRowKeys) || []);
    },
    [],
  );

  const dataGridRender = () => (
    <DataGrid
      height={345}
      keyExpr={"id"}
      dataSource={labsData}
      columns={["id", "name"]}
      hoverStateEnabled={true}
      selectedRowKeys={selectedLabIds}
      onSelectionChanged={dataGridOnSelectionChanged}
    >
      <Selection mode="multiple" />
      <Scrolling mode="virtual" />
      <Paging enabled={true} pageSize={10} />
      <FilterRow visible={true} />
    </DataGrid>
  );

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
                    <div className="dx-field-label">Serial Number</div>
                    <TextBox
                      className="dx-field-value"
                      placeholder="Name"
                      value={instrumentSerialNo}
                      disabled={error || saving}
                      onValueChange={(text) => setInstrumentSerialNo(text)}
                    >
                      <Validator>
                        <RequiredRule message="Serial number is required" />
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
                    <div className="dx-field-label">Labs</div>
                    <div className="dx-field-value">
                      <DropDownBox
                        value={selectedLabIds}
                        valueExpr={"id"}
                        deferRendering={false}
                        displayExpr={"name"}
                        placeholder="Select labs.."
                        showClearButton={true}
                        dataSource={labsData}
                        onValueChanged={syncDataGridSelection}
                        contentRender={dataGridRender}
                      />
                    </div>
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
                </div>
                <div className="dx-fieldset">
                  <div className="dx-fieldset-header">Maintenance</div>
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
                </div>
                <div className="dx-fieldset">
                  <div className="dx-fieldset-header">Calibration</div>
                  <div className="dx-field">
                    <div className="dx-field-label">Calibration Frequency</div>
                    <SelectBox
                      className="dx-field-value"
                      placeholder="Calibration Frequency"
                      dataSource={calibrationFrequencyData}
                      valueExpr={"cycle"}
                      displayExpr={"name"}
                      value={instrumentCalibrationCycle}
                      disabled={error || saving}
                      onValueChange={(text) =>
                        setInstrumentCalibrationCycle(text)
                      }
                    >
                      <Validator>
                        <RequiredRule message="Calibration cycle is required" />
                      </Validator>
                    </SelectBox>
                  </div>
                  <div className="dx-field">
                    <div className="dx-field-label">Calibration Kit Cost</div>
                    <NumberBox
                      className="dx-field-value"
                      placeholder="Calibration Cost"
                      value={instrumentCalibrationKitCost}
                      disabled={error || saving}
                      onValueChange={(text) =>
                        setInstrumentCalibrationKitCost(text)
                      }
                    >
                      <Validator>
                        <RequiredRule message="Calibration kit cost is required" />
                      </Validator>
                    </NumberBox>
                  </div>
                  <div className="dx-field">
                    <div className="dx-field-label">
                      Calibration Service Cost
                    </div>
                    <NumberBox
                      className="dx-field-value"
                      placeholder="Calibration Service Cost"
                      value={instrumentCalibrationServiceCost}
                      disabled={error || saving}
                      onValueChange={(text) =>
                        setInstrumentCalibrationServiceCost(text)
                      }
                    >
                      <Validator>
                        <RequiredRule message="Calibration service cost is required" />
                      </Validator>
                    </NumberBox>
                  </div>
                  <div className="dx-field">
                    <div className="dx-field-label">
                      Annual Calibration Cost
                    </div>
                    <div className="dx-field-value-static">
                      <strong>
                        {Assist.formatCurrencyUSD(
                          getInstrumentCalibrationCost(),
                        )}
                      </strong>
                    </div>
                  </div>
                </div>
                <div className="dx-fieldset">
                  <div className="dx-fieldset-header">
                    Annual Instrument Cost
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
                      height="325px"
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

export default AdminTestPriceVolumeEdit;
