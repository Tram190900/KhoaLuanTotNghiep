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
  Sheet,
  Table,
} from "@mui/joy";
import clsx from "clsx";
import React, { useState } from "react";
import style from "./lichSuaChua.module.scss";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import Swal from "sweetalert2";
import { postAPI, putAPI } from "../../../api";

export default function LichSuaChua(props) {
  const date = new Date();
  const defaultValue = date.toLocaleDateString('en-CA');
  const [duLieuInput, setDuLieuInput] = useState({
    loiGapPhai: "",
    ngayGapLoi: defaultValue,
  });


  const inputOnChange = (e) => {
    setDuLieuInput({ ...duLieuInput, [e.target.name]: e.target.value });
  };

  const capNhapMayTinh = async () => {
    const mayTinh = props.mayTinh;
    mayTinh.trangThai = 2;
    await putAPI(`/updateMayTinh/${props.mayTinh.id}`,mayTinh);
  }

  const themLoi = async () => {
    capNhapMayTinh();
    const loi = {
      loiGapPhai: duLieuInput.loiGapPhai,
      ngayGapLoi: duLieuInput.ngayGapLoi,
      mucDoLoi: duLieuInput.mucDoLoi,
      mayTinh: props.mayTinh,
      trangThai: false
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
              <FormLabel>Mức độ lỗi</FormLabel>
              <Select
                  placeholder="Mức độ lỗi..."
                  onChange={(e,v) => setDuLieuInput({...duLieuInput, mucDoLoi:v})}
                >
                  <Option value={1}>Sửa trong ngày</Option>
                  <Option value={2}>Không quá 7 ngày</Option>
                  <Option value={3}>Không quá 30 ngày</Option>
                </Select>
              <FormControl>
                <FormLabel>Ngày gặp lỗi</FormLabel>
                <Input
                  name="ngayGapLoi"
                  id="dateRequired" type="date" defaultValue={defaultValue}
                  onChange={(e) => inputOnChange(e)}
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
