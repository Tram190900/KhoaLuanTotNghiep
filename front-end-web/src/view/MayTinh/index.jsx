import clsx from "clsx";
import React, { useEffect, useState } from "react";
import style from "./mayTinh.module.scss";
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
import LichSuaChua from "../../components/Modal/LichSuaChua";
import { deleteAPI, getAPI, postAPI } from "../../api";
import moment from "moment";
import Swal from "sweetalert2";

export default function MayTinh() {
  const [openLichSuaChua, setOpenLichSuaChua] = useState(false);
  const [allMayTinh, setAllMayTinh] = useState([]);
  const [phanMemCaiDat, setPhanMemCaiDat] = useState([]);
  const [phong, setPhong] = useState("");
  const [soMay, setSoMay] = useState("");
  const [trangThai, setTrangThai] = useState(true);
  const [mayTinhId, setMayTinhId] = useState();

  useEffect(() => {
    handleGetAllMayTinh();
  }, []);
  const handleGetAllMayTinh = async () => {
    const result = await getAPI("/getAllMayTinh");
    if (result.status === 200) {
      setAllMayTinh(result.data);
    }
  };
  const handleGetPhanMemCaiDat = async (id) => {
    const result = await getAPI(`/getChiTietCaiDat/${id}`);
    if (result.status === 200 && result.data.length > 0) {
      result.data.map((item) => {
        setPhanMemCaiDat([
          { phanMem: item.phanMem, ngayCaiDat: item.ngayCaiDat },
        ]);
      });
    } else {
      setPhanMemCaiDat([]);
    }
  };
  const handleThemMoi = async () => {
    const data = {
      soMay: soMay,
      trangThai: trangThai,
      phongMay: {
        soPhong: phong,
      },
    };
    try {
      const result = await postAPI("/saveMayTinh", data);
      if (result.status === 200) {
        Swal.fire({
          text: "Thêm mới máy tính thành công",
          icon: "success",
          confirmButtonText: "OK",
        });
        handleGetAllMayTinh();
      }
    } catch (error) {
      Swal.fire({
        text: error.response.data,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };
  const handleXoaMayTinh = async () => {
    Swal.fire({
      text: "Bạn có chắc muốn xóa máy tính này khỏi phòng máy hay không?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Có",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteAPI(`/deleteMayTinh/${mayTinhId}`)
          .then(() => {
            Swal.fire({
              text: "Xóa máy tính thành công",
              icon: "success",
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };
  const handleChange = (event, newValue) => {
    setTrangThai(newValue);
  };

  return (
    <>
      <div className={clsx(style.maytinh)}>
        <h1>QUẢN LÝ MÁY TÍNH</h1>
        <div className={clsx(style.infoWrap)}>
          <div className={clsx(style.content)}>
            <div className={clsx(style.leftWrap)}>
              <FormControl>
                <FormLabel>Phòng</FormLabel>
                <Input
                  placeholder="Phòng"
                  value={phong}
                  onChange={(e) => setPhong(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Số máy</FormLabel>
                <Input
                  placeholder="Số máy"
                  value={soMay}
                  onChange={(e) => setSoMay(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Trạng thái</FormLabel>
                <Select
                  placeholder="Trạng thái ..."
                  value={trangThai}
                  onChange={handleChange}
                >
                  <Option value={true}>Bình thường</Option>
                  <Option value={false}>Bảo trì</Option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Ghi chú (Nếu có)</FormLabel>
                <Input placeholder="Ghí chú" />
              </FormControl>
            </div>
            <div className={clsx(style.rightWrap)}>
              <Sheet
                id={"scroll-style-01"}
                className={clsx(style.tablePhanMem)}
              >
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
                        <td>{moment(item.ngayCaiDat).format("l")}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={3} style={{ textAlign: "center" }}>
                        <Button>Cập nhật</Button>
                      </td>
                    </tr>
                  </tfoot>
                </Table>
              </Sheet>
              <Sheet
                id={"scroll-style-01"}
                className={clsx(style.tableThietBi)}
              >
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
                      <th>Số lượng</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Chuột</td>
                      <td>01/03/2018</td>
                      <td>01</td>
                    </tr>
                    <tr>
                      <td>Bàn phím</td>
                      <td>01/03/2018</td>
                      <td>01</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={3} style={{ textAlign: "center" }}>
                        <Button>Cập nhật</Button>
                      </td>
                    </tr>
                  </tfoot>
                </Table>
              </Sheet>
            </div>
          </div>
        </div>
        <div className={clsx(style.searchWrap)}>
          <FormControl>
            <FormLabel>Tìm kiếm</FormLabel>
            <Input placeholder="Từ khóa" />
          </FormControl>
          <Checkbox label="Số phòng" defaultChecked />
          <Checkbox label="Tòa nhà" />
          <Button>Tìm kiếm</Button>
          <Button onClick={() => setOpenLichSuaChua(!openLichSuaChua)}>
            Lịch sử sửa chữa
          </Button>
          <Button
            onClick={() => {
              if (phong.trim().length > 0 && soMay.trim().length > 0) {
                handleThemMoi();
              }
            }}
          >
            Thêm mới
          </Button>
          <Button>Cập nhật</Button>
          <Button onClick={() => handleXoaMayTinh()}>Xóa</Button>
        </div>
        <Sheet id={"scroll-style-01"} className={clsx(style.tableMayTinh)}>
          <Table stickyHeader hoverRow aria-label="striped table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Số Phòng</th>
                <th>Số máy</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {allMayTinh?.map((item, index) => (
                <tr
                  key={index}
                  onClick={(e) => {
                    handleGetPhanMemCaiDat(item.id);
                    setMayTinhId(item.id)
                    setPhong(item.phongMay.soPhong);
                    setSoMay(item.soMay);
                    setTrangThai(item.trangThai);
                  }}
                >
                  <td>{item.id}</td>
                  <td>{item.phongMay.soPhong}</td>
                  <td>{item.soMay}</td>
                  <td>{item.trangThai ? "Bình thường" : "Bảo trì"}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Sheet>
      </div>
      <LichSuaChua open={openLichSuaChua} setOpen={setOpenLichSuaChua} />
    </>
  );
}
