import * as React from "react";
import clsx from "clsx";
import style from "./primarySearchAppBar.module.scss";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import { getAPI } from "../../api";
import { format } from "date-fns";
import { MenuContext } from "../../App";
import MenuIcon from "@mui/icons-material/Menu";
import MenuCompose from "../../components/Menu";
import DoiMatKhau from "../DoiMatKhau";
import { Option, Select } from "@mui/joy";

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [notification, setNotification] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const nhanVien = JSON.parse(localStorage.getItem("user"));
  const [thongBaoLoi, setThongBaoLoi] = React.useState([]);
  const [numOfNoti, setNumOfNoti] = React.useState(0);
  const [doiMK, setDoiMK] = React.useState(false);

  const menu = React.useContext(MenuContext);

  const navigate = useNavigate();

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenNotificacion = (event) => {
    setNotification(event.currentTarget);
    setNumOfNoti(0);
  };

  const handleCloseNotificacion = () => {
    setNotification(null);
  };

  const handleGetThongBaoLoi = async () => {
    try {
      const result = await getAPI(
        `/lichSuSuaChua/getLoiChuaSuaTheoNhanVien/${nhanVien?.nhanVien?.id}`
      );
      if (result.status === 200) {
        setThongBaoLoi(result.data);
        setNumOfNoti(result.data.length);
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    handleGetThongBaoLoi();
  }, []);

  const handleSelectKhoa=(e, newValue)=>{
    navigate(newValue)
    menu.setMenuActive(newValue)
  }

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          position: "sticky",
          top: "0",
          zIndex: "1",
          marginBottom: "5px",
        }}
      >
        <AppBar position="static">
          <Toolbar>
            {menu.isPhone ? (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleMobileMenuOpen} sx={{ p: 0 }}>
                    <MenuIcon />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={mobileMoreAnchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(mobileMoreAnchorEl)}
                  onClose={handleMobileMenuClose}
                >
                  <MenuCompose handleMobileMenuClose={handleMobileMenuClose} />
                </Menu>
              </Box>
            ) : null}
            <div
              className={clsx(
                style.logo__image,
                menu.isPhone ? style.none : ""
              )}
            >
              <img
                src={require("../../assets/logo/logoIUH.svg").default}
                alt=""
              />
            </div>
            <div
              className={clsx(
                style.select_khoa,
                menu.isPhone ? style.none : ""
              )}
            >
              <Select placeholder="Chọn khoa..." onChange={handleSelectKhoa}>
                <Option value={"cong-nghe-thong-tin"}>Công nghệ thông tin</Option>
                <Option value={""}>Cơ khí</Option>
                <Option value={""}>Điện</Option>
              </Select>
            </div>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { md: "flex" } }}>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge
                  onClick={handleOpenNotificacion}
                  badgeContent={numOfNoti}
                  color="error"
                >
                  <NotificationsIcon />
                </Badge>
                <Menu
                  sx={{ mt: "45px", height: "40rem" }}
                  id="menu-appbar"
                  anchorEl={notification}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(notification)}
                  onClose={handleCloseNotificacion}
                >
                  {thongBaoLoi?.map((item, index) => (
                    <MenuItem key={index}>
                      <span style={{ borderBottom: "1px solid #80808038" }}>
                        <strong>{item.so_may}</strong>: {item.loi_gap_phai}
                        <br></br>
                        <span>
                          Dự kiến sửa đến ngày{" "}
                          <strong>
                            {format(item.ngay_du_kien_sua, "dd-MM-yyyy")}
                          </strong>
                        </span>
                      </span>
                    </MenuItem>
                  ))}
                </Menu>
              </IconButton>
            </Box>
            <Box sx={{ flexGrow: 0, marginLeft: "10px" }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem
                  onClick={() => {
                    setDoiMK(true);
                    setAnchorElUser(!anchorElUser);
                  }}
                >
                  <Typography>Đổi mất khẩu</Typography>
                </MenuItem>
                <DoiMatKhau open={doiMK} setDoiMK={setDoiMK} />
                <MenuItem
                  onClick={() => {
                    navigate("/login");
                    localStorage.removeItem("user");
                  }}
                >
                  <Typography>Đăng xuất</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
