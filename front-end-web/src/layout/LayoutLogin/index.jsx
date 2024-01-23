import React from "react";
import style from "./layoutMain.module.scss";
import { Outlet } from "react-router-dom";

export default function LayoutMain() {
  return (
    <div className={style.mainWrap}>
      <Outlet/>
    </div>
  );
}
