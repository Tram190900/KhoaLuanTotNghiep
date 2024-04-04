import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { Button, IconButton, MenuItem, Paper, Select } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
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
import Swal from "sweetalert2";
import Style from "./danhSachPhongMay.module.scss";
import { deleteAPI, getAPI } from "../../../api";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import TaoPhongMay from "../../../components/Modal/TaoPhongMay";
import { useLocation, useNavigate } from "react-router-dom";

export default function DanhSachPhongMay(props) {
  const navigate = useNavigate();
  const [dsPhongMay, setdsPhongMay] = useState([]);

  const [phongMay_id, setPhongMay_id] = useState();

  const [tenPhongMay, setTenPhongMay] = useState();

  const [tieuDe, setTieuDe] = useState();

  const [page, setPage] = useState(1);

  const [totalPage, setTotalPage] = useState();

  const [openTaoPhongMay, setOpenTaoPhongMay] = useState(false);

  const [toaNha, setToaNha] = useState();

  const location = useLocation();

  const toaNha_id = location.state.toaNha_id;

  const xemDanhSachPhongMay = async () => {
    const result = await getAPI(
      `/phongmay/${toaNha_id}/phantrang/${page - 1}/8`
    );
    if (result.status === 200) {
      setdsPhongMay(result.data.content);
      setTotalPage(result.data.totalPages);
    }
  };

  const xemToaNha = async () => {
    const result = await getAPI(`toanha/${toaNha_id}`);
    if (result.status === 200) {
      console.log(result.data);
    }
  };

  useEffect(() => {
    xemToaNha();
  }, []);

  useEffect(() => {
    xemDanhSachPhongMay();
  }, [page]);

  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const xoaPhongMay = (phongMay_id) => {
    Swal.fire({
      text: "Bạn có chắc muốn xóa?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Có",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteAPI(`/deletePhongMay/${phongMay_id}`)
          .then(() => {
            Swal.fire({
              text: "Xóa phòng máy thành công",
              icon: "success",
            });
            xemDanhSachPhongMay();
          })
          .catch((error) => {
            console.log(error.response.data);
          });
      }
    });
  };

  return (
    <div className={clsx(Style.wrap)}>
      <div className={clsx(Style.header)}>
        <div className={clsx(Style.h4)}>
          <h4>Quản lý phòng máy</h4>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/quan-ly-phong-may">
              Quản lý phòng máy
            </Link>
            <Link underline="hover" color="inherit" href="/quan-ly-phong-may">
              Tòa nhà
            </Link>
            <Typography color="text.primary">
              {location.state.tenToaNha}
            </Typography>
          </Breadcrumbs>
        </div>

        <Button
          Style={{ textTransform: "none" }}
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setOpenTaoPhongMay(true);
            setTieuDe("Tạo phòng máy");
          }}
        >
          Tạo phòng
        </Button>
      </div>
      <div className={clsx(Style.search)}>
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 400,
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Tìm kiếm"
            inputProps={{ "aria-label": "Tìm kiếm" }}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
          <IconButton
            color="primary"
            sx={{ p: "10px" }}
            aria-label="directions"
          ></IconButton>
        </Paper>
        <div>
          <span>Sắp xếp: </span>
          <Select value={age} onChange={handleChange} displayEmpty>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Mới nhất</MenuItem>
            <MenuItem value={20}>Phổ biến</MenuItem>
            <MenuItem value={30}>Cũ nhất</MenuItem>
          </Select>
        </div>
      </div>
      <Grid
        mt={3}
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        {dsPhongMay.map((phongMay) => (
          <Grid xs={3}>
            <Card variant="outlined">
              <CardContent
              sx={{cursor:'pointer'}}
                onClick={() => {
                  navigate("/quan-ly-phong-may/danhsachmaytinh", {
                    state: {
                      phongMay_id: phongMay.id,
                      soPhong: phongMay.soPhong,
                      toaNha: phongMay.toaNha.tenToaNha,
                      toaNha_id: phongMay.toaNha.id,
                    },
                  });
                }}
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
                  <Typography sx={{ mb: 1.5 }} variant="h5" component="div">
                    Phòng: {phongMay.soPhong}
                  </Typography>
                  <Tooltip title="Cài đặt phòng">
                    <IconButton
                      onClick={(e) => {
                        handleClick(e);
                        setPhongMay_id(phongMay.id);
                        setTenPhongMay(phongMay.soPhong);
                      }}
                      size="small"
                      sx={{ ml: 2, zIndex:'9999' }}
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
                        filter: "drop-shadow(0px 1px 1px rgba(0,0,0,0.32))",
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
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <MenuItem
                      onClick={() => {
                        setOpenTaoPhongMay(true);
                        setTieuDe("Cập nhập phòng máy");
                      }}
                    >
                      <ListItemIcon>
                        <EditIcon fontSize="small" />
                      </ListItemIcon>
                      Cập nhập
                    </MenuItem>
                    <MenuItem onClick={() => xoaPhongMay(phongMay_id)}>
                      <ListItemIcon>
                        <DeleteIcon fontSize="small" />
                      </ListItemIcon>
                      Xóa
                    </MenuItem>
                  </Menu>
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Quy mô phòng: {phongMay.loaiPhong.tenLoaiPhong}
                </Typography>
                <Typography variant="body2">
                  Số lượng máy: {phongMay.loaiPhong.soLuongMay}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Pagination
        sx={{ marginTop: "20px", display: "flex", justifyContent: "center" }}
        count={totalPage}
        defaultPage={page}
        variant="outlined"
        shape="rounded"
        onChange={(event, value) => setPage(value)}
      />
      <TaoPhongMay
        xemDanhSachPhongMay={xemDanhSachPhongMay}
        open={openTaoPhongMay}
        setOpen={setOpenTaoPhongMay}
        tieuDe={tieuDe}
        toaNha_id={toaNha_id}
        phongMay_id={phongMay_id}
        tenPhongMay={tenPhongMay}
      />
    </div>
  );
}
