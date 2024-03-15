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
import React, { useState } from "react";
import style from "./lichSuaChua.module.scss";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import Swal from "sweetalert2";
import { postAPI } from "../../../api";

export default function LichSuaChua(props) {
  const [duLieuInput, setDuLieuInput] = useState({
    loiGapPhai: "",
    ngayGapLoi: "",
  });

  const inputOnChange = (e) => {
    setDuLieuInput({ ...duLieuInput, [e.target.name]: e.target.value });
  };

  const themLoi = async () => {
    const loi = {
      loiGapPhai: duLieuInput.loiGapPhai,
      ngayGapLoi: duLieuInput.ngayGapLoi,
      mayTinh: props.mayTinh,
    };
    const result = await postAPI("/lichSuSuaChua", loi);
    if (result.status === 200) {
      Swal.fire({
        text: "Thêm mới phần mềm thành công",
        icon: "success",
        confirmButtonText: "OK",
      });
      props.setOpen(false);
    }
  };

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
                  <Input
                    placeholder="Số máy..."
                    value={props.mayTinh?.soMay}
                    disabled
                  />
                </FormControl>
              </span>
              <FormControl>
                <FormLabel>Lỗi mắc phải</FormLabel>
                <Input
                  name="loiGapPhai"
                  onChange={(e) => inputOnChange(e)}
                  placeholder="Lỗi mắc phải..."
                />
              </FormControl>
              <FormControl>
                <FormLabel>Ngày gặp lỗi</FormLabel>
                <Input
                  name="ngayGapLoi"
                  defaultValue={new Date()}
                  onChange={(e) => inputOnChange(e)}
                  type="date"
                  placeholder="Ngày sửa"
                />
              </FormControl>
              {/* <FormControl>
                <FormLabel>Ghi chú</FormLabel>
                <Input placeholder="Ghi chú" />
              </FormControl> */}
              <div className={clsx(style.buttonGroup)}>
                <Button onClick={() => themLoi()}>Cập nhật lỗi mới</Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </ModalDialog>
    </Modal>
  );
}
