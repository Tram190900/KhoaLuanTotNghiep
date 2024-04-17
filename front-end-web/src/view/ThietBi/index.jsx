import React, { useEffect, useState } from "react";
import clsx from "clsx";
import style from "./thietBi.module.scss";
import { Button, FormControl, FormLabel, Input, Option, Select, Sheet, Table } from "@mui/joy";
import { getAPI, postAPI, putAPI } from "../../api";
import Swal from "sweetalert2";
import PrimarySearchAppBar from "../../components/AppBar/PrimarySearchAppBar";

export default function ThietBi() {
  const [allThietBi, setAllThietBi] = useState([]);
  const [tenThietBi, setTenThietBi] = useState("");
  const [soLuong, setSoLuong] = useState();
  const [donVi, setDonVi] = useState();
  const [thietBiId, setThietBiId] = useState("");
  useEffect(() => {
    handleGetAllThietBi();
  }, []);
  const handleGetAllThietBi = async () => {
    const result = await getAPI("/getAllThietBi");
    if (result.status === 200) {
      setAllThietBi(result.data);
    }
  };

  const checkData = () => {
    if (tenThietBi.trim().length > 0 && soLuong) {
      return true;
    } else {
      Swal.fire({
        icon: "error",
        title: "Điền đầy đủ thông tin của thiết bị",
      });
    }
  };

  const handleSaveThietBi = async () => {
    const check = checkData();
    if (check) {
      const data = {
        tenThietBi: tenThietBi,
        soLuong: soLuong,
        donVi: donVi
      };
      try {
        const result = await postAPI("/saveThietBi", data);
        if (result.status === 200) {
          Swal.fire({
            text: "Thêm mới thiết bị thành công",
            icon: "success",
            confirmButtonText: "OK",
          });
          handleGetAllThietBi();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleUpdateThietBi = async () => {
    const check = checkData();
    if (check) {
      try {
        const data = {
          tenThietBi: tenThietBi,
          soLuong: soLuong,
          donVi: donVi
        };
        const result = await putAPI(`/updateThietBi/${thietBiId}`, data);
        if (result.status === 200) {
          Swal.fire({
            text: "Cập nhật thiết bị thành công",
            icon: "success",
            confirmButtonText: "OK",
          });
          handleGetAllThietBi();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div>
      <PrimarySearchAppBar/>
      <div className={clsx(style.thietBi, "p-3")}>
      <h1>QUẢN LÝ THIẾT BỊ</h1>
      <div className={clsx(style.infoWrap)}>
        <div className={clsx(style.left)}>
          <FormControl>
            <FormLabel>Tên thiết bị</FormLabel>
            <Input
              placeholder="Họ tên"
              value={tenThietBi}
              onChange={(e) => setTenThietBi(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Số lượng</FormLabel>
            <Input
              type="number"
              placeholder="Số lượng"
              value={soLuong}
              onChange={(e) => setSoLuong(e.target.value)}
            />
          </FormControl>
          <FormControl>
              <FormLabel>Đơn vị</FormLabel>
              <Select
                value={donVi}
                onChange={(e,v)=>{
                  setDonVi(v)
                }}
              >
                <Option value={"Cái"}>
                  Cái
                </Option>
                <Option value={"Thùng"}>Thùng</Option>
                <Option value={"Mét"}>
                  Mét
                </Option>
              </Select>
            </FormControl>
        </div>
      </div>
      <div className={clsx(style.buttonWrap)}>
        <Button
          onClick={() => {
            handleSaveThietBi();
          }}
        >
          Thêm mới
        </Button>
        <Button onClick={() => handleUpdateThietBi()}>Cập nhật</Button>
      </div>
      <Sheet id={"scroll-style-01"} className={clsx(style.tableWrap)}>
        <Table stickyHeader hoverRow aria-label="striped table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Tên thiết bị</th>
              <th>Số lượng</th>
              <th>Đơn vị</th>
            </tr>
          </thead>
          <tbody>
            {allThietBi?.map((item, index) => (
              <tr
                key={index}
                onClick={() => {
                  setTenThietBi(item.tenThietBi);
                  setSoLuong(item.soLuong);
                  setThietBiId(item.id);
                  setDonVi(item.donVi);
                }}
              >
                <td>{item.id}</td>
                <td>{item.tenThietBi}</td>
                <td>{item.soLuong}</td>
                <td>{item.donVi}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>
    </div>
    </div>
  );
}
