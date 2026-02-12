import React, { useState, useEffect, useMemo } from "react";
import { Ticker } from "../components/ticker.jsx";
import { Titlebar } from "../components/titlebar.js";
import { Card } from "../components/card.js";
import { Row } from "../components/row.jsx";
import { Col } from "../components/column.js";
import { NotificationList } from "../components/notificationList.jsx";
import {
  Chart,
  Series,
  CommonSeriesSettings,
  Label,
  Format,
  Legend,
  Export,
} from "devextreme-react/chart";
import { LoadPanel } from "devextreme-react/load-panel";
import { useAuth } from "../context/AuthContext.jsx";
import PageConfig from "../classes/page-config.js";
import Assist from "../classes/assist.js";
import DataGrid, {
  Column,
  Pager,
  Paging,
  FilterRow,
  ColumnChooser,
  Editing,
  Toolbar,
  Item,
  MasterDetail,
} from "devextreme-react/data-grid";
import { useNavigate } from "react-router-dom";

const MyDashboard = () => {
  //user

  const [loading, setLoading] = useState(false);

  const [testsNo, setTestsNo] = useState<number | undefined>(undefined);
  const [instrumentsNo, setInstrumentsNo] = useState<number | undefined>(
    undefined,
  );
  const [labsNo, setLabsNo] = useState<number | undefined>(undefined);
  const [usersNo, setUsersNo] = useState<number | undefined>(undefined);
  const [reagentsNo, setReagentsNo] = useState<number | undefined>(undefined);
  const [data, setData] = useState<any>({});

  const pageConfig = new PageConfig(`Dashboard`, "", "", "User", ``);

  useEffect(() => {
    setTimeout(() => {
      Assist.loadData(pageConfig.Title, `dashboard/test-costing`)
        .then((data: any) => {
          setLoading(false);
          updateVaues(data);
        })
        .catch((message) => {
          setLoading(false);
          Assist.showMessage(message, "error");
        });
    }, Assist.DEV_DELAY);
  }, []);

  const updateVaues = (data: any) => {
    //update statistics
    setTestsNo(data.total_tests);
    setLabsNo(data.total_labs);
    setUsersNo(data.total_users);
    setInstrumentsNo(data.total_instruments);
    setReagentsNo(data.total_reagents);

    setData(data.tests);
  };

  // ===== Third Level (Items) =====
  const renderComponentItems = (detail: any) => {
    console.log("deailxxx", detail.data.data.items);

    if (detail.data.data.component === "reagent") {
      return (
        <DataGrid
          dataSource={detail.data.data.items}
          keyExpr="id"
          showBorders={true}
        >
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
      );
    }

    if (detail.data.data.component === "instrument") {
      return (
        <DataGrid
          dataSource={detail.data.data.items}
          keyExpr="id"
          showBorders={true}
        >
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
        </DataGrid>
      );
    }

    return null;
  };

  // ===== Second Level (Components) =====
  const renderComponents = (detail: any) => {
    return (
      <DataGrid
        dataSource={detail.data.data.components}
        keyExpr="component"
        showBorders={true}
      >
        <Column
          dataField="component"
          caption="Component"
          calculateDisplayValue={(row) =>
            row.component.charAt(0).toUpperCase() + row.component.slice(1)
          }
        />

        <Column dataField="cost" caption="Component Cost" dataType="number" />

        <MasterDetail enabled={true} component={renderComponentItems} />
      </DataGrid>
    );
  };

  return (
    <div className="page-content" style={{ minHeight: "862px" }}>
      <LoadPanel
        shadingColor="rgba(248, 242, 242, 0.9)"
        position={{ of: "#pageRoot" }}
        visible={loading}
        showIndicator={true}
        shading={true}
        showPane={true}
        hideOnOutsideClick={false}
      />
      <Titlebar
        title={pageConfig.Title}
        section={"Home"}
        icon={"home"}
        url={""}
      ></Titlebar>
      {/* start widget */}
      <Row>
        <Col xl={2} lg={2}>
          <Ticker
            title={"Users"}
            value={usersNo}
            color={"green"}
            percent={80}
          ></Ticker>
        </Col>
        <Col xl={2} lg={2}>
          <Ticker
            title={"Labs"}
            value={labsNo}
            color={"red"}
            percent={40}
          ></Ticker>
        </Col>
        <Col xl={4} lg={4}>
          <Ticker
            title={"Instruments"}
            value={instrumentsNo}
            color={"orange"}
            percent={70}
          ></Ticker>
        </Col>
        <Col xl={2} lg={2}>
          <Ticker
            title={"Reagents"}
            value={reagentsNo}
            color={"orange"}
            percent={70}
          ></Ticker>
        </Col>
        <Col xl={2} lg={2}>
          <Ticker
            title={"Tests"}
            value={testsNo}
            color={"red"}
            percent={90}
          ></Ticker>
        </Col>
      </Row>
      {/* end widget */}

      {/* chart start */}
      <Row>
        <Col sz={12} sm={12} lg={12}>
          <Card title={"Summary"} showHeader={true}>
            <DataGrid
              className={"dx-card wide-card"}
              dataSource={data}
              keyExpr={"name"}
              noDataText={`No summary available yet`}
              showBorders={false}
              focusedRowEnabled={false}
              defaultFocusedRowIndex={0}
              columnAutoWidth={true}
              columnHidingEnabled={true}
            >
              <Paging defaultPageSize={10} />
              <Editing
                mode="row"
                allowUpdating={false}
                allowDeleting={false}
                allowAdding={false}
              />
              <Pager showPageSizeSelector={true} showInfo={true} />
              <Column
                dataField="name"
                caption="Name"
                hidingPriority={2}
              ></Column>
              <Column dataField="lab" caption="Lab" hidingPriority={2}></Column>
              <Column
                dataField="total_cost"
                caption="Total Cost"
                format={",##0.###"}
                hidingPriority={7}
              ></Column>
              <MasterDetail enabled={true} component={renderComponents} />
            </DataGrid>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default MyDashboard;
