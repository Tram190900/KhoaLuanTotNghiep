import clsx from "clsx";
import React, { useEffect, useState } from "react";
import style from "./phongMay.module.scss";
import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Option,
  Select,
  Sheet,
  Table,
} from "@mui/joy";
import { deleteAPI, getAPI, postAPI, putAPI } from "../../api";
import Swal from "sweetalert2";
import moment from "moment";

export default function PhongMay() {
  const [dsPhongMay, setdsPhongMay] = useState([]);
  const [dsCaTruc, setDsCaTruc] = useState([]);
  const [phongMay, setPhongMay] = useState({});
  const [duLieuVao, setDuLieuVao] = useState({
    soPhong: "",
    toaNha: "",
    tenLoaiPhong: "",
    soLuongMay: "",
  });

  useEffect(() => {
    xemDanhSachPhongMay();
  }, []);

  const xemDanhSachPhongMay = async () => {
    const result = await getAPI("/getAllPhongMay");
    if (result.status === 200) {
      setdsPhongMay(result.data);
    }
  };

  const xemDanhSachCaTruc = async (id) => {
    const result = await getAPI(`/getChamCongByPhongMay/${id}`);
    if (result.status === 200) {
      setDsCaTruc(result.data);
    }
  }

  const onInputChange = (e) => {
    setDuLieuVao({ ...duLieuVao, [e.target.name]: e.target.value });
  };

  const luuPhongMay = async () => {
    const phongMay = {
      soPhong: duLieuVao.soPhong,
      toaNha: duLieuVao.toaNha,
      loaiPhong: {
        tenLoaiPhong: duLieuVao.tenLoaiPhong,
        soLuongMay: duLieuVao.soLuongMay,
      },
    };
    try {
      const result = await postAPI("/savePhongMay", phongMay);
      if (result.status === 200) {
        Swal.fire({
          text: "Thêm phòng máy thành công",
          icon: "success",
          confirmButtonText: "OK",
        });
        xemDanhSachPhongMay();
      }
    } catch (error) {
      Swal.fire({
        text: error.response.data,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const xoaPhongMay = () => {
    Swal.fire({
      text: "Bạn có chắc muốn xóa?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Có",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteAPI(`/deletePhongMay/${phongMay.id}`)
          .then(() => {
            Swal.fire({
              text: "Xóa phòng máy thành công",
              icon: "success",
            });
            xemDanhSachPhongMay();
          })
          .catch((error) => {
            console.log(error.response.data);
          });
      }
    });
  };

  const capNhapPhongMay = () => {
    phongMay.soPhong = duLieuVao.soPhong;
    phongMay.toaNha = duLieuVao.toaNha;
    phongMay.loaiPhong.tenLoaiPhong = duLieuVao.tenLoaiPhong;
    phongMay.loaiPhong.soLuongMay = duLieuVao.soLuongMay;

    Swal.fire({
      text: "Bạn có chắc muốn cập nhập?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Có",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await putAPI(`/updatePhongMay/${[phongMay.id]}`, phongMay)
          .then(() => {
            Swal.fire({
              text: "Cập nhập thành công",
              icon: "success",
            });
            xemDanhSachPhongMay();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  return (
    <div className={clsx(style.phongMay)}>
      <h1>QUẢN LÝ PHÒNG MÁY</h1>
      <div className={clsx(style.infoWrap)}>
        <div className={clsx(style.left)}>
          <FormControl>
            <FormLabel>Số phòng</FormLabel>
            <Input
              name="soPhong"
              value={duLieuVao.soPhong}
              onChange={(e) => onInputChange(e)}
              placeholder="Số phòng"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Tòa nhà</FormLabel>
            <Input
              name="toaNha"
              value={duLieuVao.toaNha}
              onChange={(e) => onInputChange(e)}
              placeholder="Tòa nhà"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Loại phòng</FormLabel>
            <Select
              name="tenLoaiPhong"
              onChange={(e, v) =>
                setDuLieuVao({ ...duLieuVao, tenLoaiPhong: v })
              }
              value={duLieuVao.tenLoaiPhong}
              placeholder="Loại phòng ..."
            >
              <Option value={"Nhỏ"}>Nhỏ</Option>
              <Option value={"Vừa"}>Vừa</Option>
              <Option value={"Lớn"}>Lớn</Option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Số máy</FormLabel>
            <Input
              name="soLuongMay"
              value={duLieuVao.soLuongMay}
              onChange={(e) => onInputChange(e)}
              placeholder="Số máy"
            />
          </FormControl>
        </div>
        <Sheet id={"scroll-style-01"} className={clsx(style.right)}>
          <strong>Danh sách ca trực</strong>
          <Table stripe="odd" stickyHeader hoverRow aria-label="striped table">
            <thead>
              <tr>
                <th>Tên nhân viên</th>
                <th>Ngày trực</th>
                <th>Ca trực</th>
              </tr>
            </thead>
            <tbody>
              {dsCaTruc.map((item, index) => (<tr key={index}>
                <td>{item.nhanVien.hoTenNhanVien}</td>
                <td>{moment(item.ngayTruc).format("DD-MM-YYYY")}</td>
                <td>{item.caLam}</td>
              </tr>))}
            </tbody>
          </Table>
        </Sheet>
      </div>
      <div className={clsx(style.centerWrap)}>
        <div className={clsx(style.searchWrap)}>
          <FormControl>
            <FormLabel>Tìm kiếm</FormLabel>
            <Input placeholder="Từ khóa" />
          </FormControl>
          <Checkbox label="Số phòng" defaultChecked />
          <Checkbox label="Tòa nhà" />
          <Button>Tìm kiếm</Button>
        </div>
        <div className={clsx(style.buttonWrap)}>
          <Button onClick={() => luuPhongMay()}>Thêm mới</Button>
          <Button onClick={() => capNhapPhongMay()}>Cập nhật</Button>
          <Button onClick={() => xoaPhongMay()}>Xóa</Button>
        </div>
      </div>
      <Sheet id={"scroll-style-01"} className={clsx(style.tableWrap)}>
        <Table stickyHeader hoverRow aria-label="striped table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Tòa nhà</th>
              <th>Số phòng</th>
              <th>Loại phòng</th>
              <th>Số lượng máy</th>
            </tr>
          </thead>
          <tbody>
            {dsPhongMay.map((item, index) => (
              <tr
                key={index}
                onClick={() => {
                  setPhongMay(item);
                  setDuLieuVao({
                    soPhong: item.soPhong,
                    toaNha: item.toaNha,
                    tenLoaiPhong: item.loaiPhong.tenLoaiPhong,
                    soLuongMay: item.loaiPhong.soLuongMay,
                  });
                  xemDanhSachCaTruc(item.id);
                }}
              >
                <td>{item.id}</td>
                <td>{item.toaNha}</td>
                <td>{item.soPhong}</td>
                <td>{item.loaiPhong.tenLoaiPhong}</td>
                <td>{item.loaiPhong.soLuongMay}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>
    </div>
  );
}
