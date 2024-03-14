import clsx from "clsx";
import React, { useContext, useEffect, useState } from "react";
import { getAPI } from "../../api";
import style from "./phongMay.module.scss";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Grid from "@mui/material/Unstable_Grid2";
import { Button } from "@mui/material";
import DanhSachPhongMay from "./DanhSachPhongMay/DanhSachPhongMay";
import MayTinh from "../MayTinh";
import ThietBi from "../ThietBi";
import PhanMem from "../PhanMem";
import LichSuSuaChua from "../LichSuSuaChua";
import NhanVien from "../NhanVien";
import MonHoc from "../MonHoc";
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { MenuContext } from "../../App";

export default function PhongMay(props) {
  const [dsToaNha, setDsToaNha] = useState([]);
  const menu = useContext(MenuContext)

  const xemDanhSachToaNha = async () => {
    const result = await getAPI("toanha");
    if (result.status === 200) {
      setDsToaNha(result.data);
    }
  };

  useEffect(() => {
    xemDanhSachToaNha();
  }, []);

  return (
    <div className="p-3">
      <h1>Quản lý phòng máy</h1>
      <Breadcrumbs aria-label="breadcrumb" onClick={()=>menu.setMenuActive('phong-may')}>
        <Link underline="hover" color="inherit" href="/quan-ly-phong-may">
          Quản lý phòng máy
        </Link>
        <Typography color="text.primary">Tòa nhà</Typography>
      </Breadcrumbs>
      <Grid
        mt={3}
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        {dsToaNha.map((toaNha) => (
          <Grid xs={6} height={"25"}>
            <Card variant="outlined">
              <CardContent>{toaNha.tenToaNha}</CardContent>
              <CardActions onClick={()=>menu.setMenuActive('')}>
                <Link href={"/quan-ly-phong-may/danhsachphongmay"} size="small">
                  Xem chi tiết
                </Link>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
