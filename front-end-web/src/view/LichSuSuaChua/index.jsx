import React, { useContext, useEffect, useState } from "react";
import clsx from "clsx";
import style from "./lichSuSuaChua.module.scss";
import {
  FormControl,
  FormLabel,
  Input,
  Option,
  Select,
  Sheet,
  Textarea,
} from "@mui/joy";
import { getAPI, postAPI } from "../../api";
import moment from "moment";
import Swal from "sweetalert2";
import ModalNhanVien from "../../components/Chart/Top5PhongBiLoiNhieu/ModalNhanVien";
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

export default function LichSuSuaChua() {
  const user = JSON.parse(localStorage.getItem("user"));
  const date = new Date();
  const defaultValue = date.toLocaleDateString("en-CA");
  const menu = useContext(MenuContext);

  const [openCapNhapNhanVien, setOpenCapNhapNhanVien] = useState(false);
  const [chiTietLichSuSuaChuas, setChiTietLichSuSuaChuas] = useState([]);
  const [chiTietLichSuSuaChua, setChiTietLichSuSuaChua] = useState({});
  const [allToaNha, setAllToaNha] = useState([]);
  const [selectToaNha, setSelectToaNha] = useState(1);

  const [phongMay, setPhongMay] = useState([]);
  const [selectPhongMay, setSelectPhongMay] = useState(null);

  const [allMayTinh, setAllMayTinh] = useState([]);
  const [selectMayTinh, setSelectMayTinh] = useState(null);
  const [giangVien, setGiangVien] = useState({});

  const [nhanVien, setNhanVien] = useState({});

  const [duLieuVao, setDuLieuVao] = useState({
    mayTinhId: "",
    loiGapPhai: "",
    ngayGapLoi: defaultValue,
    ngayDuKienSua: defaultValue,
    ghiChu: "",
    trangThai: null,
    chiTietLichSuSuaLoiId: "",
    lichSuSuaChuaId: "",
  });

  useEffect(() => {
    handleGetAllToaNha();
    handleGetPhongMayTheoToaNha(selectToaNha);
  }, []);

  const handleFilterLichSu = async () => {
    try {
      const dt = new FormData();
      dt.append("phongMayId", selectPhongMay.id);
      dt.append("ngayGapLoi", duLieuVao.ngayGapLoi);
      dt.append("ngayDuKienSua", duLieuVao.ngayDuKienSua);
      dt.append("trangThai", duLieuVao.trangThai);
      const result = await postAPI("/chiTietLichSuSuaChua/filterLichSuLoi", dt);
      if (result.status === 200) {
        await setChiTietLichSuSuaChuas(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const xemDanhSachChiTietLichSuSuaChua = async (soMay) => {
    try {
      const result = await getAPI(`/chiTietLichSuSuaChua/${soMay}`);
      if (result.status === 200) {
        setChiTietLichSuSuaChuas(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const xemDanhSachChiTietLichSuSuaChuTheoPhong = async (phongId) => {
    try {
      const result = await getAPI(
        `/chiTietLichSuSuaChua/getByPhongMay/${phongId}`
      );
      if (result.status === 200) {
        setChiTietLichSuSuaChuas(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
      const result = await getAPI(`/xemDanhSachPhongMayTheoToaNha/${value}`);
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
        setAllMayTinh(result.data);
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
      xemDanhSachChiTietLichSuSuaChuTheoPhong(newValue.id);
    }
  };

  const handleMayTinh = (event, newValue) => {
    setSelectMayTinh(newValue);
    if (newValue) {
      xemDanhSachChiTietLichSuSuaChua(newValue.id);
    }
  };

  const handleTrangThai = (event, newValue) => {
    setDuLieuVao((prevState) => ({
      ...prevState,
      trangThai: newValue, // replace newValue with the value you want to set trangThai to
    }));
  };

  const onInputChange = (e) => {
    setDuLieuVao({ ...duLieuVao, [e.target.name]: e.target.value });
  };

  const getNhanVienById = async (id) => {
    if (id) {
      try {
        const result = await getAPI(`/getNhanVienById/${id}`);
        if (result.status === 200) {
          setNhanVien(result.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getGiangVienById = async (id) => {
    if (id) {
      try {
        const result = await getAPI(`/giangVien/${id}`);
        if (result.status === 200) {
          setGiangVien(result.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const luuChiTietLichSuSuaChua = async () => {
    const lichSuSuaChua = {
      id: Number(duLieuVao.lichSuSuaChuaId),
      loiGapPhai: duLieuVao.loiGapPhai,
      ngayGapLoi: duLieuVao.ngayGapLoi,
      mayTinh: {
        id: duLieuVao.mayTinhId,
      },
      trangThai: duLieuVao.trangThai,
      mucDoLoi: duLieuVao.mucDoLoi,
      ngayDuKienSua: duLieuVao.ngayDuKienSua,
      // nhanVien: { id: user.nhanVien.id },
    };
    const chiTietLichSuSuaChua = {
      ghiChu: duLieuVao.ghiChu,
      ngaySuaLoi: moment().format("YYYY-MM-DD"),
      lichSuSuaChua: lichSuSuaChua,
    };
    try {
      const result = await postAPI(
        "/chiTietLichSuSuaChua",
        chiTietLichSuSuaChua
      );
      if (result.status === 200) {
        Swal.fire({
          text: "Thêm lịch sửa máy tính thành công",
          icon: "success",
          confirmButtonText: "OK",
        });
        setDuLieuVao({ ghiChu: "" });
        if (selectMayTinh) {
          xemDanhSachChiTietLichSuSuaChua(selectMayTinh.soMay);
        } else if (selectPhongMay) {
          xemDanhSachChiTietLichSuSuaChuTheoPhong(selectPhongMay.id);
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

  const luuChiTietLichSuSuaChuaHong = async () => {
    const lichSuSuaChua = {
      id: Number(duLieuVao.lichSuSuaChuaId),
      loiGapPhai: duLieuVao.loiGapPhai,
      ngayGapLoi: duLieuVao.ngayGapLoi,
      mayTinh: {
        id: duLieuVao.mayTinhId,
      },
      trangThai: duLieuVao.trangThai,
      mucDoLoi: duLieuVao.mucDoLoi,
      ngayDuKienSua: duLieuVao.ngayDuKienSua,
      // nhanVien: { id: user.nhanVien.id },
    };
    const chiTietLichSuSuaChua = {
      ghiChu: duLieuVao.ghiChu,
      ngaySuaLoi: moment().format("YYYY-MM-DD"),
      lichSuSuaChua: lichSuSuaChua,
    };
    try {
      const result = await postAPI(
        "/chiTietLichSuSuaChua/hong",
        chiTietLichSuSuaChua
      );
      if (result.status === 200) {
        Swal.fire({
          text: "Thêm lịch sửa máy tính thành công",
          icon: "success",
          confirmButtonText: "OK",
        });
        setDuLieuVao({ ghiChu: "" });
        if (selectMayTinh) {
          xemDanhSachChiTietLichSuSuaChua(selectMayTinh.soMay);
        } else if (selectPhongMay) {
          xemDanhSachChiTietLichSuSuaChuTheoPhong(selectPhongMay.id);
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

  return (
    <div className={clsx(style.lichSuSuaChua, "p-3")}>
      <h1>Lịch sửa báo lỗi</h1>
      <div className={clsx(style.infoWrap, menu.isPhone ? style.isPhone : "")}>
        <div className={clsx(style.left, menu.isPhone ? style.isPhone : "")}>
          <div className="d-flex">
            <FormControl className="w-50">
              <FormLabel>Tòa nhà</FormLabel>
              <Select
                value={selectToaNha}
                onChange={handleToaNha}
                placeholder="Tòa nhà..."
              >
                {allToaNha?.map((item, index) => (
                  <Option value={item.id} key={index}>
                    {item.tenToaNha}
                  </Option>
                ))}
              </Select>
            </FormControl>
            <FormControl className="w-50">
              <FormLabel>Số phòng</FormLabel>
              <Select
                key={selectPhongMay}
                value={selectPhongMay}
                onChange={handlePhongMay}
                placeholder="Số phòng..."
              >
                {phongMay?.map((item, index) => (
                  <Option key={index.id} value={item}>
                    {item.soPhong}
                  </Option>
                ))}
              </Select>
            </FormControl>
          </div>

          <div style={{ flexDirection: "row", display: "flex" }}>
            <FormControl style={{ width: "50%" }}>
              <FormLabel>Ngày gặp lỗi</FormLabel>
              <Input
                id="ngayGapLoi"
                onChange={(e) => onInputChange(e)}
                name="ngayGapLoi"
                type="date"
                placeholder="Ngày gặp lỗi"
                value={duLieuVao.ngayGapLoi}
              />
            </FormControl>
            <FormControl style={{ width: "50%" }}>
              <FormLabel>Ngày dự kiến sửa</FormLabel>
              <Input
                id="ngayDuKienSua"
                onChange={(e) => onInputChange(e)}
                name="ngayDuKienSua"
                type="date"
                placeholder="Ngày dự kiến sửa"
                value={duLieuVao.ngayDuKienSua}
              />
            </FormControl>
          </div>

          <FormControl>
            <FormLabel>Trạng thái</FormLabel>
            <Select
              value={duLieuVao.trangThai}
              onChange={handleTrangThai}
              name="trangThai"
            >
              <Option value={true}>Đã sửa</Option>
              <Option value={false}>Chưa sửa</Option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Lỗi gặp phải</FormLabel>
            <Input
              id="loiGapPhai"
              onChange={(e) => onInputChange(e)}
              name="loiGapPhai"
              placeholder="Lỗi gặp phải"
              value={duLieuVao.loiGapPhai}
              disabled
            />
          </FormControl>
          <FormControl>
            <FormLabel>Ghi chú</FormLabel>
            <Textarea
              onChange={(e) => onInputChange(e)}
              name="ghiChu"
              minRows={3}
              placeholder="Ghi chú…"
              value={duLieuVao.ghiChu}
              disabled={duLieuVao.trangThai ? "disabled" : ""}
            />
          </FormControl>
        </div>
        <div className={clsx(style.right, menu.isPhone ? style.isPhone : "")}>
          <Sheet className={clsx(style.rightTable)} id={"scroll-style-01"}>
            <TableContainer>
              <Table aria-label="customized table">
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell>Nhân viên phụ trách</StyledTableCell>
                    <StyledTableCell>Giảng viên báo lỗi</StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {chiTietLichSuSuaChua?.nhan_vien_id != null ? (
                    <StyledTableCell>{nhanVien.hoTenNhanVien}</StyledTableCell>
                  ) : null}
                  {chiTietLichSuSuaChua?.giang_vien_id != null ? (
                    <StyledTableCell>{giangVien.tenGiangVien}</StyledTableCell>
                  ) : null}
                </TableBody>
                {user?.role === "admin" &&
                chiTietLichSuSuaChua !== null &&
                !chiTietLichSuSuaChua.trang_thai ? (
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
                          onClick={() => setOpenCapNhapNhanVien(true)}
                        >
                          Chỉ định nhân viên sửa
                        </Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  </TableFooter>
                ) : null}
              </Table>
            </TableContainer>
          </Sheet>
          <div className={clsx(style.notes)}>
            <b>Chú thích thêm:</b>
            <span className={clsx(style.notes_thap)}>
              Lỗi phải sửa trong ngày
            </span>
            <span className={clsx(style.notes_cao)}>
              Lỗi không để quá <strong>&nbsp;7 ngày&nbsp;</strong>
            </span>
            <span className={clsx(style.notes_khac)}>
              Lỗi không để quá <strong>&nbsp;30 ngày&nbsp;</strong>
            </span>
            <span className={clsx(style.notes_baoDo)}>
              Lỗi phải sửa trong ngày
            </span>
          </div>
        </div>
      </div>
      <div className={clsx(style.searchWrap)}>
        <Button
          variant="contained"
          sx={{ textTransform: "capitalize" }}
          onClick={() => handleFilterLichSu()}
        >
          Tìm kiếm
        </Button>
        <Button
          variant="contained"
          sx={{ textTransform: "capitalize" }}
          color="warning"
          onClick={() => luuChiTietLichSuSuaChua()}
          disabled={duLieuVao.trangThai ? "disabled" : ""}
        >
          Cập nhật sửa lỗi
        </Button>

        <Button
          variant="contained"
          sx={{ textTransform: "capitalize" }}
          color="error"
          onClick={() => luuChiTietLichSuSuaChuaHong()}
          disabled={duLieuVao.trangThai ? "disabled" : ""}
        >
          Báo hỏng
        </Button>
      </div>
      <TableContainer component={Paper} className={clsx(style.tableLSL, menu.isPhone ? style.isPhone : '')}>
        <Table stickyHeader aria-label="customized table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Máy tính</StyledTableCell>
              <StyledTableCell>Lỗi gặp phải</StyledTableCell>
              <StyledTableCell>Ngày gặp lỗi</StyledTableCell>
              <StyledTableCell>Ngày dự kiến sửa</StyledTableCell>
              <StyledTableCell>Ngày sửa thực tế</StyledTableCell>
              <StyledTableCell>Mức độ</StyledTableCell>
              <StyledTableCell>Trạng thái</StyledTableCell>
              <StyledTableCell>Ghi chú</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {chiTietLichSuSuaChuas.map((item, index) => {
              return (
                <StyledTableRow
                  className={clsx(
                    style.checkDate,
                    moment().diff(moment(item.ngay_du_kien_sua), "days") ===
                      0 &&
                      !item.trang_thai &&
                      style.suaGap
                  )}
                  key={index}
                  onClick={() => {
                    setChiTietLichSuSuaChua(item);
                    setDuLieuVao({
                      mayTinhId: item.may_tinh_id,
                      loiGapPhai: item.loi_gap_phai,
                      ngayGapLoi: moment(item.ngay_gap_loi).format(
                        "YYYY-MM-DD"
                      ),
                      ghiChu: item.ghi_chu,
                      trangThai: item.trang_thai,
                      lichSuSuaChuaId: item.id,
                      chiTietLichSuSuaLoiId: item.chi_tiet_sua_chua_id,
                      ngayDuKienSua: moment(item.ngay_du_kien_sua).format(
                        "YYYY-MM-DD"
                      ),
                    });
                    getNhanVienById(item.nhan_vien_id);
                    getGiangVienById(item.giang_vien_id);
                  }}
                >
                  <StyledTableCell>{item.so_may}</StyledTableCell>
                  <StyledTableCell>{item.loi_gap_phai}</StyledTableCell>
                  <StyledTableCell>
                    {moment(item.ngay_gap_loi).format("DD-MM-YYYY")}
                  </StyledTableCell>
                  <StyledTableCell>
                    {moment(item.ngay_du_kien_sua).format("DD-MM-YYYY")}
                  </StyledTableCell>
                  <StyledTableCell>
                    {moment(item.ngay_sua_loi).format("DD-MM-YYYY")}
                  </StyledTableCell>
                  <StyledTableCell
                    className={clsx(
                      style.mucDo,
                      item.muc_do_loi === 3 && style.actionCao,
                      item.muc_do_loi === 2 && style.actionVua,
                      item.muc_do_loi === 1 && style.actionThap
                    )}
                  >
                    {item?.muc_do_loi}
                  </StyledTableCell>
                  <StyledTableCell>
                    {item?.trang_thai ? "Đã sửa" : "Chưa sửa"}
                  </StyledTableCell>
                  <StyledTableCell>{item?.ghi_chu}</StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <ModalNhanVien
        open={openCapNhapNhanVien}
        setOpen={setOpenCapNhapNhanVien}
        lichSuId={chiTietLichSuSuaChua.id}
        soMay={chiTietLichSuSuaChua.so_may}
        handleFilterLichSu={handleFilterLichSu}
        getNhanVienById={getNhanVienById}
      />
    </div>
  );
}
