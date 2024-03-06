import React, { useEffect, useState } from "react";
import clsx from "clsx";
import style from "./nhanVien.module.scss";
import { getAPI, postAPI, putAPI } from "./../../api/index";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Option,
  Select,
  Sheet,
  Table,
} from "@mui/joy";
import CapNhatLichTruc from "../../components/Modal/CapNhatLichTruc";
import Swal from "sweetalert2";
import moment from "moment";

export default function NhanVien() {
  const [openLichTruc, setOpenLichTruc] = useState(false);

  const [allNhanVien, setAllNhanVien] = useState([]);
  const [caTruc, setCaTruc] = useState([]);

  const [hoTen, setHoTen] = useState("");
  const [email, setEmail] = useState("");
  const [sdt, setSDT] = useState("");
  const [gioiTinh, setGioiTinh] = useState();
  const [diaChi, setDiaChi] = useState("");
  const [trangThai, setTrangThai] = useState();
  const [timKiem, setTimKiem] = useState("");
  const [nhanVienId, setNhanVienId] = useState("");

  useEffect(() => {
    handleGetAllNhanvien();
  }, [timKiem === ""]);

  const handleTrangThai = (event, newValue) => {
    setTrangThai(newValue);
  };

  const handleGioiTinh = (event, newValue) => {
    setGioiTinh(newValue);
  };

  const handleGetAllNhanvien = async () => {
    const result = await getAPI("/getAllNhanVien");
    if (result.status === 200) {
      setAllNhanVien(result.data);
    }
  };

  const handleTimKiem = async () => {
    const list = [];
    const result = await getAPI(`/getNhanVienByTen/${timKiem}`);
    if (result.status === 200) {
      list.push(result.data);
    }
    setAllNhanVien(list);
  };

  const handleSaveNhanVien = async () => {
    const data = {
      hoTenNhanVien: hoTen,
      email: email,
      sdt: sdt,
      gioiTinh: gioiTinh,
      diaChi: diaChi,
      trangThai: true,
    };
    const result = await postAPI("/saveNhanVien", data);
    if (result.status === 200) {
      Swal.fire({
        text: "Thêm nhân viên mới thành công",
        icon: "success",
      });
      handleGetAllNhanvien();
    }
  };

  const handleCapNhatNhanVien = async () => {
    const data = {
      hoTenNhanVien: hoTen,
      email: email,
      sdt: sdt,
      gioiTinh: gioiTinh,
      diaChi: diaChi,
      trangThai: trangThai,
    };
    const result = await putAPI(`updateNhanVien/${nhanVienId}`, data);
    if (result.status === 200) {
      Swal.fire({
        text: "Cập nhật thông tin nhân viên thành công",
        icon: "success",
      });
      handleGetAllNhanvien();
    }
  };

  const handleGetCaTrucByNhanVien = async (id) => {
    const result = await getAPI(`/getChamCongByNhanVien/${id}`);
    if (result.status === 200) {
      setCaTruc(result.data);
    }
  };
  return (
    <>
      <div className={clsx(style.nhanVien)}>
        <h1>QUẢN LÝ NHÂN VIÊN</h1>
        <div className={clsx(style.infoWrap)}>
          <div className={clsx(style.left)}>
            <div className={clsx(style.left_image_wrap)}>
              <img
                src="https://www.eventfulnigeria.com/wp-content/uploads/2021/04/Avatar-PNG-Free-Download.png"
                alt="avatar"
              />
              <Button>Cập nhật ảnh nhân viên</Button>
            </div>
            <div className={clsx(style.left_infor)}>
              <FormControl>
                <FormLabel>Họ tên</FormLabel>
                <Input
                  value={hoTen}
                  onChange={(e) => setHoTen(e.target.value)}
                  placeholder="Họ tên"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Số điện thoại</FormLabel>
                <Input
                  value={sdt}
                  onChange={(e) => setSDT(e.target.value)}
                  placeholder="Số điện thoại"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Giới tính</FormLabel>
                <Select
                  value={gioiTinh}
                  placeholder="Giới tính ..."
                  onChange={handleGioiTinh}
                >
                  <Option value={true}>Nam</Option>
                  <Option value={false}>Nữ</Option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Địa chỉ</FormLabel>
                <Input
                  value={diaChi}
                  onChange={(e) => setDiaChi(e.target.value)}
                  placeholder="Địa chỉ"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Trạng thái</FormLabel>
                <Select
                  value={trangThai}
                  placeholder="Trạng thái ..."
                  onChange={handleTrangThai}
                >
                  <Option value={true}>Đi làm</Option>
                  <Option value={false}>Nghỉ làm</Option>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className={clsx(style.right)}>
            <Sheet className={clsx(style.rightTable)} id={"scroll-style-01"}>
              <strong>Danh sách ca trực</strong>
              <Table
                aria-label="table with sticky header"
                stickyHeader
                stickyFooter
                stripe="odd"
                hoverRow
              >
                <thead>
                  <tr>
                    <th>Phòng trực</th>
                    <th>Ngày trực</th>
                    <th>Ca trực</th>
                  </tr>
                </thead>
                <tbody>
                  {caTruc?.map((item, index) => (
                    <tr>
                      <td>{item.phongMay.soPhong}</td>
                      <td>{moment(item.ngayTruc).format("DD-MM-YYYY")}</td>
                      <td>{item.caLam}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={3} style={{ textAlign: "center" }}>
                      <Button onClick={() => setOpenLichTruc(!openLichTruc)}>
                        Cập nhật lịch trực
                      </Button>
                    </td>
                  </tr>
                </tfoot>
              </Table>
            </Sheet>
          </div>
        </div>
        <div className={clsx(style.buttonWrap)}>
          <FormControl>
            <FormLabel>Tìm kiếm</FormLabel>
            <Input
              value={timKiem}
              onChange={(e) => setTimKiem(e.target.value)}
              placeholder="Tên nhân viên"
            />
          </FormControl>
          <Button onClick={() => handleTimKiem()}>Tìm kiếm</Button>
          <Button onClick={() => handleSaveNhanVien()}>Thêm mới</Button>
          <Button onClick={() => handleCapNhatNhanVien()}>Cập nhật</Button>
        </div>
        <Sheet id={"scroll-style-01"} className={clsx(style.tableWrap)}>
          <Table stickyHeader hoverRow aria-label="striped table">
            <thead>
              <tr>
                <th style={{ width: "3%" }}>Id</th>
                <th>Họ tên</th>
                <th>Email</th>
                <th>Số điện thoại</th>
                <th>Giới tính</th>
                <th>Địa chỉ</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {allNhanVien?.map((item, index) => (
                <tr
                  key={index}
                  onClick={() => {
                    setHoTen(item.hoTenNhanVien);
                    setEmail(item.email);
                    setGioiTinh(item.gioiTinh);
                    setDiaChi(item.diaChi);
                    setSDT(item.sdt);
                    setTrangThai(item.trangThai);
                    setNhanVienId(item.id);
                    handleGetCaTrucByNhanVien(item.id);
                  }}
                >
                  <td>{item.id}</td>
                  <td>{item.hoTenNhanVien}</td>
                  <td>{item.email}</td>
                  <td>{item.sdt}</td>
                  <td>{item.gioiTinh ? "Nam" : "Nữ"}</td>
                  <td>{item.diaChi}</td>
                  <td>{item.trangThai ? "Đi làm" : "Nghỉ làm"}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Sheet>
      </div>
      <CapNhatLichTruc
        open={openLichTruc}
        setOpen={setOpenLichTruc}
        nhanVienId={nhanVienId}
        handleGetCaTrucByNhanVien={handleGetCaTrucByNhanVien}
      />
    </>
  );
}
