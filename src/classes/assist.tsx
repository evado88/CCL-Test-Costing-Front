import AppInfo from "./app-info.js";
import notify from "devextreme/ui/notify";
import axios from "axios";
import TaskResult from "./task-result.js";
import { jwtDecode } from "jwt-decode";

class Assist {
  static POSTING_BEHALF = 2;

  static DEV_DELAY: number = 1000;
  static UX_DELAY: number = 500;

  static STAGE_AWAITING_SUBMISSION = 1;
  static STAGE_SUBMITTED = 2;
  static STAGE_PRIMARY_APPROVAL = 3;
  static STAGE_SECONDARY_APPROVAL = 4;
  static STAGE_GUARANTOR_APPROVAL = 5;
  static STAGE_AWAITING_POP_UPLOAD = 6;
  static STAGE_AWAITING_POP_APPROVAL = 7;
  static STAGE_APPROVED = 8;

  static STATUS_DRAFT = 1;
  static STATUS_SUBMITTED = 2;
  static STATUS_APPROVED = 4;
  static STATUS_REJECTED = 5;

  static TRANSACTION_SAVINGS = 1;
  static TRANSACTION_SHARE = 2;
  static TRANSACTION_LOAN = 3;
  static TRANSACTION_LOAN_PAYMENT = 4;
  static TRANSACTION_INTEREST_CHARGED = 5;
  static TRANSACTION_INTEREST_PAID = 6;
  static TRANSACTION_SOCIAL_FUND = 7;
  static TRANSACTION_PENALTY_CHARGED = 8;
  static TRANSACTION_PENALTY_PAID = 9;
  static TRANSACTION_GROUP_EARNING = 10;
  static TRANSACTION_GROUP_EXPENSE = 11;

  static STATE_OPEN = 1;
  static STATE_CLOSED = 2;

  static REVIEW_ACTION_REJECT = 1;
  static REVIEW_ACTION_APPROVE = 2;

  static APPROVAL_STAGE_SUBMITTED = 2;
  static APPROVAL_STAGE_PRIMARY = 3;
  static APPROVAL_STAGE_SECONDARY = 4;
  static APPROVAL_STAGE_GUARANTOR = 5;
  static APPROVAL_STAGE_POP_UPLOAD = 6;
  static APPROVAL_STAGE_POP_APPROVAL = 7;
  static APPROVAL_STAGE_APPROVED = 8;

  static RESPONSE_NO = 1;
  static RESPONSE_YES = 2;

  static NOTIFY_WAITING = 1;
  static NOTIFY_SENT = 2;

  static firebaseConfig = {
    apiKey: "AIzaSyCbH2wyJmcqTQU3gIl_raQwr0AmVuG_bhA",
    authDomain: "myzambia-5c62c.firebaseapp.com",
    databaseURL: "https://myzambia-5c62c.firebaseio.com",
    projectId: "myzambia-5c62c",
    storageBucket: "myzambia-5c62c.appspot.com",
    messagingSenderId: "878075714362",
    appId: "1:878075714362:web:55575ac3647ff7d3cd0e03",
  };

  static getAgeUTC(mysqlDateString: string) {
    // Parse the date strictly as UTC
    const birthDate = new Date(mysqlDateString);
    if (isNaN(birthDate.getTime())) {
      return -1;
    }

    const now = new Date();

    // Compute age based on UTC parts, not local parts
    let age = now.getUTCFullYear() - birthDate.getUTCFullYear();

    const hasHadBirthdayThisYear =
      now.getUTCMonth() > birthDate.getUTCMonth() ||
      (now.getUTCMonth() === birthDate.getUTCMonth() &&
        now.getUTCDate() >= birthDate.getUTCDate());

    if (!hasHadBirthdayThisYear) {
      age -= 1;
    }

    return age;
  }

  static formatDateLong(date: string | Date): string {
    const d = new Date(date);
    if (isNaN(d.getTime())) return "";

    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(d);
  }

