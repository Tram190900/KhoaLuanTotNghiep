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
import ChecklistIcon from "@mui/icons-material/Checklist";
import { useEffect, useState } from "react";
import { getAPI, putAPI } from "../../../api";
import Swal from "sweetalert2";

export default function CapNhapNhanVienCTLSSC(props) {
  const [nhanViens, setNhanViens] = useState([]);
  const [nhanVien, setNhanVien] = useState();
  const [ngaySuaLoi, setNgaySuaLoi] = useState(); 

  useEffect(() => {
    xemDanhSachNhanVien();
  }, []);

  const xemDanhSachNhanVien = async () => {
    const result = await getAPI("/getAllNhanVien");
    if (result.status === 200) {
      setNhanViens(result.data);
    }
  };

  const capNhapNhanVienSuaLoi = async () => {
    props.chiTietLichSuSuaChua.nhanVien = nhanVien;
    props.chiTietLichSuSuaChua.ngaySuaLoi = ngaySuaLoi;
    await putAPI(
      `/chiTietLichSuSuaChua/${props.chiTietLichSuSuaChua.id}/nhanVien`,
      props.chiTietLichSuSuaChua
    )
      .then(() => {
        Swal.fire({
          text: "Cập nhập thông tin thành công",
          icon: "success"
        })
      })
      .catch((error) => {
        console.log(error);
      })
    props.setOpen(false);
  };

  return (
    <Modal open={props.open} onClose={() => props.setOpen(false)}>
      <ModalDialog>
        <ModalClose />
        <DialogTitle>
          <ChecklistIcon sx={{ fontSize: "35px" }} />
          Cập nhật danh sách nhân viên
        </DialogTitle>
        <DialogContent>
          <FormControl>
            <FormLabel>Tên nhân viên</FormLabel>
            <Select onChange={(e, value) => setNhanVien(value)} placeholder="Tên nhân viên ...">
              {nhanViens.map((nhanVien) => (
                <Option value={nhanVien}
                >
                  {nhanVien.hoTenNhanVien}
                </Option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Ngày sửa lỗi</FormLabel>
            <Input
              onChange={(e) => 
                {setNgaySuaLoi(e.target.value)
                console.log("Tao Được nè")}}
              type="date"
              placeholder="Ngày sửa lỗi"
            />
          </FormControl>
          <Button onClick={() => capNhapNhanVienSuaLoi()}>Cập nhật</Button>
        </DialogContent>
      </ModalDialog>
    </Modal>
  );
}
