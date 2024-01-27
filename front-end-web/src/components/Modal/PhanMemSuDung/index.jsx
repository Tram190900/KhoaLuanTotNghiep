import {
  Button,
  Checkbox,
  DialogContent,
  DialogTitle,
  Modal,
  ModalClose,
  ModalDialog,
  Sheet,
  Table,
} from "@mui/joy";
import React from "react";
import ChecklistIcon from "@mui/icons-material/Checklist";
import clsx from "clsx";
import style from "./phanMemSuDung.module.scss";

export default function PhanMemSuDung(props) {
  return (
    <Modal open={props.open} onClose={() => props.setOpen(false)}>
      <ModalDialog>
        <ModalClose />
        <DialogTitle>
          <ChecklistIcon sx={{ fontSize: "35px" }} />
          Cập nhật danh sách phần mềm
        </DialogTitle>
        <DialogContent>
          <Sheet className={clsx(style.tableWrap)} id={"scroll-style-01"}>
            <Table stickyHeader hoverRow aria-label="striped table">
              <thead>
                <tr>
                  <th style={{ width: "20px" }}></th>
                  <th>Tên phần mềm</th>
                  <th>Phiên bản</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <Checkbox sx={{ marginTop: "40%" }} />
                  <td>H</td>
                  <td>H1.2</td>
                </tr>
                <tr>
                  <Checkbox sx={{ marginTop: "40%" }} />
                  <td>H</td>
                  <td>H1.2</td>
                </tr>
              </tbody>
            </Table>
          </Sheet>
          <Button>Cập nhật</Button>
        </DialogContent>
      </ModalDialog>
    </Modal>
  );
}