  // Currency formatting
  static currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "ZMW",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  static numberFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "ZMW",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  static formatCurrency(value: number): string {
    return this.currencyFormatter.format(value);
  }
  static formatNumber(value: number): string {
    return this.numberFormatter.format(value);
  }
  static getPostingPeriodText(mysqlDate: string): string {
    const date = new Date(mysqlDate);
    const friendly = date.toLocaleString("en-US", {
      month: "long",
      year: "numeric",
    });
    return friendly;
  }

  static setMobile(code: string, phone: string): string {
   
    const safeCode = `${code.substring(1)}${phone}`;

    return safeCode;

  }

  static getDateText(mysqlDate: string): string {
    if (mysqlDate == null) {
      return "";
    } else {
      const date = new Date(mysqlDate);
      return date.toString();
    }
  }
  static getDateDay(mysqlDate: string): number {
    if (mysqlDate == null) {
      return 0;
    } else {
      const date = new Date(mysqlDate);
      return date.getDate();
    }
  }
  static toMySQLFormat(date: Date, includeTime: boolean) {
    const value = date
      .toISOString()
      .slice(0, includeTime ? 19 : 10)
      .replace("T", " ");

    return value;
  }

  static getCurrentPeriodId(): string {
    const date = new Date();
    const periodId = date.toISOString().slice(0, 7).replace("-", "");
    return periodId;
  }

  static getPeriodId(year: number, month: number): string {
    const date = new Date(year, month);
    const periodId = date.toISOString().slice(0, 7).replace("-", "");
    return periodId;
  }

  static getCurrentPeriodYear(): number {
    const date = new Date();
    const periodId = date.getFullYear();
    return periodId;
  }

  static getCurrentPeriodMonth(): number {
    const date = new Date();
    const periodId = date.getMonth() + 1;

    return periodId;
  }

  static getMonthName(monthNumber: number): string {
    // Month numbers are 1-indexed (1 for January, 12 for December)
    // Date objects use 0-indexed months, so we subtract 1.
    const date = new Date(2000, monthNumber - 1, 1);
    return date.toLocaleString("en-US", { month: "long" });
  }

