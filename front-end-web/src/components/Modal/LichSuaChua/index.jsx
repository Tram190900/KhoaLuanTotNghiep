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
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import style from "./lichSuaChua.module.scss";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import Swal from "sweetalert2";
import { getAPI, postAPI, putAPI } from "../../../api";
import moment from "moment";

export default function LichSuaChua(props) {
  const date = new Date();
  const defaultValue = date.toLocaleDateString("en-CA");
  const [duLieuInput, setDuLieuInput] = useState({
    loiGapPhai: "",
    ngayGapLoi: defaultValue,
    ngayDuKienSua: moment().format("YYYY-MM-DD"),
  });
  const [allNhanVien, setAllNhanVien] = useState();
  const [selectNhanVien, setSelectNhanVien] = useState();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const inputOnChange = (e) => {
    setDuLieuInput({ ...duLieuInput, [e.target.name]: e.target.value });
  };

  const handleSelectNV = (event, newValue) => {
    setSelectNhanVien(newValue);
  };

  const capNhapMayTinh = async () => {
    const mayTinh = props.mayTinh;
    mayTinh.trangThai = 2;
    await putAPI(`/updateMayTinh/${props.mayTinh.id}`, mayTinh);
  };

  const themLoi = async () => {
    capNhapMayTinh();
    const loi = {
      loiGapPhai: duLieuInput.loiGapPhai,
      ngayGapLoi: duLieuInput.ngayGapLoi,
      mucDoLoi: duLieuInput.mucDoLoi,
      mayTinh: { id: props.mayTinh?.id },
      trangThai: false,
      ngayDuKienSua: duLieuInput.ngayDuKienSua,
      nhanVien: { id: selectNhanVien },
    };
    if(user.role==='giangvien'){
      loi.giangVien={id: user.giangVien.id}
    }
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

  const getAllNhanVien = async () => {
    try {
      const result = await getAPI("getAllNhanVien");
      if (result.status === 200) {
        setAllNhanVien(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getNhanVienTruc = async () => {
    try {
      const dt = new FormData();
      dt.append(
        "ngayTruc",
        moment(duLieuInput.ngayDuKienSua).format("YYYY-MM-DD")
      );
      dt.append("phongTruc", props.phongMay?.id);
      const result = await postAPI("/getNhanVienTheoCaTruc", dt);
      if (result.status === 200 && result.data) {
        setSelectNhanVien(result.data.id);
      } else {
        setSelectNhanVien(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (props.open) {
      getAllNhanVien();
      getNhanVienTruc();
    }
  }, [props.open]);

  useEffect(() => {
    getNhanVienTruc();
  }, [duLieuInput.ngayDuKienSua]);

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
                {/* <Input
                  name="loiGapPhai"
                  onChange={(e) => inputOnChange(e)}
                  placeholder="Lỗi mắc phải..."
                /> */}
                <Select
                placeholder="Lỗi gặp phải..."
                onChange={(e, v) =>
                  setDuLieuInput({ ...duLieuInput, loiGapPhai: v })
                }
              >
                <Option value={"CPU"}>CPU</Option>
                <Option value={"Chuột"}>Chuột</Option>
                <Option value={"Bàn phím"}>Bàn phím</Option>
                <Option value={"Màn hình"}>Màn hình</Option>
                <Option value={"Điện"}>Điện</Option>
                <Option value={"Mạng"}>Mạng</Option>
                <Option value={"Khác..."}>Khác...</Option>
              </Select>
              </FormControl>
              <FormLabel>Mức độ lỗi</FormLabel>
              <Select
                placeholder="Mức độ lỗi..."
                onChange={(e, v) =>
                  setDuLieuInput({ ...duLieuInput, mucDoLoi: v })
                }
              >
                <Option value={1}>Sửa trong ngày</Option>
                <Option value={2}>Không quá 7 ngày</Option>
                <Option value={3}>Không quá 30 ngày</Option>
              </Select>
              <div className={clsx(style.group_date)}>
                <FormControl>
                  <FormLabel>Ngày gặp lỗi</FormLabel>
                  <Input
                    name="ngayGapLoi"
                    id="dateRequired"
                    type="date"
                    defaultValue={defaultValue}
                    onChange={(e) => inputOnChange(e)}
                    placeholder="Ngày sửa"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Ngày dự kiến sửa</FormLabel>
                  <Input
                    name="ngayDuKienSua"
                    id="dateRequired"
                    type="date"
                    defaultValue={defaultValue}
                    onChange={(e) => inputOnChange(e)}
                    placeholder="Ngày dự kiến"
                  />
                </FormControl>
              </div>

              <FormLabel>Nhân viên phụ trách</FormLabel>
              <Select value={selectNhanVien} onChange={handleSelectNV}>
                {allNhanVien?.map((item, index) => (
                  <Option key={index} value={item.id}>
                    {item.hoTenNhanVien}
                  </Option>
                ))}
              </Select>
              <FormLabel>Giảng viên báo lỗi</FormLabel>
              <Input
                value={
                  user.role === "giangvien" ? user.giangVien.tenGiangVien : ""
                }
                disabled
              />
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
