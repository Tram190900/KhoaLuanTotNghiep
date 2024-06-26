import React, { useEffect, useState } from "react";
import clsx from "clsx";
import style from "./thietBi.module.scss";
import { FormControl, FormLabel, Input, Option, Select } from "@mui/joy";
import { getAPI, postAPI, putAPI } from "../../api";
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
        donVi: donVi,
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
          donVi: donVi,
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
    <div className={clsx(style.thietBi, "p-3")}>
      <h1>Quản lý thiết bị</h1>
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
              onChange={(e, v) => {
                setDonVi(v);
              }}
            >
              <Option value={"Cái"}>Cái</Option>
              <Option value={"Thùng"}>Thùng</Option>
              <Option value={"Mét"}>Mét</Option>
            </Select>
          </FormControl>
        </div>
      </div>
      <div className={clsx(style.buttonWrap, "py-3")}>
        <Button
          variant="contained"
          sx={{ textTransform: "capitalize" }}
          onClick={() => {
            handleSaveThietBi();
          }}
        >
          Thêm mới
        </Button>
        <Button
          variant="contained"
          sx={{ textTransform: "capitalize" }}
          color="warning"
          onClick={() => handleUpdateThietBi()}
        >
          Cập nhật
        </Button>
      </div>
      <TableContainer component={Paper} className={clsx(style.tableWrap)}>
        <Table stickyHeader aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Id</StyledTableCell>
              <StyledTableCell>Tên thiết bị</StyledTableCell>
              <StyledTableCell>Số lượng</StyledTableCell>
              <StyledTableCell>Đơn vị</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allThietBi.map((row, index) => (
              <StyledTableRow
                onClick={() => {
                  setTenThietBi(row.tenThietBi);
                  setSoLuong(row.soLuong);
                  setThietBiId(row.id);
                  setDonVi(row.donVi);
                }}
                key={index}
              >
                <StyledTableCell component="th" scope="row">
                  {row.id}
                </StyledTableCell>
                <StyledTableCell>{row.tenThietBi}</StyledTableCell>
                <StyledTableCell>{row.soLuong}</StyledTableCell>
                <StyledTableCell>{row.donVi}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
