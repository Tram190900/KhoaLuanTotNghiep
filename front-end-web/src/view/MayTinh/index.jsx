import clsx from "clsx";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import style from "./mayTinh.module.scss";
import { FormControl, FormLabel, Option, Select } from "@mui/joy";
import { Button } from "@mui/material";
import LichSuaChua from "../../components/Modal/LichSuaChua";
import { getAPI, postAPI } from "../../api";
import moment from "moment";
import CapNhatCauHinh from "../../components/Modal/CapNhatCuaHinh";
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

export default function MayTinh() {
  const [openLichSuaChua, setOpenLichSuaChua] = useState(false);
  const [openCapNhatCauHinh, setOpenCapNhatCauHinh] = useState(false);

  const [phanMemCaiDat, setPhanMemCaiDat] = useState([]);
  const [thietBiLapDat, setThietBiLapDat] = useState([]);

  const [allToaNha, setAllToaNha] = useState([]);
  const [selectToaNha, setSelectToaNha] = useState(null);

  const [phongMay, setPhongMay] = useState([]);
  const [selectPhongMay, setSelectPhongMay] = useState(null);

  const [mayTinh, setMayTinh] = useState([]);
  const [selectMayTinh, setSelectMayTinh] = useState(null);

  const [trangThai, setTrangThai] = useState(true);
  const [loiGapPhai, setLoiGapPhai] = useState(null);

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    handleGetAllToaNha();
  }, []);

  const handleGetAllToaNha = async () => {
    try {
      const result = await getAPI("/toanha");
      if (result.status === 200) {
        setAllToaNha(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleGetPhongMayTheoToaNha = async (value) => {
    try {
      const result = await getAPI(`xemDanhSachPhongMayTheoToaNha/${value.id}`);
      if (result.status === 200) {
        setPhongMay(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetMayTinhTheoPhong = async (value) => {
    try {
      const result = await getAPI(`getMayTinhByPhong/${value}`);
      if (result.status === 200) {
        setMayTinh(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleToaNha = (event, newValue) => {
    setSelectToaNha(newValue);
    handleGetPhongMayTheoToaNha(newValue);
  };

  const handlePhongMay = async (event, newValue) => {
    setSelectPhongMay(newValue);
    if (newValue) {
      handleGetMayTinhTheoPhong(newValue.soPhong);
    }
  };

  const handleMayTinh = (event, newValue) => {
    setSelectMayTinh(newValue);
    if (newValue) {
      setTrangThai(newValue.trangThai);
      handleGetPhanMemCaiDat(newValue.id);
      handleGetThietBiLapDat(newValue.id);
    }
  };

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

  const handleCapNhapSuaChua = async () => {
    const chiTietLichSuSuaChua = {
      ngaySuaLoi: moment().format("YYYY-MM-DD"),
      lichSuSuaChua: loiGapPhai,
    };
    try {
      const result = await postAPI(
        "/chiTietLichSuSuaChua",
        chiTietLichSuSuaChua
      );
      if (result.status === 200) {
        Swal.fire({
          text: "Thêm lịch sử sửa chữa thành công",
          icon: "success",
          confirmButtonText: "OK",
        });
        handleToaNha(selectToaNha)
        handlePhongMay(selectPhongMay)
        handleMayTinh(result.data.lichSuSuaChua.mayTinh);
        setTrangThai(result.data.lichSuSuaChua.mayTinh.trangThai);
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

  const handleChange = (event, newValue) => {
    setTrangThai(newValue);
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

  const luuChiTietLichSuSuaChuaHong = async () => {
    const chiTietLichSuSuaChua = {
      ngaySuaLoi: moment().format("YYYY-MM-DD"),
      lichSuSuaChua: loiGapPhai,
    };
    try {
      const result = await postAPI(
        "/chiTietLichSuSuaChua/hong",
        chiTietLichSuSuaChua
      );
      if (result.status === 200) {
        Swal.fire({
          text: "Báo hỏng thành công",
          icon: "success",
          confirmButtonText: "OK",
        });
        handleToaNha(selectToaNha)
        handlePhongMay(selectPhongMay)
        handleMayTinh(result.data.lichSuSuaChua.mayTinh);
        setTrangThai(result.data.lichSuSuaChua.mayTinh.trangThai);
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
    if (selectMayTinh?.trangThai === 2) {
      handleGetLoiMacPhai(selectMayTinh.id);
    }
  }, [selectMayTinh?.trangThai]);

  return (
    <div className={clsx(style.maytinh, "p-3")}>
      <h1>Quản lý máy tính</h1>
      <div className={clsx(style.infoWrap)}>
        <div className={clsx(style.content)}>
          <div className={clsx(style.leftWrap)}>
            <span className="d-flex justify-content-between">
              <FormControl className="w-50">
                <FormLabel>Tòa nhà</FormLabel>
                <Select
                  placeholder="Tòa nhà..."
                  value={selectToaNha}
                  onChange={handleToaNha}
                >
                  {allToaNha?.map((item, index) => (
                    <Option value={item} key={index}>
                      {item.tenToaNha}
                    </Option>
                  ))}
                </Select>
              </FormControl>
              <FormControl className="w-50">
                <FormLabel>Số phòng</FormLabel>
                <Select
                  value={selectPhongMay}
                  onChange={handlePhongMay}
                  placeholder="Số phòng..."
                >
                  {phongMay?.map((item, index) => (
                    <Option value={item} key={index}>
                      {item.soPhong}
                    </Option>
                  ))}
                </Select>
              </FormControl>
            </span>
            <FormControl>
              <FormLabel>Số máy</FormLabel>
              <Select
                placeholder="Số máy..."
                value={selectMayTinh}
                onChange={handleMayTinh}
              >
                {mayTinh?.map((item, index) => (
                  <Option key={index} value={item}>
                    {item.soMay}
                  </Option>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Trạng thái</FormLabel>
              <Select
                placeholder="Trạng thái ..."
                value={trangThai}
                onChange={handleChange}
              >
                <Option value={1}>Hoạt động</Option>
                <Option value={2}>Bảo trì</Option>
                <Option value={3}>Hỏng</Option>
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
      <div className={clsx(style.button, "py-3")}>
        {selectMayTinh?.trangThai === 1 ? (
          <Button
            color="error"
            disabled={mayTinh.trangThai === 2 || mayTinh.trangThai === 3}
            onClick={() => setOpenLichSuaChua(!openLichSuaChua)}
            variant="contained"
            sx={{ textTransform: "capitalize" }}
          >
            Báo lỗi
          </Button>
        ) : selectMayTinh?.trangThai === 2 ? (
          <>
            <Button
              color="error"
              variant="contained"
              sx={{ textTransform: "capitalize" }}
              onClick={() => handleCapNhapSuaChua()}
            >
              Cập nhật sửa chữa
            </Button>
            <Button
              color="warning"
              disabled={mayTinh.trangThai === 3 ? "disabled" : ""}
              variant="contained"
              sx={{ textTransform: "capitalize" }}
              onClick={() => luuChiTietLichSuSuaChuaHong()}
            >
              Báo hỏng
            </Button>
          </>
        ) : null}

        {/* {user.role === "giangvien" ? null : (
          <>
            <Button
              onClick={() => setOpenCapNhatCauHinh(!openCapNhatCauHinh)}
              variant="contained"
              sx={{ textTransform: "capitalize" }}
              color="warning"
            >
              Cập nhật cấu hình
            </Button>
          </>
        )} */}
      </div>
      <div className={clsx(style.rightWrap)}>
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
        phongMay={selectPhongMay}
        mayTinh={selectMayTinh}
        setOpen={setOpenLichSuaChua}
      />
      <CapNhatCauHinh
        open={openCapNhatCauHinh}
        setOpen={setOpenCapNhatCauHinh}
        phanMemCaiDat={phanMemCaiDat}
        thietBiLapDat={thietBiLapDat}
        mayTinhId={selectMayTinh?.id}
        handleGetPhanMemCaiDat={handleGetPhanMemCaiDat}
      />
    </div>
  );
}
