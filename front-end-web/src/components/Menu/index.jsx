import clsx from "clsx";
import React, { useContext, useState } from "react";
import style from "./menu.module.scss";
import ComputerIcon from "@mui/icons-material/Computer";
import DevicesOtherIcon from "@mui/icons-material/DevicesOther";
import TerminalIcon from "@mui/icons-material/Terminal";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import RoomPreferencesIcon from "@mui/icons-material/RoomPreferences";
import LogoutIcon from "@mui/icons-material/Logout";
import { MenuContext } from "../../App";
import { useNavigate } from "react-router-dom";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Link } from "@mui/joy";

export default function Menu() {
  const menu = useContext(MenuContext);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const navigate = useNavigate();
  return (
    <div className={clsx(style.menu)}>
      <div
        onClick={() => {
          menu.setMenuActive("phong-may");
          navigate("/quan-ly-phong-may");
        }}
        className={clsx(
          style.menuItem,
          menu.menuActive === "phong-may" ? style.active : ""
        )}
      >
        <RoomPreferencesIcon sx={{ fontSize: 40, margin: "0 5%" }} />
        Quản lý phòng máy
      </div>
      <div
        onClick={() => {
          menu.setMenuActive("may-tinh");
          navigate("may-tinh");
        }}
        className={clsx(
          style.menuItem,
          menu.menuActive === "may-tinh" ? style.active : ""
        )}
      >
        <ComputerIcon sx={{ fontSize: 40, margin: "0 5%" }} />
        Quản lý máy tính
      </div>
      {user.role === "giangvien" ? null : (
        <>
          <div
            onClick={() => {
              menu.setMenuActive("thiet-bi");
              navigate("thiet-bi");
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
              navigate("phan-mem");
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
              menu.setMenuActive("mon-hoc");
              navigate("mon-hoc");
            }}
            className={clsx(
              style.menuItem,
              menu.menuActive === "mon-hoc" ? style.active : ""
            )}
          >
            <AutoStoriesIcon sx={{ fontSize: 40, margin: "0 5%" }} />
            Quản lý môn học
          </div>
          {user.role === "admin" ? (
            <>
              <div
                onClick={() => {
                  menu.setMenuActive("nhan-vien");
                  navigate("nhan-vien");
                }}
                className={clsx(
                  style.menuItem,
                  menu.menuActive === "nhan-vien" ? style.active : ""
                )}
              >
                <PeopleOutlineIcon sx={{ fontSize: 40, margin: "0 5%" }} />
                Quản lý nhân viên - Chấm công
              </div>
            </>
          ) : (
            <div
              onClick={() => {
                menu.setMenuActive("lich-truc");
                navigate("lich-truc");
              }}
              className={clsx(
                style.menuItem,
                menu.menuActive === "lich-truc" ? style.active : ""
              )}
            >
              <CalendarMonthIcon sx={{ fontSize: 40, margin: "0 5%" }} />
              Xem lịch trực
            </div>
          )}

          <div
            onClick={() => {
              menu.setMenuActive("lich-su-sua-chua");
              navigate("lich-su-sua-chua");
            }}
            className={clsx(
              style.menuItem,
              menu.menuActive === "lich-su-sua-chua" ? style.active : ""
            )}
          >
            <ManageHistoryIcon sx={{ fontSize: 40, margin: "0 5%" }} />
            Lịch sử báo lỗi
          </div>
          <div
            onClick={() => {
              menu.setMenuActive("thong-ke");
              navigate("thong-ke");
            }}
            className={clsx(
              style.menuItem,
              menu.menuActive === "thong-ke" ? style.active : ""
            )}
          >
            <AssessmentOutlinedIcon sx={{ fontSize: 40, margin: "0 5%" }} />
            Thống kê
          </div>
        </>
      )}
      <Link className={clsx(style.logout)} href={"/login"}>
        <LogoutIcon sx={{ fontSize: 40 }} />
      </Link>
    </div>
  );
}
