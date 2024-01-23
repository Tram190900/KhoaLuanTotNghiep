import clsx from "clsx";
import React, { useContext } from "react";
import style from "./menu.module.scss";
import ComputerIcon from "@mui/icons-material/Computer";
import DevicesOtherIcon from "@mui/icons-material/DevicesOther";
import TerminalIcon from "@mui/icons-material/Terminal";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import { MenuContext } from "../../App";
import { useNavigate } from "react-router-dom";

export default function Menu() {
  const menu = useContext(MenuContext);
  const navigate = useNavigate()
  return (
    <div className={clsx(style.menu)}>
      <div
        onClick={() => {
          menu.setMenuActive("phong-may");
        }}
        className={clsx(
          style.menuItem,
          menu.menuActive === "phong-may" ? style.active : ""
        )}
      >
        <ComputerIcon sx={{ fontSize: 40, margin: "0 5%" }} />
        Quản lý phòng máy
      </div>
      <div
        onClick={() => {
          menu.setMenuActive("thiet-bi");
        }}
        className={clsx(
          style.menuItem,
          menu.menuActive === "thiet-bi" ? style.active : ""
        )}
      >
        <DevicesOtherIcon sx={{ fontSize: 40, margin: "0 5%" }} />
        Quản lý thiết bị
      </div>
      <div
        onClick={() => {
          menu.setMenuActive("phan-mem");
        }}
        className={clsx(
          style.menuItem,
          menu.menuActive === "phan-mem" ? style.active : ""
        )}
      >
        <TerminalIcon sx={{ fontSize: 40, margin: "0 5%" }} />
        Quản lý phần mềm
      </div>
      <div
        onClick={() => {
          menu.setMenuActive("lich-su");
        }}
        className={clsx(
          style.menuItem,
          menu.menuActive === "lich-su" ? style.active : ""
        )}
      >
        <ManageHistoryIcon sx={{ fontSize: 40, margin: "0 5%" }} />
        Lịch sử sửa đổi
      </div>
      <div
        onClick={() => {
          menu.setMenuActive("nhan-vien");
        }}
        className={clsx(
          style.menuItem,
          menu.menuActive === "nhan-vien" ? style.active : ""
        )}
      >
        <PeopleOutlineIcon sx={{ fontSize: 40, margin: "0 5%" }} />
        Quản lý nhân viên - Chấm công
      </div>
      <div
        onClick={() => {
          navigate('/login')
        }}
        className={clsx(
          style.logout
        )}
      >
        <LogoutIcon sx={{ fontSize: 40 }}/>
      </div>
    </div>
  );
}
