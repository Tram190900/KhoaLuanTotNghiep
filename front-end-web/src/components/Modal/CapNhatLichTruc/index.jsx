import {
  Box,
  Button,
  Checkbox,
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
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Swal from "sweetalert2";
import { DateCalendar, StaticDatePicker } from "@mui/x-date-pickers";

export default function CapNhatLichTruc(props) {
  const [phongTruc, setPhongTruc] = useState([]);
  const [phongMay, setPhongMay] = useState();
  const [allToaNha, setAllToaNha] = useState();
  const [toaNha, setToaNha] = useState("");
  const [caTruc, setCaTruc] = useState("");
  const [ngayTruc, setNgayTruc] = useState(dayjs(Date.now()));

  useEffect(() => {
    if (props.open) {
      handleGetAllToaNha();
    } else {
      setPhongTruc([]);
    }
  }, [props.open]);

  const handleGetAllToaNha = async () => {
    try {
      const result = await getAPI("getAllToaNha");
      if (result.status === 200) {
        setAllToaNha(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleGetPhongMayTheoToaNha = async (value) => {
    try {
      const result = await getAPI(`getPhongMay/${value}`);
      if (result.status === 200) {
        setPhongMay(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSelectPhongTruc = async (item) => {
    if (phongTruc.includes(item)) {
      const update = phongTruc.filter((i) => i.id !== item.id);
      setPhongTruc(update);
    } else {
      setPhongTruc([...phongTruc, item]);
    }
  };

  const handleToaNha = (event, newValue) => {
    setToaNha(newValue);
    handleGetPhongMayTheoToaNha(newValue);
  };
  const handleCaTruc = (event, newValue) => {
    setCaTruc(newValue);
  };

    const handleCapNhatLichTruc=async()=>{
      const data = new FormData()
      const phongMays = []
      phongTruc?.map((item)=>{
        phongMays.push(item.id)
      })
      data.append("phongMays", phongMays)
      data.append("nhanVien", props.nhanVienId)
      data.append("caLam", caTruc)
      data.append("ngayTruc", ngayTruc.format("YYYY-MM-DD"))
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
      <ModalDialog className="w-50">
        <ModalClose />
        <DialogTitle>Cập nhật lịch trực</DialogTitle>
        <DialogContent>
          <div className="d-flex justify-content-between">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                value={ngayTruc}
                onChange={(newValue) => setNgayTruc(newValue)}
              />
            </LocalizationProvider>
            <div className="w-50">
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
              <FormControl>
                <FormLabel>Tòa nhà</FormLabel>
                <Select
                  value={toaNha}
                  onChange={handleToaNha}
                  placeholder="Tòa nhà ..."
                >
                  {allToaNha?.map((item, index) => (
                    <Option value={item} key={index}>
                      {item}
                    </Option>
                  ))}
                </Select>
              </FormControl>
              <div className="d-flex">
                <Box
                  className="w-50"
                  id={"scroll-style-01"}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "13rem",
                    overflowY: "auto",
                    overflowX: "hidden",
                    borderRight:"1px solid gray"
                  }}
                >
                  <FormLabel>Tất cả các phòng</FormLabel>
                  {phongMay?.map((item, index) => (
                    <Checkbox
                      onClick={() => handleSelectPhongTruc(item)}
                      checked={phongTruc.includes(item)}
                      value={item.id}
                      label={item.soPhong}
                      key={index}
                    />
                  ))}
                </Box>
                <Box
                  className="w-50"
                  id={"scroll-style-01"}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "13rem",
                    overflowY: "auto",
                    overflowX: "hidden",
                    marginLeft:'2%'
                  }}
                >
                  <FormLabel>Phòng được chọn</FormLabel>
                  {phongTruc?.map((item, index) => (
                    <span key={index}>{item.soPhong}</span>
                  ))}
                </Box>
              </div>
            </div>
          </div>

          <Button onClick={() => handleCapNhatLichTruc()}>Cập nhật</Button>
        </DialogContent>
      </ModalDialog>
    </Modal>
  );
}
