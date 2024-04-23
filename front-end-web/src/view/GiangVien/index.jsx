import React, { useContext, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import style from "./giangvien.module.scss";
import {
  getAPI,
  postAPI,
  postAPIWithImg,
  putApiWithImage,
} from "./../../api/index";
import {
  Avatar,
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalClose,
  ModalDialog,
  Option,
  Select,
  Sheet,
} from "@mui/joy";
import CapNhatLichTruc from "../../components/Modal/CapNhatLichTruc";
import Swal from "sweetalert2";
import moment from "moment";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableFooter from "@mui/material/TableFooter";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { MenuContext } from "../../App";

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

export default function GiangVien() {
  const menu = useContext(MenuContext);
  const user = JSON.parse(localStorage.getItem("user"));
  const [openLichTruc, setOpenLichTruc] = useState(false);
  const [xemCaTruc, setXemCaTruc] = useState(false);

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
    const result = await getAPI("/giangVien/getAllGiangVien");
    if (result.status === 200) {
      setAllNhanVien(result.data);
    }
  };

  const handleTimKiem = async () => {
    const list = [];
    try {
      const result = await getAPI(`/giangVien/getGiangVienByTen/${timKiem}`);
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
        title: "Điền đầy đủ thông tin của giảng viên",
      });
    }
  };

  const handleSaveNhanVien = async () => {
    const check = checkData();
    try {
      if (check) {
        const data = new FormData();
        data.append("tenGiangVien", hoTen);
        data.append("email", email);
        data.append("sdt", sdt);
        data.append("gioiTinh", gioiTinh);
        data.append("diaChi", diaChi);
        data.append("trangThai", trangThai);
        data.append("file", fileImage);
        const result = await postAPIWithImg("/giangVien/saveGiangVien", data);
        if (result.status === 200) {
          const tk = {
            tenTaiKhoan: result.data.tenGiangVien
              .toLowerCase()
              .trim()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .replace(/\W/g, ""),
            role: "giangvien",
            matKhau: "1111",
            nhanVien: null,
            giangVien: result.data
          };
          const result2 = await postAPI("/taikhoan/dangKy", tk);
          if (result2.status === 200) {
            Swal.fire({
              text: "Thêm giảng viên mới thành công",
              icon: "success",
            });
          }
          handleGetAllNhanvien();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCapNhatNhanVien = async () => {
    const check = checkData();
    if (check) {
      const data = new FormData();
      data.append("tenGiangVien", hoTen);
      data.append("email", email);
      data.append("sdt", sdt);
      data.append("gioiTinh", gioiTinh);
      data.append("diaChi", diaChi);
      data.append("trangThai", trangThai);
      data.append("file", fileImage);
      const result = await putApiWithImage(
        `/giangVien/updateGiangVien/${nhanVienId}`,
        data
      );
      if (result.status === 200) {
        Swal.fire({
          text: "Cập nhật thông tin giảng viên thành công",
          icon: "success",
        });
        handleGetAllNhanvien();
      }
    }
  };

  const uploadImage = async () => {
    const selectedFile = inputFileReference.current.files[0];
    setFileImage(selectedFile);
    const url = URL.createObjectURL(selectedFile);
    setImageURL(url);
  };

  return (
    <div className={clsx(style.nhanVien)}>
      <h1>Quản lý giảng viên</h1>
      <div className={clsx(style.infoWrap, menu.isPhone ? style.isPhone : "")}>
        <div className={clsx(style.left, menu.isPhone ? style.isPhone : "")}>
          <div className={clsx(style.left_image_wrap)}>
            <Avatar
              src={
                imageURL ||
                `http://103.130.215.37:8080/${imageURL}` ||
                "logo192.png"
              }
              alt="avatar"
              sx={{
                width: "10rem",
                height: "10rem",
                marginBottom: "2rem",
                boxShadow: "2px 2px 10px gray",
                border: "5px solid white",
              }}
            />
            <Button
              variant="contained"
              sx={{ textTransform: "capitalize" }}
              color="warning"
              onClick={() => {
                inputFileReference.current.click();
              }}
              onChange={() => uploadImage()}
              disabled={hoTen.trim().length > 0 ? "" : "disabled"}
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
            <div className={clsx(style.left_infor_left)}>
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
            </div>
            <div className={clsx(style.left_infor_right)}>
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
        </div>
      </div>
      <div className={clsx(style.buttonWrap, "pb-3")}>
        <FormControl>
          <FormLabel>Tìm kiếm</FormLabel>
          <Input
            value={timKiem}
            onChange={(e) => setTimKiem(e.target.value)}
            placeholder="Tên nhân viên"
          />
        </FormControl>
        <br></br>
        <Button
          variant="contained"
          sx={{ textTransform: "capitalize" }}
          onClick={() => handleTimKiem()}
        >
          Tìm kiếm
        </Button>
        {user?.role === "admin" ? (
          <Button
            variant="contained"
            sx={{ textTransform: "capitalize" }}
            onClick={() => handleSaveNhanVien()}
          >
            Thêm mới
          </Button>
        ) : null}
        <Button
          variant="contained"
          sx={{ textTransform: "capitalize" }}
          color="warning"
          onClick={() => handleCapNhatNhanVien()}
          disabled={hoTen.trim().length > 0 ? "" : "disabled"}
        >
          Cập nhật
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Id</StyledTableCell>
              <StyledTableCell>Họ tên</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Số điện thoại</StyledTableCell>
              <StyledTableCell>Giới tính</StyledTableCell>
              <StyledTableCell>Địa chỉ</StyledTableCell>
              <StyledTableCell>Trạng thái</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allNhanVien?.map((row, index) => (
              <StyledTableRow
                onClick={() => {
                  setHoTen(row.tenGiangVien);
                  setEmail(row.email);
                  setGioiTinh(row.gioiTinh);
                  setDiaChi(row.diaChi);
                  setSDT(row.sdt);
                  setTrangThai(row.trangThai);
                  setNhanVienId(row.id);
                  setImageURL(row.image);
                }}
                key={index}
              >
                <StyledTableCell component="th" scope="row">
                  {row.id}
                </StyledTableCell>
                <StyledTableCell>{row.tenGiangVien}</StyledTableCell>
                <StyledTableCell>{row.email}</StyledTableCell>
                <StyledTableCell>{row.sdt}</StyledTableCell>
                <StyledTableCell>{row.gioiTinh ? "Nam" : "Nữ"}</StyledTableCell>
                <StyledTableCell>{row.diaChi}</StyledTableCell>
                <StyledTableCell>
                  {row.trangThai ? "Đi làm" : "Nghỉ làm"}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
