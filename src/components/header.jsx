import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, NavLink, useLocation } from "react-router-dom";
import AppInfo from "../classes/app-info";

export const Header = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  const toggle = (e) => {
    setShowDropdown((prev) => !prev);
    e.preventDefault();
  };

  const logoutUser = (e) => {
    logout();
    e.preventDefault();
  };
  return (
    /* start header */
    <div className="page-header navbar navbar-fixed-top">
      <div className="page-header-inner">
        {/* logo start */}
        <div className="page-logo">
          <Link to={'#'}>
            <span className="logo-icon material-icons">
              people
            </span>
            <span className="logo-default">{AppInfo.appCode}</span>
          </Link>
        </div>
        {/* logo end */}
        <ul className="nav navbar-nav navbar-left in">
          <li>
            <a
              href="https://www.einfosoft.com/templates/admin/smart/source/light/dashboard3.html#"
              className="menu-toggler sidebar-toggler"
            >
              <i className="icon-menu"></i>
            </a>
          </li>
        </ul>
        <form
          className="search-form-opened"
          action="https://www.einfosoft.com/templates/admin/smart/source/light/dashboard3.html#"
          method="GET"
        >
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
              name="query"
            />
            <span className="input-group-btn">
              <a href="#" className="btn submit">
                <i className="icon-magnifier"></i>
              </a>
            </span>
          </div>
        </form>
        {/* start mobile menu */}
        <a
          className="menu-toggler responsive-toggler"
          data-bs-toggle="collapse"
          data-bs-target=".navbar-collapse"
          onClick={toggleSidebar}
        >
          <span></span>
        </a>
        {/* end mobile menu */}
        {/* start header menu */}
        <div className="top-menu">
          <ul className="nav navbar-nav pull-right">
            <li>
              <a className="fullscreen-btn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-maximize"
                >
                  <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
                </svg>
              </a>
            </li>
            {/* start language menu */}
            <li className="dropdown language-switch">
              <a
                className="dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img src="./images/gb.png" className="position-left" alt="" />
                English
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="german">
                    <img src="./images/de.png" alt="" />
                    German
                  </a>
                </li>
                <li>
                  <a className="french">
                    <img src="./images/fr.png" alt="" />
                    French
                  </a>
                </li>
                <li>
                  <a className="english">
                    <img src="./images/gb.png" alt="" />
                    English
                  </a>
                </li>
              </ul>
            </li>
            {/* end language menu */}
            {/* start notification dropdown */}
            <li
              className="dropdown dropdown-extended dropdown-notification"
              id="header_notification_bar"
            >
              <a
                className="dropdown-toggle"
                data-bs-toggle="dropdown"
                data-hover="dropdown"
                data-close-others="true"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-bell"
                >
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                </svg>
                <span className="badge headerBadgeColor1"> 6 </span>
              </a>
              <ul className="dropdown-menu">
                <li className="external">
                  <h3>
                    <span className="bold">Notifications</span>
                  </h3>
                  <span className="notification-label purple-bgcolor">
                    New 6
                  </span>
                </li>
                <li>
                  <div
                    className="slimScrollDiv"
                    style={{
                      position: "relative",
                      overflow: "hidden",
                      width: "auto",
                    }}
                  >
                    <ul
                      className="dropdown-menu-list small-slimscroll-style"
                      data-handle-color="#637283"
                      style={{ overflow: "hidden", width: "auto" }}
                    >
                      <li>
                        <a href="#">
                          <span className="time">just now</span>
                          <span className="details">
                            <span className="notification-icon circle deepPink-bgcolor">
                              <i className="fa fa-check"></i>
                            </span>
                            Congratulations!.
                          </span>
                        </a>
                      </li>

                      <li>
                        <a href="#">
                          <span className="time">7 mins</span>
                          <span className="details">
                            <span className="notification-icon circle blue-bgcolor">
                              <i className="fa fa-comments-o"></i>
                            </span>
                            <b>Sneha Jogi </b>sent you a message.
                          </span>
                        </a>
                      </li>
                    </ul>
                    <div
                      className="slimScrollBar"
                      style={{
                        background: "rgb(158, 165, 171)",
                        width: "5px",
                        position: "absolute",
                        top: "0px",
                        opacity: "0.4",
                        display: "block",
                        borderRadius: "7px",
                        zIndex: "99",
                        right: "1px",
                      }}
                    ></div>
                    <div
                      className="slimScrollRail"
                      style={{
                        width: "5px",
                        height: "100%",
                        position: "absolute",
                        top: "0px",
                        display: "none",
                        borderRadius: "7px",
                        background: "rgb(51, 51, 51)",
                        opacity: "0.2",
                        zIndex: "90",
                        right: "1px",
                      }}
                    ></div>
                  </div>
                  <div className="dropdown-menu-footer">
                    <a href="#"> All notifications </a>
                  </div>
                </li>
              </ul>
            </li>
            {/* end notification dropdown */}
            {/* start message dropdown */}
            <li
              className="dropdown dropdown-extended dropdown-inbox"
              id="header_inbox_bar"
            >
              <a
                className="dropdown-toggle"
                data-bs-toggle="dropdown"
                data-hover="dropdown"
                data-close-others="true"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-mail"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <span className="badge headerBadgeColor2"> 2 </span>
              </a>
              <ul className="dropdown-menu">
                <li className="external">
                  <h3>
                    <span className="bold">Messages</span>
                  </h3>
                  <span className="notification-label cyan-bgcolor">New 2</span>
                </li>
                <li>
                  <div
                    className="slimScrollDiv"
                    style={{
                      position: "relative",
                      overflow: "hidden",
                      width: "auto",
                    }}
                  >
                    <ul
                      className="dropdown-menu-list small-slimscroll-style"
                      data-handle-color="#637283"
                      style={{ overflow: "hidden", width: "auto" }}
                    >
                      <li>
                        <a href="https://www.einfosoft.com/templates/admin/smart/source/light/dashboard3.html#">
                          <span className="photo">
                            <img
                              src="./images/user2.jpg"
                              className="img-circle"
                              alt=""
                            />
                          </span>
                          <span className="subject">
                            <span className="from"> Sarah Smith </span>
                            <span className="time">Just Now </span>
                          </span>
                          <span className="message">
                            Jatin I found you on LinkedIn...
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="https://www.einfosoft.com/templates/admin/smart/source/light/dashboard3.html#">
                          <span className="photo">
                            <img
                              src="./images/user3.jpg"
                              className="img-circle"
                              alt=""
                            />
                          </span>
                          <span className="subject">
                            <span className="from"> John Deo </span>
                            <span className="time">16 mins </span>
                          </span>
                          <span className="message">
                            Fwd: Important Notice Regarding Your Domain Name...
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="https://www.einfosoft.com/templates/admin/smart/source/light/dashboard3.html#">
                          <span className="photo">
                            <img
                              src="./images/user1.jpg"
                              className="img-circle"
                              alt=""
                            />
                          </span>
                          <span className="subject">
                            <span className="from"> Rajesh </span>
                            <span className="time">2 hrs </span>
                          </span>
                          <span className="message">
                            pls take a print of attachments.
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="https://www.einfosoft.com/templates/admin/smart/source/light/dashboard3.html#">
                          <span className="photo">
                            <img
                              src="./images/user8.jpg"
                              className="img-circle"
                              alt=""
                            />
                          </span>
                          <span className="subject">
                            <span className="from"> Lina Smith </span>
                            <span className="time">40 mins </span>
                          </span>
                          <span className="message">
                            Apply for Ortho Surgeon
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="https://www.einfosoft.com/templates/admin/smart/source/light/dashboard3.html#">
                          <span className="photo">
                            <img
                              src="./images/user5.jpg"
                              className="img-circle"
                              alt=""
                            />
                          </span>
                          <span className="subject">
                            <span className="from"> Jacob Ryan </span>
                            <span className="time">46 mins </span>
                          </span>
                          <span className="message">
                            Request for leave application.
                          </span>
                        </a>
                      </li>
                    </ul>
                    <div
                      className="slimScrollBar"
                      style={{
                        background: "rgb(158, 165, 171)",
                        width: "5px",
                        position: "absolute",
                        top: "0px",
                        opacity: "0.4",
                        display: "block",
                        borderRadius: "7px",
                        zIndex: "99",
                        right: "1px",
                      }}
                    ></div>
                    <div
                      className="slimScrollRail"
                      style={{
                        width: "5px",
                        height: "100%",
                        position: "absolute",
                        top: "0px",
                        display: "none",
                        borderRadius: "7px",
                        background: "rgb(51, 51, 51)",
                        opacity: "0.2",
                        zIndex: "90",
                        right: "1px",
                      }}
                    ></div>
                  </div>
                  <div className="dropdown-menu-footer">
                    <a href="https://www.einfosoft.com/templates/admin/smart/source/light/dashboard3.html#">
                      All Messages
                    </a>
                  </div>
                </li>
              </ul>
            </li>
            {/* end message dropdown */}
            {/* start manage user dropdown */}
            <li className="dropdown dropdown-user">
              <a
                className="dropdown-toggle"
                data-bs-toggle="dropdown"
                data-hover="dropdown"
                data-close-others="true"
                onClick={toggle}
              >
                <img alt="" className="img-circle" src="./images/dp.jpg" />
                <span className="username username-hide-on-mobile">
                  {user.name}
                </span>
              </a>
              <ul
                className={`dropdown-menu dropdown-menu-default ${
                  showDropdown ? "show" : ""
                }`}
              >
                <li>
                  <a href="https://www.einfosoft.com/templates/admin/smart/source/light/user_profile.html">
                    <i className="icon-user"></i> Profile
                  </a>
                </li>
                <li>
                  <a href="https://www.einfosoft.com/templates/admin/smart/source/light/dashboard3.html#">
                    <i className="icon-settings"></i> Settings
                  </a>
                </li>
                <li>
                  <a href="https://www.einfosoft.com/templates/admin/smart/source/light/dashboard3.html#">
                    <i className="icon-directions"></i> Help
                  </a>
                </li>
                <li className="divider"></li>
                <li>
                  <a href="https://www.einfosoft.com/templates/admin/smart/source/light/lock_screen.html">
                    <i className="icon-lock"></i> Lock
                  </a>
                </li>
                <li>
                  <a
                    onClick={logoutUser}
                  >
                    <i className="icon-logout"></i> Log Out
                  </a>
                </li>
              </ul>
            </li>
            {/* end manage user dropdown */}
            <li className="dropdown dropdown-quick-sidebar-toggler">
              <a
                id="headerSettingButton"
                className="mdl-button mdl-js-button mdl-button--icon pull-right"
                data-upgraded=",MaterialButton"
              >
                <i className="material-icons">more_vert</i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
