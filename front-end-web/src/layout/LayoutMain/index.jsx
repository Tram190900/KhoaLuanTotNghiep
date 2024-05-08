import clsx from "clsx";
import React, { useContext } from "react";
import style from "./layoutMain.module.scss";
import { Outlet, useLocation } from "react-router-dom";
import PrimarySearchAppBar from "../../components/AppBar/PrimarySearchAppBar";
import { MenuContext } from "../../App";

export default function LayoutMain() {
  const menu = useContext(MenuContext);
  const location = useLocation();
  return (
    <div className={clsx(style.LayoutMain)}>
      <div className={clsx(style.bar)}>
        <PrimarySearchAppBar />
      </div>
      <div className={clsx(style.wrap)}>
        <div
          className={clsx(
            style.screenContainer,
            menu.isPhone ? style.none : ""
          )}
        >
          {location.pathname === "/" ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
              }}
            >
              <h2 style={{ fontWeight: "bold" }}>
                Chào mừng bạn đến với trang web quản lý của trường!
              </h2>
              <div>
                <h3 style={{ fontWeight: "bold" }}>Lưu ý</h3>
                <ul>
                  <li>
                    Sau khi chọn khoa, bạn sẽ được chuyển hướng đến trang
                    web/phần nội dung dành riêng cho khoa đó.
                  </li>
                  <li>
                    Nếu bạn không chắc chắn về khoa của mình, vui lòng liên hệ
                    với bộ phận hỗ trợ để được trợ giúp.
                  </li>
                </ul>
              </div>
              <img
                style={{
                  width: !menu.isPhone ? "40%" : "70%",
                  height: !menu.isPhone ? "60%" : "30%",
                }}
                alt=""
                src={require("../../assets/illustrations/illustration_dashboard.png")}
              />
            </div>
          ) : (
            <Outlet />
          )}
        </div>
      </div>
    </div>
  );
}
