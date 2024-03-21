import React from "react";
import { Pie } from "react-chartjs-2";

import { Chart as ChartJS, ArcElement } from "chart.js";

ChartJS.register(ArcElement);

export default function PhanTramMucDoLoi(props) {
  const chartData = {
    labels: [
      "Lỗi mức độ 1 sửa trong tháng",
      "Lỗi mức độ 2 sửa trong tuần",
      "Lỗi mức độ 3 sửa trong ngày",
    ],
    datasets: [
      {
        label: "Phân trăm gặp phải",
        data: [
          props.data?.loi_muc_1,
          props.data?.loi_muc_2,
          props.data?.loi_muc_3,
        ],
        backgroundColor: ["#1da1f2", "rgba(255, 120, 0, 0.644)", "red"],
        hoverOffset: 4,
      },
    ],
  };
  return <Pie data={chartData} />;
}
