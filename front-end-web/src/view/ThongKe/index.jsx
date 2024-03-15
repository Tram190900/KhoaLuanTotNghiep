import React, { useCallback, useEffect, useState } from "react";
import style from "./thongKe.module.scss";
import clsx from "clsx";
import { Card, CardContent, Option, Select, Typography } from "@mui/joy";
import BusinessIcon from "@mui/icons-material/Business";
import DvrIcon from "@mui/icons-material/Dvr";
import { getAPI } from "../../api";
import Top5PhongBiLoiNhieu from "../../components/Chart/Top5PhongBiLoiNhieu";
import PhanTramMucDoLoi from "../../components/Chart/PhanTramMucDoLoi";
import moment from 'moment';

export default function ThongKe() {
  const [soLuongPhong, setSoLuongPhong] = useState();
  const [soLuongMayTinh, setSoLuongMayTinh] = useState();
  const [soMayBaoTri, setSoMayBaoTri] = useState();

  const [selectThang, setSelectThang] = useState(Number(moment().format('M')));
  const [top5PhongBiLoiNhieu, setTop5PhongLoiNhieu] = useState();
  const [phanTramMucDoLoi, setPhanTramMucDoLoi] = useState();

  const handleSelectThang = (event, value) => {
    setSelectThang(value);
  };

  const handleTop5PhongBaoLoiNhieu = async () => {
    const result = await getAPI(`lichSuSuaChua/top5Phong/${selectThang}`);
    if (result.status === 200) {
      setTop5PhongLoiNhieu(result.data);
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

  useEffect(() => {
    handleSoLuongPhong();
    handleSoLuongMayTinh();
    handleMucDoloiGapPhai();
  }, []);

  useEffect(() => {
    handleTop5PhongBaoLoiNhieu();
  }, [selectThang]);
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
          return !item.trangThai;
        });
        setSoMayBaoTri(mayBaoTri.length);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={clsx(style.thongKe)}>
      <h1>Thống kê</h1>
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
              Máy
              <br />
              đang bảo trì
            </Typography>
          </CardContent>
        </Card>
      </div>
      <div className="d-flex w-100">
        <Card className={clsx(style.barChart)}>
          <CardContent>
            <span className="d-flex align-items-center">
              <b>Top 5 Phòng có số lần sửa chữa nhiều theo tháng &nbsp;</b>
              <Select value={selectThang} onChange={handleSelectThang}>
                <Option value={1}>Tháng 1</Option>
                <Option value={2}>Tháng 2</Option>
                <Option value={3}>Tháng 3</Option>
                <Option value={4}>Tháng 4</Option>
                <Option value={5}>Tháng 5</Option>
                <Option value={6}>Tháng 6</Option>
                <Option value={7}>Tháng 7</Option>
                <Option value={8}>Tháng 8</Option>
                <Option value={9}>Tháng 9</Option>
                <Option value={10}>Tháng 10</Option>
                <Option value={11}>Tháng 11</Option>
                <Option value={12}>Tháng 12</Option>
              </Select>
            </span>
            <Top5PhongBiLoiNhieu data={top5PhongBiLoiNhieu} />
          </CardContent>
        </Card>
        <Card className={clsx(style.pieChart)}>
          <CardContent>
            <b>Phần trăm mức độ lỗi gặp phải trong năm nay</b>
            <PhanTramMucDoLoi data={phanTramMucDoLoi}/>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
