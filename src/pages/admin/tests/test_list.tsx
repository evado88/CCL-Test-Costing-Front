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
import { Link, useNavigate } from "react-router-dom";

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

  const columns = [
    { dataField: "id", caption: "ID", hidingPriority: 24 },
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
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminTests;
