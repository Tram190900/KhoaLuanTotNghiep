import React, { useState } from "react";
import clsx from "clsx";
import style from "./monHoc.module.scss";
import { Button, FormControl, FormLabel, Input, Sheet, Table } from "@mui/joy";
import PhanMemSuDung from "../../components/Modal/PhanMemSuDung";

export default function MonHoc() {
  const [openCapNhatMonHoc, setOpenCapNhatMonHoc] = useState(false);
  return (
    <>
      <div className={clsx(style.monHoc)}>
        <h1>QUẢN LÝ MÔN HỌC</h1>
        <div className={clsx(style.infoWrap)}>
          <div className={clsx(style.left)}>
            <FormControl>
              <FormLabel>Tên môn học</FormLabel>
              <Input placeholder="Tên môn học" />
            </FormControl>
            <FormControl>
              <FormLabel>Khoa</FormLabel>
              <Input placeholder="Email" />
            </FormControl>
            <div className={clsx(style.buttonWrap)}>
              <Button>Thêm mới</Button>
              <Button>Cập nhật</Button>
              <Button>Xóa</Button>
            </div>
          </div>
          <div className={clsx(style.right)}>
            <Sheet className={clsx(style.rightTable)} id={"scroll-style-01"}>
              <strong>Phân mềm được sử dụng</strong>
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
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>H</td>
                    <td>H1.2</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={2} style={{ textAlign: "center" }}>
                      <Button
                        onClick={() => setOpenCapNhatMonHoc(!openCapNhatMonHoc)}
                      >
                        Cập nhật
                      </Button>
                    </td>
                  </tr>
                </tfoot>
              </Table>
            </Sheet>
          </div>
        </div>

        <Sheet id={"scroll-style-01"} className={clsx(style.tableWrap)}>
          <Table stickyHeader hoverRow aria-label="striped table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Họ môn học</th>
                <th>Khoa</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Công nghệ mới</td>
                <td>Công nghệ thông tin</td>
              </tr>
            </tbody>
          </Table>
        </Sheet>
      </div>
      <PhanMemSuDung open={openCapNhatMonHoc} setOpen={setOpenCapNhatMonHoc} />
    </>
  );
}
