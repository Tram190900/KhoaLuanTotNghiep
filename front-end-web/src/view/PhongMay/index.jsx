import clsx from "clsx";
import React, { useEffect, useState } from "react";
import style from "./phongMay.module.scss";
import { Button, Checkbox, Sheet, Table } from "@mui/joy";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function PhongMay() {
  const [phongMays, setPhongMays] = useState([]);

  const [rowData, setRowData] = useState({
    id:"",
    soPhong: "",
    toaNha: "",
    tenLoaiPhong: "",
    soLuongMay: "",
  });

  const onInputChange = (e) => {
    setRowData({ ...rowData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = {
      soPhong: rowData.soPhong,
      toaNha: rowData.toaNha,
      loaiPhong: {
        tenLoaiPhong: rowData.tenLoaiPhong,
        soLuongMay: rowData.soLuongMay,
      }
    };
    await axios.post("http://localhost:8080/savePhongMay", data);
    window.location.reload();
  };

  useEffect(() => {
    loadPhongMays();
  }, []);

  const loadPhongMays = async () => {
    const result = await axios.get("http://localhost:8080/getAllPhongMay");
    setPhongMays(result.data);
  };

  const handlerAction = (phongMay_id) => {
    setRowData({id: phongMay_id});
  }

  const deletePhongMay = async (id) => {
    await axios.delete(`http://localhost:8080/deletePhongMay/${id}`);
    loadPhongMays();
  }

  const updatePhongMay = async () => {
    const data = {
      soPhong: rowData.soPhong,
      toaNha: rowData.toaNha,
      loaiPhong: {
        tenLoaiPhong: rowData.tenLoaiPhong,
        soLuongMay: rowData.soLuongMay,
      }
    }
    await axios.put(`http://localhost:8080/updatePhongMay/${rowData.id}`,data);
    loadPhongMays();
  };

  return (
    <div className={clsx(style.phongMay)}>
      <h1>QUẢN LÝ PHÒNG MÁY</h1>
      <div className={clsx(style.infoWrap)}>
        <div className={clsx(style.left)}>
          <div class="form-group">
            <label for="exampleFormControlInput1">Số phòng</label>
            <input
              name="soPhong"
              onChange={(e) => onInputChange(e)}
              type="text"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="Số phòng"
            />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput2">Tòa Nhà</label>
            <input
              name="toaNha"
              onChange={(e) => onInputChange(e)}
              type="text"
              class="form-control"
              id="exampleFormControlInput2"
              placeholder="Tòa nhà"
            />
          </div>
          <div class="form-group">
            <label for="exampleFormControlSelect1">Loại phòng</label>
            <select
              name="tenLoaiPhong"
              onChange={(e) => onInputChange(e)}
              class="form-control custom-select"
              id="exampleFormControlSelect1"
            >
              <option disabled selected>
                Chọn...
              </option>
              <option>Nhỏ</option>
              <option>Vừa</option>
              <option>Lớn</option>
            </select>
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput3">Số máy</label>
            <input
              name="soLuongMay"
              onChange={(e) => onInputChange(e)}
              type="text"
              class="form-control"
              id="exampleFormControlInput3"
              placeholder="Số máy"
            />
          </div>
        </div>
        <Sheet id={"scroll-style-01"} className={clsx(style.right)}>
          <strong>Danh sách ca trực</strong>
          <Table stripe="odd" stickyHeader hoverRow aria-label="striped table">
            <thead>
              <tr>
                <th>Tên nhân viên</th>
                <th>Ngày trực</th>
                <th>Ca trực</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Nguyễn Văn A</td>
                <td>01/01/2024</td>
                <td>Sáng</td>
              </tr>
              <tr>
                <td>Nguyễn Văn B</td>
                <td>01/01/2024</td>
                <td>Trưa</td>
              </tr>
            </tbody>
          </Table>
        </Sheet>
      </div>
      <form class="form-inline my-3">
        <div class="form-group">
          <label className="mr-2" for="exampleFormControlInput4">
            Tìm kiếm
          </label>
          <input
            type="text"
            class="form-control mr-2"
            id="exampleFormControlInput4"
            placeholder="Từ Khóa"
          />
        </div>
        <Checkbox className="mr-2" label="Số phòng" defaultChecked />
        <Checkbox className="mr-2" label="Tòa nhà" />
        <Button className="mr-2">Tìm kiếm</Button>
        <Button className="mr-2" onClick={(e) => onSubmit(e)}>
          Thêm mới
        </Button>
        <Button onClick={() => updatePhongMay()} className="mr-2">Cập nhật</Button>
        <Button onClick={() => deletePhongMay(rowData.id)} id="demo" className="delete-btn mr-2">Xóa</Button>
      </form>
      <Sheet id={"scroll-style-01"} className={clsx(style.tableWrap)}>
        <Table stickyHeader hoverRow aria-label="striped table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Tòa nhà</th>
              <th>Số phòng</th>
              <th>Loại phòng</th>
              <th>Số lượng máy</th>
            </tr>
          </thead>
          <tbody>
            {phongMays.map((phongMay) => (
              <tr onClick={() => handlerAction(phongMay.id)}>
                <td>{phongMay.id}</td>
                <td>{phongMay.toaNha}</td>
                <td>{phongMay.soPhong}</td>
                <td>{phongMay.loaiPhong.tenLoaiPhong}</td>
                <td>{phongMay.loaiPhong.soLuongMay}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>
    </div>
  );
}
