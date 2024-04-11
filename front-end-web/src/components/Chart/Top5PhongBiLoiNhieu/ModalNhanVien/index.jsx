import {
  Avatar,
  Button,
  DialogContent,
  DialogTitle,
  Modal,
  ModalClose,
  ModalDialog,
  Radio,
  RadioGroup,
  Sheet,
  Typography,
} from "@mui/joy";
import React, { useEffect, useState } from "react";
import { getAPI, putAPI } from "../../../../api";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import Swal from "sweetalert2";

export default function ModalNhanVien(props) {
  const [allNhanVien, setAllNhanVien] = useState();
  const [selectNhanVien, setSelectNhanVien] = useState(props.nhanVienId);

  const getAllNhanVien = async () => {
    try {
      const result = await getAPI("/getAllNhanVien");
      if (result.status === 200) {
        setAllNhanVien(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCapNhatNhanVienSua = async () => {
    try {
      const dt = new FormData();
      dt.append("nhanVienId", selectNhanVien);
      const result = await putAPI(
        `/lichSuSuaChua/updateNhanVienSua/${props.lichSuId}`,
        dt
      );
      if (result.status === 200) {
        props.setOpen(false);
        if (props && typeof props.setOpenDetail === "function") {
          await props.setOpenDetail(false);
        }
        if (props && typeof props.handleFilterLichSu === "function") {
          await props.handleFilterLichSu();
          await props.getNhanVienById(selectNhanVien)
        }
        Swal.fire({
          icon: "success",
          text: "Chỉ định nhân viên sửa thành công!!!",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllNhanVien();
  }, []);
  return (
    <Modal
      open={props.open}
      onClose={() => {
        props.setOpen(false);
      }}
    >
      <ModalDialog sx={{ width: "30%" }}>
        <ModalClose />
        <DialogTitle
          sx={{
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <ManageAccountsOutlinedIcon sx={{ fontSize: "45px" }} />
          Chọn nhân viên phụ trách sửa lỗi ở máy {props.soMay}
        </DialogTitle>
        <DialogContent>
          <RadioGroup
            overlay
            name="nhanVienId"
            value={selectNhanVien}
            onChange={(e) => setSelectNhanVien(e.target.value)}
            orientation="horizontal"
            sx={{ gap: 2, flexWrap: "wrap", justifyContent: "center" }}
          >
            {allNhanVien?.map((item, index) => (
              <Sheet
                component="label"
                key={index}
                variant="outlined"
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  boxShadow: "sm",
                  borderRadius: "md",
                  width: "35%",
                }}
              >
                <Radio
                  defaultChecked={props.nhanVienId === item.id}
                  value={item.id}
                  variant="soft"
                  sx={{
                    mb: 2,
                  }}
                />
                <Avatar
                  alt={`person${item.hoTenNhanVien}`}
                  src={
                    item.image
                      ? item.image
                      : "https://www.eventfulnigeria.com/wp-content/uploads/2021/04/Avatar-PNG-Free-Download.png"
                  }
                />
                <Typography level="body-sm" sx={{ mt: 1 }}>
                  {item.hoTenNhanVien}
                </Typography>
              </Sheet>
            ))}
          </RadioGroup>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={() => handleCapNhatNhanVienSua()}>Cập nhật</Button>
            <Button
              color="neutral"
              style={{ marginLeft: "2%" }}
              onClick={() => {
                setSelectNhanVien(null);
                props.setOpen(false);
              }}
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </ModalDialog>
    </Modal>
  );
}
