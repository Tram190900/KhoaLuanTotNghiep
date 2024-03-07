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
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";

export default function LichSuaChua(props) {
  return (
    <Modal open={props.open} onClose={() => props.setOpen(false)}>
      <ModalDialog>
        <ModalClose />
        <DialogTitle>
          <ManageHistoryIcon sx={{ fontSize: "35px" }} />
          Báo lỗi
        </DialogTitle>
        <DialogContent>
          <div className={clsx(style.infoWrap)}>
            <div className={clsx(style.left)}>
              <span className="d-flex justify-content-between">
                <FormControl>
                  <FormLabel>Số phòng</FormLabel>
                  <Input
                    placeholder="Số phòng..."
                    value={props.phongMay?.soPhong}
                    disabled
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Số máy</FormLabel>
                  <Input placeholder="Số máy..." value={props.mayTinh?.soMay} disabled />
                </FormControl>
              </span>
              <FormControl>
                <FormLabel>Lỗi mắc phải</FormLabel>
                <Input placeholder="Lỗi mắc phải..." />
              </FormControl>
              <FormControl>
                <FormLabel>Ngày gặp lỗi</FormLabel>
                <Input type="date" placeholder="Ngày sửa" />
              </FormControl>
              <FormControl>
                <FormLabel>Ghi chú</FormLabel>
                <Input placeholder="Ghi chú" />
              </FormControl>
              <div className={clsx(style.buttonGroup)}>
                <Button>Cập nhật lỗi mới</Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </ModalDialog>
    </Modal>
  );
}
