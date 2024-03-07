import React, { useEffect, useState } from "react";
import clsx from "clsx";
import style from "./lichSuSuaChua.module.scss";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Sheet,
  Table,
  Textarea,
} from "@mui/joy";
import { deleteAPI, getAPI, postAPI, putAPI } from "../../api";
import moment from "moment";
import CapNhapNhanVienCTLSSC from "../../components/Modal/CapNhapNhanVienCTLSSC";
import Swal from "sweetalert2";

export default function LichSuSuaChua() {
  const [openCapNhapNhanVien, setOpenCapNhapNhanVien] = useState(false);
  const [chiTietLichSuSuaChuas, setChiTietLichSuSuaChuas] = useState([]);
  const [chiTietLichSuSuaChua, setChiTietLichSuSuaChua] = useState({});
  const [duLieuVao, setDuLieuVao] = useState({
    soMay: "",
    loiGapPhai: "",
    ngayGapLoi: "",
    ghiChu: "",
  });

  const xemDanhSachChiTietLichSuSuaChua = async () => {
    const result = await getAPI("/chiTietLichSuSuaChua");
    if (result.status === 200) {
      setChiTietLichSuSuaChuas(result.data);
    }
  };

  useEffect(() => {
    xemDanhSachChiTietLichSuSuaChua();
  }, []);

  const onInputChange = (e) => {
    setDuLieuVao({ ...duLieuVao, [e.target.name]: e.target.value });
  };

  const luuChiTietLichSuSuaChua = async () => {
    const lichSuSuaChua = {
      loiGapPhai: duLieuVao.loiGapPhai,
      ngayGapLoi: duLieuVao.ngayGapLoi,
      mayTinh: {
        soMay: duLieuVao.soMay,
      },
    };
    const chiTietLichSuSuaChua = {
      ghiChu: duLieuVao.ghiChu,
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
        xemDanhSachChiTietLichSuSuaChua();
      }
    } catch (error) {
      Swal.fire({
        text: error.response.data,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const xoaChiTietLichSuSuaChua = () => {
    Swal.fire({
      text: "Bạn có chắc muốn xóa",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Có",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteAPI(`/chiTietLichSuSuaChua/${chiTietLichSuSuaChua.id}`)
          .then(() => {
            Swal.fire({
              text: "Xóa lịch sử sửa chữa thành công",
              icon: "success",
            });
            xemDanhSachChiTietLichSuSuaChua();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  const capNhapChiTietLichSuSuaChua = async () => {
    Swal.fire({
      text: "Bạn có chắc muốn cập nhập?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Có",
    }).then(async (result) => {
      if (result.isConfirmed) {
        chiTietLichSuSuaChua.ghiChu = duLieuVao.ghiChu;
        chiTietLichSuSuaChua.lichSuSuaChua.mayTinh.soMay = duLieuVao.soMay;
        chiTietLichSuSuaChua.lichSuSuaChua.loiGapPhai = duLieuVao.loiGapPhai;
        chiTietLichSuSuaChua.lichSuSuaChua.ngayGapLoi = duLieuVao.ngayGapLoi;
        await putAPI(
          `/chiTietLichSuSuaChua/${chiTietLichSuSuaChua.id}`,
          chiTietLichSuSuaChua
        )
          .then(() => {
            Swal.fire({
              text: "Cập nhập lịch sử sửa chữa thành công",
              icon: "success",
            });
            xemDanhSachChiTietLichSuSuaChua();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  console.log(chiTietLichSuSuaChua);

  return (
    <>
      <div className={clsx(style.lichSuSuaChua)}>
        <h1>LỊCH SỬ SỬA CHỮA</h1>
        <div className={clsx(style.infoWrap)}>
          <div className={clsx(style.left)}>
            <FormControl>
              <FormLabel>Máy tính</FormLabel>
              <Input
                id="soMay"
                value={duLieuVao.soMay}
                onChange={(e) => onInputChange(e)}
                name="soMay"
                placeholder="Máy tính"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Lỗi gặp phải</FormLabel>
              <Input
                id="loiGapPhai"
                onChange={(e) => onInputChange(e)}
                name="loiGapPhai"
                placeholder="Lỗi gặp phải"
                value={duLieuVao.loiGapPhai}
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
                    <th>Id</th>
                    <th>Tên nhân viên</th>
                    <th>Ngày sửa lỗi</th>
                  </tr>
                </thead>
                <tbody>
                  {chiTietLichSuSuaChua.nhanVien != null ? (
                    <td>{chiTietLichSuSuaChua.nhanVien.id}</td>
                  ) : (
                    <td></td>
                  )}
                  {chiTietLichSuSuaChua.nhanVien != null ? (
                    <td>{chiTietLichSuSuaChua.nhanVien.hoTenNhanVien}</td>
                  ) : (
                    <td></td>
                  )}
                  {chiTietLichSuSuaChua.ngaySuaLoi != null && (
                    <td>
                      {moment(chiTietLichSuSuaChua.ngaySuaLoi).format(
                        "DD-MM-YYYY"
                      )}
                    </td>
                  )}
                </tbody>
              </Table>
            </Sheet>
          </div>
        </div>
        <div className={clsx(style.searchWrap)}>
          <Button onClick={() => capNhapChiTietLichSuSuaChua()}>
            Cập nhật
          </Button>
        </div>
        <Sheet id={"scroll-style-01"}>
          <Table stickyHeader hoverRow aria-label="striped table">
            <thead>
              <tr>
                <th>Máy tính</th>
                <th>Lỗi gặp phải</th>
                <th>Ngày gặp lỗi</th>
                <th>Ngày sửa</th>
                <th>Trang thái</th>
                <th>Ghi chú</th>
                <th>Thời gian chờ</th>
              </tr>
            </thead>
            <tbody>
              {chiTietLichSuSuaChuas.map((chiTietLichSuSuaChua, index) => (
                <tr
                  key={index}
                  onClick={() => {
                    setChiTietLichSuSuaChua(chiTietLichSuSuaChua);
                    setDuLieuVao({
                      soMay: chiTietLichSuSuaChua.lichSuSuaChua.mayTinh.soMay,
                      loiGapPhai: chiTietLichSuSuaChua.lichSuSuaChua.loiGapPhai,
                      ngayGapLoi: moment(
                        chiTietLichSuSuaChua.lichSuSuaChua.ngayGapLoi
                      ).format("YYYY-MM-DD"),
                      ghiChu: chiTietLichSuSuaChua.ghiChu,
                    });
                  }}
                >
                  <td>{chiTietLichSuSuaChua.id}</td>
                  <td>{chiTietLichSuSuaChua.lichSuSuaChua.mayTinh.soMay}</td>
                  <td>{chiTietLichSuSuaChua.lichSuSuaChua.loiGapPhai}</td>
                  <td>
                    {moment(
                      chiTietLichSuSuaChua.lichSuSuaChua.ngayGapLoi
                    ).format("DD-MM-YYYY")}
                  </td>
                  <td>{chiTietLichSuSuaChua.ghiChu}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Sheet>
      </div>
      <CapNhapNhanVienCTLSSC
        open={openCapNhapNhanVien}
        setOpen={setOpenCapNhapNhanVien}
        chiTietLichSuSuaChua={chiTietLichSuSuaChua}
      />
    </>
  );
}
