import React, { useEffect, useState } from "react";
import clsx from "clsx";
import style from "./thongTinMayTinh.module.scss";
import { useLocation, useNavigate } from "react-router";
import { Breadcrumbs, Button, Typography } from "@mui/material";
import moment from "moment";
import { getAPI, postAPI } from "../../../api";
import { Link } from "react-router-dom";
import LichSuaChua from "../../../components/Modal/LichSuaChua";
import CapNhatCauHinh from "../../../components/Modal/CapNhatCuaHinh";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Swal from "sweetalert2";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1976D2",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const ThongTinMayTinh = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mayTinh, setMayTinh] = useState(location.state.mayTinh);
  const [phanMemCaiDat, setPhanMemCaiDat] = useState([]);
  const [thietBiLapDat, setThietBiLapDat] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const [openLichSuaChua, setOpenLichSuaChua] = useState(false);
  const [openCapNhatCauHinh, setOpenCapNhatCauHinh] = useState(false);
  const [loiGapPhai, setLoiGapPhai] = useState(null);

  const handleGetPhanMemCaiDat = async (id) => {
    const result = await getAPI(`/getChiTietCaiDat/${id}`);
    if (result.status === 200 && result.data.length > 0) {
      const listPhanMem = [];
      result.data.map((item) => {
        listPhanMem.push({
          phanMem: item.phanMem,
          ngayCaiDat: item.ngayCaiDat,
        });
      });
      setPhanMemCaiDat(listPhanMem);
    } else {
      setPhanMemCaiDat([]);
    }
  };

  const ghiTrangThai = (mayTinh) => {
    if (mayTinh.trangThai === 1) return "Hoạt động";
    else if (mayTinh.trangThai === 2) return "Bảo trì";
    else return "Hỏng";
  };

  const handleGetThietBiLapDat = async (id) => {
    const result = await getAPI(`/getAllChiTietLapDat/${id}`);
    if (result.status === 200 && result.data.length > 0) {
      const listThietBi = [];
      result.data.map((item) => {
        listThietBi.push({
          thietBi: item.thietBi,
          ngayLapDat: item.ngayLapDat,
        });
      });
      setThietBiLapDat(listThietBi);
    } else {
      setThietBiLapDat([]);
    }
  };

  const handleGetLoiMacPhai = async (id) => {
    try {
      const result = await getAPI(
        `/lichSuSuaChua/getLoiChuaSuaTheoMayTinhGanNhat/${id}`
      );
      if (result.status === 200) {
        setLoiGapPhai(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCapNhapSuaChua = async () => {
    const chiTietLichSuSuaChua = {
      ngaySuaLoi: moment().format("YYYY-MM-DD"),
      lichSuSuaChua: loiGapPhai,
    };
    try {
      const result = await postAPI("/chiTietLichSuSuaChua", chiTietLichSuSuaChua);
      if (result.status === 200) {
        Swal.fire({
          text: "Thêm lịch sửa máy tính thành công",
          icon: "success",
          confirmButtonText: "OK",
        });
        const result1 = await getAPI(`/getMayTinhById/${result.data.lichSuSuaChua.mayTinh.id}`)
        if(result1.status===200){
          setMayTinh(result1.data)
          setLoiGapPhai(null)
        }
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        text: error,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  useEffect(() => {
    handleGetPhanMemCaiDat(mayTinh.id);
    handleGetThietBiLapDat(mayTinh.id);
  }, []);

  useEffect(() => {
    if (mayTinh.trangThai === 2) {
      handleGetLoiMacPhai(mayTinh.id);
    }
  }, [mayTinh.trangThai]);

  return (
    <div className={clsx(style.wrap)}>
      <h1>Thông tin máy tính</h1>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" to="/">
          Quản lý phòng máy
        </Link>
        <Link underline="hover" color="inherit" to="/">
          Tòa nhà
        </Link>
        <Button
          onClick={() => {
            navigate("/danhsachphongmay", {
              state: {
                toaNha_id: mayTinh.phongMay.toaNha.id,
                tenToaNha: mayTinh.phongMay.toaNha.tenToaNha,
              },
            });
          }}
        >
          {mayTinh.phongMay.toaNha.tenToaNha}
        </Button>
        <Button
          onClick={() => {
            navigate("/danhsachmaytinh", {
              state: {
                phongMay_id: mayTinh.phongMay.id,
                soPhong: mayTinh.phongMay.soPhong,
                toaNha: mayTinh.phongMay.toaNha.tenToaNha,
                toaNha_id: mayTinh.phongMay.toaNha.id,
                tenToaNha: mayTinh.phongMay.toaNha.tenToaNha,
              },
            });
          }}
        >
          {mayTinh.phongMay.soPhong}
        </Button>
        <Typography color="text.primary">{mayTinh.soMay}</Typography>
      </Breadcrumbs>
      <Paper
        className={clsx(style.mayTinhInfo)}
        sx={{ width: "50%" }}
        square={false}
      >
        <b>Tên máy:</b> {mayTinh.soMay}
      </Paper>
      <Paper
        className={clsx(style.mayTinhInfo)}
        sx={{ width: "50%" }}
        square={false}
      >
        <b>Phòng máy:</b> {mayTinh.phongMay.soPhong}
      </Paper>
      <Paper
        className={clsx(style.mayTinhInfo)}
        sx={{ width: "50%" }}
        square={false}
      >
        <b>Trạng thái:</b>{" "}
        <span
          className={clsx(
            mayTinh.trangThai === 1 && style.hoatDong,
            mayTinh.trangThai === 2 && style.baoTri,
            mayTinh.trangThai === 3 && style.Hong
          )}
        >
          {ghiTrangThai(mayTinh)}{" "}
        </span>
        {loiGapPhai ? `(${loiGapPhai.loiGapPhai})` : ""}
      </Paper>
      <div className={clsx(style.button)}>
        {mayTinh.trangThai === 1 ? (
          <Button
            color="error"
            disabled={mayTinh.trangThai === 3 ? "disabled" : ""}
            onClick={() => setOpenLichSuaChua(!openLichSuaChua)}
            variant="contained"
            sx={{ textTransform: "capitalize" }}
          >
            Báo lỗi
          </Button>
        ) : null}
        {user.role === "giangvien" ? null : (
          <>
            {mayTinh.trangThai === 2 ? (
              <Button
                color="error"
                variant="contained"
                sx={{ textTransform: "capitalize" }}
                onClick={() => handleCapNhapSuaChua()}
              >
                Cập nhật sửa chữa
              </Button>
            ) : null}
            {/* <Button
              onClick={() => setOpenCapNhatCauHinh(!openCapNhatCauHinh)}
              variant="contained"
              sx={{ textTransform: "capitalize" }}
              color="warning"
            >
              Cập nhật cấu hình
            </Button> */}
          </>
        )}
      </div>
      <div className={clsx(style.rightWrap, "mt-3")}>
        <TableContainer component={Paper} className={clsx(style.tablePhanMem)}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Tên phần mềm</StyledTableCell>
                <StyledTableCell align="right">Phiên bản</StyledTableCell>
                <StyledTableCell align="right">Ngày cài đặt</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {phanMemCaiDat.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    {row.phanMem.tenPhamMem}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.phanMem.phienBan}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {moment(row.ngayCaiDat).format("DD-MM-YYYY")}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TableContainer component={Paper} className={clsx(style.tablePhanMem)}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Tên thiết bị</StyledTableCell>
                <StyledTableCell align="right">Ngày cài đặt</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {thietBiLapDat.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    {row.thietBi.tenThietBi}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {moment(row.ngayLapDat).format("DD-MM-YYYY")}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <LichSuaChua
        open={openLichSuaChua}
        phongMay={mayTinh.phongMay}
        mayTinh={mayTinh}
        setOpen={setOpenLichSuaChua}
      />
      <CapNhatCauHinh
        open={openCapNhatCauHinh}
        setOpen={setOpenCapNhatCauHinh}
        phanMemCaiDat={phanMemCaiDat}
        thietBiLapDat={thietBiLapDat}
        mayTinhId={mayTinh.id}
        handleGetPhanMemCaiDat={handleGetPhanMemCaiDat}
      />
    </div>
  );
};

export default ThongTinMayTinh;
