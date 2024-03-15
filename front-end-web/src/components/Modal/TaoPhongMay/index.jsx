import React, { useEffect, useState } from "react";
import clsx from "clsx";
import {
  Button,
  DialogContent,
  DialogTitle,
  Modal,
  ModalClose,
  ModalDialog,
} from "@mui/joy";
import style from "./taoPhongMay.module.scss";
import ChecklistIcon from "@mui/icons-material/Checklist";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Unstable_Grid2";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { deleteAPI, getAPI, postAPI } from "../../../api";
import Swal from "sweetalert2";

const TaoPhongMay = (props) => {
  const [dsPhanMem, setDsPhanMem] = useState([]);
  const [dsThietBi, setDsThietBi] = useState([]);
  const [dsPhanMemChon, setDsPhanMemChon] = useState([]);
  const [dsThietBiChon, setDsThietBiChon] = useState([]);
  const [toaNha, setToaNha] = useState([]);
  const [duLieuVao, setDuLieuVao] = useState({
    soPhong: "",
    tenLoaiPhong: "",
    soLuongMay: "",
  });

  const layThongTinToaNha = async () => {
    const result = await getAPI(`/toanha/${props.toaNha_id}`);
    if (result.status === 200) {
      setToaNha(result.data);
    }
  };

  const xemDanhSachPhanMem = async () => {
    const result = await getAPI("getAllPhanMem");
    if (result.status === 200) {
      setDsPhanMem(result.data);
    }
  };

  const xemDanhSachThietBi = async () => {
    const result = await getAPI("getAllThietBi");
    if (result.status === 200) {
      setDsThietBi(result.data);
    }
  };

  useEffect(() => {
    xemDanhSachPhanMem();
    xemDanhSachThietBi();
    layThongTinToaNha();
  }, []);

  const handleDsPhanMemChon = (item) => {
    if (dsPhanMemChon.includes(item)) {
      const update = dsPhanMemChon.filter((i) => i !== item);
      setDsPhanMemChon(update);
    } else {
      setDsPhanMemChon([...dsPhanMemChon, item]);
    }
  };

  const handleDsThietBiChon = (item) => {
    if (dsThietBiChon.includes(item)) {
      const update = dsThietBiChon.filter((i) => i !== item);
      setDsThietBiChon(update);
    } else {
      setDsThietBiChon([...dsThietBiChon, item]);
    }
  };

  const onInputChange = (e) => {
    setDuLieuVao({ ...duLieuVao, [e.target.name]: e.target.value });
  };

  const luuPhongMay = async () => {
    const phongMay = {
      soPhong: duLieuVao.soPhong,
      toaNha: toaNha,
      loaiPhong: {
        tenLoaiPhong: duLieuVao.tenLoaiPhong,
        soLuongMay: duLieuVao.soLuongMay,
      },
    };
    await postAPI("/savePhongMay", phongMay);
    luuMayTinh();
    props.xemDanhSachPhongMay();
    props.setOpen(false);
  };

  const luuMayTinh = async () => {
    for (let i = 0; i < duLieuVao.soLuongMay; i++) {
      const mayTinh = {
        soMay:
          i > 8
            ? duLieuVao.soPhong.replace(".", "") + "M" + (i + 1)
            : duLieuVao.soPhong.replace(".", "") + "M0" + (i + 1),
        trangThai: true,
        phongMay: {
          soPhong: duLieuVao.soPhong
        }
      };
      await postAPI("/saveMayTinh", mayTinh);
      dsPhanMemChon.map(async (phanMem) => {
        const chiTietCaiDat = {
          mayTinh: mayTinh,
          phanMem: phanMem,
          ngayCaiDat: new Date()
        }
        await postAPI("/saveChiTietCaiDat", chiTietCaiDat);
      });
      dsThietBiChon.map(async (thietBi) => {
        const chiTietLapDat = {
          mayTinh: mayTinh,
          thietBi: thietBi,
          ngayLapDat: new Date()
        }
        await postAPI("/saveChiTietLapDat", chiTietLapDat);
      });
    }
    props.setOpen(false);
  };

  const luuPhongMay1 = async () => {
    /* const mayTinh = {
      phongMay: {
        soPhong: duLieuVao.soPhong,
        toaNha: duLieuVao.toaNha,
        loaiPhong: {
          tenLoaiPhong: duLieuVao.tenLoaiPhong,
          soLuongMay: duLieuVao.soLuongMay
        }
      },
      phanMems: dsPhanMemChon,
      thietBis: dsThietBiChon
    };
    try {
      const result = await postAPI(
        "/savePhongMay",
        mayTinh
      );
      if (result.status === 200) {
        Swal.fire({
          text: "Thêm phòng máy thành công",
          icon: "success",
          confirmButtonText: "OK",
        });
        props.setOpen(false);
        props.xemDanhSachPhongMay();
        setDsPhanMemChon([]);
        setDsThietBiChon([]);
      }
    } catch (error) {
      props.setOpen(false);
      Swal.fire({
        text: error.response.data,
        icon: "error",
        confirmButtonText: "OK",
      });
    } */
  };

  const capNhapPhongMay = async () => {
    await deleteAPI(`/deletePhongMay/${props.phongMay_id}`);
    luuPhongMay();
  };

  return (
    <Modal open={props.open} onClose={() => props.setOpen(false)}>
      <ModalDialog sx={{ padding: "20px" }}>
        <ModalClose />
        <DialogTitle>
          <ChecklistIcon sx={{ fontSize: "35px" }} />
          {props.tieuDe}
        </DialogTitle>
        <DialogContent>
          <Grid mx={1} my={3} container rowSpacing={2} columnSpacing={2}>
            <Grid xs={6}>
              <FormControl fullWidth>
                <TextField
                  name="soPhong"
                  onChange={(e) => onInputChange(e)}
                  id="outlined-required"
                  label="Số Phòng"
                />
              </FormControl>
            </Grid>
            <Grid xs={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Loại phòng
                </InputLabel>
                <Select
                  defaultValue=""
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="LoaiPhong"
                  onChange={(e, v) =>
                    setDuLieuVao({ ...duLieuVao, tenLoaiPhong: v.props.value })
                  }
                >
                  <MenuItem value="Nhỏ">Nhỏ</MenuItem>
                  <MenuItem value="Vừa">Vừa</MenuItem>
                  <MenuItem value="Lớn">Lớn</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={12}>
              <FormControl fullWidth>
                <TextField
                  name="soLuongMay"
                  onChange={(e) => onInputChange(e)}
                  id="outlined-required"
                  label="Số lượng máy"
                />
              </FormControl>
            </Grid>
            <Grid xs={12}>
              <FormControl component="fieldset" variant="standard" fullWidth>
                <FormLabel component="legend" sx={{ fontWeight: "bold" }}>
                  Phần mềm
                </FormLabel>
                <FormGroup className={clsx(style.phanMem)}>
                  {dsPhanMem.map((phanMem, index) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={() => handleDsPhanMemChon(phanMem)}
                        />
                      }
                      checked={dsPhanMemChon.some((i) => i.id === phanMem.id)}
                      label={phanMem.tenPhamMem}
                    />
                  ))}
                </FormGroup>
              </FormControl>
            </Grid>
            <Grid xs={12}>
              <FormControl component="fieldset" variant="standard" fullWidth>
                <FormLabel component="legend" sx={{ fontWeight: "bold" }}>
                  Thiết bị
                </FormLabel>
                <FormGroup className={clsx(style.phanMem)}>
                  {dsThietBi.map((thietBi, index) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={() => handleDsThietBiChon(thietBi)}
                        />
                      }
                      checked={dsThietBiChon.some((i) => i.id === thietBi.id)}
                      label={thietBi.tenThietBi}
                    />
                  ))}
                </FormGroup>
              </FormControl>
            </Grid>
          </Grid>
          <Button
            onClick={() => {
              if (props.tieuDe === "Tạo phòng máy") {
                luuPhongMay();
              } else if (props.tieuDe === "Cập nhập phòng máy") {
                capNhapPhongMay();
              }
            }}
          >
            Lưu
          </Button>
        </DialogContent>
      </ModalDialog>
    </Modal>
  );
};

export default TaoPhongMay;