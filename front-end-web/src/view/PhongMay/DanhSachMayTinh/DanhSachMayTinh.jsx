import React, { useEffect, useState } from "react";
import clsx from "clsx";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Grid from "@mui/material/Unstable_Grid2";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Tooltip from "@mui/material/Tooltip";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import ListItemIcon from "@mui/material/ListItemIcon";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, IconButton, MenuItem, Paper, Select } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { getAPI } from "../../../api";
import style from "./danhSachMayTinh.module.scss";

const DanhSachMayTinh = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const phongMay_id = location.state.phongMay_id;
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const checkHoatDong = (mayTinh) => {
    return mayTinh.trangThai === 1;
  };

  const checkSua = (mayTinh) => {
    return mayTinh.trangThai === 2;
  };

  const checkHong = (mayTinh) => {
    return mayTinh.trangThai === 3;
  };

  const [dsMayTinh, setDsMayTinh] = useState([]);
  const [dsMayTinhHoatDong, setDanhSachMayTinhHoatDong] = useState([]);

  const xemDanhSachMayTinh = async () => {
    const result = await getAPI(`/maytinh/${location.state.soPhong}`);
    if (result.status === 200) {
      setDsMayTinh(result.data);
    }
  };

  useEffect(() => {
    xemDanhSachMayTinh();
  }, []);

  const ghiTrangThai = (mayTinh) => {
    if (mayTinh.trangThai === 1) return "Hoạt động";
    else if (mayTinh.trangThai === 2) return "Bảo trì";
    else return "Hỏng";
  };

  const dsHoatDong = dsMayTinh.filter(checkHoatDong);
  const dsSua = dsMayTinh.filter(checkSua);
  const dsHong = dsMayTinh.filter(checkHong);

  return (
    <div>
      <h4>Quản lý phòng máy</h4>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/quan-ly-phong-may">
          Quản lý phòng máy
        </Link>
        <Link underline="hover" color="inherit" href="/quan-ly-phong-may">
          Tòa nhà
        </Link>
        <Link
          onClick={() => {
            navigate("/quan-ly-phong-may/danhsachphongmay", {
              state: {
                toaNha_id: location.state.toaNha_id,
                tenToaNha: location.state.toaNha,
              },
            });
          }}
          underline="hover"
          color="inherit"
        >
          {location.state.toaNha}
        </Link>
        <Typography color="text.primary">{location.state.soPhong}</Typography>
      </Breadcrumbs>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Tất cả" value="1" />
              <Tab label="Đang hoạt động" value="2" />
              <Tab label="Đang sửa" value="3" />
              <Tab label="Hỏng" value="4" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              {dsMayTinh.map((mayTinh) => (
                <div className={clsx(style.wrapMayTinh)}>
                  <button
                    onClick={() => {
                      navigate("/quan-ly-phong-may/thongtinmaytinh", {
                        state: {
                          mayTinh: mayTinh,
                        },
                      });
                    }}
                    className={clsx(
                      style.button,
                      mayTinh.trangThai === 1 && style.buttonHoatDong,
                      mayTinh.trangThai === 2 && style.buttonSua,
                      mayTinh.trangThai === 3 && style.buttonHong
                    )}
                  >
                    {mayTinh.soMay}
                  </button>
                  <div className={clsx(style.mayTinhInfo)}>
                    <p>Tên máy: {mayTinh.soMay}</p>
                    <p>Trạng thái: {ghiTrangThai(mayTinh)}</p>
                    <p>Phòng: {mayTinh.phongMay.soPhong}</p>
                  </div>
                </div>
              ))}
            </Grid>
          </TabPanel>
          <TabPanel value="2">
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              {dsHoatDong.map((mayTinh) => (
                <div className={clsx(style.wrapMayTinh)}>
                  <button
                    onClick={() => {
                      navigate("/quan-ly-phong-may/thongtinmaytinh", {
                        state: {
                          mayTinh: mayTinh,
                        },
                      });
                    }}
                    className={clsx(style.button, style.buttonHoatDong)}
                  >
                    {mayTinh.soMay}
                  </button>
                  <div className={clsx(style.mayTinhInfo)}>
                    <p>Tên máy: {mayTinh.soMay}</p>
                    <p>Trạng thái: {ghiTrangThai(mayTinh)}</p>
                    <p>Phòng: {mayTinh.phongMay.soPhong}</p>
                  </div>
                </div>
              ))}
            </Grid>
          </TabPanel>
          <TabPanel value="3">
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              {dsSua.map((mayTinh) => (
                <div className={clsx(style.wrapMayTinh, style.buttonSua)}>
                  <button
                    onClick={() => {
                      navigate("/quan-ly-phong-may/thongtinmaytinh", {
                        state: {
                          mayTinh: mayTinh,
                        },
                      });
                    }}
                    className={clsx(style.button, style.buttonSua)}
                  >
                    {mayTinh.soMay}
                  </button>
                  <div className={clsx(style.mayTinhInfo)}>
                    <p>Tên máy: {mayTinh.soMay}</p>
                    <p>Trạng thái: {ghiTrangThai(mayTinh)}</p>
                    <p>Phòng: {mayTinh.phongMay.soPhong}</p>
                  </div>
                </div>
              ))}
            </Grid>
          </TabPanel>
          <TabPanel value="4">
          <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              {dsHong.map((mayTinh) => (
                <div className={clsx(style.wrapMayTinh)}>
                  <button
                    onClick={() => {
                      navigate("/quan-ly-phong-may/thongtinmaytinh", {
                        state: {
                          mayTinh: mayTinh,
                        },
                      });
                    }}
                    className={clsx(style.button, style.buttonHong)}
                  >
                    {mayTinh.soMay}
                  </button>
                  <div className={clsx(style.mayTinhInfo)}>
                    <p>Tên máy: {mayTinh.soMay}</p>
                    <p>Trạng thái: {ghiTrangThai(mayTinh)}</p>
                    <p>Phòng: {mayTinh.phongMay.soPhong}</p>
                  </div>
                </div>
              ))}
            </Grid>
          </TabPanel>
        </TabContext>
        <Box
          sx={{ border: "2px solid grey", padding: "10px" }}
          className={clsx(style.chuThich)}
        >
          <div>
            <div className={clsx(style.item, style.hoatDong)}></div> Máy hoạt
            động
          </div>
          <div>
            <div className={clsx(style.item, style.dangSua)}></div> Máy đang bảo
            trì
          </div>
          <div>
            <div className={clsx(style.item, style.hong)}></div> Máy hỏng
          </div>
        </Box>
      </Box>
    </div>
  );
};

export default DanhSachMayTinh;
