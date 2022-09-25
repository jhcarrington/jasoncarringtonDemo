import React from "react";
import { Link } from "react-router-dom";
import { Routes } from "../../models/models";
import "./index.css";

export default class SideBar extends React.Component {
  render() {
    return (
      <div className="side-bar">
        <div>
          <div className="menu">Projects</div>
          <div>
            <Link style={{ textDecorationLine: "none" }} to={Routes.HOME}>
              <div className="submenu">Dashboard</div>
            </Link>
          </div>
          <div>
            <Link
              style={{ textDecorationLine: "none" }}
              to={Routes.TASC_MPX_DEV}
            >
              <div className="submenu">TASC / MPX Dev Group</div>
            </Link>
          </div>
          <div>
            <Link style={{ textDecorationLine: "none" }} to={Routes.ULINE}>
              <div className="submenu">Uline</div>
            </Link>
          </div>
          <div>
            <Link style={{ textDecorationLine: "none" }} to={Routes.MOSAIC}>
              <div className="submenu">Mosaic</div>
            </Link>
          </div>
          <div>
            <Link style={{ textDecorationLine: "none" }} to={Routes.GRAPHICS}>
              <div className="submenu">Graphics Town</div>
            </Link>
          </div>
          <div>
            <Link style={{ textDecorationLine: "none" }} to={Routes.DATAMATCH}>
              <div className="submenu">Datamatch</div>
            </Link>
          </div>
          <div>
            <Link style={{ textDecorationLine: "none" }} to={Routes.SMILEMAIL}>
              <div className="submenu">Smilemail</div>
            </Link>
          </div>
        </div>
        <div>
          <div className="menu">Myself</div>
          <div>
            <Link style={{ textDecorationLine: "none" }} to={Routes.ABOUT}>
              <div className="submenu">About</div>
            </Link>
          </div>
          <div>
            <Link style={{ textDecorationLine: "none" }} to={Routes.BIRDWELL}>
              <div className="submenu">Birdwell</div>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
