import React, { useCallback, useEffect, useState } from "react";
import style from "./thongKe.module.scss";
import clsx from "clsx";
import { Card, CardContent, Option, Select, Typography } from "@mui/joy";
import BusinessIcon from "@mui/icons-material/Business";
import DvrIcon from "@mui/icons-material/Dvr";
import { getAPI, postAPI } from "../../api";
import Top5PhongBiLoiNhieu from "../../components/Chart/Top5PhongBiLoiNhieu";
import PhanTramMucDoLoi from "../../components/Chart/PhanTramMucDoLoi";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

export default function ThongKe() {
  const [soLuongPhong, setSoLuongPhong] = useState();
  const [soLuongMayTinh, setSoLuongMayTinh] = useState();
  const [soMayBaoTri, setSoMayBaoTri] = useState();
  const [startDate, setStartDate] = useState(dayjs(Date().now));
  const [endDate, setEndDate] = useState(dayjs(Date().now));
  const [allToaNha, setAllToaNha] = useState([]);
  const [selectToaNha, setSelectToaNha] = useState(1);
  const [trangThai, setTrangThai] = useState(false)

  const [top5PhongBiLoiNhieu, setTop5PhongLoiNhieu] = useState();
  const [phanTramMucDoLoi, setPhanTramMucDoLoi] = useState();


  const handleTop5PhongBaoLoiNhieu = async () => {
    try {
      const dt = new FormData()
      dt.append("startDate", startDate.format('YYYY-MM-DD'))
      dt.append("endDate", endDate.format('YYYY-MM-DD'))
      dt.append("toaNha", selectToaNha)
      dt.append("trangThai", trangThai)
     const result = await postAPI('/lichSuSuaChua/top5Phong', dt)
     if(result.status===200){
      setTop5PhongLoiNhieu(result.data)
     }
    } catch (error) {
      console.log(error);
    }

  };

  const handleMucDoloiGapPhai = async () => {
    try {
      const result = await getAPI(`/lichSuSuaChua/phanTramMucDoLoi`);
      if (result.status === 200) {
        setPhanTramMucDoLoi(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleToaNha = (event, newValue) => {
    setSelectToaNha(newValue);
  };

  const handleTrangThai = (event, newValue) =>{
    setTrangThai(newValue)
  }

  const handleGetAllToaNha = async () => {
    try {
      const result = await getAPI("/toanha");
      if (result.status === 200) {
        setAllToaNha(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleSoLuongPhong();
    handleSoLuongMayTinh();
    handleMucDoloiGapPhai();
    handleGetAllToaNha();
  }, []);

  useEffect(() => {
    handleTop5PhongBaoLoiNhieu();
  }, [startDate, endDate, selectToaNha, trangThai]);
  
  const handleSoLuongPhong = async () => {
    try {
      const result = await getAPI("getAllPhongMay");
      if (result.status === 200) {
        setSoLuongPhong(result.data.length);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSoLuongMayTinh = async () => {
    try {
      const result = await getAPI("getAllMayTinh");
      if (result.status === 200) {
        setSoLuongMayTinh(result.data.length);
        const mayBaoTri = result.data?.filter((item) => {
          return item.trangThai===2;
        });
        setSoMayBaoTri(mayBaoTri.length);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={clsx(style.thongKe)}>
      <div className={clsx(style.card_wrap)}>
        <Card variant="soft" className={clsx(style.card)}>
          <CardContent className={clsx(style.card_content)}>
            <BusinessIcon sx={{ fontSize: 55 }} />
            <Typography className={clsx(style.soLuong)} level="title-md">
              {soLuongPhong}
            </Typography>
            <Typography>Phòng</Typography>
          </CardContent>
        </Card>
        <Card variant="soft" className={clsx(style.card)}>
          <CardContent className={clsx(style.card_content)}>
            <DvrIcon sx={{ fontSize: 55, textAlign: "center" }} />
            <Typography className={clsx(style.soLuong)} level="title-md">
              {soLuongMayTinh}
            </Typography>
            <Typography>Máy tính</Typography>
          </CardContent>
        </Card>
        <Card variant="soft" className={clsx(style.card)}>
          <CardContent className={clsx(style.card_content)}>
            <DvrIcon sx={{ fontSize: 55 }} />
            <Typography className={clsx(style.soLuong)} level="title-md">
              {soMayBaoTri}
            </Typography>
            <Typography>
              Máy đang bảo trì
            </Typography>
          </CardContent>
        </Card>
      </div>
      <div className="d-flex w-100">
        <Card className={clsx(style.barChart)}>
          <CardContent>
            <span className="d-flex-column align-items-center">
              <b>Thống kê số lỗi đang gặp phải &nbsp;</b>
              <div className="d-flex mt-3">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoItem components={["DatePicker"]}>
                    <DatePicker
                      value={startDate}
                      onChange={(date) => setStartDate(date)}
                      label="Dự kiến sửa từ ngày"
                      format="DD-MM-YYYY"
                    />
                  </DemoItem>
                  <DemoItem components={["DatePicker"]}>
                    <DatePicker
                      value={endDate}
                      onChange={(date) => setEndDate(date)}
                      label="Đến ngày"
                      format="DD-MM-YYYY"
                    />
                  </DemoItem>
                </LocalizationProvider>
                <Select
                  value={selectToaNha}
                  onChange={handleToaNha}
                  placeholder="Tòa nhà..."
                  sx={{ height: "55px", margin: "0 2rem" }}
                >
                  {allToaNha?.map((item, index) => (
                    <Option value={item.id} key={index}>
                      {item.tenToaNha}
                    </Option>
                  ))}
                </Select>
                {/* <Select value={trangThai} onChange={handleTrangThai} placeholder="Trạng thái lỗi" sx={{ height: "55px" }}>
                  <Option value={true}>Đã sửa</Option>
                  <Option value={false}>Chưa sửa</Option>
                </Select> */}
              </div>
            </span>
            <Top5PhongBiLoiNhieu data={top5PhongBiLoiNhieu} startDate={startDate} endDate={endDate}/>
          </CardContent>
        </Card>
        <Card className={clsx(style.pieChart)}>
          <CardContent>
            <b>Phần trăm mức độ lỗi gặp phải trong năm nay</b>
            <PhanTramMucDoLoi data={phanTramMucDoLoi} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
