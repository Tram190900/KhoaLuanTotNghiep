import clsx from "clsx";
import React, { useContext } from "react";
import style from "./layoutMain.module.scss";
import Menu from "../../components/Menu";
import { MenuContext } from "../../App";
import PhongMay from "../../view/PhongMay";
import ThietBi from "../../view/ThietBi";
import PhanMem from "../../view/PhanMem";
import LichSu from "../../view/LichSu";
import NhanVien from "../../view/NhanVien";

export default function LayoutMain() {
  const menu = useContext(MenuContext);
  return (
    <div className={clsx(style.LayoutMain)}>
      <div className={clsx(style.wrap)}>
        <div className={clsx(style.menuContainer)}>
          <Menu />
        </div>
        <div className={clsx(style.screenContainer)}>
          {menu.menuActive === "phong-may" ? (
            <PhongMay />
          ) : menu.menuActive === "thiet-bi" ? (
            <ThietBi />
          ) : menu.menuActive === "phan-mem" ? (
            <PhanMem />
          ) : menu.menuActive === "lich-su" ? (
            <LichSu />
          ) : menu.menuActive === "nhan-vien" ? (
            <NhanVien />
          ) : null}
        </div>
      </div>
      <div className={clsx(style.tab)}>
        Phần mềm quản lý thiết bị, phần mềm phòng máy trường DHCN (Nhóm 6 - Mã
        Vũ Tố Trâm / Đoàn Công Tuấn Tú)
      </div>
    </div>
  );
}
