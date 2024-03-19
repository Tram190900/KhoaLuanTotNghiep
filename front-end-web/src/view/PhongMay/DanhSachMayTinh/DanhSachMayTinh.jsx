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
import  style from "./danhSachMayTinh.module.scss";

const DanhSachMayTinh = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const phongMay_id = location.state.phongMay_id;
  const [value, setValue] = React.useState("1");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState();

  const [page_2, setPage_2] = useState(1);
  const [totalPage_2, setTotalPage_2] = useState();

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
  }

  const checkSua = (mayTinh) => {
    return mayTinh.trangThai === 2;
  }

  const [dsMayTinh, setDsMayTinh] = useState([]);
  const [dsMayTinhHoatDong, setDanhSachMayTinhHoatDong] = useState([]);

  const xemDanhSachMayTinh = async () => {
    const result = await getAPI(
      `/maytinh/${phongMay_id}/phantrang/${page - 1}/8`
    );
    if (result.status === 200) {
      setDsMayTinh(result.data.content);
      setTotalPage(result.data.totalPages);
    }
  };

  const xemDanhSachMayTinhHoatDong = async () => {
    const result = await getAPI(
      `/maytinh/2/phantrangtrangthai/${page_2 - 1}/8`
    );
    if (result.status === 200) {
      setDsMayTinh(result.data.content);
      setTotalPage(result.data.totalPages);
    }
  };

  useEffect(() => {
    xemDanhSachMayTinh();
    // xemDanhSachMayTinhHoatDong();
  }, [page]);

  const ghiTrangThai = (mayTinh) => {
    if (mayTinh.trangThai === 1) return "Hoạt động"
    else if (mayTinh.trangThai === 2) return "Bảo trì"
    else return "Hỏng"
  }

  const dsHoatDong = dsMayTinh.filter(checkHoatDong);
  const dsSua = dsMayTinh.filter(checkSua);
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
            navigate("/quan-ly-phong-may/danhsachmaytinh", {
              state: {
                toaNha_id: location.state.toaNha_id,
                tenToaNha: location.state.toaNha,
              },
            });
          }}
          underline="hover"
          color="inherit"
          href="/quan-ly-phong-may/danhsachmaytinh"
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
              mt={3}
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              {dsMayTinh.map((mayTinh) => (
                <Grid xs={3}>
                  <Card variant="outlined">
                    <CardContent
                      className={clsx(
                        mayTinh.trangThai === 1 && style.hoatDong,
                        mayTinh.trangThai === 2 && style.dangSua,
                        mayTinh.trangThai === 3 && style.hong
                      )}
                    >
                      <Typography
                        sx={{
                          fontSize: 14,
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                        color="text.secondary"
                        gutterBottom
                      >
                        <Typography
                          sx={{ mb: 1.5 }}
                          variant="h5"
                          component="div"
                        >
                          Máy: {mayTinh.soMay}
                        </Typography>
                        <Tooltip title="Cài đặt phòng">
                          <IconButton
                            size="small"
                            sx={{ ml: 2 }}
                            aria-controls={open ? "account-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                          >
                            <MoreVertIcon sx={{ width: 32, height: 32 }} />
                          </IconButton>
                        </Tooltip>
                        <Menu
                          anchorEl={anchorEl}
                          id="account-menu"
                          open={open}
                          onClose={handleClose}
                          onClick={handleClose}
                          PaperProps={{
                            elevation: 0,
                            sx: {
                              overflow: "visible",
                              filter:
                                "drop-shadow(0px 1px 1px rgba(0,0,0,0.32))",
                              mt: 1.5,
                              "& .MuiAvatar-root": {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                              },
                              "&::before": {
                                content: '""',
                                display: "block",
                                position: "absolute",
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: "background.paper",
                                transform: "translateY(-50%) rotate(45deg)",
                                zIndex: 0,
                              },
                            },
                          }}
                          transformOrigin={{
                            horizontal: "right",
                            vertical: "top",
                          }}
                          anchorOrigin={{
                            horizontal: "right",
                            vertical: "bottom",
                          }}
                        >
                          <MenuItem>
                            <ListItemIcon>
                              <EditIcon fontSize="small" />
                            </ListItemIcon>
                            Cập nhập
                          </MenuItem>
                          <MenuItem>
                            <ListItemIcon>
                              <DeleteIcon fontSize="small" />
                            </ListItemIcon>
                            Xóa
                          </MenuItem>
                        </Menu>
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        Trạng thái: {ghiTrangThai(mayTinh)}
                      </Typography>
                      <Typography variant="body2">Ngày lắp đặt:</Typography>
                      <Button
                        sx={{color:"white", background:"blue", marginTop:"10px"}}
                        onClick={() => {
                          navigate("/quan-ly-phong-may/thongtinmaytinh", {
                            state: {
                              mayTinh: mayTinh,
                            },
                          });
                        }}
                      >
                        Xem chi tiết
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Pagination
              sx={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "center",
              }}
              count={totalPage}
              defaultPage={page}
              variant="outlined"
              shape="rounded"
              onChange={(event, value) => setPage(value)}
            />
          </TabPanel>
          <TabPanel value="2">
          <Grid
              mt={3}
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              {dsHoatDong.map((mayTinh) => (
                <Grid xs={3}>
                  <Card variant="outlined">
                    <CardContent
                      className={clsx(
                        mayTinh.trangThai === 1 && style.hoatDong,
                        mayTinh.trangThai === 2 && style.dangSua,
                        mayTinh.trangThai === 3 && style.hong
                      )}
                    >
                      <Typography
                        sx={{
                          fontSize: 14,
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                        color="text.secondary"
                        gutterBottom
                      >
                        <Typography
                          sx={{ mb: 1.5 }}
                          variant="h5"
                          component="div"
                        >
                          Máy: {mayTinh.soMay}
                        </Typography>
                        <Tooltip title="Cài đặt phòng">
                          <IconButton
                            size="small"
                            sx={{ ml: 2 }}
                            aria-controls={open ? "account-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                          >
                            <MoreVertIcon sx={{ width: 32, height: 32 }} />
                          </IconButton>
                        </Tooltip>
                        <Menu
                          anchorEl={anchorEl}
                          id="account-menu"
                          open={open}
                          onClose={handleClose}
                          onClick={handleClose}
                          PaperProps={{
                            elevation: 0,
                            sx: {
                              overflow: "visible",
                              filter:
                                "drop-shadow(0px 1px 1px rgba(0,0,0,0.32))",
                              mt: 1.5,
                              "& .MuiAvatar-root": {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                              },
                              "&::before": {
                                content: '""',
                                display: "block",
                                position: "absolute",
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: "background.paper",
                                transform: "translateY(-50%) rotate(45deg)",
                                zIndex: 0,
                              },
                            },
                          }}
                          transformOrigin={{
                            horizontal: "right",
                            vertical: "top",
                          }}
                          anchorOrigin={{
                            horizontal: "right",
                            vertical: "bottom",
                          }}
                        >
                          <MenuItem>
                            <ListItemIcon>
                              <EditIcon fontSize="small" />
                            </ListItemIcon>
                            Cập nhập
                          </MenuItem>
                          <MenuItem>
                            <ListItemIcon>
                              <DeleteIcon fontSize="small" />
                            </ListItemIcon>
                            Xóa
                          </MenuItem>
                        </Menu>
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        Trạng thái: {ghiTrangThai(mayTinh)}
                      </Typography>
                      <Typography variant="body2">Ngày lắp đặt:</Typography>
                      <Button
                        sx={{color:"white", background:"blue", marginTop:"10px"}}
                        onClick={() => {
                          navigate("/quan-ly-phong-may/thongtinmaytinh", {
                            state: {
                              mayTinh: mayTinh,
                            },
                          });
                        }}
                      >
                        Xem chi tiết
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Pagination
              sx={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "center",
              }}
              count={totalPage}
              defaultPage={page}
              variant="outlined"
              shape="rounded"
              onChange={(event, value) => setPage(value)}
            />
          </TabPanel>
          <TabPanel value="3">          <Grid
              mt={3}
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              {dsSua.map((mayTinh) => (
                <Grid xs={3}>
                  <Card variant="outlined">
                    <CardContent
                      className={clsx(
                        mayTinh.trangThai === 1 && style.hoatDong,
                        mayTinh.trangThai === 2 && style.dangSua,
                        mayTinh.trangThai === 3 && style.hong
                      )}
                    >
                      <Typography
                        sx={{
                          fontSize: 14,
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                        color="text.secondary"
                        gutterBottom
                      >
                        <Typography
                          sx={{ mb: 1.5 }}
                          variant="h5"
                          component="div"
                        >
                          Máy: {mayTinh.soMay}
                        </Typography>
                        <Tooltip title="Cài đặt phòng">
                          <IconButton
                            size="small"
                            sx={{ ml: 2 }}
                            aria-controls={open ? "account-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                          >
                            <MoreVertIcon sx={{ width: 32, height: 32 }} />
                          </IconButton>
                        </Tooltip>
                        <Menu
                          anchorEl={anchorEl}
                          id="account-menu"
                          open={open}
                          onClose={handleClose}
                          onClick={handleClose}
                          PaperProps={{
                            elevation: 0,
                            sx: {
                              overflow: "visible",
                              filter:
                                "drop-shadow(0px 1px 1px rgba(0,0,0,0.32))",
                              mt: 1.5,
                              "& .MuiAvatar-root": {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                              },
                              "&::before": {
                                content: '""',
                                display: "block",
                                position: "absolute",
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: "background.paper",
                                transform: "translateY(-50%) rotate(45deg)",
                                zIndex: 0,
                              },
                            },
                          }}
                          transformOrigin={{
                            horizontal: "right",
                            vertical: "top",
                          }}
                          anchorOrigin={{
                            horizontal: "right",
                            vertical: "bottom",
                          }}
                        >
                          <MenuItem>
                            <ListItemIcon>
                              <EditIcon fontSize="small" />
                            </ListItemIcon>
                            Cập nhập
                          </MenuItem>
                          <MenuItem>
                            <ListItemIcon>
                              <DeleteIcon fontSize="small" />
                            </ListItemIcon>
                            Xóa
                          </MenuItem>
                        </Menu>
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        Trạng thái: {ghiTrangThai(mayTinh)}
                      </Typography>
                      <Typography variant="body2">Ngày lắp đặt:</Typography>
                      <Button
                        sx={{color:"white", background:"blue", marginTop:"10px"}}
                        onClick={() => {
                          navigate("/quan-ly-phong-may/thongtinmaytinh", {
                            state: {
                              mayTinh: mayTinh,
                            },
                          });
                        }}
                      >
                        Xem chi tiết
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Pagination
              sx={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "center",
              }}
              count={totalPage}
              defaultPage={page}
              variant="outlined"
              shape="rounded"
              onChange={(event, value) => setPage(value)}
            /></TabPanel>
          <TabPanel value="4">Hỏng</TabPanel>
        </TabContext>
      </Box>
    </div>
  );
};

export default DanhSachMayTinh;
