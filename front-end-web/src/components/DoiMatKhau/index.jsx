import {
  DialogContent,
  DialogTitle,
  Modal,
  ModalClose,
  ModalDialog,
} from "@mui/joy";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LockResetIcon from "@mui/icons-material/LockReset";
import { putAPI } from "../../api";
import Swal from "sweetalert2";

export default function DoiMatKhau(props) {
  const nhanVien = JSON.parse(localStorage.getItem("user"));
  const [matKhauCu, setMatKhauCu] = useState("");
  const [matKhauMoi, setMatKhauMoi] = useState("");
  const [xacNhanMK, setXacNhanMK] = useState("");
  const [errMKCu, setErrMKCu] = useState("");
  const [errXN, setErrXN] = useState("");
  const hanldeDoiMatKhau = async () => {
    if (matKhauMoi === xacNhanMK) {
      try {
        const dt = new FormData();
        dt.append("matKhauCu", matKhauCu);
        dt.append("matKhauMoi", matKhauMoi);
        const result = await putAPI(
          `/taikhoan/doiMatKhau/${nhanVien.tenTaiKhoan}`,
          dt
        );
        if (result.status === 200) {
          Swal.fire({
            icon: "success",
            title: result.data,
          });
          props.setDoiMK(false);
          setMatKhauCu("");
          setMatKhauMoi("");
          setXacNhanMK("");
          setErrMKCu("");
        }
      } catch (error) {
        console.log(error);
        setErrMKCu(error.response.data);
      }
    }else{
        setErrXN("Mật khẩu mới và xác nhận không khớp !!!")
    }
  };
  onkeyup = (e) => {
    if (e.key === "Enter") {
      hanldeDoiMatKhau()
    }
  };
  return (
    <Modal
      open={props.open}
      onClose={() => {
        props.setDoiMK(false);
        setMatKhauCu("");
        setMatKhauMoi("");
        setXacNhanMK("");
        setErrMKCu("");
      }}
    >
      <ModalDialog>
        <ModalClose />
        <DialogTitle sx={{ alignItems: "center" }}>
          <LockResetIcon sx={{ fontSize: "38px" }} />
          Đổi mật khẩu
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Mật khẩu cũ"
            type="password"
            id="password-old"
            autoComplete="current-password"
            value={matKhauCu}
            onChange={(e) => setMatKhauCu(e.target.value)}
          />
          <span style={{ color: "red", fontSize: "15px" }}>{errMKCu}</span>
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Mật khẩu mới"
            type="password"
            id="password-new"
            value={matKhauMoi}
            onChange={(e) => setMatKhauMoi(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Xác nhận mật khẩu"
            type="password"
            id="password"
            value={xacNhanMK}
            onChange={(e) => setXacNhanMK(e.target.value)}
          />
          <span style={{ color: "red", fontSize: "15px" }}>{errXN}</span>
          <Button
            onClick={() => hanldeDoiMatKhau()}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Lưu
          </Button>
        </DialogContent>
      </ModalDialog>
    </Modal>
  );
}
