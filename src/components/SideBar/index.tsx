import React from "react";
import { Link } from "react-router-dom";
import { Routes } from "../../Types";
import { Images } from "../../utils";
import "./index.css";

export default class SideBar extends React.Component {
  render() {
    return (
      <div className="side-bar">
        <div>
          Projects
          <div>
            <Link style={{ textDecorationLine: "none" }} to={Routes.HOME}>
              Dashboard
            </Link>
          </div>
          <div>
            <Link
              style={{ textDecorationLine: "none" }}
              to={Routes.TASC_MPX_DEV}
            >
              <img
                src={Images.TASC}
                style={{ objectFit: "contain", width: "5vw" }}
              ></img>

              <img
                src={Images.MPX}
                style={{ objectFit: "contain", width: "5vw" }}
              ></img>
            </Link>
          </div>
          <div>
            <Link style={{ textDecorationLine: "none" }} to={Routes.ULINE}>
              <img
                src={Images.ULINE}
                style={{ objectFit: "contain", width: "5vw" }}
              ></img>
            </Link>
          </div>
          <div>
            <Link style={{ textDecorationLine: "none" }} to={Routes.MOSAIC}>
              <img
                src={Images.MOSAIC}
                style={{ objectFit: "contain", width: "5vw" }}
              ></img>
            </Link>
          </div>
          <div>
            <Link style={{ textDecorationLine: "none" }} to={Routes.GRAPHICS}>
              Graphics Town
            </Link>
          </div>
          <div>
            <Link style={{ textDecorationLine: "none" }} to={Routes.DATAMATCH}>
              <img
                src={Images.DATAMATCH}
                style={{ objectFit: "contain", width: "5vw" }}
              ></img>
            </Link>
          </div>
          <div>
            <Link style={{ textDecorationLine: "none" }} to={Routes.SMILEMAIL}>
              <img
                src={Images.SMILEMAIL}
                style={{ objectFit: "contain", width: "5vw" }}
              ></img>
            </Link>
          </div>
        </div>
        <div>
          Myself
          <div>
            <Link style={{ textDecorationLine: "none" }} to={Routes.ABOUT}>
              <img
                src={Images.JASON}
                style={{ objectFit: "contain", width: "5vw" }}
              ></img>
            </Link>
          </div>
          <div>
            <Link style={{ textDecorationLine: "none" }} to={Routes.BIRDWELL}>
              <img
                src={Images.BIRDWELL}
                style={{ objectFit: "contain", width: "5vw" }}
              ></img>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
