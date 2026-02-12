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

const AdminInstrunments = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loadingText, setLoadingText] = useState("Loading data...");
  const [loading, setLoading] = useState(true);

  const pageConfig = new PageConfig(
    "Instruments",
    "instruments/list",
    "",
    "Instrument",
    "",
  );

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
      onClick: () => navigate("/admin/instruments/add"),
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
                hidingPriority={8}
                sortOrder="asc"
                cellRender={(e) => {
                  return (
                    <a href={`/admin/instruments/edit/${e.data.id}`}>
                      {e.text}
                    </a>
                  );
                }}
              ></Column>
              <Column
                dataField="cost"
                caption="Cost"
                format={",##0.###"}
                hidingPriority={7}
              ></Column>
              <Column
                dataField="amortization"
                caption="Amortization"
                hidingPriority={6}
              ></Column>
              <Column
                dataField="maintenance_cost"
                caption="Maintenance Cost"
                format={",##0.###"}
                hidingPriority={5}
              ></Column>
              <Column
                dataField="annual_cost"
                caption="Annual Cost"
                format={",##0.###"}
                hidingPriority={4}
              ></Column>
              <Column
                dataField="total_cost"
                caption="Total Cost"
                format={",##0.###"}
                hidingPriority={3}
              ></Column>
              <Column
                dataField="created_by"
                caption="User"
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

export default AdminInstrunments;
