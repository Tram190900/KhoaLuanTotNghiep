import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import style from "./nhanVien.module.scss";
import {
  getAPI,
  postAPI,
  postAPIWithImg,
  putAPI,
  putApiWithImage,
} from "./../../api/index";
import {
  Avatar,
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
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import PrimarySearchAppBar from "../../components/AppBar/PrimarySearchAppBar";

export default function NhanVien() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [openLichTruc, setOpenLichTruc] = useState(false);

  const [allNhanVien, setAllNhanVien] = useState([]);
  const [caTruc, setCaTruc] = useState([]);

  const [hoTen, setHoTen] = useState("");
  const [email, setEmail] = useState("");
  const [sdt, setSDT] = useState("");
  const [gioiTinh, setGioiTinh] = useState(null);
  const [diaChi, setDiaChi] = useState("");
  const [trangThai, setTrangThai] = useState();
  const [timKiem, setTimKiem] = useState("");
  const [nhanVienId, setNhanVienId] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const inputFileReference = useRef(null);
  const [imageURL, setImageURL] = useState("");
  const [fileImage, setFileImage] = useState();

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
    try {
      const result = await getAPI(`/getNhanVienByTen/${timKiem}`);
      if (result.status === 200) {
        list.push(result.data);
      }
      setAllNhanVien(list);
    } catch (error) {
      console.log(error);
    }
  };

  const checkData = () => {
    if (
      hoTen.trim().length > 0 &&
      email.trim().length > 0 &&
      sdt.trim().length > 0 &&
      diaChi.trim().length > 0
    ) {
      return true;
    } else {
      Swal.fire({
        icon: "error",
        title: "Điền đầy đủ thông tin của nhân viên",
      });
    }
  };

  const handleSaveNhanVien = async () => {
    const check = checkData();
    if (check) {
      const data = new FormData();
      data.append("hoTenNhanVien", hoTen);
      data.append("email", email);
      data.append("sdt", sdt);
      data.append("gioiTinh", gioiTinh);
      data.append("diaChi", diaChi);
      data.append("trangThai", trangThai);
      data.append("file", fileImage);
      const result = await postAPIWithImg("/saveNhanVien", data);
      if (result.status === 200) {
        const tk = {
          tenTaiKhoan: result.data.hoTenNhanVien
            .toLowerCase()
            .trim()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/\W/g, ""),
          role: "nhanvien",
          matKhau: "1111",
          nhanVien: result.data,
        };
        const result2 = await postAPI("/taikhoan/dangKy", tk);
        if (result2.status === 200) {
          Swal.fire({
            text: "Thêm nhân viên mới thành công",
            icon: "success",
          });
        }
        handleGetAllNhanvien();
      }
    }
  };

  const handleCapNhatNhanVien = async () => {
    const check = checkData();
    if (check) {
      const data = new FormData();
      data.append("hoTenNhanVien", hoTen);
      data.append("email", email);
      data.append("sdt", sdt);
      data.append("gioiTinh", gioiTinh);
      data.append("diaChi", diaChi);
      data.append("trangThai", trangThai);
      data.append("file", fileImage);
      const result = await putApiWithImage(
        `updateNhanVien/${nhanVienId}`,
        data
      );
      if (result.status === 200) {
        Swal.fire({
          text: "Cập nhật thông tin nhân viên thành công",
          icon: "success",
        });
        handleGetAllNhanvien();
      }
    }
  };

  const handleGetCaTrucByNhanVien = async (id) => {
    try {
      const result = await getAPI(`/getChamCongByNhanVienOnWeek/${id}`);
      if (result.status === 200) {
        setCaTruc(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetChamCongByNgayTruc = async () => {
    try {
      const data = new FormData();
      data.append("startDate", startDate.format("YYYY-MM-DD"));
      data.append("endDate", endDate.format("YYYY-MM-DD"));
      const result = await postAPI(
        `/getChamCongByNgayTruc/${nhanVienId}`,
        data
      );
      if (result.status === 200) {
        setCaTruc(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const uploadImage = async () => {
    const selectedFile = inputFileReference.current.files[0];
    setFileImage(selectedFile);
    const url = URL.createObjectURL(selectedFile);
    await setImageURL(url);
  };

  useEffect(() => {
    if (startDate && endDate) {
      handleGetChamCongByNgayTruc();
    }
  }, [startDate, endDate]);
  return (
    <>
      <PrimarySearchAppBar/>
      <div className={clsx(style.nhanVien)}>
        <h1>Quản lý nhân viên</h1>
        <div className={clsx(style.infoWrap)}>
          <div className={clsx(style.left)}>
            <div className={clsx(style.left_image_wrap)}>
              <Avatar
                src={
                  imageURL
                    ? `http://localhost:8080/${imageURL}`
                    : "logo192.png"
                }
                alt="avatar"
                sx={{
                  width: "14rem",
                  height: "14rem",
                  marginBottom: "2rem",
                  boxShadow: "2px 2px 10px gray",
                  border: "5px solid white",
                }}
              />
              <Button
                onClick={() => {
                  inputFileReference.current.click();
                }}
                onChange={() => uploadImage()}
              >
                Thay ảnh đại diện
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  ref={inputFileReference}
                />
              </Button>
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
              <span className={clsx(style.search_ngay_truc)}>
                <strong>Danh sách ca trực trong tuần</strong>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoItem components={["DatePicker"]}>
                    <DatePicker
                      value={startDate}
                      onChange={(date) => setStartDate(date)}
                      label="Từ ngày...."
                    />
                  </DemoItem>
                  <DemoItem components={["DatePicker"]}>
                    <DatePicker
                      value={endDate}
                      onChange={(date) => setEndDate(date)}
                      label="Đến ngày"
                    />
                  </DemoItem>
                </LocalizationProvider>
              </span>
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
                    {/* <th>Ca trực</th> */}
                  </tr>
                </thead>
                <tbody>
                  {caTruc?.map((item, index) => (
                    <tr key={index}>
                      <td>{item.phongMay.soPhong}</td>
                      <td>{moment(item.ngayTruc).format("DD-MM-YYYY")}</td>
                      {/* <td>{item.caLam}</td> */}
                    </tr>
                  ))}
                </tbody>
                {user?.role === "admin" ? (
                  <tfoot>
                    <tr>
                      <td colSpan={2} style={{ textAlign: "center" }}>
                        <Button onClick={() => setOpenLichTruc(!openLichTruc)}>
                          Cập nhật lịch trực
                        </Button>
                      </td>
                    </tr>
                  </tfoot>
                ) : null}
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
          {user?.role === "admin" ? (
            <Button onClick={() => handleSaveNhanVien()}>Thêm mới</Button>
          ) : null}
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
                    setImageURL(item.image);
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
