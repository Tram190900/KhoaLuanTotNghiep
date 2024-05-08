import React, { useContext, useEffect, useState } from "react";
import { getAPI } from "../../api";
import Card from "@mui/material/Card";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { MenuContext } from "../../App";
import { Link, useNavigate } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import CardContent from "@mui/material/CardContent";
import clsx from "clsx";
import style from "./phongMay.module.scss";

export default function PhongMay(props) {
  const [dsToaNha, setDsToaNha] = useState([]);
  const menu = useContext(MenuContext);

  const xemDanhSachToaNha = async () => {
    const result = await getAPI("/toanha");
    if (result.status === 200) {
      setDsToaNha(result.data);
    }
  };

  useEffect(() => {
    xemDanhSachToaNha();
  }, []);
  const navigate = useNavigate();

  return (
    <div className="p-3">
      <h1>Quản lý phòng máy</h1>
      <Breadcrumbs
        aria-label="breadcrumb"
        onClick={() => menu.setMenuActive("phong-may")}
      >
        <Link underline="hover" color="inherit" href="/cong-nghe-thong-tin">
          Quản lý phòng máy
        </Link>
        <Typography color="text.primary">Tòa nhà</Typography>
      </Breadcrumbs>
      {dsToaNha.map((toaNha) => (
        <Tooltip title="Double Click để xem chi tiết">
          <Button
            className={clsx(style.button)}
            onDoubleClick={() => {
              navigate("/cong-nghe-thong-tin/danh-sach-phong-may", {
                state: {
                  toaNha_id: toaNha.id,
                  tenToaNha: toaNha.tenToaNha,
                },
              });
            }}
          >
            <Card sx={{ width: "100%" }}>
              <CardContent>
                {/* <BusinessIcon className={clsx(style.businessIcon)}/> */}
                <div>
                  <img 
                    src={require("../../assets/icon/building-icon.jpg")}
                    alt=""
                    className={clsx(style.buildingIcon)}
                  />
                </div>
                <Typography
                  sx={{ fontSize: 14, textTransform:"capitalize"}}
                  color="text.secondary"
                  gutterBottom
                >
                  <b>{toaNha.tenToaNha}</b>
                </Typography>
              </CardContent>
            </Card>
          </Button>
        </Tooltip>
      ))}
    </div>
  );
}
