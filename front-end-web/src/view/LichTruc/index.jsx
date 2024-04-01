import React, { useState, useEffect } from "react";
import {
  format,
  startOfWeek,
  addDays,
  isSameDay,
  lastDayOfWeek,
  subWeeks,
  addWeeks,
} from "date-fns";
import style from "./lichTruc.module.scss";
import clsx from "clsx";
import { postAPI } from "../../api";
import {
  Avatar,
  FormControl,
  FormLabel,
  Input,
  Option,
  Select,
} from "@mui/joy";

export default function LichTruc() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [phongTrucData, setPhongTrucData] = useState([]);
  const nhanVien = JSON.parse(localStorage.getItem("user")).nhanVien;

  const getPhongTruc = async (day) => {
    const userId = nhanVien.id;
    const dt = new FormData();
    dt.append("ngayTruc", format(day, "yyyy-MM-dd"));
    try {
      const result = await postAPI(
        `/getChamCongByNgayTrucAndNhanVien/${userId}`,
        dt
      );
      return result.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };

  const getLoiPhaiSua = async (day) => {
    const userId = nhanVien.id;
    const dt = new FormData();
    dt.append("ngayGapLoi", format(day, "yyyy-MM-dd"));
    try {
      const result = await postAPI(
        `/lichSuSuaChua/getLoiChuaSuaTheoNhanVienVaNgayDuKien/${userId}`,
        dt
      );
      return result.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchDataForWeek = async () => {
      const startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
      const endDate = lastDayOfWeek(currentMonth, { weekStartsOn: 1 });
      const newData = [];
      for (let day = startDate; day <= endDate; day = addDays(day, 1)) {
        const dataForDay = await getPhongTruc(day);
        const error = await getLoiPhaiSua(day);
        newData.push({ date: day, phongTruc: dataForDay, loiPhaiSua: error });
      }
      setPhongTrucData(newData);
    };
    fetchDataForWeek();
  }, [currentMonth]);

  const changeWeekHandle = (btnType) => {
    if (btnType === "prev") {
      setCurrentMonth(subWeeks(currentMonth, 1));
    } else if (btnType === "next") {
      setCurrentMonth(addWeeks(currentMonth, 1));
    }
  };

  const onDateClickHandle = (day) => {
    setSelectedDate(day);
  };

  const renderHeader = () => {
    const dateFormat = "MMM yyyy";
    return (
      <div className={`${style.header} ${style.row} ${style["flex-middle"]}`}>
        <div className={`${style.col} ${style["col-start"]}`}></div>
        <div className={`${style.col} ${style["col-center"]}`}>
          <span>Lịch trực trong tuần</span>
          <br />
          <span>{format(currentMonth, dateFormat)}</span>
        </div>
        <div className={`${style.col} ${style["col-end"]}`}></div>
      </div>
    );
  };

  const renderDays = () => {
    const dateFormat = "EEE";
    const days = [];
    let startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className={`${style.col} ${style["col-center"]}`} key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }
    return <div className={`${style.days} ${style.row}`}>{days}</div>;
  };

  const renderCells = () => {
    const rows = phongTrucData.map((data, weekIndex) => {
      const formattedDate = format(data.date, "d");
      const phongTruc = data.phongTruc?.map((phong, index) => {
        return (
          <span key={index}>
            <span key={index}>{phong?.phongMay?.soPhong}, </span>
          </span>
        );
      });
      const loiPhaiSua = data.loiPhaiSua?.map((loi, index) => {
        return (
          <>
            <span key={index}>
              <strong>{loi.so_may}</strong>: {loi.loi_gap_phai}<br></br>
              <span>Chú thích: Dự kiến sửa đến ngày <strong>{format(loi.ngay_du_kien_sua, 'dd-MM-yyyy')}</strong></span>
            </span>
            <br></br>
          </>
        );
      });
      return (
        <div
          className={`${style.col} ${style.cell} ${
            isSameDay(data.date, new Date()) ? style.today : ""
          }`}
          key={data.date}
          onClick={() => onDateClickHandle(data.date)}
        >
          <span className={clsx(style.number)}>{formattedDate}</span>
          <span className={clsx(style.bg)}>{formattedDate}</span>
          <br></br>
          {phongTruc.length > 0 ? (
            <div className={style.task}>
              <span className={style.title}>Danh sách phòng trực:</span>
              <br></br>
              {phongTruc}
            </div>
          ) : null}
          {loiPhaiSua.length > 0 ? (
            <div className={style.taskError}>{loiPhaiSua}</div>
          ) : null}
        </div>
      );
    });
    return (
      <div className={clsx(style.body)}>
        <div className={`${style.row}`}>{rows}</div>
      </div>
    );
  };

  const renderFooter = () => {
    return (
      <div className={`${style.header} ${style.row} ${style["flex-middle"]}`}>
        <div className={`${style.col} ${style["col-start"]}`}>
          <div className={style.icon} onClick={() => changeWeekHandle("prev")}>
            prev week
          </div>
        </div>
        <div
          className={`${style.col} ${style["col-end"]}`}
          onClick={() => changeWeekHandle("next")}
        >
          <div className={style.icon}>next week</div>
        </div>
      </div>
    );
  };

  return (
    <div className={clsx(style.calendar)}>
      <div className={style.profile}>
        <div className={style.image_wrap}>
          <Avatar
            src={
              nhanVien.image
                ? nhanVien.image
                : "https://www.eventfulnigeria.com/wp-content/uploads/2021/04/Avatar-PNG-Free-Download.png"
            }
            alt="avatar"
            sx={{
              width: "8rem",
              height: "8rem",
              boxShadow: "2px 2px 10px gray",
              border: "5px solid white",
            }}
          />
          <span>
            Trạng thái làm việc:{" "}
            <strong>{nhanVien.trangThai ? "Đi làm" : "Nghỉ làm"}</strong>
          </span>
        </div>
        <div className={clsx(style.left_infor)}>
          <div>
            <FormControl className={style.style_form}>
              <FormLabel>Họ tên</FormLabel>
              <Input
                value={nhanVien.hoTenNhanVien}
                placeholder="Họ tên"
                disabled
              />
            </FormControl>
            <FormControl className={style.style_form}>
              <FormLabel>Email</FormLabel>
              <Input value={nhanVien.email} placeholder="Email" disabled />
            </FormControl>
            <FormControl className={style.style_form}>
              <FormLabel>Số điện thoại</FormLabel>
              <Input
                value={nhanVien.sdt}
                placeholder="Số điện thoại"
                disabled
              />
            </FormControl>
          </div>
          <div>
            <FormControl className={style.style_form}>
              <FormLabel>Giới tính</FormLabel>
              <Select
                value={nhanVien.gioiTinh}
                placeholder="Giới tính ..."
                disabled
              >
                <Option value={true}>Nam</Option>
                <Option value={false}>Nữ</Option>
              </Select>
            </FormControl>
            <FormControl className={style.style_form}>
              <FormLabel>Địa chỉ</FormLabel>
              <Input value={nhanVien.diaChi} placeholder="Địa chỉ" disabled />
            </FormControl>
            <FormControl className={style.style_form}>
              <FormLabel>Trạng thái</FormLabel>
              <Select
                value={nhanVien.trangThai}
                placeholder="Trạng thái ..."
                disabled
              >
                <Option value={true}>Đi làm</Option>
                <Option value={false}>Nghỉ làm</Option>
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
      <div>
        {renderHeader()}
        {renderDays()}
        {renderCells()}
        {renderFooter()}
      </div>
    </div>
  );
}
