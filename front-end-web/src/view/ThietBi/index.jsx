import React from "react";
import clsx from "clsx";
import style from "./thietBi.module.scss";
import { Button, FormControl, FormLabel, Input, Sheet, Table } from "@mui/joy";

export default function ThietBi() {
  return (
    <div className={clsx(style.thietBi)}>
      <h1>QUẢN LÝ THIẾT BỊ</h1>
      <div className={clsx(style.infoWrap)}>
        <div className={clsx(style.left)}>
          <FormControl>
            <FormLabel>Tên thiết bị</FormLabel>
            <Input placeholder="Họ tên" />
          </FormControl>
          <FormControl>
            <FormLabel>Số lượng</FormLabel>
            <Input type="number" placeholder="Số lượng" />
          </FormControl>
        </div>
        {/* <div className={clsx(style.right)}>
          <Sheet className={clsx(style.rightTable)} id={"scroll-style-01"}>
            <strong>Danh sách phòng máy</strong>
            <Table stickyHeader hoverRow aria-label="striped table">
              <thead>
                <tr>
                  <th>Tòa nhà</th>
                  <th>Số phòng</th>
                  <th>Ngày lắp đặt</th>
                  <th>Số lượng</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>H</td>
                  <td>H1.2</td>
                  <td>01/01/2024</td>
                  <td>01</td>
                </tr>
              </tbody>
            </Table>
          </Sheet>
          <Button onClick={() => {}}>Cập nhật lịch trực</Button>
        </div> */}
      </div>
      <Sheet id={"scroll-style-01"} className={clsx(style.tableWrap)}>
        <Table stickyHeader hoverRow aria-label="striped table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Tên thiết bị</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Chuột</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Bàn phím</td>
            </tr>
          </tbody>
        </Table>
      </Sheet>
    </div>
  );
}
