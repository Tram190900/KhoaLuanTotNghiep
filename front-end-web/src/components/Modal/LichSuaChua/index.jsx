import {
  Button,
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalClose,
  ModalDialog,
  Sheet,
  Table,
} from "@mui/joy";
import clsx from "clsx";
import React from "react";
import style from "./lichSuaChua.module.scss";
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';

export default function LichSuaChua(props) {
  return (
    <Modal open={props.open} onClose={() => props.setOpen(false)}>
      <ModalDialog>
        <ModalClose />
        <DialogTitle><ManageHistoryIcon sx={{fontSize:'35px'}}/>Lịch sử sửa chữa</DialogTitle>
        <DialogContent>
          <div className={clsx(style.infoWrap)}>
            <div className={clsx(style.left)}>
              <FormControl>
                <FormLabel>Lỗi mới</FormLabel>
                <Input disabled placeholder="Lỗi mới" />
              </FormControl>
              <FormControl>
                <FormLabel>Lỗi cũ</FormLabel>
                <Input placeholder="Lỗi cũ" />
              </FormControl>
              <FormControl>
                <FormLabel>Ngày sửa</FormLabel>
                <Input type="date" placeholder="Ngày sửa" />
              </FormControl>
              <FormControl>
                <FormLabel>Người sửa</FormLabel>
                <Input placeholder="Người sửa" />
              </FormControl>
              <FormControl>
                <FormLabel>Ghi chú</FormLabel>
                <Input placeholder="Ghi chú" />
              </FormControl>
              <div className={clsx(style.buttonGroup)}>
                <Button>Thêm lỗi mới</Button>
                <Button>Cập nhật lỗi cũ</Button>
              </div>
            </div>
            <Sheet id={"scroll-style-01"} className={clsx(style.right)}>
              <Table stickyHeader hoverRow aria-label="striped table">
                <thead>
                  <tr>
                    <th>Tên nhân viên sửa chữa</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Nguyễn Văn A</td>
                  </tr>
                </tbody>
              </Table>
            </Sheet>
          </div>
          <Sheet id={"scroll-style-01"} className={clsx(style.tableWrap)}>
            <Table stickyHeader hoverRow aria-label="striped table">
              <thead>
                <tr>
                  <th>Lỗi gặp phải</th>
                  <th>Ngày báo lỗi</th>
                  <th>Ngày sửa lỗi</th>
                  <th>Ghi chú</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Hư chuột</td>
                  <td>10/12/2023</td>
                  <td>10/12/2023</td>
                  <td></td>
                </tr>
              </tbody>
            </Table>
          </Sheet>
        </DialogContent>
      </ModalDialog>
    </Modal>
  );
}
