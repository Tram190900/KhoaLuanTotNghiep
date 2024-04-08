import React, { useEffect, useState } from "react";
import clsx from "clsx";
import {
  Box,
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
import { deleteAPI, getAPI, postAPI, putAPI } from "../../../api";
import Swal from "sweetalert2";
import LinearProgress from "@mui/material/LinearProgress";

const TaoPhongMay = (props) => {
  const [loading, setLoading] = useState(true);
  const [dsPhanMem, setDsPhanMem] = useState([]);
  const [dsThietBi, setDsThietBi] = useState([]);
  const [dsPhanMemChon, setDsPhanMemChon] = useState([]);
  const [dsThietBiChon, setDsThietBiChon] = useState([]);
  const [toaNha, setToaNha] = useState([]);
  // const [dsMayTinhCapNhap, setDanhSachMayTinhCapNhap] = useState([]);
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

  const showProgress = () => {
    document.getElementById("element").style.display = "block";
  };

  const checkData = () => {
    if (
      duLieuVao.soPhong.trim().length > 0 &&
      duLieuVao.soLuongMay.trim().length > 0 &&
      duLieuVao.tenLoaiPhong.trim().length > 0
    ) {
      return true;
    } else {
      Swal.fire({
        icon: "error",
        title: "Điền đầy đủ thông tin phòng máy",
        customClass: {
          container: 'custom-swal-container' // Thêm một class tùy chỉnh cho container của Swal.fire
        },
        didOpen: () => {
          const swalContainer = document.querySelector('.custom-swal-container');
          if (swalContainer) {
            swalContainer.style.zIndex = '10000'; // Đặt z-index của container lên giá trị cao hơn (ví dụ: 10000)
          }
        }
      });
    }
  };

  const luuPhongMay = async () => {
    const check = checkData();
    if (check) {
      const phongMay = {
        soPhong: duLieuVao.soPhong,
        toaNha: toaNha,
        loaiPhong: {
          tenLoaiPhong: duLieuVao.tenLoaiPhong,
          soLuongMay: duLieuVao.soLuongMay,
        },
      };
      await postAPI("/savePhongMay", phongMay);
      await luuMayTinh().then((comment) => {
        setLoading(false);
      });
      setDsPhanMemChon([]);
      setDsThietBiChon([]);
      props.xemDanhSachPhongMay();
      props.setOpen(false);
      setLoading(true);
    }
  };

  const luuMayTinh = async () => {
    for (let i = 0; i < duLieuVao.soLuongMay; i++) {
      const mayTinh = {
        soMay:
          i > 8
            ? duLieuVao.soPhong.replace(".", "") + "M" + (i + 1)
            : duLieuVao.soPhong.replace(".", "") + "M0" + (i + 1),
        trangThai: 1,
        phongMay: {
          soPhong: duLieuVao.soPhong,
        },
      };
      await postAPI("/saveMayTinh", mayTinh);
      dsPhanMemChon.map(async (phanMem) => {
        const chiTietCaiDat = {
          mayTinh: mayTinh,
          phanMem: phanMem,
          ngayCaiDat: new Date(),
        };
        await postAPI("/saveChiTietCaiDat", chiTietCaiDat);
      });
      dsThietBiChon.map(async (thietBi) => {
        const chiTietLapDat = {
          mayTinh: mayTinh,
          thietBi: thietBi,
          ngayLapDat: new Date(),
        };
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
    const phongMay = {
      soPhong: duLieuVao.soPhong,
      toaNha: toaNha,
      loaiPhong: {
        tenLoaiPhong: duLieuVao.tenLoaiPhong,
        soLuongMay: duLieuVao.soLuongMay,
      },
    };
    try {
      const result = await putAPI(
        `/updatePhongMay/${props.phongMay_id}`,
        phongMay
      );
      if (result.status === 200) {
        Swal.fire({
          text: "Cập nhập phòng máy thành công",
          icon: "success",
          confirmButtonText: "OK",
        });
        props.setOpen(false);
        await capNhapMayTinh().then((comment) => {
          setLoading(false);
        });
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
    }
  };

  /* const xemDanhSachMayTinhCapNhap = async (tenPhongMay) => {
  const result = await getAPI(`/getMayTinhByPhong/${tenPhongMay}`);
  console.log("ten PHong May");
  console.log(tenPhongMay);
    setDanhSachMayTinhCapNhap(result.data);
} */
  const capNhapMayTinh = async () => {
    const result = await getAPI(`/getMayTinhByIdPhong/${props.phongMay_id}`);
    const dsMayTinhCapNhap = result.data;
    for (let i = 0; i < dsMayTinhCapNhap.length; i++) {
      dsMayTinhCapNhap[i].soMay =
        i > 8
          ? duLieuVao.soPhong.replace(".", "") + "M" + (i + 1)
          : duLieuVao.soPhong.replace(".", "") + "M0" + (i + 1);
      dsMayTinhCapNhap[i].trangThai = 1;
      await putAPI(
        `/updateMayTinh/${dsMayTinhCapNhap[i].id}`,
        dsMayTinhCapNhap[i]
      );
      await deleteAPI(`/xoaChiTietCaiDat/${dsMayTinhCapNhap[i].id}`);
      await deleteAPI(`/xoaChiTietLapDat/${dsMayTinhCapNhap[i].id}`);
      dsPhanMemChon.map(async (phanMem) => {
        const chiTietCaiDat = {
          mayTinh: dsMayTinhCapNhap[i],
          phanMem: phanMem,
          ngayCaiDat: new Date(),
        };
        await postAPI("/saveChiTietCaiDat", chiTietCaiDat);
      });
      dsThietBiChon.map(async (thietBi) => {
        const chiTietLapDat = {
          mayTinh: dsMayTinhCapNhap[i],
          thietBi: thietBi,
          ngayLapDat: new Date(),
        };
        await postAPI("/saveChiTietLapDat", chiTietLapDat);
      });
    }
    props.setOpen(false);
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
          <Box id="element" sx={{ width: "100%", display: "none" }}>
            {loading ? <LinearProgress /> : null}
          </Box>
          <Button
            onClick={() => {
              if (props.tieuDe === "Tạo phòng máy") {
                showProgress();
                luuPhongMay();
              } else if (props.tieuDe === "Cập nhập phòng máy") {
                showProgress();
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
