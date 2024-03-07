import clsx from "clsx";
import React, { useEffect, useState } from "react";
import style from "./mayTinh.module.scss";
import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Option,
  Select,
  Sheet,
  Table,
} from "@mui/joy";
import LichSuaChua from "../../components/Modal/LichSuaChua";
import { deleteAPI, getAPI, postAPI, putAPI } from "../../api";
import moment from "moment";
import Swal from "sweetalert2";
import CapNhatPhanMemMayTinh from "../../components/Modal/CapNhatPhanMemMayTinh";
import CapNhatThietBiMayTinh from "../../components/Modal/CapNhatThietBiMayTinh";

export default function MayTinh() {
  const [openLichSuaChua, setOpenLichSuaChua] = useState(false);
  const [openCpaNhatPhanMem, setOpenCapNhatPhanMem] = useState(false);
  const [openCapNhatThietBi, setOpenCapNhatThietBi] = useState(false);

  const [phanMemCaiDat, setPhanMemCaiDat] = useState([]);
  const [thietBiLapDat, setThietBiLapDat] = useState([]);

  const [allToaNha, setAllToaNha] = useState([]);
  const [selectToaNha, setSelectToaNha] = useState(null);

  const [phongMay, setPhongMay] = useState([]);
  const [selectPhongMay, setSelectPhongMay] = useState(null);

  const [mayTinh, setMayTinh] = useState([]);
  const [selectMayTinh, setSelectMayTinh] = useState(null);

  const [trangThai, setTrangThai] = useState(true);

  useEffect(() => {
    handleGetAllToaNha();
  }, []);

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

  const handleGetMayTinhTheoPhong = async (value) => {
    try {
      const result = await getAPI(`getMayTinhByPhong/${value}`);
      if (result.status === 200) {
        setMayTinh(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleToaNha = (event, newValue) => {
    setSelectToaNha(newValue);
    handleGetPhongMayTheoToaNha(newValue);
  };

  const handlePhongMay = async (event, newValue) => {
    setSelectPhongMay(newValue);
    if (newValue) {
      handleGetMayTinhTheoPhong(newValue.soPhong);
    }
  };

  const handleMayTinh = (event, newValue) => {
    setSelectMayTinh(newValue);
    if (newValue) {
      setTrangThai(newValue.trangThai);
    }
  };

  const handleGetPhanMemCaiDat = async (id) => {
    const result = await getAPI(`/getChiTietCaiDat/${id}`);
    if (result.status === 200 && result.data.length > 0) {
      const listPhanMem = [];
      result.data.map((item) => {
        listPhanMem.push({
          phanMem: item.phanMem,
          ngayCaiDat: item.ngayCaiDat,
        });
      });
      setPhanMemCaiDat(listPhanMem);
    } else {
      setPhanMemCaiDat([]);
    }
  };

  const handleGetThietBiLapDat = async (id) => {
    const result = await getAPI(`/getAllChiTietLapDat/${id}`);
    if (result.status === 200 && result.data.length > 0) {
      const listThietBi = [];
      result.data.map((item) => {
        listThietBi.push({
          thietBi: item.thietBi,
          ngayLapDat: item.ngayLapDat,
        });
      });
      setThietBiLapDat(listThietBi);
    } else {
      setThietBiLapDat([]);
    }
  };

  const handleChange = (event, newValue) => {
    setTrangThai(newValue);
  };

  const handleCapNhatMayTinh = async () => {
    // try {
    //   const data = {
    //     soMay: soMay,
    //     trangThai: trangThai,
    //     phongMay: {
    //       soPhong: phong,
    //     },
    //   };
    //   const result = await putAPI(`/updateMayTinh/${mayTinhId}`, data);
    //   if (result.status === 200) {
    //     Swal.fire({
    //       text: "Cập nhật máy tính thành công",
    //       icon: "success",
    //       confirmButtonText: "OK",
    //     });
    //     handleGetAllMayTinh();
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <>
      <div className={clsx(style.maytinh)}>
        <h1>QUẢN LÝ MÁY TÍNH</h1>
        <div className={clsx(style.infoWrap)}>
          <div className={clsx(style.content)}>
            <div className={clsx(style.leftWrap)}>
              <span className="d-flex justify-content-between">
                <FormControl className="w-50">
                  <FormLabel>Tòa nhà</FormLabel>
                  <Select
                    placeholder="Tòa nhà..."
                    value={selectToaNha}
                    onChange={handleToaNha}
                  >
                    {allToaNha?.map((item, index) => (
                      <Option value={item} key={index}>
                        {item}
                      </Option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl className="w-50">
                  <FormLabel>Số phòng</FormLabel>
                  <Select
                    value={selectPhongMay}
                    onChange={handlePhongMay}
                    placeholder="Số phòng..."
                  >
                    {phongMay?.map((item, index) => (
                      <Option value={item} key={index}>
                        {item.soPhong}
                      </Option>
                    ))}
                  </Select>
                </FormControl>
              </span>
              <FormControl>
                <FormLabel>Số máy</FormLabel>
                <Select
                  placeholder="Số máy..."
                  value={selectMayTinh}
                  onChange={handleMayTinh}
                >
                  {mayTinh?.map((item, index) => (
                    <Option key={index} value={item}>
                      {item.soMay}
                    </Option>
                  ))}
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Trạng thái</FormLabel>
                <Select
                  placeholder="Trạng thái ..."
                  value={trangThai}
                  onChange={handleChange}
                >
                  <Option value={true}>Bình thường</Option>
                  <Option value={false}>Bảo trì</Option>
                </Select>
              </FormControl>
              <Button
                className={clsx(style.leftWrap_button)}
                onClick={() => setOpenLichSuaChua(!openLichSuaChua)}
                disabled={selectMayTinh ? "" : "disabled"}
              >
                Báo lỗi
              </Button>
              <Button
                className={clsx(style.leftWrap_button)}
                onClick={() => handleCapNhatMayTinh()}
                disabled={selectPhongMay ? "" : "disabled"}
              >
                Cập nhật
              </Button>
            </div>
          </div>
        </div>
        <div className={clsx(style.rightWrap)}>
          <Sheet id={"scroll-style-01"} className={clsx(style.tablePhanMem)}>
            <Table
              aria-label="table with sticky header"
              stickyHeader
              stickyFooter
              stripe="odd"
              hoverRow
            >
              <thead>
                <tr>
                  <th>Tên phần mềm</th>
                  <th>Phiên bản</th>
                  <th>Ngày cài đặt</th>
                </tr>
              </thead>
              <tbody>
                {phanMemCaiDat?.map((item, index) => (
                  <tr key={index}>
                    <td>{item.phanMem.tenPhamMem}</td>
                    <td>{item.phanMem.phienBan}</td>
                    <td>{moment(item.ngayCaiDat).format("DD-MM-YYYY")}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Sheet>
          <Sheet id={"scroll-style-01"} className={clsx(style.tableThietBi)}>
            <Table
              aria-label="table with sticky header"
              stickyHeader
              stickyFooter
              stripe="odd"
              hoverRow
            >
              <thead>
                <tr>
                  <th>Tên thiết bị</th>
                  <th>Ngày cài đặt</th>
                </tr>
              </thead>
              <tbody>
                {thietBiLapDat?.map((item, index) => (
                  <tr key={index}>
                    <td>{item.thietBi.tenThietBi}</td>
                    <td>{moment(item.ngayLapDat).format("DD-MM-YYYY")}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Sheet>
        </div>
      </div>
      <LichSuaChua
        open={openLichSuaChua}
        phongMay={selectPhongMay}
        mayTinh={selectMayTinh}
        setOpen={setOpenLichSuaChua}
      />
      <CapNhatPhanMemMayTinh
        open={openCpaNhatPhanMem}
        setOpen={setOpenCapNhatPhanMem}
        phanMemCaiDat={phanMemCaiDat}
        // mayTinhId={mayTinhId}
        handleGetPhanMemCaiDat={handleGetPhanMemCaiDat}
      />
      <CapNhatThietBiMayTinh
        open={openCapNhatThietBi}
        setOpen={setOpenCapNhatThietBi}
        thietBiLapDat={thietBiLapDat}
        // mayTinhId={mayTinhId}
        handleGetThietBiLapDat={handleGetThietBiLapDat}
      />
    </>
  );
}
