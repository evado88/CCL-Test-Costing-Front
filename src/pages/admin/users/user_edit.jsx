import { useState, useEffect, useMemo } from "react";
import { Titlebar } from "../../../components/titlebar";
import { Card } from "../../../components/card";
import { Row } from "../../../components/row";
import { Col } from "../../../components/column";
import { TextBox } from "devextreme-react/text-box";
import {
  Validator,
  RequiredRule,
  CustomRule,
  EmailRule,
} from "devextreme-react/validator";
import Button from "devextreme-react/button";
import ValidationSummary from "devextreme-react/validation-summary";
import { LoadPanel } from "devextreme-react/load-panel";
import DateBox from "devextreme-react/date-box";
import { useAuth } from "../../../context/AuthContext";
import PageConfig from "../../../classes/page-config";
import Assist from "../../../classes/assist";
import { LoadIndicator } from "devextreme-react/load-indicator";
import { useNavigate, useParams } from "react-router-dom";
import HtmlEditor, { MediaResizing } from "devextreme-react/html-editor";
import AppInfo from "../../../classes/app-info";
import FileUploader from "devextreme-react/file-uploader";
import DataGrid, { Column, Pager, Paging } from "devextreme-react/data-grid";
import { confirm } from "devextreme/ui/dialog";
import SelectBox from "devextreme-react/select-box";

