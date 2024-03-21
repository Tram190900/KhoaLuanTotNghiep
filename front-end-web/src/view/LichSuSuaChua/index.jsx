import React, { useEffect, useState } from "react";
import clsx from "clsx";
import style from "./lichSuSuaChua.module.scss";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Option,
  Select,
  Sheet,
  Table,
  Textarea,
} from "@mui/joy";
import { deleteAPI, getAPI, postAPI, putAPI } from "../../api";
import moment from "moment";
import CapNhapNhanVienCTLSSC from "../../components/Modal/CapNhapNhanVienCTLSSC";
import Swal from "sweetalert2";
import ModalNhanVien from "../../components/Chart/Top5PhongBiLoiNhieu/ModalNhanVien";

export default function LichSuSuaChua() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [openCapNhapNhanVien, setOpenCapNhapNhanVien] = useState(false);
  const [chiTietLichSuSuaChuas, setChiTietLichSuSuaChuas] = useState([]);
  const [chiTietLichSuSuaChua, setChiTietLichSuSuaChua] = useState({});
  const [allToaNha, setAllToaNha] = useState([]);
  const [selectToaNha, setSelectToaNha] = useState(null);

  const [phongMay, setPhongMay] = useState([]);
  const [selectPhongMay, setSelectPhongMay] = useState(null);

  const [allMayTinh, setAllMayTinh] = useState([]);
  const [selectMayTinh, setSelectMayTinh] = useState(null);

  const [nhanVien, setNhanVien] = useState({});
  const [trangThai, setTrangthai] = useState(null);

  const [duLieuVao, setDuLieuVao] = useState({
    mayTinhId: "",
    loiGapPhai: "",
    ngayGapLoi: "",
    ghiChu: null,
    trangThai: null,
    chiTietLichSuSuaLoiId: "",
    lichSuSuaChuaId: "",
  });

  useEffect(() => {
    handleGetAllToaNha();
  }, []);

  const xemDanhSachChiTietLichSuSuaChua = async (soMay) => {
    const result = await getAPI(`/chiTietLichSuSuaChua/${soMay}`);
    if (result.status === 200) {
      setChiTietLichSuSuaChuas(result.data);
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
    setTrangthai(newValue);
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

  // const getMayTinhById = async (id) => {
  //   try {
  //     const result = await getAPI(`/getMayTinhById/${id}`);
  //     return result.data; // Assuming your API response contains the needed data
  //   } catch (error) {
  //     console.error(error);
  //     return null; // Handle the error if needed
  //   }
  // };

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
      nhanVien: { id: user.nhanVien.id },
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

  // const xoaChiTietLichSuSuaChua = () => {
  //   Swal.fire({
  //     text: "Bạn có chắc muốn xóa",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Có",
  //   }).then(async (result) => {
  //     if (result.isConfirmed) {
  //       await deleteAPI(`/chiTietLichSuSuaChua/${chiTietLichSuSuaChua.id}`)
  //         .then(() => {
  //           Swal.fire({
  //             text: "Xóa lịch sử sửa chữa thành công",
  //             icon: "success",
  //           });
  //           xemDanhSachChiTietLichSuSuaChua();
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //         });
  //     }
  //   });
  // };

  // const capNhapChiTietLichSuSuaChua = async () => {
  //   Swal.fire({
  //     text: "Bạn có chắc muốn cập nhập?",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Có",
  //   }).then(async (result) => {
  //     if (result.isConfirmed) {
  //       chiTietLichSuSuaChua.ghiChu = duLieuVao.ghiChu;
  //       chiTietLichSuSuaChua.mayTinhId = Number(selectMayTinh.id);
  //       chiTietLichSuSuaChua.loiGapPhai = duLieuVao.loiGapPhai;
  //       chiTietLichSuSuaChua.ngayGapLoi = duLieuVao.ngayGapLoi;
  //       chiTietLichSuSuaChua.chiTietLichSuSuaLoiId =
  //         duLieuVao.chiTietLichSuSuaLoiId;
  //       await putAPI(
  //         `/chiTietLichSuSuaChua/${duLieuVao.chiTietLichSuSuaLoiId}`,
  //         chiTietLichSuSuaChua
  //       )
  //         .then(() => {
  //           Swal.fire({
  //             text: "Cập nhập lịch sử sửa chữa thành công",
  //             icon: "success",
  //           });
  //           xemDanhSachChiTietLichSuSuaChua();
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //         });
  //     }
  //   });
  // };

  console.log(chiTietLichSuSuaChua);

  return (
    <>
      <div className={clsx(style.lichSuSuaChua)}>
        <h1>LỊCH SỬ SỬA CHỮA</h1>
        <div className={clsx(style.infoWrap)}>
          <div className={clsx(style.left)}>
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
              <FormControl className="w-50">
                <FormLabel>Số máy</FormLabel>
                <Select
                  onChange={handleMayTinh}
                  value={selectMayTinh}
                  name="soMay"
                  placeholder="Số máy..."
                >
                  {allMayTinh?.map((item, index) => (
                    <Option value={item} key={index}>
                      {item.soMay}
                    </Option>
                  ))}
                </Select>
                {/* <Input
                id="soMay"
                value={duLieuVao.soMay}
                onChange={(e) => onInputChange(e)}
                name="soMay"
                placeholder="Máy tính"
              /> */}
              </FormControl>
            </div>

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
              <FormLabel>Ngày gặp lỗi</FormLabel>
              <Input
                id="ngayGapLoi"
                onChange={(e) => onInputChange(e)}
                name="ngayGapLoi"
                type="date"
                placeholder="Ngày gặp lỗi"
                value={duLieuVao.ngayGapLoi}
                disabled
              />
            </FormControl>
            <FormControl>
              <FormLabel>Trạng thái</FormLabel>
              <Select
                value={duLieuVao.trangThai}
                onChange={(e) => {
                  onInputChange(e);
                }}
                name="trangThai"
                disabled
              >
                <Option value={true}>Đã sửa</Option>
                <Option value={false}>Chưa sửa</Option>
              </Select>
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
          <div className={clsx(style.right)}>
            <Sheet className={clsx(style.rightTable)} id={"scroll-style-01"}>
              <strong>Nhân viên sửa chữa</strong>
              <Table
                aria-label="table with sticky header"
                stickyHeader
                stickyFooter
                stripe="odd"
                hoverRow
              >
                <thead>
                  <tr>
                    <th>Tên nhân viên</th>
                    <th>Ngày sửa lỗi</th>
                  </tr>
                </thead>
                <tbody>
                  {chiTietLichSuSuaChua?.nhan_vien_id != null ? (
                    <td>{nhanVien.hoTenNhanVien}</td>
                  ) : (
                    <td></td>
                  )}
                  {chiTietLichSuSuaChua.ngay_sua_loi != null && (
                    <td>
                      {moment(chiTietLichSuSuaChua.ngay_sua_loi).format(
                        "DD-MM-YYYY"
                      )}
                    </td>
                  )}
                </tbody>
                {user?.role === "admin" && chiTietLichSuSuaChua!==null && !chiTietLichSuSuaChua.trang_thai ? (
                  <tfoot>
                    <tr>
                      <td colSpan={2} style={{ textAlign: "center" }}>
                        <Button onClick={()=>setOpenCapNhapNhanVien(true)}>Chỉ định nhân viên sửa</Button>
                      </td>
                    </tr>
                  </tfoot>
                ) : null}
              </Table>
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
            onClick={() => luuChiTietLichSuSuaChua()}
            disabled={duLieuVao.trangThai ? "disabled" : ""}
          >
            Cập nhật sửa lỗi
          </Button>
        </div>
        <Sheet id={"scroll-style-01"}>
          <Table stickyHeader hoverRow aria-label="striped table">
            <thead>
              <tr>
                <th>Máy tính</th>
                <th>Lỗi gặp phải</th>
                <th>Ngày gặp lỗi</th>
                <th>Mức độ</th>
                <th>Trạng thái</th>
                <th>Ghi chú</th>
              </tr>
            </thead>
            <tbody>
              {chiTietLichSuSuaChuas.map((item, index) => {
                return (
                  <tr
                    className={clsx(
                      style.checkDate,
                      moment().diff(
                        moment(item.ngay_du_kien_sua),
                        "days"
                      ) === 0&&
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
                      });
                      getNhanVienById(item.nhan_vien_id);
                    }}
                  >
                    <td>{item.so_may}</td>
                    <td>{item.loi_gap_phai}</td>
                    <td>{moment(item.ngay_gap_loi).format("DD-MM-YYYY")}</td>
                    <td
                      className={clsx(
                        style.mucDo,
                        item.muc_do_loi === 3 && style.actionCao,
                        item.muc_do_loi === 2 && style.actionVua,
                        item.muc_do_loi === 1 && style.actionThap
                      )}
                    >
                      {item?.muc_do_loi}
                    </td>
                    <td>{item?.trang_thai ? "Đã sửa" : "Chưa sửa"}</td>
                    <td>{item?.ghi_chu}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Sheet>
      </div>
      <CapNhapNhanVienCTLSSC
        open={openCapNhapNhanVien}
        setOpen={setOpenCapNhapNhanVien}
        chiTietLichSuSuaChua={chiTietLichSuSuaChua}
      />
      <ModalNhanVien
        open={openCapNhapNhanVien}
        setOpen={setOpenCapNhapNhanVien}
        lichSuId={chiTietLichSuSuaChua.id}
        soMay={chiTietLichSuSuaChua.so_may}
      />
    </>
  );
}
