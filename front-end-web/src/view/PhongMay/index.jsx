import clsx from "clsx";
import React from "react";
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

export default function PhongMay() {
  return (
    <div className={clsx(style.phongMay)}>
      <h1>QUẢN LÝ PHÒNG MÁY</h1>
      <div className={clsx(style.infoWrap)}>
        <div className={clsx(style.left)}>
          <FormControl>
            <FormLabel>Số phòng</FormLabel>
            <Input placeholder="Số phòng" />
          </FormControl>
          <FormControl>
            <FormLabel>Tòa nhà</FormLabel>
            <Input placeholder="Tòa nhà" />
          </FormControl>
          <FormControl>
            <FormLabel>Loại phòng</FormLabel>
            <Select placeholder="Loại phòng ...">
              <Option>...</Option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Số máy</FormLabel>
            <Input placeholder="Số máy" />
          </FormControl>
        </div>
        <Sheet id={'scroll-style-01'} className={clsx(style.right)}>
          <strong>Danh sách ca trực</strong>
          <Table stripe="odd"  stickyHeader hoverRow aria-label="striped table">
            <thead>
              <tr>
                <th>Tên nhân viên</th>
                <th>Ngày trực</th>
                <th>Ca trực</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Nguyễn Văn A</td>
                <td>01/01/2024</td>
                <td>Sáng</td>
              </tr>
              <tr>
                <td>Nguyễn Văn B</td>
                <td>01/01/2024</td>
                <td>Trưa</td>
              </tr>
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
          <Button>Thêm mới</Button>
          <Button>Cập nhật</Button>
          <Button>Xóa</Button>
        </div>
      </div>
      <Sheet id={'scroll-style-01'} className={clsx(style.tableWrap)}>
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
            <tr>
              <td>1</td>
              <td>H</td>
              <td>H1.4</td>
              <td>Nhỏ</td>
              <td>30 máy</td>
            </tr>
            <tr>
              <td>1</td>
              <td>H</td>
              <td>H1.2</td>
              <td>Nhỏ</td>
              <td>30 máy</td>
            </tr>
            <tr>
              <td>1</td>
              <td>H</td>
              <td>H1.2</td>
              <td>Nhỏ</td>
              <td>30 máy</td>
            </tr>
            <tr>
              <td>1</td>
              <td>H</td>
              <td>H1.2</td>
              <td>Nhỏ</td>
              <td>30 máy</td>
            </tr>
            <tr>
              <td>1</td>
              <td>H</td>
              <td>H1.2</td>
              <td>Nhỏ</td>
              <td>30 máy</td>
            </tr>
            <tr>
              <td>1</td>
              <td>H</td>
              <td>H1.2</td>
              <td>Nhỏ</td>
              <td>30 máy</td>
            </tr>
            <tr>
              <td>1</td>
              <td>H</td>
              <td>H1.2</td>
              <td>Nhỏ</td>
              <td>30 máy</td>
            </tr>
            <tr>
              <td>1</td>
              <td>H</td>
              <td>H1.2</td>
              <td>Nhỏ</td>
              <td>30 máy</td>
            </tr>
          </tbody>
        </Table>
      </Sheet>
    </div>
  );
}
