import React, { useEffect, useState } from "react";
import clsx from "clsx";
import Style from "./thongTinMayTinh.module.scss";
import Paper from "@mui/material/Paper";
import { useLocation, useNavigate } from "react-router";
import { Breadcrumbs, Button, Table, Typography } from "@mui/material";
import { Sheet } from "@mui/joy";
import moment from "moment";
import { getAPI } from "../../../api";
import { Link } from "react-router-dom";
import LichSuaChua from "../../../components/Modal/LichSuaChua";
import CapNhatCauHinh from "../../../components/Modal/CapNhatCuaHinh";

const ThongTinMayTinh = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const mayTinh = location.state.mayTinh;
  const [phanMemCaiDat, setPhanMemCaiDat] = useState([]);
  const [thietBiLapDat, setThietBiLapDat] = useState([]);

  const [openLichSuaChua, setOpenLichSuaChua] = useState(false);
  const [openCapNhatCauHinh, setOpenCapNhatCauHinh] = useState(false);

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
    if (mayTinh.trangThai === 1) return "Hoạt động"
    else if (mayTinh.trangThai === 2) return "Bảo trì"
    else return "Hỏng"
  }

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

  useEffect(() => {
    handleGetPhanMemCaiDat(mayTinh.id);
    handleGetThietBiLapDat(mayTinh.id);
  }, []);

  return (
    <div className={clsx(Style.wrap)}>
      <h2>Thông tin máy tính</h2>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" to="/quan-ly-phong-may">
          Quản lý phòng máy
        </Link>
        <Link underline="hover" color="inherit" to="/quan-ly-phong-may">
          Tòa nhà
        </Link>
        <Link underline="hover" color="inherit" to="/quan-ly-phong-may">
          {mayTinh.phongMay.toaNha.tenToaNha}
        </Link>
        <Button
          onClick={() => {
            navigate("/quan-ly-phong-may/danhsachmaytinh", {
              state: {
                phongMay_id: mayTinh.phongMay.id,
              },
            });
          }}
        >
          {mayTinh.phongMay.soPhong}
        </Button>
        <Typography color="text.primary">{mayTinh.soMay}</Typography>
      </Breadcrumbs>
      <Paper sx={{ width: "50%" }} square={false}>
        Tên máy: {mayTinh.soMay}
      </Paper>
      <Paper sx={{ width: "50%" }} square={false}>
        Phòng máy: {mayTinh.phongMay.soPhong}
      </Paper>
      <Paper sx={{ width: "50%" }} square={false}>
        Trạng thái: {ghiTrangThai(mayTinh)}
      </Paper>
      <div className={clsx(Style.button)}>
        <Button onClick={() => setOpenLichSuaChua(!openLichSuaChua)} variant="contained">Báo lỗi</Button>
        <Button variant="contained">Cập nhật trạng thái</Button>
        <Button onClick={() => setOpenCapNhatCauHinh(!openCapNhatCauHinh)} variant="contained">Cập nhật cấu hình</Button>
      </div>
      <div className={clsx(Style.rightWrap)}>
        <Sheet id={"scroll-style-01"} className={clsx(Style.tablePhanMem)}>
          <Table
            aria-label="table with sticky header"
            stickyHeader
            stickyFooter
            stripe="odd"
            hoverRow
          >
            <thead>
              <tr>
                <th>Tên phần mềm</th>
                <th>Phiên bản</th>
                <th>Ngày cài đặt</th>
              </tr>
            </thead>
            <tbody>
              {phanMemCaiDat?.map((item, index) => (
                <tr key={index}>
                  <td>{item.phanMem.tenPhamMem}</td>
                  <td>{item.phanMem.phienBan}</td>
                  <td>{moment(item.ngayCaiDat).format("DD-MM-YYYY")}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Sheet>
        <Sheet id={"scroll-style-01"} className={clsx(Style.tableThietBi)}>
          <Table
            aria-label="table with sticky header"
            stickyHeader
            stickyFooter
            stripe="odd"
            hoverRow
          >
            <thead>
              <tr>
                <th>Tên thiết bị</th>
                <th>Ngày cài đặt</th>
              </tr>
            </thead>
            <tbody>
              {thietBiLapDat?.map((item, index) => (
                <tr key={index}>
                  <td>{item.thietBi.tenThietBi}</td>
                  <td>{moment(item.ngayLapDat).format("DD-MM-YYYY")}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Sheet>
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
