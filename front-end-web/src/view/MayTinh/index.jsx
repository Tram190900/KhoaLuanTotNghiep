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
  const [timTheo, setTimTheo] = useState("SoPhong");

  const [allMayTinh, setAllMayTinh] = useState([]);
  const [phanMemCaiDat, setPhanMemCaiDat] = useState([]);
  const [thietBiLapDat, setThietBiLapDat] = useState([]);

  const [phong, setPhong] = useState("");
  const [soMay, setSoMay] = useState("");
  const [trangThai, setTrangThai] = useState(true);
  const [mayTinhId, setMayTinhId] = useState();
  const [tuKhoa, setTuKhoa]= useState('')

  useEffect(() => {
    handleGetAllMayTinh();
  }, []);
  const handleGetAllMayTinh = async () => {
    const result = await getAPI("/getAllMayTinh");
    if (result.status === 200) {
      setAllMayTinh(result.data);
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

  const handleThemMoi = async () => {
    const data = {
      soMay: soMay,
      trangThai: trangThai,
      phongMay: {
        soPhong: phong,
      },
    };
    try {
      const result = await postAPI("/saveMayTinh", data);
      if (result.status === 200) {
        Swal.fire({
          text: "Thêm mới máy tính thành công",
          icon: "success",
          confirmButtonText: "OK",
        });
        handleGetAllMayTinh();
      }
    } catch (error) {
      Swal.fire({
        text: error.response.data,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleXoaMayTinh = async () => {
    Swal.fire({
      text: "Bạn có chắc muốn xóa máy tính này khỏi phòng máy hay không?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Có",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteAPI(`/deleteMayTinh/${mayTinhId}`)
          .then(() => {
            Swal.fire({
              text: "Xóa máy tính thành công",
              icon: "success",
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  const handleChange = (event, newValue) => {
    setTrangThai(newValue);
  };

  const handleTimKiem = async () => {
    const list =[]
    if (timTheo === "SoPhong") {
      try {
        const result = await getAPI(`/getMayTinhByPhong/${tuKhoa}`);
        if (result.status === 200) {
          setAllMayTinh(result.data)
        }
      } catch (error) {
        console.log(error);
      }
    } else if (timTheo === "SoMay") {
      try {
        const result = await getAPI(`/getMayTinhBySoMay/${tuKhoa}`);
        if (result.status === 200) {
          list.push(result.data)
        }
        setAllMayTinh(list)
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleCapNhatMayTinh=async()=>{
    try {
      const data = {
        soMay: soMay,
        trangThai: trangThai,
        phongMay: {
          soPhong: phong,
        },
      };
      const result = await putAPI(`/updateMayTinh/${mayTinhId}`,data)
      if(result.status===200){
        Swal.fire({
          text: "Cập nhật máy tính thành công",
          icon: "success",
          confirmButtonText: "OK",
        });
        handleGetAllMayTinh();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className={clsx(style.maytinh)}>
        <h1>QUẢN LÝ MÁY TÍNH</h1>
        <div className={clsx(style.infoWrap)}>
          <div className={clsx(style.content)}>
            <div className={clsx(style.leftWrap)}>
              <FormControl>
                <FormLabel>Phòng</FormLabel>
                <Input
                  placeholder="Phòng"
                  value={phong}
                  onChange={(e) => setPhong(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Số máy</FormLabel>
                <Input
                  placeholder="Số máy"
                  value={soMay}
                  onChange={(e) => setSoMay(e.target.value)}
                />
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
              <FormControl>
                <FormLabel>Ghi chú (Nếu có)</FormLabel>
                <Input placeholder="Ghí chú" />
              </FormControl>
            </div>
            <div className={clsx(style.rightWrap)}>
              <Sheet
                id={"scroll-style-01"}
                className={clsx(style.tablePhanMem)}
              >
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
                  <tfoot>
                    <tr>
                      <td colSpan={3} style={{ textAlign: "center" }}>
                        <Button onClick={() => setOpenCapNhatPhanMem(true)}>
                          Cập nhật
                        </Button>
                      </td>
                    </tr>
                  </tfoot>
                </Table>
              </Sheet>
              <Sheet
                id={"scroll-style-01"}
                className={clsx(style.tableThietBi)}
              >
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
                  <tfoot>
                    <tr>
                      <td colSpan={2} style={{ textAlign: "center" }}>
                        <Button onClick={() => setOpenCapNhatThietBi(true)}>
                          Cập nhật
                        </Button>
                      </td>
                    </tr>
                  </tfoot>
                </Table>
              </Sheet>
            </div>
          </div>
        </div>
        <div className={clsx(style.searchWrap)}>
          <FormControl>
            <FormLabel>Tìm kiếm</FormLabel>
            <Input placeholder="Từ khóa" onChange={(e)=>setTuKhoa(e.target.value)}/>
          </FormControl>
          <Checkbox
            label="Số phòng"
            defaultChecked
            onClick={() => setTimTheo("SoPhong")}
          />
          <Checkbox label="Số máy" onClick={() => setTimTheo("SoMay")} />
          <Button onClick={()=>handleTimKiem()}>Tìm kiếm</Button>
          <Button onClick={() => setOpenLichSuaChua(!openLichSuaChua)}>
            Lịch sử sửa chữa
          </Button>
          <Button
            onClick={() => {
              if (phong.trim().length > 0 && soMay.trim().length > 0) {
                handleThemMoi();
              }
            }}
          >
            Thêm mới
          </Button>
          <Button onClick={()=>handleCapNhatMayTinh()}>Cập nhật</Button>
          <Button onClick={() => handleXoaMayTinh()}>Xóa</Button>
        </div>
        <Sheet id={"scroll-style-01"} className={clsx(style.tableMayTinh)}>
          <Table stickyHeader hoverRow aria-label="striped table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Số Phòng</th>
                <th>Số máy</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {allMayTinh?.map((item, index) => (
                <tr
                  key={index}
                  onClick={(e) => {
                    handleGetPhanMemCaiDat(item.id);
                    handleGetThietBiLapDat(item.id);
                    setMayTinhId(item.id);
                    setPhong(item.phongMay.soPhong);
                    setSoMay(item.soMay);
                    setTrangThai(item.trangThai);
                  }}
                >
                  <td>{item.id}</td>
                  <td>{item.phongMay.soPhong}</td>
                  <td>{item.soMay}</td>
                  <td>{item.trangThai ? "Bình thường" : "Bảo trì"}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Sheet>
      </div>
      <LichSuaChua open={openLichSuaChua} setOpen={setOpenLichSuaChua} />
      <CapNhatPhanMemMayTinh
        open={openCpaNhatPhanMem}
        setOpen={setOpenCapNhatPhanMem}
        phanMemCaiDat={phanMemCaiDat}
        mayTinhId={mayTinhId}
        handleGetPhanMemCaiDat={handleGetPhanMemCaiDat}
      />
      <CapNhatThietBiMayTinh
        open={openCapNhatThietBi}
        setOpen={setOpenCapNhatThietBi}
        thietBiLapDat={thietBiLapDat}
        mayTinhId={mayTinhId}
        handleGetThietBiLapDat={handleGetThietBiLapDat}
      />
    </>
  );
}
