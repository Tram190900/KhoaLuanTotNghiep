import clsx from "clsx";
import React, { useContext } from "react";
import style from "./layoutMain.module.scss";
import Menu from "../../components/Menu";
import { Outlet } from "react-router-dom";
import PrimarySearchAppBar from "../../components/AppBar/PrimarySearchAppBar";
import { MenuContext } from "../../App";

export default function LayoutMain() {
  const menu = useContext(MenuContext);
  return (
    <div className={clsx(style.LayoutMain)}>
      <div className={clsx(style.bar)}>
        <PrimarySearchAppBar/>
      </div>
      <div className={clsx(style.wrap)}>
        {/* <div className={clsx(style.menuContainer, menu.isPhone ? style.none : "" )}>
          <Menu />
        </div> */}
        <div className={clsx(style.screenContainer , menu.isPhone ? style.none : "" )}>
          <Outlet></Outlet>
        </div>
      </div>
      {/* <div className={clsx(style.tab)}>
        Phần mềm quản lý thiết bị, phần mềm phòng máy trường DHCN (Nhóm 6 - Mã
        Vũ Tố Trâm / Đoàn Công Tuấn Tú)
      </div> */}
    </div>
  );
}
