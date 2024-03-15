import clsx from "clsx";
import React, { useEffect, useState } from "react";
import style from "./Top5Phong.module.scss";
import { Card, CardContent, Option, Select } from "@mui/joy";
import { getAPI } from "../../../api";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Top5PhongBiLoiNhieu(props) {
    const chartData = {
        labels: props.data?.map(item => item.so_phong),
        datasets: [
          {
            label: 'Số lần sửa chữa',
            data: props.data?.map(item => item.soLanSuaChua),
            backgroundColor: 'rgba(75,192,192,0.6)', // Màu của cột
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 1,
          },
        ],
      };
  return (
    <Bar data={chartData}/>
  );
}