const UserEdit = () => {
  //user
  const navigate = useNavigate();
  const { user } = useAuth();
  const { eId } = useParams(); // Destructure the parameter directly

  //posting
  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [firstname, setFirstname] = useState(null);
  const [lastname, setLastname] = useState(null);
  const [mobileCode, setMobileCode] = useState("+260");
  const [mobile, setMobile] = useState(null);
  const [email, setEmail] = useState(null);
  const [position, setPosition] = useState(null);
  const [physicalAddress, setPhysicalAddress] = useState(null);
  const [postalAddress, setPostalAddress] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  //config
  const [config, setConfig] = useState(null);

  //service
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);

  const pageConfig = new PageConfig(`User`, "", "", "User", "");

  pageConfig.Id = eId == undefined ? 0 : Number(eId);

  useEffect(() => {
    //only load config for new items to get approval levels and other data
    setLoading(true);
    setTimeout(() => {
      if (pageConfig.Id != 0) {
        Assist.loadData(pageConfig.Single, `users/id/${eId}`)
          .then((postData) => {
            setLoading(false);
            updateVaues(postData);
          })
          .catch((message) => {
            setLoading(false);
            setError(true);
            Assist.showMessage(message, "error");
          });
      } 
    }, Assist.DEV_DELAY);
  }, []);

  const updateVaues = (data) => {
    setFirstname(data.fname);
    setLastname(data.lname);
    setPosition(data.position);

    const code = String(data.mobile_code);
    const mobile = String(data.mobile);

    setMobileCode(code);

    //check if this phone and code are aligned
    if (code.length != 0) {
      const index = mobile.indexOf(code.substring(1));
      if (index != -1) {
        setMobile(mobile.substring(index + code.length - 1));
      }
    }

    setEmail(data.email);
    setPhysicalAddress(data.address_physical);
    setPostalAddress(data.address_postal);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();

    let result = confirm(
      `Are you sure you want to submit this ${pageConfig.Single}?`,
      "Confirm submission"
    );
    result.then((dialogResult) => {
      if (dialogResult) {
        submitMeeting();
      }
    });
  };

  const submitMeeting = () => {
    setSaving(true);

    const postData = {
      user_id: user.userid,
      type: 1,
      fname: firstname,
      lname: lastname,
      mobile_code: mobileCode,
      mobile: Assist.setMobile(mobileCode, mobile),
      position: position,
      address_physical: physicalAddress,
      address_postal: postalAddress,
      email: email,
      role: 2,
      password: password,
      status_id: Assist.STATUS_SUBMITTED,
      stage_id: Assist.STAGE_SUBMITTED,
      approval_levels: 2,
    };

    setTimeout(() => {
      Assist.postPutData(
        pageConfig.Title,
        pageConfig.Id == 0 ? `users/create` : `users/update/${pageConfig.Id}`,
        postData,
        pageConfig.Id
      )
        .then((data) => {
          setSaving(false);

          Assist.showMessage(
            `You have successfully submitted the ${pageConfig.Title}!`,
            "success"
          );

          //navigate
          navigate(`/admin/users/list`);
        })
        .catch((message) => {
          setSaving(false);
          Assist.showMessage(message, "error");
        });
    }, Assist.DEV_DELAY);
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
      <form id="formMain" onSubmit={onFormSubmit}>
        <Row>
          <Col sz={12} sm={12} lg={7}>
            <Card title="Properties" showHeader={true}>
              <div className="form">
                <div className="dx-fieldset">
                  <div className="dx-fieldset-header">Details</div>
                  <div className="dx-field">
                    <div className="dx-field-label">First name</div>
                    <TextBox
                      className="dx-field-value"
                      placeholder="First name"
                      value={firstname}
                      onValueChange={(text) => setFirstname(text)}
                    >
                      {" "}
                      <Validator>
                        <RequiredRule message="First name is required" />
                      </Validator>
                    </TextBox>
                  </div>
                  <div className="dx-field">
                    <div className="dx-field-label">Last name</div>
                    <TextBox
                      className="dx-field-value"
                      placeholder="Last name"
                      value={lastname}
                      onValueChange={(text) => setLastname(text)}
                    >
                      {" "}
                      <Validator>
                        <RequiredRule message="Last name is required" />
                      </Validator>
                    </TextBox>
                  </div>
                  <div className="dx-field">
                    <div className="dx-field-label">Position</div>
                    <TextBox
                      className="dx-field-value"
                      placeholder="Position"
                      value={position}
                      onValueChange={(text) => setPosition(text)}
                    ></TextBox>
                  </div>
                  <div className="dx-field">
                    <div className="dx-field-label">Country Code</div>
                    <SelectBox
                      className="dx-field-value"
                      placeholder="Country Code"
                      displayExpr="dial_code"
                      valueExpr="dial_code"
                      value={mobileCode}
                      itemTemplate={(item) => `${item.name} ${item.dial_code}`}
                      dataSource={AppInfo.countryCodes}
                      onValueChange={(value) => setMobileCode(value)}
                      validationMessagePosition="left"
                      disabled={error}
                    >
                      <Validator>
                        <RequiredRule message="Country code is required" />
                      </Validator>
                    </SelectBox>
                  </div>
                  <div className="dx-field">
                    <div className="dx-field-label">Mobile</div>
                    <TextBox
                      className="dx-field-value"
                      placeholder="Mobile"
                      value={mobile}
                      onValueChange={(text) => setMobile(text)}
                    >
                      <Validator>
                        <RequiredRule message="Mobile is required" />
                      </Validator>
                    </TextBox>
                  </div>
                  <div className="dx-field">
                    <div className="dx-field-label">Email</div>
                    <TextBox
                      className="dx-field-value"
                      placeholder="Email"
                      value={email}
                      onValueChange={(text) => setEmail(text)}
                    >
                      {" "}
                      <Validator>
                        <EmailRule message="Email is invalid" />
                        <RequiredRule message="Email is required" />
                      </Validator>
                    </TextBox>
                  </div>
                </div>
                <div className="dx-fieldset">
                  <div className="dx-fieldset-header">Address</div>
                  <div className="dx-field">
                    <div className="dx-field-label">Physical address</div>
                    <TextBox
                      className="dx-field-value"
                      placeholder="Physical address"
                      value={physicalAddress}
                      onValueChange={(text) => setPhysicalAddress(text)}
                    ></TextBox>
                  </div>
                  <div className="dx-field">
                    <div className="dx-field-label">Postal address</div>
                    <TextBox
                      className="dx-field-value"
                      placeholder="Postal address"
                      value={postalAddress}
                      onValueChange={(text) => setPostalAddress(text)}
                    ></TextBox>
                  </div>
                </div>
                <div className="dx-fieldset">
                  <div className="dx-fieldset-header">Account Password</div>
                  <div className="dx-field">
                    <div className="dx-field-label">Password</div>
                    <TextBox
                      className="dx-field-value"
                      placeholder="Password"
                      mode="password"
                      value={password}
                      onValueChange={(text) => setPassword(text)}
                    >
                      {" "}
                      <Validator>
                        <RequiredRule message="Password is required" />
                        <CustomRule
                          validationCallback={(e) => e.value == confirmPassword}
                          message={`Password does not match confirm password`}
                        />
                      </Validator>
                    </TextBox>
                  </div>
                  <div className="dx-field">
                    <div className="dx-field-label">Confirm Password</div>
                    <TextBox
                      className="dx-field-value"
                      placeholder="Confirm Password"
                      mode="password"
                      value={confirmPassword}
                      onValueChange={(text) => setConfirmPassword(text)}
                    >
                      {" "}
                      <Validator>
                        <RequiredRule message="Please confirm password" />
                        <CustomRule
                          validationCallback={(e) => e.value == password}
                          message={`Confirm password does not match password`}
                        />
                      </Validator>
                    </TextBox>
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
                    type={saving ? "normal" : "success"}
                    disabled={loading || error || saving}
                    useSubmitBehavior={true}
                  >
                    <LoadIndicator
                      className="button-indicator"
                      visible={saving}
                    />
                    <span className="dx-button-text">Submit for Review</span>
                  </Button>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </form>
    </div>
  );
};

export default UserEdit;
