import clsx from "clsx";
import React, { useState } from "react";
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

export default function MayTinh() {
  const [openLichSuaChua, setOpenLichSuaChua] = useState(false);
  return (
    <>
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
                  <Option value={'...'}>...</Option>
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
                    <tr>
                      <td>Microsoft Word</td>
                      <td>2209</td>
                      <td>01/10/2019</td>
                    </tr>
                    <tr>
                      <td>Microsoft Excel</td>
                      <td>2103 </td>
                      <td>01/10/2013</td>
                    </tr>
                    <tr>
                      <td>Microsoft Excel</td>
                      <td>2103 </td>
                      <td>01/10/2013</td>
                    </tr>
                    <tr>
                      <td>Microsoft Excel</td>
                      <td>2103 </td>
                      <td>01/10/2013</td>
                    </tr>
                    <tr>
                      <td>Microsoft Excel</td>
                      <td>2103 </td>
                      <td>01/10/2013</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={3} style={{ textAlign: 'center' }}>
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
                <Table aria-label="table with sticky header"
                  stickyHeader
                  stickyFooter
                  stripe="odd"
                  hoverRow>
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
                      <td colSpan={3} style={{ textAlign: 'center' }}>
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
          <Button>Thêm mới</Button>
          <Button>Cập nhật</Button>
          <Button>Xóa</Button>
        </div>
        <Sheet id={"scroll-style-01"} className={clsx(style.tableMayTinh)}>
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
        </Sheet>
      </div>
      <LichSuaChua open={openLichSuaChua} setOpen={setOpenLichSuaChua} />
    </>
  );
}
