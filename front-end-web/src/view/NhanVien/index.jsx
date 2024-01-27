import React, { useState } from "react";
import clsx from "clsx";
import style from "./nhanVien.module.scss";
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

export default function NhanVien() {
  const [openLichTruc, setOpenLichTruc] = useState(false);
  return (
    <>
      <div className={clsx(style.nhanVien)}>
        <h1>QUẢN LÝ NHÂN VIÊN</h1>
        <div className={clsx(style.infoWrap)}>
          <div className={clsx(style.left)}>
            <FormControl>
              <FormLabel>Họ tên</FormLabel>
              <Input placeholder="Họ tên" />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input placeholder="Email" />
            </FormControl>
            <FormControl>
              <FormLabel>Số điện thoại</FormLabel>
              <Input placeholder="Số điện thoại" />
            </FormControl>
            <FormControl>
              <FormLabel>Giới tính</FormLabel>
              <Select placeholder="Giới tính ...">
                <Option>...</Option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Địa chỉ</FormLabel>
              <Input placeholder="Địa chỉ" />
            </FormControl>
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
                    <th>Tòa nhà</th>
                    <th>Phòng trực</th>
                    <th>Ngày trực</th>
                    <th>Ca trực</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>H</td>
                    <td>H1.2</td>
                    <td>01/01/2024</td>
                    <td>Sáng</td>
                  </tr>
                  <tr>
                    <td>H</td>
                    <td>H1.2</td>
                    <td>01/01/2024</td>
                    <td>Sáng</td>
                  </tr>
                  <tr>
                    <td>H</td>
                    <td>H1.2</td>
                    <td>01/01/2024</td>
                    <td>Sáng</td>
                  </tr>
                  <tr>
                    <td>H</td>
                    <td>H1.2</td>
                    <td>01/01/2024</td>
                    <td>Sáng</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={4} style={{ textAlign: "center" }}>
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
          <Button>Thêm mới</Button>
          <Button>Cập nhật</Button>
          <Button>Xóa</Button>
        </div>
        <Sheet id={"scroll-style-01"} className={clsx(style.tableWrap)}>
          <Table stickyHeader hoverRow aria-label="striped table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Họ tên</th>
                <th>Email</th>
                <th>Số điện thoại</th>
                <th>Giới tính</th>
                <th>Địa chỉ</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Nguyễn Văn A</td>
                <td>nguyenvanA.gmail.com</td>
                <td>0336057662</td>
                <td>Nam</td>
                <td>TP.HCM</td>
              </tr>
            </tbody>
          </Table>
        </Sheet>
      </div>
      <CapNhatLichTruc open={openLichTruc} setOpen={setOpenLichTruc} />
    </>
  );
}
