import React, { useEffect, useState } from "react";
import clsx from "clsx";
import style from "./phenMem.module.scss";
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
import { deleteAPI, getAPI, postAPI, putAPI } from "../../api";
import Swal from "sweetalert2";
import { PanoramaPhotosphereSelectOutlined } from "@mui/icons-material";
import PrimarySearchAppBar from "../../components/AppBar/PrimarySearchAppBar";

export default function PhanMem() {
  const [phanMems, setPhanMems] = useState();

  const [phanMem, setPhanMem] = useState({
    id: "",
    tenPhamMem: "",
    phienBan: "",
    theLoai: "",
    phatTrienBoi: "",
  });

  useEffect(() => {
    loadPhanMems();
  }, []);

  const loadPhanMems = async () => {
    const result = await getAPI("/getAllPhanMem");
    if (result.status === 200) {
      setPhanMems(result.data);
    }
  };

  const onInputChange = (e) => {
    setPhanMem({ ...phanMem, [e.target.name]: e.target.value });
  };

  const checkData = () => {
    if (
      phanMem.tenPhamMem.trim().length > 0 &&
      phanMem.phienBan.trim().length > 0 &&
      phanMem.theLoai.trim().length > 0 &&
      phanMem.phatTrienBoi.trim().length > 0
    ) {
      return true;
    } else {
      Swal.fire({
        icon:'error',
        title:'Điền đầy đủ thông tin của phần mềm'
      })
    }
  };

  const addPhanMem = async () => {
    const check = checkData()
    if (check) {
      try {
        const result = await postAPI("/savePhanMem", phanMem);
        if (result.status === 200) {
          Swal.fire({
            text: "Thêm mới phần mềm thành công",
            icon: "success",
            confirmButtonText: "OK",
          });
          clearInputData();
          loadPhanMems();
        }
      } catch (error) {
        Swal.fire({
          text: error.response.data,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };

  const xoaPhanMem = async () => {
    Swal.fire({
      text: "Bạn có chắc muốn xóa?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Có",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteAPI(`/deletePhanMem/${phanMem.id}`)
          .then(() => {
            Swal.fire({
              text: "Xóa thành công",
              icon: "success",
            });
            clearInputData();
            loadPhanMems();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  const updatePhanMem = async () => {
    Swal.fire({
      text: "Bạn có chắc muốn cập nhập?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Có",
    }).then((result) => {
      if (result.isConfirmed) {
        putAPI(`/updatePhanMem/${phanMem.id}`, phanMem)
          .then(() => {
            Swal.fire({
              text: "Cập nhập thành công",
              icon: "success",
            });
            clearInputData();
            loadPhanMems();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  const clearInputData = () => {
    setPhanMem({
      id: "",
      tenPhamMem: "",
      phienBan: "",
      theLoai: "",
      phatTrienBoi: "",
    });
  };

  return (
    <div className={clsx(style.wrap)}>
      <PrimarySearchAppBar/>
    
    <div className={clsx(style.phanMem, "p-3")}>
      <h1>QUẢN LÝ PHẦN MỀM</h1>
      <div className={clsx(style.info)}>
        <FormControl>
          <FormLabel>Tên phần mềm</FormLabel>
          <Input
            value={phanMem.tenPhamMem}
            onChange={(e) => onInputChange(e)}
            name="tenPhamMem"
            placeholder="Tên phần mềm"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Nhà phát triển</FormLabel>
          <Input
            value={phanMem.phatTrienBoi}
            onChange={(e) => onInputChange(e)}
            name="phatTrienBoi"
            placeholder="Nhà phát triển"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Phiên bản</FormLabel>
          <Input
            value={phanMem.phienBan}
            onChange={(e) => onInputChange(e)}
            name="phienBan"
            placeholder="Phiên bản"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Loại phần mềm</FormLabel>
          <Select
            value={phanMem.theLoai}
            onChange={(e, value) => setPhanMem({ ...phanMem, theLoai: value })}
            placeholder="Loại phần mềm ..."
          >
            <Option value="Hệ quản trị cơ sở dữ liệu">
              Hệ quản trị cơ sở dữ liệu
            </Option>
            <Option value="Phần mềm văn phòng">Phần mềm văn phòng</Option>
            <Option value="Software platform">Software platform</Option>
            <Option value="Công cụ lập trình (IDE)">
              Công cụ lập trình (IDE)
            </Option>
          </Select>
        </FormControl>
      </div>
      <div className={clsx(style.searchWrap)}>
        <FormControl>
          <FormLabel>Tìm kiếm</FormLabel>
          <Input placeholder="Từ khóa" />
        </FormControl>
        <Checkbox label="Môn học" defaultChecked />
        <Button>Tìm kiếm</Button>
        <Button onClick={() => addPhanMem()}>Thêm mới</Button>
        <Button onClick={() => updatePhanMem()}>Cập nhật</Button>
        <Button onClick={() => xoaPhanMem()}>Xóa</Button>
      </div>
      <Sheet id={"scroll-style-01"} className={clsx(style.tablePhanMem)}>
        <Table stickyHeader hoverRow aria-label="striped table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Tên phần mềm</th>
              <th>Phiên bản</th>
              <th>Loại</th>
              <th>Nhà phát triển</th>
            </tr>
          </thead>
          <tbody>
            {phanMems?.map((phanMem, index) => (
              <tr key={index} onClick={() => setPhanMem(phanMem)}>
                <td>{phanMem.id}</td>
                <td>{phanMem.tenPhamMem}</td>
                <td>{phanMem.phienBan}</td>
                <td>{phanMem.theLoai}</td>
                <td>{phanMem.phatTrienBoi}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>
    </div>
    </div>
  );
}
