import { useState, useEffect } from "react";
import { TextBox } from "devextreme-react/text-box";
import Button from "devextreme-react/button";
import {
  Validator,
  RequiredRule,
  EmailRule,
  AsyncRule,
  CustomRule,
} from "devextreme-react/validator";
import ValidationSummary from "devextreme-react/validation-summary";
import { LoadIndicator } from "devextreme-react/load-indicator";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import notify from "devextreme/ui/notify";
import axios from "axios";
import { DateBox, NumberBox } from "devextreme-react";
import SelectBox from "devextreme-react/select-box";
import { v4 as uuidv4 } from "uuid";
import Assist from "../classes/assist";
import { LoadPanel } from "devextreme-react/load-panel";
import PageConfig from "../classes/page-config";
import { confirm } from "devextreme/ui/dialog";
import AppInfo from "../classes/app-info";
import FileUploader from "devextreme-react/file-uploader";
import DataGrid, {
  Column,
  Pager,
  Paging,
  Summary,
  GroupItem,
  TotalItem,
} from "devextreme-react/data-grid";
import Box, { Item } from "devextreme-react/box";

const Signup = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);
  //config
  const [config, setConfig] = useState(null);
  //personal details
  const [firstname, setFirstname] = useState(null);
  const [lastname, setLastname] = useState(null);
  const [dateOfBirthText, setDateOfBirthText] = useState(null);
  const [dateOfBirthValue, setDateOfBirthValue] = useState(null);
  const [mobile2FACode, setMobile2FACode] = useState("+260");
  const [mobile2FA, setMobile2FA] = useState(null);
  const [mobileMoneyCode, setMobileMoneyCode] = useState("+260");
  const [mobileMoney, setMobileMoney] = useState(null);

  const [otp, setOTP] = useState("");
  const [code, setCode] = useState("");

  const [email, setEmail] = useState(null);
  const [idType, setIdType] = useState(null);
  const [idNo, setIdNo] = useState(null);

  const [attachmentID, setAttachmentID] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  //guarantor details
  const [guarantorFirstname, setGuarantorFirstname] = useState(null);
  const [guarantorLastname, setGuarantorLastname] = useState(null);
  const [guarantorMobileCode, setGuarantorMobileCode] = useState("+260");
  const [guarantorMobile, setGuarantorMobile] = useState(null);
  const [guarantorEmail, setGuarantorEmail] = useState(null);

  //bank details
  const [bank, setBank] = useState(null);
  const [branchName, setBranchName] = useState(null);
  const [branchCode, setBranchCode] = useState(null);
  const [accountName, setAccountName] = useState(null);
  const [accountNumber, setAccountNumber] = useState(null);

  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const [stage, setStage] = useState(1);

  const pageConfig = new PageConfig(
    `New Account`,
    AppInfo.configApiUrl,
    "",
    "Meeting",
    "members/register"
  );

  useEffect(() => {
    // Redirect if already logged in
    if (user) {
      navigate("/");
    } else {
      setLoading(true);
      setTimeout(() => {
        Assist.loadData("Configuration", pageConfig.Url)
          .then((data) => {
            setLoading(false);
            setConfig(data);
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

  const onFormSubmitPersonalDetails = async (e) => {
    e.preventDefault();

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStage(2);
    }, Assist.UX_DELAY);
  };

  const onFormSubmitID = async (e) => {
    e.preventDefault();

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStage(4);
    }, Assist.UX_DELAY);
  };

  const onFormSubmitIDAttachment = async (e) => {
    e.preventDefault();

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStage(4);
    }, Assist.UX_DELAY);
  };

  const onFormSubmitMobile = async (e) => {
    e.preventDefault();

    sendWhatsappOTP();
  };

  const onFormVeriyMobile = async (e) => {
    e.preventDefault();

    if (parseInt(code) === otp) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setStage(6);
      }, Assist.UX_DELAY);
    }
  };

  const onFormSubmitGuarantor = async (e) => {
    e.preventDefault();

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStage(7);
    }, Assist.UX_DELAY);
  };

  const onFormSubmitBank = async (e) => {
    e.preventDefault();

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStage(8);
    }, Assist.UX_DELAY);
  };

  const sendWhatsappOTP = (e) => {
    const newCode = Math.floor(100000 + Math.random() * 900000);
    const userPhone = Assist.setMobile(mobile2FACode, mobile2FA);

    console.log(`Now sending OTP ${newCode} to client ${userPhone}`);

    setOTP(newCode);

    const state = 55;

    if (state === 5) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setStage(5);
      }, Assist.UX_DELAY);
      return;
    }

    setLoading(true);

    const postData = {
      mobile: userPhone,
      code: newCode,
    };

    setTimeout(() => {
      Assist.postPutData(
        "WhatsApp Code",
        `whatsapp/send-infobip-auth-message`,
        postData,
        0
      )
        .then((data) => {
          console.log(data);
          setLoading(false);
          Assist.showMessage(
            `The OTP has been successfully sent to ${userPhone}`,
            "success"
          );
          setStage(5);
        })
        .catch((message) => {
          console.log(message);
          setLoading(false);
          Assist.showMessage(
            `Error sending OTP to ${userPhone}. Please try again`,
            "error"
          );
        });
    }, Assist.DEV_DELAY);
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();

    let result = confirm(
      "Are you sure you want to register an account with provided details?",
      "Confirm submission"
    );
    result.then((dialogResult) => {
      if (dialogResult) {
        registerAccount();
      }
    });
  };

  const notifyMemberRegistered = async (mem) => {
    //check if member has been approved or rejected

    const postData = {
      id: mem.id,
      action: "registered",
    };

    setTimeout(() => {
      Assist.postPutData(
        "WhatsApp Registered Notification",
        "whatsapp/send-infobip-register-message",
        postData,
        0
      )
        .then((data) => {
          console.log("Account registered notification sent", data);
        })
        .catch((message) => {
          console.log("Account registered notification error", message);
        });
    }, Assist.DEV_DELAY);
  };

  const registerAccount = () => {
    setSaving(true);

    const postData = {
      // id
      // personal details
      fname: firstname,
      lname: lastname,
      dob: dateOfBirthValue,
      // id
      id_type: idType,
      id_no: idNo,
      id_attachment: attachmentID,
      // contact details
      email: email,
      mobile1: Assist.setMobile(mobile2FACode, mobile2FA),
      mobile2: Assist.setMobile(mobileMoneyCode, mobileMoney),
      // guarantor
      guar_fname: guarantorFirstname,
      guar_lname: guarantorLastname,
      guar_mobile: Assist.setMobile(guarantorMobileCode, guarantorMobile),
      guar_email: guarantorEmail,
      // banking
      bank_name: bank,
      bank_branch_name: branchName,
      bank_branch_code: branchCode,
      bank_account_name: accountName,
      bank_account_no: accountNumber,
      //account
      password: password,
      // approval
      status_id: Assist.STATUS_SUBMITTED,
      stage_id: Assist.STAGE_SUBMITTED,
      approval_levels: config.approval_levels,
    };

    console.log("xxx", postData);

    setTimeout(() => {
      Assist.postPutData(pageConfig.Title, pageConfig.UpdateUrl, postData, 0)
        .then(async (data) => {
          await notifyMemberRegistered(data);
          setSaving(false);

          Assist.showMessage(
            `You have successfully registered an account on the member portal!`,
            "success"
          );

          //navigate
          navigate(`/login`);
        })
        .catch((message) => {
          setSaving(false);
          console.log(message);
          Assist.showMessage(message, "error");
        });
    }, Assist.DEV_DELAY);
  };
  const setPreviousStage = (e) => {
    e.preventDefault();
    setStage((prev) => prev - 1);
  };

  function asyncValidation(params) {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        Assist.loadData("User", `users/email/${encodeURI(params.value)}`)
          .then((res) => {
            if (res.length == 0) {
              resolve();
            } else {
              reject("The email address has already been registered");
            }
          })
          .catch((ex) => {
            reject("Could not perform validation. Please try again later.");
          });
      }, Assist.DEV_DELAY); // Simulate a 1-second delay for the server call
    });
  }

  return (
    <section className="signup">
      <div className="container">
        <div className="signup-content">
          <LoadPanel
            shadingColor="rgba(0,0,0,0.4)"
            position={{ of: "#pageRoot" }}
            visible={loading}
            showIndicator={true}
            shading={true}
            showPane={true}
            hideOnOutsideClick={false}
          />
          <div className="signup-form">
            <h2 className="form-title">Sign up</h2>

            {stage == 1 && (
              <form
                className="register-form"
                id="formPersonalDetails"
                onSubmit={onFormSubmitPersonalDetails}
              >
                {config != null && (
                  <p>Please provide your names and date of birth </p>
                )}
                <div className="dx-fieldset">
                  <div className="dx-fieldset-header">Personal Details</div>
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
                    <div className="dx-field-label">Date of birth</div>
                    <DateBox
                      className="dx-field-value"
                      placeholder="Date of birth"
                      displayFormat={"dd MMMM yyy"}
                      value={dateOfBirthText}
                      onValueChange={(text) => {
                        setDateOfBirthText(text);
                        setDateOfBirthValue(Assist.toMySQLFormat(text, false));
                      }}
                    >
                      {" "}
                      <Validator>
                        <RequiredRule message="Date of birth is required" />
                        <CustomRule
                          validationCallback={(e) =>
                            Assist.getAgeUTC(e.value) >= 18
                          }
                          message={`You must be 18 years or older to register`}
                        />
                      </Validator>
                    </DateBox>
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
                        <RequiredRule message="Email is required" />
                        <EmailRule message="Email is invalid" />
                        <AsyncRule validationCallback={asyncValidation} />
                      </Validator>
                    </TextBox>
                  </div>
                </div>
                <div className="form-group">
                  <ValidationSummary id="summary1" />
                </div>
                <div className="form-group form-button">
                  <Button
                    width="100%"
                    type="default"
                    text="Next"
                    useSubmitBehavior={true}
                  />
                </div>
              </form>
            )}
            {stage == 2 && (
              <form
                className="register-form"
                id="formID"
                onSubmit={onFormSubmitID}
              >
                <p>Please provide your identity details</p>
                <div className="dx-fieldset">
                  <div className="dx-fieldset-header">Identity Details</div>
                  <div className="dx-field">
                    <div className="dx-field-label">ID Type</div>
                    <SelectBox
                      className="dx-field-value"
                      dataSource={["NRC", "Passport", "Drivers License"]}
                      placeholder="ID Type"
                      value={idType}
                      onValueChanged={(e) => setIdType(e.value)}
                    >
                      {" "}
                      <Validator>
                        <RequiredRule message="ID Type is required" />
                      </Validator>
                    </SelectBox>
                  </div>
                  <div className="dx-field">
                    <div className="dx-field-label">ID No</div>
                    <TextBox
                      className="dx-field-value"
                      placeholder="ID No"
                      value={idNo}
                      onValueChange={(text) => setIdNo(text)}
                    >
                      {" "}
                      <Validator>
                        <RequiredRule message="ID No is required" />
                      </Validator>
                    </TextBox>
                  </div>
                </div>
                <div className="form-group">
                  <ValidationSummary id="summary2" />
                </div>
                <div className="form-group form-button">
                  <Button
                    width="100%"
                    type="default"
                    text="Next"
                    useSubmitBehavior={true}
                  />
                  <a
                    to={"#"}
                    className="signup-image-link"
                    onClick={() => setPreviousStage}
                  >
                    Personal Details
                  </a>
                </div>
              </form>
            )}
            {stage == 3 && (
              <form
                className="register-form"
                id="formID"
                onSubmit={onFormSubmitIDAttachment}
              >
                <p>Please attach a scanned copy of your identity document</p>
                <div className="dx-fieldset">
                  <div className="dx-fieldset-header">Submission</div>
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

                          console.log("runq", res);

                          if (res === null) {
                            Assist.showMessage(
                              `The response from the server is invalid. Please try again`,
                              "error"
                            );
                          } else {
                            setUploadedFiles([res.attachment]);
                            setAttachmentID(res.attachment.id);
                          }
                        } else {
                          Assist.showMessage(
                            `Unable to upload attachment. Please try again`,
                            "error"
                          );
                        }
                      }}
                      uploadUrl={`${AppInfo.apiUrl}attachments/create/type/member/parent/0`}
                    />
                  </div>
                  <div className="dx-field">
                    <DataGrid
                      className={"dx-card wide-card"}
                      dataSource={uploadedFiles}
                      keyExpr={"id"}
                      noDataText={"No attachment uploaded"}
                      showBorders={false}
                      focusedRowEnabled={false}
                      defaultFocusedRowIndex={0}
                      columnAutoWidth={true}
                      columnHidingEnabled={true}
                    >
                      <Paging defaultPageSize={10} />
                      <Pager showPageSizeSelector={true} showInfo={true} />
                      <Column
                        dataField="id"
                        caption="ID"
                        hidingPriority={7}
                        visible={false}
                      ></Column>
                      <Column
                        dataField="name"
                        caption="Name"
                        hidingPriority={4}
                        cellRender={(e) => {
                          return (
                            <a
                              href={encodeURI(
                                `${AppInfo.apiUrl}static/${e.data.path}`
                              )}
                              target="_null"
                            >
                              {e.text}
                            </a>
                          );
                        }}
                      ></Column>
                      <Column
                        dataField="filesize"
                        caption="Size"
                        format={",##0.###"}
                        hidingPriority={4}
                      ></Column>
                      <Column
                        dataField="filetype"
                        caption="Type"
                        hidingPriority={5}
                        visible={false}
                      ></Column>
                    </DataGrid>
                  </div>
                </div>
                <div className="form-group form-button">
                  <Button
                    width="100%"
                    type="default"
                    text="Next"
                    useSubmitBehavior={true}
                  />
                  <a
                    to={"#"}
                    className="signup-image-link"
                    onClick={() => setPreviousStage}
                  >
                    Identity Details
                  </a>
                </div>
              </form>
            )}
            {stage == 4 && (
              <form
                className="register-form"
                id="formMobile"
                onSubmit={onFormSubmitMobile}
              >
                <p>
                  Please provide your mobile phone for mobile money and for
                  verification
                </p>
                <div className="dx-fieldset">
                  <div className="dx-fieldset-header">Verification</div>
                  <div className="dx-field">
                    <div className="dx-field-label">Country Code</div>
                    <SelectBox
                      className="dx-field-value"
                      placeholder="Country Code"
                      displayExpr="dial_code"
                      valueExpr="dial_code"
                      value={mobile2FACode}
                      itemTemplate={(item) => `${item.name} ${item.dial_code}`}
                      dataSource={AppInfo.countryCodes}
                      onValueChange={(value) => setMobile2FACode(value)}
                      validationMessagePosition="left"
                      disabled={error}
                    >
                      <Validator>
                        <RequiredRule message="Country code is required" />
                      </Validator>
                    </SelectBox>
                  </div>
                  <div className="dx-field">
                    <div className="dx-field-label">Phone</div>
                    <TextBox
                      className="dx-field-value"
                      placeholder="977123456"
                      value={mobile2FA}
                      onValueChange={(text) => setMobile2FA(text)}
                    >
                      {" "}
                      <Validator>
                        <RequiredRule message="Mobile phone for verification required" />
                      </Validator>
                    </TextBox>
                  </div>
                </div>
                <div className="dx-fieldset">
                  <div className="dx-fieldset-header">Mobile money</div>
                  <div className="dx-field">
                    <div className="dx-field-label">Country Code</div>
                    <SelectBox
                      className="dx-field-value"
                      placeholder="Country Code"
                      displayExpr="dial_code"
                      valueExpr="dial_code"
                      itemTemplate={(item) => `${item.name} ${item.dial_code}`}
                      dataSource={AppInfo.countryCodes}
                      value={mobileMoneyCode}
                      onValueChange={(value) => setMobileMoneyCode(value)}
                      validationMessagePosition="left"
                      disabled={error}
                    >
                      <Validator>
                        <RequiredRule message=" Prefered payment method is required" />
                      </Validator>
                    </SelectBox>
                  </div>
                  <div className="dx-field">
                    <div className="dx-field-label">Phone</div>
                    <TextBox
                      className="dx-field-value"
                      placeholder="977123456"
                      value={mobileMoney}
                      onValueChange={(text) => setMobileMoney(text)}
                    >
                      {" "}
                      <Validator>
                        <RequiredRule message="Country code is required" />
                      </Validator>
                    </TextBox>
                  </div>
                </div>
                <div className="form-group">
                  <ValidationSummary id="summary3" />
                </div>
                <div className="form-group form-button">
                  <Button
                    width="100%"
                    type="default"
                    text="Next"
                    useSubmitBehavior={true}
                  />
                  <a className="signup-image-link" onClick={() => setStage(2)}>
                    Identity Details
                  </a>
                </div>
              </form>
            )}
            {stage == 5 && (
              <form
                className="register-form"
                id="formVerifyMobile"
                onSubmit={onFormVeriyMobile}
              >
                <p>Please enter the OTP that was sent to your phone</p>
                <div className="dx-fieldset">
                  <div className="dx-fieldset-header">Verify OTP</div>
                  <div className="dx-field">
                    <div className="dx-field-label">Code</div>
                    <TextBox
                      className="dx-field-value"
                      placeholder="Code"
                      value={code}
                      onValueChange={(text) => setCode(text)}
                    >
                      {" "}
                      <Validator>
                        <RequiredRule message="OTP code required" />
                        <CustomRule
                          validationCallback={(e) => e.value == otp}
                          message={`The specified code is not valid. Please try again`}
                        />
                      </Validator>
                    </TextBox>
                  </div>
                </div>
                <div className="form-group">
                  <ValidationSummary id="summary4" />
                </div>
                <div className="form-group form-button">
                  <Button
                    width="100%"
                    type="default"
                    text="Next"
                    useSubmitBehavior={true}
                  />
                  <a
                    to={"#"}
                    className="signup-image-link"
                    onClick={() => setStage(3)}
                  >
                    Mobile Phone details
                  </a>
                </div>
              </form>
            )}
            {stage == 6 && (
              <form
                className="register-form"
                id="form2"
                onSubmit={onFormSubmitGuarantor}
              >
                <div className="dx-fieldset">
                  <div className="dx-fieldset-header">Guarantor Details</div>
                  <div className="dx-field">
                    <div className="dx-field-label">First name</div>
                    <TextBox
                      className="dx-field-value"
                      placeholder="First name"
                      value={guarantorFirstname}
                      onValueChange={(text) => setGuarantorFirstname(text)}
                    >
                      {" "}
                      <Validator>
                        <RequiredRule message="Guarantor first name is required" />
                      </Validator>
                    </TextBox>
                  </div>
                  <div className="dx-field">
                    <div className="dx-field-label">Last name</div>
                    <TextBox
                      className="dx-field-value"
                      placeholder="First name"
                      value={guarantorLastname}
                      onValueChange={(text) => setGuarantorLastname(text)}
                    >
                      {" "}
                      <Validator>
                        <RequiredRule message="Gurantor last name is required" />
                      </Validator>
                    </TextBox>
                  </div>
                  <div className="dx-field">
                    <div className="dx-field-label">Country Code</div>
                    <SelectBox
                      className="dx-field-value"
                      placeholder="Country Code"
                      displayExpr="dial_code"
                      valueExpr="dial_code"
                      value={guarantorMobileCode}
                      itemTemplate={(item) => `${item.name} ${item.dial_code}`}
                      dataSource={AppInfo.countryCodes}
                      onValueChange={(value) => setGuarantorMobileCode(value)}
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
                      placeholder="Mobile i.e. 260977123456"
                      value={guarantorMobile}
                      onValueChange={(text) => setGuarantorMobile(text)}
                    />
                  </div>
                  <div className="dx-field">
                    <div className="dx-field-label">Email</div>
                    <TextBox
                      className="dx-field-value"
                      placeholder="Email"
                      value={guarantorEmail}
                      onValueChange={(text) => setGuarantorEmail(text)}
                    >
                      {" "}
                      <Validator>
                        <RequiredRule message="Guarantor mobile is required" />
                      </Validator>
                    </TextBox>
                  </div>
                </div>
                <div className="form-group">
                  <ValidationSummary id="summary5" />
                </div>
                <div className="form-group form-button">
                  <Button width="100%" type="default" useSubmitBehavior={true}>
                    <span className="dx-button-text">Next</span>
                  </Button>
                  <a
                    to={"#"}
                    className="signup-image-link"
                    onClick={() => setStage(3)}
                  >
                    Mobile Phone Details
                  </a>
                </div>
              </form>
            )}
            {stage == 7 && (
              <form
                className="register-form"
                id="form3"
                onSubmit={onFormSubmitBank}
              >
                <div className="dx-fieldset">
                  <div className="dx-fieldset-header">Bank Details</div>
                  <div className="dx-field">
                    <div className="dx-field-label">Bank</div>
                    <TextBox
                      className="dx-field-value"
                      placeholder="Bank"
                      value={bank}
                      onValueChange={(text) => setBank(text)}
                    >
                      {" "}
                      <Validator>
                        <RequiredRule message="Bank name is required" />
                      </Validator>
                    </TextBox>
                  </div>
                  <div className="dx-field">
                    <div className="dx-field-label">Branch name</div>
                    <TextBox
                      className="dx-field-value"
                      placeholder="Branch name"
                      value={branchName}
                      onValueChange={(text) => setBranchName(text)}
                    >
                      {" "}
                      <Validator>
                        <RequiredRule message="Branch name is required" />
                      </Validator>
                    </TextBox>
                  </div>
                  <div className="dx-field">
                    <div className="dx-field-label">Branch code</div>
                    <TextBox
                      className="dx-field-value"
                      placeholder="Branch code"
                      value={branchCode}
                      onValueChange={(text) => setBranchCode(text)}
                    >
                      {" "}
                      <Validator>
                        <RequiredRule message="Branch code is required" />
                      </Validator>
                    </TextBox>
                  </div>
                  <div className="dx-field">
                    <div className="dx-field-label">Account name</div>
                    <TextBox
                      className="dx-field-value"
                      placeholder="Account name"
                      value={accountName}
                      onValueChange={(text) => setAccountName(text)}
                    >
                      {" "}
                      <Validator>
                        <RequiredRule message="Account name is required" />
                      </Validator>
                    </TextBox>
                  </div>
                  <div className="dx-field">
                    <div className="dx-field-label">Account number</div>
                    <TextBox
                      className="dx-field-value"
                      placeholder="Account number"
                      value={accountNumber}
                      onValueChange={(text) => setAccountNumber(text)}
                    >
                      {" "}
                      <Validator>
                        <RequiredRule message="Account number is required" />
                      </Validator>
                    </TextBox>
                  </div>
                </div>
                <div className="form-group">
                  <ValidationSummary id="summary6" />
                </div>
                <div className="form-group form-button">
                  <Button
                    width="100%"
                    id="buttonSubmit"
                    type="default"
                    disabled={loading}
                    useSubmitBehavior={true}
                  >
                    <span className="dx-button-text">Next</span>
                  </Button>
                  <a
                    to={"#"}
                    className="signup-image-link"
                    onClick={() => setPreviousStage}
                  >
                    Guarantor Details
                  </a>
                </div>
              </form>
            )}
            {stage == 8 && (
              <form
                className="register-form"
                id="form3"
                onSubmit={onFormSubmit}
              >
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
                <div className="form-group">
                  <ValidationSummary id="summary7" />
                </div>
                <div className="form-group form-button">
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
                    <span className="dx-button-text">Register</span>
                  </Button>
                  <a
                    to={"#"}
                    className="signup-image-link"
                    onClick={() => setPreviousStage}
                  >
                    Bank Details
                  </a>
                </div>
              </form>
            )}
          </div>
          <div className="signup-image">
            <figure>
              <img src="./images/signup.jpg" alt="sing up image"></img>
            </figure>
            <Link to="/signin" className="signup-image-link">
              I am already member
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
