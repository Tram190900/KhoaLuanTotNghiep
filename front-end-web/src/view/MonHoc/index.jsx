import React, { useEffect, useState } from "react";
import clsx from "clsx";
import style from "./monHoc.module.scss";
import { FormControl, FormLabel, Input, Sheet, Select, Option } from "@mui/joy";
import PhanMemSuDung from "../../components/Modal/PhanMemSuDung";
import { deleteAPI, getAPI, postAPI, putAPI } from "../../api";
import Swal from "sweetalert2";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1976D2",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function MonHoc() {
  const [openCapNhatMonHoc, setOpenCapNhatMonHoc] = useState(false);

  const [monHocs, setMonHocs] = useState([]);

  const [softwares, setSoftwares] = useState([]);

  const [monHoc, setMonHoc] = useState({
    id: "",
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
    if (monHoc.tenMonHoc.trim().length > 0) {
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
      const dt = {
        tenMonHoc: monHoc.tenMonHoc,
        khoa: monHoc.khoa,
      };
      try {
        const result = await postAPI("/monHocs", dt);
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
    <div className={clsx(style.monHoc, "p-3")}>
      <h1>Quản lý môn học</h1>
      <div className={clsx(style.infoWrap, "pb-3")}>
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
            <Select
              value={monHoc.khoa}
              onChange={(e, v) => {
                setMonHoc({ ...monHoc, khoa: v });
              }}
            >
              <Option value={"Công nghệ thông tin"}>Công nghệ thông tin</Option>
              <Option value={"Ngôn ngữ anh"}>Ngôn ngữ anh</Option>
              <Option value={"Quản trị kinh doanh"}>Quản trị kinh doanh</Option>
              <Option value={"Khoa điện, cơ khí"}>Khoa điện, cơ khí</Option>
            </Select>
          </FormControl>
          <div className={clsx(style.buttonWrap)}>
            <Button
              variant="contained"
              sx={{ textTransform: "capitalize" }}
              onClick={() => addMonHoc()}
            >
              Thêm mới
            </Button>
            <Button
              variant="contained"
              sx={{ textTransform: "capitalize" }}
              color="warning"
              disabled={
                monHoc.tenMonHoc === "" && monHoc.khoa === "" ? "disabled" : ""
              }
              onClick={() => updateMonHoc()}
            >
              Cập nhật
            </Button>
            <Button
              variant="contained"
              sx={{ textTransform: "capitalize" }}
              color="error"
              disabled={
                monHoc.tenMonHoc === "" && monHoc.khoa === "" ? "disabled" : ""
              }
              onClick={() => deleteMonHoc()}
            >
              Xóa
            </Button>
          </div>
        </div>
        <div className={clsx(style.right)}>
          <Sheet id={"scroll-style-01"}>
            <strong>Phân mềm được sử dụng</strong>
            <TableContainer
              component={Paper}
            >
              <Table aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Tên phần mềm</StyledTableCell>
                    <StyledTableCell>Phiên bản</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {softwares?.map((row, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell component="th" scope="row">
                        {row.tenPhamMem}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.phienBan}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                  <StyledTableRow>
                    <StyledTableCell
                      colSpan={2}
                      style={{ textAlign: "center" }}
                    >
                      <Button
                        variant="contained"
                        sx={{ textTransform: "capitalize" }}
                        color="warning"
                        onClick={() => setOpenCapNhatMonHoc(!openCapNhatMonHoc)}
                      >
                        Cập nhật môn học
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Sheet>
        </div>
      </div>

      <TableContainer component={Paper} className={clsx(style.tablePhanMem)}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Id</StyledTableCell>
              <StyledTableCell>Họ môn học</StyledTableCell>
              <StyledTableCell>Khoa</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {monHocs?.map((row, index) => (
              <StyledTableRow
                onClick={() => {
                  setMonHoc({
                    id: row.id,
                    tenMonHoc: row.tenMonHoc,
                    khoa: row.khoa,
                  });
                  setSoftwares(row.phanMems);
                }}
                key={index}
              >
                <StyledTableCell component="th" scope="row">
                  {row.id}
                </StyledTableCell>
                <StyledTableCell align="left">{row.tenMonHoc}</StyledTableCell>
                <StyledTableCell align="left">{row.khoa}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <PhanMemSuDung
        subjectId={monHoc.id}
        open={openCapNhatMonHoc}
        setOpen={setOpenCapNhatMonHoc}
        softwares={setSoftwares}
      />
    </div>
  );
}
