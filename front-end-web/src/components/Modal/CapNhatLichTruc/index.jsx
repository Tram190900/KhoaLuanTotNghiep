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
  Option,
  Select,
} from "@mui/joy";
import React from "react";

export default function CapNhatLichTruc(props) {
  return (
    <Modal open={props.open} onClose={() => props.setOpen(false)}>
      <ModalDialog>
        <ModalClose />
        <DialogTitle>Cập nhật lịch trực</DialogTitle>
        <DialogContent>
          <FormControl>
            <FormLabel>Tòa nhà</FormLabel>
            <Select placeholder="Tòa nhà ...">
              <Option>...</Option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Phòng</FormLabel>
            <Select placeholder="Phòng ...">
              <Option>...</Option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Ngày trực</FormLabel>
            <Input type="date" placeholder="Tòa nhà" />
          </FormControl>
          <FormControl>
            <FormLabel>Ca trực</FormLabel>
            <Select placeholder="Ca trực ...">
              <Option>...</Option>
            </Select>
          </FormControl>
          <Button>Cập nhật</Button>
        </DialogContent>
      </ModalDialog>
    </Modal>
  );
}
