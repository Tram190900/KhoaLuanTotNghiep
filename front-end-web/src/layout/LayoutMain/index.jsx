import clsx from "clsx";
import React, { useContext } from "react";
import style from "./layoutMain.module.scss";
import Menu from "../../components/Menu";
import { MenuContext } from "../../App";
import ThietBi from "../../view/ThietBi";
import PhanMem from "../../view/PhanMem";
import NhanVien from "../../view/NhanVien";
import MayTinh from "../../view/MayTinh";
import PhongMay from "../../view/PhongMay";
import MonHoc from "../../view/MonHoc";
import LichSuSuaChua from "../../view/LichSuSuaChua";

export default function LayoutMain() {
  const menu = useContext(MenuContext);
  return (
    <div className={clsx(style.LayoutMain)}>
      <div className={clsx(style.wrap)}>
        <div className={clsx(style.menuContainer)}>
          <Menu />
        </div>
        <div className={clsx(style.screenContainer)}>
          {menu.menuActive === "may-tinh" ? (
            <MayTinh/>
          ) : menu.menuActive === "thiet-bi" ? (
            <ThietBi />
          ) : menu.menuActive === "phan-mem" ? (
            <PhanMem />
          ) : menu.menuActive === "lich-su-sua-chua" ? (
            <LichSuSuaChua />
          ) : menu.menuActive === "nhan-vien" ? (
            <NhanVien />
          ) : menu.menuActive === 'phong-may' ? (
            <PhongMay menu={menu}/>
          ) : menu.menuActive === 'mon-hoc' ? (
            <MonHoc/>
          ) : null}
        </div>
      </div>
      {/* <div className={clsx(style.tab)}>
        Phần mềm quản lý thiết bị, phần mềm phòng máy trường DHCN (Nhóm 6 - Mã
        Vũ Tố Trâm / Đoàn Công Tuấn Tú)
      </div> */}
    </div>
  );
}
