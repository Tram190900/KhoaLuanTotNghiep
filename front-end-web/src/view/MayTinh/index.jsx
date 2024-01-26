import clsx from "clsx";
import React from "react";
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

export default function MayTinh() {
  return (
    <div className={clsx(style.maytinh)}>
      <h1>QUẢN LÝ MÁY TÍNH</h1>
      <div className={clsx(style.infoWrap)}>
        <div className={clsx(style.content)}>
          <div className={clsx(style.leftWrap)}>
            <FormControl>
              <FormLabel>Phòng</FormLabel>
              <Input placeholder="Phòng" />
            </FormControl>
            <FormControl>
              <FormLabel>Số máy</FormLabel>
              <Input placeholder="Số máy" />
            </FormControl>
            <FormControl>
              <FormLabel>Trạng thái</FormLabel>
              <Select placeholder="Trạng thái ...">
                <Option>...</Option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Ghi chú (Nếu có)</FormLabel>
              <Input placeholder="Ghí chú" />
            </FormControl>
            <div className={clsx(style.searchWrap)}>
              <FormControl>
                <FormLabel>Tìm kiếm</FormLabel>
                <Input placeholder="Từ khóa" />
              </FormControl>
              <Checkbox label="Số phòng" defaultChecked />
              <Checkbox label="Tòa nhà" />
              <Button>Tìm kiếm</Button>
            </div>
          </div>
          <div className={clsx(style.rightWrap)}>
            <div className={clsx(style.tableWrap)}>
              <Sheet className={clsx(style.tablePhanMem)}>
                <Table stickyHeader hoverRow aria-label="striped table">
                  <thead>
                    <tr>
                      <th>Tên phần mềm</th>
                      <th>Phiên bản</th>
                      <th>Ngày cài đặt</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>H4.2.2</td>
                      <td>H.01</td>
                      <td>Bình thường</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>H4.2.2</td>
                      <td>H.01</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>H4.2.2</td>
                      <td>H.01</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>H4.2.2</td>
                      <td>H.01</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>H4.2.2</td>
                      <td>H.01</td>
                    </tr>
                  </tbody>
                </Table>
              </Sheet>
              <Sheet className={clsx(style.tableThietBi)}>
                <Table stickyHeader hoverRow aria-label="striped table">
                  <thead>
                    <tr>
                      <th>Tên thiết bị</th>
                      <th>Phiên bản</th>
                      <th>Ngày cài đặt</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>H4.2.2</td>
                      <td>H.01</td>
                      <td>Bình thường</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>H4.2.2</td>
                      <td>H.01</td>
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
            <div className={clsx(style.buttonWrap)}>
              <Button>Thêm mới</Button>
              <Button>Cập nhật</Button>
              <Button>Xóa</Button>
            </div>
          </div>
        </div>
      </div>
      <div className={clsx(style.tableMayTinh)}>
        <Table stickyHeader hoverRow aria-label="striped table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Số Phòng</th>
              <th>Số máy</th>
              <th>Trạng thái</th>
              <th>Chú thích</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>H4.2.2</td>
              <td>H.01</td>
              <td>Bình thường</td>
              <td></td>
            </tr>
            <tr>
              <td>1</td>
              <td>H4.2.2</td>
              <td>H.01</td>
              <td>Bình thường</td>
              <td></td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
}