  static isTokenExpired() {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        const decoded = jwtDecode(token);
        if (!decoded.exp) {
          return true; // no expiry → treat as invalid
        } else {
          const now = Date.now() / 1000; // current time in seconds
          // console.log("token cheque", now, "vs", decoded.exp);
          return decoded.exp < now;
        }
      } else {
        //not found, return true
        return true;
      }
    } catch (e) {
      // invalid token
      return true;
    }
  }

  static getTokenDetails(token: string): any {
    try {
      const decoded = jwtDecode(token);
      return decoded;
    } catch (e) {
      return undefined; // invalid token
    }
  }

  static updateDateDay(dateStr: string, newDay: number) {
    const newDateStr = dateStr.slice(0, 8) + String(newDay).padStart(2, "0");
    return newDateStr;
  }
  static getCurrentTime() {
    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, "0");

    const mysqlTime = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(
      now.getSeconds()
    )}`;
    return mysqlTime;
  }
  ///Logs a message to the console
  static log(message: string, type: string = "log") {
    const current = new Date();

    const date =
      current.toDateString() + " " + current.toLocaleTimeString() + " ";

    if (type === "info") {
      console.info(date + AppInfo.appCode + ": " + message);
    } else if (type === "warn") {
      console.warn(date + AppInfo.appCode + ": " + message);
    } else if (type === "error") {
      console.error(date + AppInfo.appCode + ": " + message);
    } else {
      console.log(date + AppInfo.appCode + ": " + message);
    }
  }

  static showMessage(message: string, type = "info") {
    notify(
      {
        message: message,
      },
      type,
      6000
    );
  }

  static async downloadExcel(name: string, dataArray: any) {
    const endPoint = "data/export-excel";
    //const jsonArray = JSON.stringify(dataArray);
    const postData = { filename: name, jsonArray: dataArray };

    axios({
      method: "post",
      url: `${AppInfo.apiUrl}${endPoint}`,
      data: postData,
      headers: { "Content-Type": "application/json" },
      responseType: "blob",
    })
      .then((response) => {
        // create file link in browser's memory
        const href = URL.createObjectURL(response.data);

        // create "a" HTML element with href to file & click
        const link = document.createElement("a");
        link.href = href;
        link.setAttribute("download", `${name}.xlsx`); //or any other extension
        document.body.appendChild(link);
        link.click();

        // clean up "a" element & remove ObjectURL
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  /**
   * Load data from the specified URL
   * @param title
   * @param url
   * @returns
   */
  static async loadData(title: string, url: string) {
    Assist.log(
      `Starting to load ${title} from server using url ${AppInfo.apiUrl}${url}`,
      "log"
    );

    return new Promise(function (resolve, reject) {
      axios
        .get(`${AppInfo.apiUrl}${url}`)
        .then((response) => {
          Assist.log(
            `Response completed for loading ${title} from server with status ${response.status}`
          );

          if (response.status !== 200) {
            reject(`Unable to load ${title}. Error code ${response.status}`);
          } else {
            resolve(response.data);
          }
        })
        .catch((err) => {
          Assist.log(
            `An error occured when loading ${title} from server: ${JSON.stringify(
              err
            )}`
          );

          //user friendly message
          let message = `Unable to load ${title} `;

          //check for response
          if (err.response != null) {
            //check if error 404
            if ((err.response.status = 404)) {
              //add detail
              message += `: ${err.response.data.detail}`;
            }
          } else {
            //no response object
            message += ": Please try again";
          }
          reject(message);
        });
    });
  }

  /**
   * Post or puts the data at the specified url
   * @param title
   * @param url
   * @param postData
   * @param id
   * @returns Promise
   */
  static async postPutData(
    title: string,
    url: string,
    postData: any,
    id: Number
  ) {
    const method = id == 0 ? "post" : "put";
    const verb = id == 0 ? "post" : "put";

    Assist.log(
      `Starting to delete ${title} with id {key} from server using url ${
        AppInfo.apiUrl + url
      }`,
      "log"
    );

    return new Promise(function (myResolve, myReject) {
      axios({
        method: method,
        url: `${AppInfo.apiUrl}${url}`,
        data: postData,
      })
        .then((response) => {
          Assist.log(
            `Response completed when performing ${method} for ${title} from server with status ${response.status}`
          );

          if (response.status !== 200) {
            myReject(
              `Unable to ${verb} ${title}. Error code ${response.status}`
            );
          } else {
            myResolve(response.data);
          }
        })
        .catch((err) => {
          Assist.log(
            `An error occured when performing ${method} for ${title} from server`
          );

          //user friendly message
          let message = `Unable to ${title} `;

          //check for response
          if (err.response != null) {
            //check if error is present
            if (Array.isArray(err.response.data.detail)) {
              const field = err.response.data.detail[0].loc[1];
              message += `: ${err.response.data.detail[0].msg} ${field}`;
            } else {
              //add detail
              message += `: ${err.response.data.detail}`;
            }
          } else {
            //no response object
            message += ": Please try again";
          }

          myReject(message);
        });
    });
  }

  /**Deletes the specified item
   * @param {string} title The tile of the item being deleted
   * @param {string} key The id of the record to delete
   * @param {string} url The url used for the post method
   * @returns TaskResult
   */
  static async deleteItem(title: string, url: string, key: string) {
    Assist.log(
      `Starting to delete ${title} with id {key} from server using url ${
        AppInfo.apiUrl + url
      }`,
      "log"
    );

    return new Promise(function (myResolve, myReject) {
      axios({
        method: "post",
        url: AppInfo.apiUrl + url,
        data: { uid: key },
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
        .then((response) => {
          Assist.log(
            `Response has completed for deleting ${title} from server`
          );

          if (typeof response.data == "string") {
            Assist.log(
              `Unable to process response for deleting ${title} from server: ${JSON.stringify(
                response
              )}`
            );

            myReject(
              new TaskResult(
                false,
                "Unable to process server response from server",
                null
              )
            );
          } else {
            if (response.data.succeeded) {
              myResolve(new TaskResult(true, "", response.data.items));
            } else {
              Assist.log(
                `Unable to delete ${title} from server: ${response.data.message}`
              );
              myReject(new TaskResult(false, response.data.message, null));
            }
          }
        })
        .catch((error) => {
          Assist.log(
            `An error occured when deleting ${title} from server: ${JSON.stringify(
              error
            )}`
          );
          myReject(
            new TaskResult(
              false,
              `An error occured when deleting ${title} from server`,
              null
            )
          );
        });
    });
  }

  static async downloadJson(filename: string, jsonData: string) {
    const url = "downloadJson";

    Assist.log(
      `Starting to download JSON with filename ${filename} and except ${jsonData.substring(
        0,
        10
      )} from server using url ${AppInfo.apiUrl + url}`,
      "log"
    );

    return new Promise(function (myResolve, myReject) {
      axios({
        method: "post",
        url: AppInfo.apiUrl + url,
        data: { ufilename: filename, ujson: jsonData },
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        responseType: "blob",
      })
        .then((response) => {
          // create file link in browser's memory
          const href = URL.createObjectURL(response.data);

          // create "a" HTML element with href to file & click
          const link = document.createElement("a");
          link.href = href;
          link.setAttribute("download", `${filename}.csv`); //or any other extension
          document.body.appendChild(link);
          link.click();

          // clean up "a" element & remove ObjectURL
          document.body.removeChild(link);
          URL.revokeObjectURL(href);
        })
        .catch((error) => {
          Assist.log(
            `An error occured when downloading JSON with filename ${filename} and except ${jsonData.substring(
              0,
              10
            )} from server: ${JSON.stringify(error)}`
          );
          myReject(
            new TaskResult(
              false,
              `An error occured when downloading the file`,
              null
            )
          );
        });
    });
  }
  /**Logs the login for the specified user
   * @param {string} username The username of the user
   * @param {string} source The source of the login
   * @returns TaskResult
   */
  static async addLogin(username: string, source: string) {
    const url = "login/update";

    Assist.log(
      `Starting to login ${username} with source ${source} from server using url ${
        AppInfo.apiUrl + url
      }`,
      "log"
    );

    return new Promise(function (myResolve, myReject) {
      axios({
        method: "post",
        url: AppInfo.apiUrl + url,
        data: { uid: 0, uusername: username, usource: source },
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
        .then((response) => {
          Assist.log(
            `Response has completed for logging login for ${username} from server`
          );

          if (typeof response.data == "string") {
            Assist.log(
              `Unable to process response for logging login ${username} from server: ${JSON.stringify(
                response
              )}`
            );

            myReject(
              new TaskResult(
                false,
                "Unable to process server response from server",
                null
              )
            );
          } else {
            if (response.data.succeeded) {
              myResolve(
                new TaskResult(
                  true,
                  `Successfully logged the login event for ${username}`,
                  response.data.items
                )
              );
            } else {
              Assist.log(
                `Unable to log login for ${username} from server: ${response.data.message}`
              );
              myReject(new TaskResult(false, response.data.message, null));
            }
          }
        })
        .catch((error) => {
          Assist.log(
            `An error occured when logging login for ${username} from server: ${JSON.stringify(
              error
            )}`
          );
          myReject(
            new TaskResult(
              false,
              `An error occured when logging login for ${username} from server`,
              null
            )
          );
        });
    });
  }

  /**Adds the specified audit action in the database
   * @param {string} title The title of the audit
   * @param {string} action The action of the log
   * @param {string} description The description of the log
   * @param {string} exception The exception of the log
   * @returns TaskResult
   */
  static async addAudit(
    username: string,
    title: string,
    action: string,
    description: string
  ) {
    const url = "audit/update";

    Assist.log(
      `Starting to audit ${title} with from server using url ${
        AppInfo.apiUrl + url
      }`,
      "log"
    );

    return new Promise(function (myResolve, myReject) {
      axios({
        method: "post",
        url: AppInfo.apiUrl + url,
        data: {
          uid: 0,
          uusername: username,
          utitle: title,
          uaction: action,
          udescription: description,
        },
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
        .then((response) => {
          Assist.log(`Response has completed for audit ${title} from server`);

          if (typeof response.data == "string") {
            Assist.log(
              `Unable to process response for audit ${title} from server: ${JSON.stringify(
                response
              )}`
            );

            myReject(
              new TaskResult(
                false,
                "Unable to process server response from server",
                null
              )
            );
          } else {
            if (response.data.succeeded) {
              myResolve(
                new TaskResult(
                  true,
                  `Successfully added the audit for ${title}`,
                  response.data.items
                )
              );
            } else {
              Assist.log(
                `Unable to audit ${title} from server: ${response.data.message}`
              );
              myReject(new TaskResult(false, response.data.message, null));
            }
          }
        })
        .catch((error) => {
          Assist.log(
            `An error occured when auditing ${title} from server: ${JSON.stringify(
              error
            )}`
          );
          myReject(
            new TaskResult(
              false,
              `An error occured when auditting ${title} from server`,
              null
            )
          );
        });
    });
  }

  /**Logs the specified action in the database
   * @param {string} title The title of the log
   * @param {string} action The action of the log
   * @param {string} description The description of the log
   * @param {string} exception The exception of the log
   * @returns TaskResult
   */
  static async addLog(
    username: string,
    title: string,
    action: string,
    description: string,
    exception: string
  ) {
    const url = "log/update";

    Assist.log(
      `Starting to log ${title} with from server using url ${
        AppInfo.apiUrl + url
      }`,
      "log"
    );

    return new Promise(function (myResolve, myReject) {
      axios({
        method: "post",
        url: AppInfo.apiUrl + url,
        data: {
          uid: 0,
          uusername: username,
          utitle: title,
          uaction: action,
          udescription: description,
          uexception: exception === null ? "" : JSON.stringify(exception),
        },
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
        .then((response) => {
          Assist.log(`Response has completed for log ${title} from server`);

          if (typeof response.data == "string") {
            Assist.log(
              `Unable to process response for log ${title} from server: ${JSON.stringify(
                response
              )}`
            );

            myReject(
              new TaskResult(
                false,
                "Unable to process server response from server",
                null
              )
            );
          } else {
            if (response.data.succeeded) {
              myResolve(new TaskResult(true, "", response.data.items));
            } else {
              Assist.log(
                `Unable to log ${title} from server: ${response.data.message}`
              );
              myReject(new TaskResult(false, response.data.message, null));
            }
          }
        })
        .catch((error) => {
          Assist.log(
            `An error occured when logging ${title} from server: ${JSON.stringify(
              error
            )}`
          );
          myReject(
            new TaskResult(
              false,
              `An error occured when logging ${title} from server`,
              null
            )
          );
        });
    });
  }

  static processFileUpload(e: any) {
    let result = new TaskResult(false, "", null);

    if (e.request.status === 200) {
      try {
        const res = JSON.parse(e.request.response);

        console.log("runq", res);

        if (res === null) {
          Assist.showMessage(
            `The response from the server is invalid. Please try again`,
            "error"
          );
        } else {
          if (res.Succeeded) {
            result = new TaskResult(
              true,
              "",
              `${AppInfo.fileServer}${res.Data}`
            );
          } else {
            Assist.showMessage(res.Message, "error");
          }
        }
      } catch (x) {
        Assist.showMessage(
          `Unable to process response from server. Please try again`,
          "error"
        );
      }
    } else {
      Assist.showMessage(
        `Unable to upload thumbnail image. Please try again`,
        "error"
      );
    }

    return result;
  }
}

export default Assist;
