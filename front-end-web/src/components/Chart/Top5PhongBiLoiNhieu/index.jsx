import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Modal, ModalClose, ModalDialog, Typography } from "@mui/joy";
import { getAPI } from "../../../api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Top5PhongBiLoiNhieu(props) {
  const [selectedPhong, setSelectPhong] = useState();
  const [openDetail, setOpenDetail] = useState(false);
  const [detailData, setDetailData] = useState();

  const chartData = {
    labels: props.data?.map((item) => item.so_phong),
    datasets: [
      {
        label: "Số lần sửa chữa",
        data: props.data?.map((item) => item.so_lan_sua_chua),
        backgroundColor: "rgba(75,192,192,0.6)", // Màu của cột
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };

  const handleXemChiTietPhong = async (event, item) => {
    if (item.length > 0) {
      const phongIndex = item[0].index;
      const select = props.data[phongIndex].so_phong;
      const result = await getAPI(
        `/lichSuSuaChua/soLanSuaCuaTungMayTheoPhong/${select}`
      );
      const data = {
        labels: result.data?.map((item) => item.so_may),
        datasets: [
          {
            label: "Lỗi mức độ 3",
            data: result.data.map((item) => Math.round(item.so_lan_loi_muc_1)),
            backgroundColor: "red", // Màu đỏ
            borderColor: "rgba(255, 0, 0, 1)",
            borderWidth: 1,
          },
          {
            label: "Lỗi mức độ 2",
            data: result.data.map((item) => Math.round(item.so_lan_loi_muc_2)),
            backgroundColor: "rgba(255, 255, 0, 0.644)", // Màu vàng
            borderColor: "rgba(255, 255, 0, 1)",
            borderWidth: 1,
          },
          {
            label: "Lỗi mức độ 1",
            data: result.data.map((item) => Math.round(item.so_lan_loi_muc_3)),
            backgroundColor: "#1da1f2", // Màu xanh dương
            borderColor: "rgba(0, 0, 255, 1)",
            borderWidth: 1,
          },
        ],
      };
      setDetailData(data);
      setSelectPhong(select);
      setOpenDetail(true);
    }
  };
  return (
    <>
      <Bar
        data={chartData}
        options={{
          onClick: handleXemChiTietPhong,
          scales: { y: { ticks: { stepSize: 1 } } },
        }}
      />
      <Modal open={openDetail} onClose={() => setOpenDetail(false)}>
        <ModalDialog
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "50%",
          }}
        >
          <ModalClose />
          <Typography>
            <b>Chi tiết số máy sửa của phòng {selectedPhong}</b>
          </Typography>
          <Bar
            data={detailData}
            options={{
              scales: {
                y: {
                  ticks: {
                    stepSize: 1,
                  },
                },
              },
            }}
          />
        </ModalDialog>
      </Modal>
    </>
  );
}
