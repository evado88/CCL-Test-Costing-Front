import { useState, useEffect, useMemo } from "react";
import { Titlebar } from "../../../components/titlebar";
import { Card } from "../../../components/card";
import { Row } from "../../../components/row";
import { Col } from "../../../components/column";
import DataGrid, {
  Column,
  Pager,
  Paging,
  FilterRow,
  LoadPanel,
  ColumnChooser,
  Editing,
  Toolbar,
  Item,
} from "devextreme-react/data-grid";

import Assist from "../../../classes/assist";
import PageConfig from "../../../classes/page-config";
import { useNavigate } from "react-router-dom";

const AdminTests = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loadingText, setLoadingText] = useState("Loading data...");
  const [loading, setLoading] = useState(true);

  const pageConfig = new PageConfig("Tests", "tests/list", "", "Test", "");

  useEffect(() => {
    setLoading(true);

    Assist.loadData(pageConfig.Title, pageConfig.Url)
      .then((res: any) => {
        setData(res);
        setLoading(false);

        if (res.length === 0) {
          setLoadingText("No Data");
        } else {
          setLoadingText("");
        }
      })
      .catch((ex) => {
        Assist.showMessage(ex.Message, "error");
        setLoadingText("Could not show information");
      });
  }, []);

  const addButtonOptions = useMemo(
    () => ({
      icon: "add",
      text: "Refresh",
      onClick: () => navigate("/admin/tests/add"),
    }),
    [],
  );

  return (
    <div className="page-content" style={{ minHeight: "862px" }}>
      <Titlebar
        title={pageConfig.Title}
        section={"Administration"}
        icon={"cubes"}
        url="/"
      ></Titlebar>
      {/* end widget */}

      {/* chart start */}
      <Row>
        <Col sz={12} sm={12} lg={12}>
          <Card showHeader={false}>
            <DataGrid
              className={"dx-card wide-card"}
              dataSource={data}
              keyExpr={"id"}
              noDataText={loadingText}
              showBorders={false}
              focusedRowEnabled={true}
              defaultFocusedRowIndex={0}
              columnAutoWidth={true}
              columnHidingEnabled={true}
            >
              <Paging defaultPageSize={10} />
              <Editing
                mode="row"
                allowUpdating={false}
                allowDeleting={true}
                allowAdding={false}
              />
              <Pager showPageSizeSelector={true} showInfo={true} />
              <FilterRow visible={true} />
              <LoadPanel enabled={loading} />
              <ColumnChooser enabled={true} mode="select"></ColumnChooser>
              <Toolbar>
                <Item
                  location="before"
                  locateInMenu="auto"
                  showText="inMenu"
                  widget="dxButton"
                  options={addButtonOptions}
                />
                <Item name="columnChooserButton" />
              </Toolbar>
              <Column dataField="id" caption="ID" hidingPriority={4}></Column>
              <Column
                dataField="name"
                caption="Name"
                hidingPriority={3}
                sortOrder="asc"
                cellRender={(e) => {
                  return (
                    <a href={`/admin/tests/edit/${e.data.id}`}>{e.text}</a>
                  );
                }}
              ></Column>
              <Column
                dataField="annual_nhima"
                caption="Annual NHIMA"
                format={",##0.###"}
                hidingPriority={2}
              ></Column>
              <Column
                dataField="annual_credit"
                caption="Annual Credit"
                format={",##0.###"}
                hidingPriority={2}
              ></Column>
              <Column
                dataField="annual_research"
                caption="Annual Research"
                format={",##0.###"}
                hidingPriority={2}
              ></Column>
              <Column
                dataField="annual_walkins"
                caption="Annual Walkins"
                format={",##0.###"}
                hidingPriority={2}
              ></Column>
              <Column
                dataField="annual_shift"
                caption="Annual Shift"
                format={",##0.###"}
                hidingPriority={2}
              ></Column>
              <Column
                dataField="annual_total"
                caption="Annual Total"
                format={",##0.###"}
                hidingPriority={2}
              ></Column>
              <Column
                dataField="sites_no"
                caption="Sites No"
                format={",##0.###"}
                hidingPriority={2}
              ></Column>
              <Column
                dataField="staff_no"
                caption="Staff No"
                format={",##0.###"}
                hidingPriority={2}
              ></Column>
              <Column
                dataField="runs_day_week"
                caption="Days Per Week"
                format={",##0.###"}
                hidingPriority={2}
              ></Column>
              <Column
                dataField="runs_shift_day"
                caption="Shifts Per Day"
                format={",##0.###"}
                hidingPriority={2}
              ></Column>
              <Column
                dataField="runs_annual"
                caption="Annual Runs"
                format={",##0.###"}
                hidingPriority={2}
              ></Column>
              <Column
                dataField="runs_average_volume"
                caption="Volume Per Run"
                format={",##0.###"}
                hidingPriority={2}
              ></Column>
              <Column
                dataField="created_by"
                caption="User"
                minWidth={120}
                hidingPriority={2}
              ></Column>
              <Column
                dataField="created_at"
                caption="Date"
                dataType="date"
                format="dd MMM yyy HH:MM"
                hidingPriority={1}
              ></Column>
            </DataGrid>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminTests;
