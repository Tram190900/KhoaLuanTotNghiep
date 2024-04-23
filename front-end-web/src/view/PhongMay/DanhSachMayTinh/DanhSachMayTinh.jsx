import React, { useEffect, useState } from "react";
import clsx from "clsx";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { styled } from "@mui/material/styles";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import { useLocation, useNavigate } from "react-router-dom";
import { getAPI } from "../../../api";
import style from "./danhSachMayTinh.module.scss";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));

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
    <div className="p-3" style={{ position: "relative" }}>
      <h1>Quản lý phòng máy</h1>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Quản lý phòng máy
        </Link>
        <Link underline="hover" color="inherit" href="/">
          Tòa nhà
        </Link>
        <Link
          onClick={() => {
            navigate("/danhsachphongmay", {
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
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "10px",
                flexWrap: "wrap",
              }}
            >
              {dsMayTinh.map((mayTinh) => (
                <HtmlTooltip
                  title={
                    <React.Fragment>
                      <Typography color="inherit">{mayTinh.soMay}</Typography>
                      <p style={{ margin: "0" }}>
                        {"Trạng thái: "}
                        {ghiTrangThai(mayTinh)}
                      </p>
                      <p style={{ margin: "0" }}>
                        {"Phòng: "}
                        {mayTinh.phongMay.soPhong}
                      </p>
                      <i>{"Double click để xem chi tiết"}</i>
                    </React.Fragment>
                  }
                >
                  <button
                    onDoubleClick={() => {
                      navigate("/thongtinmaytinh", {
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
                </HtmlTooltip>
              ))}
            </div>
          </TabPanel>
          <TabPanel value="2">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "10px",
                flexWrap: "wrap",
              }}
            >
              {dsHoatDong.map((mayTinh) => (
                <HtmlTooltip
                  title={
                    <React.Fragment>
                      <Typography color="inherit">{mayTinh.soMay}</Typography>
                      <p style={{ margin: "0" }}>
                        {"Trạng thái: "}
                        {ghiTrangThai(mayTinh)}
                      </p>
                      <p style={{ margin: "0" }}>
                        {"Phòng: "}
                        {mayTinh.phongMay.soPhong}
                      </p>
                      <i>{"Double click để xem chi tiết"}</i>
                    </React.Fragment>
                  }
                >
                  <button
                    onDoubleClick={() => {
                      navigate("/thongtinmaytinh", {
                        state: {
                          mayTinh: mayTinh,
                        },
                      });
                    }}
                    className={clsx(style.button, style.buttonHoatDong)}
                  >
                    {mayTinh.soMay}
                  </button>
                </HtmlTooltip>
              ))}
            </div>
          </TabPanel>
          <TabPanel value="3">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "10px",
                flexWrap: "wrap",
              }}
            >
              {dsSua.map((mayTinh) => (
                <HtmlTooltip
                  title={
                    <React.Fragment>
                      <Typography color="inherit">{mayTinh.soMay}</Typography>
                      <p style={{ margin: "0" }}>
                        {"Trạng thái: "}
                        {ghiTrangThai(mayTinh)}
                      </p>
                      <p style={{ margin: "0" }}>
                        {"Phòng: "}
                        {mayTinh.phongMay.soPhong}
                      </p>
                      <i>{"Double click để xem chi tiết"}</i>
                    </React.Fragment>
                  }
                >
                  <button
                    onDoubleClick={() => {
                      navigate("/thongtinmaytinh", {
                        state: {
                          mayTinh: mayTinh,
                        },
                      });
                    }}
                    className={clsx(style.button, style.buttonSua)}
                  >
                    {mayTinh.soMay}
                  </button>
                </HtmlTooltip>
              ))}
            </div>
          </TabPanel>
          <TabPanel value="4">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "10px",
                flexWrap: "wrap",
              }}
            >
              {dsHong.map((mayTinh) => (
                <HtmlTooltip
                  title={
                    <React.Fragment>
                      <Typography color="inherit">{mayTinh.soMay}</Typography>
                      <p style={{ margin: "0" }}>
                        {"Trạng thái: "}
                        {ghiTrangThai(mayTinh)}
                      </p>
                      <p style={{ margin: "0" }}>
                        {"Phòng: "}
                        {mayTinh.phongMay.soPhong}
                      </p>
                      <i>{"Double click để xem chi tiết"}</i>
                    </React.Fragment>
                  }
                >
                  <button
                    onDoubleClick={() => {
                      navigate("/thongtinmaytinh", {
                        state: {
                          mayTinh: mayTinh,
                        },
                      });
                    }}
                    className={clsx(style.button, style.buttonHong)}
                  >
                    {mayTinh.soMay}
                  </button>
                </HtmlTooltip>
              ))}
            </div>
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
