import React, { useContext, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import style from "./nhanVien.module.scss";
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

export default function NhanVien() {
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
    try {
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
            giangVien: null,
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
    } catch (error) {
      console.log(error);
    }
  };

  const handleCapNhatNhanVien = async () => {
    const check = checkData();
    try {
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
    } catch (error) {
      console.log(error);
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
    setImageURL(url);
  };

  useEffect(() => {
    if (startDate && endDate) {
      handleGetChamCongByNgayTruc();
    }
  }, [startDate, endDate]);
  return (
    <div className={clsx(style.nhanVien)}>
      <h1>Quản lý nhân viên</h1>
      <div className={clsx(style.infoWrap, menu.isPhone ? style.isPhone : "")}>
        <div className={clsx(style.left, menu.isPhone ? style.isPhone : "")}>
          <div className={clsx(style.left_image_wrap)}>
            <Avatar
              src={imageURL ? imageURL : "logo192.png"}
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
        <div className={clsx(style.right, menu.isPhone ? style.isPhone : "")}>
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
            <TableContainer component={Paper}>
              <Table aria-label="customized table">
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell>Phòng trực</StyledTableCell>
                    <StyledTableCell>Ngày trực</StyledTableCell>
                    {/* <th>Ca trực</th> */}
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {caTruc?.map((item, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell>{item.phongMay.soPhong}</StyledTableCell>
                      <StyledTableCell>
                        {moment(item.ngayTruc).format("DD-MM-YYYY")}
                      </StyledTableCell>
                      {/* <td>{item.caLam}</td> */}
                    </StyledTableRow>
                  ))}
                </TableBody>
                {user?.role === "admin" ? (
                  <TableFooter>
                    <StyledTableRow>
                      <StyledTableCell
                        colSpan={2}
                        style={{ textAlign: "center" }}
                      >
                        <Button
                          variant="contained"
                          sx={{ textTransform: "capitalize" }}
                          color="warning"
                          onClick={() => setOpenLichTruc(!openLichTruc)}
                        >
                          Cập nhật lịch trực
                        </Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  </TableFooter>
                ) : null}
              </Table>
            </TableContainer>
          </Sheet>
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
        {menu.isPhone ? (
          <>
            <Button
              variant="contained"
              sx={{ textTransform: "capitalize" }}
              color="warning"
              onClick={() => setXemCaTruc(true)}
              disabled={hoTen.trim().length > 0 ? "" : "disabled"}
            >
              Xem ca trực
            </Button>
            <Modal open={xemCaTruc} onClose={() => setXemCaTruc(false)}>
              <ModalDialog sx={{ width: "60%", height: "70%" }}>
                <ModalClose />
                <DialogTitle>Danh sách ca trực trong tuần</DialogTitle>
                <DialogContent>
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
                  <TableContainer component={Paper}>
                    <Table stickyHeader aria-label="customized table">
                      <TableHead>
                        <StyledTableRow>
                          <StyledTableCell>Phòng trực</StyledTableCell>
                          <StyledTableCell>Ngày trực</StyledTableCell>
                          {/* <th>Ca trực</th> */}
                        </StyledTableRow>
                      </TableHead>
                      <TableBody>
                        {caTruc?.map((item, index) => (
                          <StyledTableRow key={index}>
                            <StyledTableCell>
                              {item.phongMay.soPhong}
                            </StyledTableCell>
                            <StyledTableCell>
                              {moment(item.ngayTruc).format("DD-MM-YYYY")}
                            </StyledTableCell>
                            {/* <td>{item.caLam}</td> */}
                          </StyledTableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  {user?.role === "admin" ? (
                    <Button
                      variant="contained"
                      sx={{ textTransform: "capitalize" }}
                      color="warning"
                      onClick={() => {
                        setOpenLichTruc(!openLichTruc);
                        setXemCaTruc(false);
                      }}
                    >
                      Cập nhật lịch trực
                    </Button>
                  ) : null}
                </DialogContent>
              </ModalDialog>
            </Modal>
          </>
        ) : null}
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
                  setHoTen(row.hoTenNhanVien);
                  setEmail(row.email);
                  setGioiTinh(row.gioiTinh);
                  setDiaChi(row.diaChi);
                  setSDT(row.sdt);
                  setTrangThai(row.trangThai);
                  setNhanVienId(row.id);
                  setImageURL(row.image);
                  handleGetCaTrucByNhanVien(row.id);
                }}
                key={index}
              >
                <StyledTableCell component="th" scope="row">
                  {row.id}
                </StyledTableCell>
                <StyledTableCell>{row.hoTenNhanVien}</StyledTableCell>
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
      <CapNhatLichTruc
        open={openLichTruc}
        setOpen={setOpenLichTruc}
        nhanVienId={nhanVienId}
        handleGetCaTrucByNhanVien={handleGetCaTrucByNhanVien}
      />
    </div>
  );
}
