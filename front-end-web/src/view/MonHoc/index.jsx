import React, { useEffect, useState } from "react";
import clsx from "clsx";
import style from "./monHoc.module.scss";
import { Button, FormControl, FormLabel, Input, Sheet, Table } from "@mui/joy";
import PhanMemSuDung from "../../components/Modal/PhanMemSuDung";
import { deleteAPI, getAPI, postAPI, putAPI } from "../../api";
import Swal from "sweetalert2";
import PrimarySearchAppBar from "../../components/AppBar/PrimarySearchAppBar";

export default function MonHoc() {
  const [openCapNhatMonHoc, setOpenCapNhatMonHoc] = useState(false);

  const [monHocs, setMonHocs] = useState([]);

  const [softwares, setSoftwares] = useState([]);

  const [monHoc, setMonHoc] = useState({
    tenMonHoc: "",
    khoa: "",
  });

  useEffect(() => {
    loadMonHocs();
  }, []);

  const loadMonHocs = async () => {
    const result = await getAPI("/monHocs");
    if (result.status === 200) {
      setMonHocs(result.data);
    }
  };

  const onInputChange = (e) => {
    setMonHoc({ ...monHoc, [e.target.name]: e.target.value });
  };

  const checkData = () => {
    if (monHoc.tenMonHoc.trim().length > 0 && monHoc.khoa.trim().length > 0) {
      return true;
    } else {
      Swal.fire({
        icon: "error",
        title: "Điền đầy đủ thông tin môn học",
      });
    }
  };

  const addMonHoc = async () => {
    const check = checkData();
    if (check) {
      try {
        const result = await postAPI("/monHocs", monHoc);
        if (result.status === 200) {
          Swal.fire({
            text: "Thêm mới môn học thành công",
            icon: "success",
            confirmButtonText: "OK",
          });
          clearInputData();
          loadMonHocs();
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

  const updateMonHoc = async () => {
    Swal.fire({
      text: "Bạn có chắc muốn cập nhập?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Có",
    }).then((result) => {
      if (result.isConfirmed) {
        putAPI(`/monHocs/${monHoc.id}`, monHoc)
          .then(() => {
            Swal.fire({
              text: "Cập nhập thành công",
              icon: "success",
            });
            clearInputData();
            loadMonHocs();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  const deleteMonHoc = async () => {
    Swal.fire({
      text: "Bạn có chắc muốn xóa",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Có",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteAPI(`/monHocs/${monHoc.id}`)
          .then(() => {
            Swal.fire({
              text: "Xóa môn học thành công",
              icon: "success",
            });
            loadMonHocs();
            clearInputData();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  const clearInputData = () => {
    setMonHoc({
      tenMonHoc: "",
      khoa: "",
    });
  };

  return (
    <div className={clsx(style.wrap)}>
      <PrimarySearchAppBar/>
      <div className={clsx(style.monHoc, "p-3")}>
        <h1>QUẢN LÝ MÔN HỌC</h1>
        <div className={clsx(style.infoWrap)}>
          <div className={clsx(style.left)}>
            <FormControl>
              <FormLabel>Tên môn học</FormLabel>
              <Input
                name="tenMonHoc"
                value={monHoc.tenMonHoc}
                onChange={(e) => onInputChange(e)}
                placeholder="Tên môn học"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Khoa</FormLabel>
              <Input
                name="khoa"
                value={monHoc.khoa}
                onChange={(e) => onInputChange(e)}
                placeholder="Khoa"
              />
            </FormControl>
            <div className={clsx(style.buttonWrap)}>
              <Button onClick={() => addMonHoc()}>Thêm mới</Button>
              <Button
                disabled={
                  monHoc.tenMonHoc === "" && monHoc.khoa === ""
                    ? "disabled"
                    : ""
                }
                onClick={() => updateMonHoc()}
              >
                Cập nhật
              </Button>
              <Button
                disabled={
                  monHoc.tenMonHoc === "" && monHoc.khoa === ""
                    ? "disabled"
                    : ""
                }
                onClick={() => deleteMonHoc()}
              >
                Xóa
              </Button>
            </div>
          </div>
          <div className={clsx(style.right)}>
            <Sheet className={clsx(style.rightTable)} id={"scroll-style-01"}>
              <strong>Phân mềm được sử dụng</strong>
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
                  </tr>
                </thead>
                <tbody>
                  {softwares.map((phanMem) => (
                    <tr>
                      <td>{phanMem.tenPhamMem}</td>
                      <td>{phanMem.phienBan}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={2} style={{ textAlign: "center" }}>
                      <Button
                        onClick={() => setOpenCapNhatMonHoc(!openCapNhatMonHoc)}
                      >
                        Cập nhật
                      </Button>
                    </td>
                  </tr>
                </tfoot>
              </Table>
            </Sheet>
          </div>
        </div>

        <Sheet id={"scroll-style-01"} className={clsx(style.tableWrap)}>
          <Table stickyHeader hoverRow aria-label="striped table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Họ môn học</th>
                <th>Khoa</th>
              </tr>
            </thead>
            <tbody>
              {monHocs?.map((item, index) => (
                <tr
                  onClick={() => {
                    setMonHoc(item);
                    setSoftwares(item.phanMems);
                  }}
                  key={index}
                >
                  <td>{item.id}</td>
                  <td>{item.tenMonHoc}</td>
                  <td>{item.khoa}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Sheet>
      </div>
      <PhanMemSuDung
        subjectId={monHoc.id}
        open={openCapNhatMonHoc}
        setOpen={setOpenCapNhatMonHoc}
        softwares={setSoftwares}
      />
    </div>
  );
}
