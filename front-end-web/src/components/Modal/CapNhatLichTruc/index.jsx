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
import React, { useEffect, useState } from "react";
import { getAPI, postAPI } from "../../../api";
import Swal from "sweetalert2";

export default function CapNhatLichTruc(props) {
  const [phongTruc, setPhongTruc] = useState("");
  const [caTruc, setCaTruc] = useState("");
  const [ngayTruc, setNgayTruc] = useState("");
  const [allPhong, setAllPhong] = useState([]);

  useEffect(() => {
    if (props.open) {
      handleGetAllPhong();
    }
  }, [props.open]);

  const handleGetAllPhong = async () => {
    const result = await getAPI("getAllPhongMay");
    if (result.status === 200) {
      setAllPhong(result.data);
    }
  };

  const handlePhongMay = (event, newValue) => {
    setPhongTruc(newValue);
  };
  const handleCaTruc = (event, newValue) => {
    setCaTruc(newValue);
  };

  const handleCapNhatLichTruc=async()=>{
    const data={
      nhanVien:{id:props.nhanVienId},
      phongMay:{id:phongTruc},
      ngayTruc:ngayTruc,
      caLam: caTruc
    }
    const result = await postAPI('saveChamCong', data)
    if(result.status===200){
      Swal.fire({
        text: "Cập nhật lịch trực thành công",
        icon: "success",
      });
      props.handleGetCaTrucByNhanVien(props.nhanVienId)
      props.setOpen(false)
    }
  }

  return (
    <Modal open={props.open} onClose={() => props.setOpen(false)}>
      <ModalDialog>
        <ModalClose />
        <DialogTitle>Cập nhật lịch trực</DialogTitle>
        <DialogContent>
          <FormControl>
            <FormLabel>Phòng</FormLabel>
            <Select
              value={phongTruc}
              onChange={handlePhongMay}
              placeholder="Phòng ..."
            >
              {allPhong?.map((item, index) => (
                <Option value={item.id} key={index}>
                  {item.soPhong}
                </Option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Ngày trực</FormLabel>
            <Input
              value={ngayTruc}
              onChange={(e) => setNgayTruc(e.target.value)}
              type="date"
              placeholder="Tòa nhà"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Ca trực</FormLabel>
            <Select
              value={caTruc}
              onChange={handleCaTruc}
              placeholder="Ca trực ..."
            >
              <Option value={"Sáng"}>Sáng</Option>
              <Option value={"Trưa"}>Trưa</Option>
              <Option value={"Tối"}>Tối</Option>
            </Select>
          </FormControl>
          <Button onClick={()=>handleCapNhatLichTruc()}>Cập nhật</Button>
        </DialogContent>
      </ModalDialog>
    </Modal>
  );
}
