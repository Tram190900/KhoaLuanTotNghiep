import React from "react";
import clsx from "clsx";
import style from "./phenMem.module.scss";
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

export default function PhanMem() {
  return (
    <div className={clsx(style.phanMem)}>
      <h1>QUẢN LÝ PHẦN MỀM</h1>
      <div className={clsx(style.info)}>
        <FormControl>
          <FormLabel>Tên phần mềm</FormLabel>
          <Input placeholder="Tên phần mềm" />
        </FormControl>
        <FormControl>
          <FormLabel>Nhà phát triển</FormLabel>
          <Input placeholder="Nhà phát triển" />
        </FormControl>
        <FormControl>
          <FormLabel>Phiên bản</FormLabel>
          <Input placeholder="Phiên bản" />
        </FormControl>
        <FormControl>
          <FormLabel>Loại phần mềm</FormLabel>
          <Select placeholder="Loại phần mềm ...">
            <Option>Hệ quản trị cơ sở dữ liệu</Option>
            <Option>Phần mềm văn phòng</Option>
            <Option>Software platform</Option>
            <Option>Công cụ lập trình (IDE)</Option>
          </Select>
        </FormControl>
      </div>
      <div className={clsx(style.searchWrap)}>
        <FormControl>
          <FormLabel>Tìm kiếm</FormLabel>
          <Input placeholder="Từ khóa" />
        </FormControl>
        <Checkbox label="Môn học" defaultChecked />
        <Button>Tìm kiếm</Button>
        <Button>Thêm mới</Button>
        <Button>Cập nhật</Button>
        <Button>Xóa</Button>
      </div>
      <Sheet id={"scroll-style-01"} className={clsx(style.tablePhanMem)}>
        <Table stickyHeader hoverRow aria-label="striped table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Tên phần mềm</th>
              <th>Phiên bản</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Java</td>
              <td>Version 8</td>
            </tr>
            <tr>
              <td>1</td>
              <td>H4.2.2</td>
              <td>H.01</td>
            </tr>
          </tbody>
        </Table>
      </Sheet>
    </div>
  );
}
