import { useState } from "react";
import { Link } from "react-router-dom";
import { Routes } from "../../models/models";
import "./index.css";
import { stack as Menu } from 'react-burger-menu'
import burderMenuIcon from 'src/assets/burgerMenuIcon.svg';

export default function SideBar() {
  const [isOpen, setOpen] = useState(false);

  function linkClicked() {
    setOpen(false);
  }
  const handleStateChange = (state) => {
    setOpen(state.isOpen);
  };
  return (
    <Menu
      isOpen={isOpen}
      onStateChange={handleStateChange}
      menuClassName="burgerMenu"
      itemClassName="burgerMenuItem"
      burgerButtonClassName="burgerButton"
      styles={{
        bmOverlay: {
          top: '0',
        },
      }}
      customBurgerIcon={< img src={burderMenuIcon} />}>

      <div>
        <div>
          <Link
            onClick={linkClicked}
            style={{ textDecorationLine: "none" }} to={Routes.HOME}>
            <div className="submenu">Dashboard</div>
          </Link>
        </div>
        <div className="menu">Projects</div>
        <div>
          <Link
            onClick={linkClicked}
            style={{ textDecorationLine: "none" }}
            to={Routes.TASC_MPX_DEV}
          >
            <div className="submenu">TASC / MPX Dev Group</div>
          </Link>
        </div>
        <div>
          <Link
            onClick={linkClicked}
            style={{ textDecorationLine: "none" }}
            to={Routes.ULINE}>
            <div className="submenu">Uline</div>
          </Link>
        </div>
        <div>
          <Link
            onClick={linkClicked}
            style={{ textDecorationLine: "none" }}
            to={Routes.CAPTAIN_SERVICE}>
            <div className="submenu">Captain Service</div>
          </Link>
        </div>
        <div>
          <Link
            onClick={linkClicked}
            style={{ textDecorationLine: "none" }}
            to={Routes.MOSAIC}>
            <div className="submenu">Mosaic</div>
          </Link>
        </div>
        <div>
          <Link
            onClick={linkClicked}
            style={{ textDecorationLine: "none" }}
            to={Routes.GRAPHICS}>
            <div className="submenu">Graphics Town</div>
          </Link>
        </div>
        <div>
          <Link
            onClick={linkClicked}
            style={{ textDecorationLine: "none" }}
            to={Routes.DATAMATCH}>
            <div className="submenu">Datamatch</div>
          </Link>
        </div>
        <div>
          <Link
            onClick={linkClicked}
            style={{ textDecorationLine: "none" }}
            to={Routes.SMILEMAIL}>
            <div className="submenu">Smilemail</div>
          </Link>
        </div>
      </div>
      <div>
        <div className="menu">Myself</div>
        <div>
          <Link
            onClick={linkClicked}
            style={{ textDecorationLine: "none" }}
            to={Routes.ABOUT}>
            <div className="submenu">About</div>
          </Link>
        </div>
        <div>
          <Link
            onClick={linkClicked}
            style={{ textDecorationLine: "none" }}
            to={Routes.BIRDWELL}>
            <div className="submenu">Birdwell</div>
          </Link>
        </div>
      </div>
    </Menu >
  );

}
