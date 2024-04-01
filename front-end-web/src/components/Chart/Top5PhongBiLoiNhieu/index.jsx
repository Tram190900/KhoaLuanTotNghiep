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
import {
  Dropdown,
  IconButton,
  Menu,
  MenuButton,
  Modal,
  ModalClose,
  ModalDialog,
  Sheet,
  Table,
  MenuItem,
  DialogTitle,
  DialogContent,
} from "@mui/joy";
import MoreVert from "@mui/icons-material/MoreVert";
import { postAPI } from "../../../api";
import moment from "moment";
import EditIcon from "@mui/icons-material/Edit";
import ModalNhanVien from "./ModalNhanVien";

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
  const [openNV, setOpenNV] = useState(false);
  const [nhanVienId, setNhanVienId] = useState();
  const [soMay, setSoMay] = useState();
  const [lichSuId, setLichSuId] = useState();

  const [detailData, setDetailData] = useState();
  const user = JSON.parse(localStorage.getItem("user"));

  const chartData = {
    labels: props.data?.map((item) => item.so_phong),
    datasets: [
      {
        label: "Số lỗi phải sửa trong hôm nay",
        data: props.data?.map((item) => item.sua_trong_ngay),
        backgroundColor: "red", // Màu của cột
        borderColor: "rgba(255, 0, 0, 1)",
        borderWidth: 1,
      },
      {
        label: "Số lỗi sửa ngày khác",
        data: props.data?.map((item) => item.sua_ngay_khac),
        backgroundColor: "rgba(255, 120, 0)", // Màu vàng
        borderColor: "rgba(255, 120, 0, 1)",
        borderWidth: 1,
      },
    ],
  };

  const handleXemChiTietPhong = async (event, item) => {
    if (item.length > 0) {
      const phongIndex = item[0].index;
      const select = props.data[phongIndex].so_phong;
      try {
        const dt = new FormData();
        dt.append("soPhong", select);
        dt.append("startDate", props.startDate.format("YYYY-MM-DD"));
        dt.append("endDate", props.endDate.format("YYYY-MM-DD"));
        const result = await postAPI("/lichSuSuaChua/loiPhaiSuaTheoPhong", dt);
        if (result.status === 200) {
          setDetailData(result.data);
          setSelectPhong(select);
          setOpenDetail(true);
        }
      } catch (error) {
        console.log(error);
      }
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
            height: "50%",
          }}
        >
          <ModalClose />
          <DialogTitle>
            Danh sách lỗi cần phải sửa của phòng {selectedPhong}
          </DialogTitle>
          <DialogContent>
            <span className="d-flex align-items-center">
              <div
                style={{
                  width: "35px",
                  height: "15px",
                  background: "red",
                  marginRight: "10px",
                }}
              ></div>
              Lỗi phải sửa trong ngày
            </span>
            <Sheet id={"scroll-style-01"}>
              <Table tickyHeader hoverRow aria-label="striped table">
                <thead>
                  <tr>
                    <th>Máy tính</th>
                    <th>Lỗi gặp phải</th>
                    <th>Ngày gặp lỗi</th>
                    <th>Ngày dự kiến sửa</th>
                    <th>Trạng thái</th>
                    <th>Nhân viên phụ trách</th>
                  </tr>
                </thead>
                <tbody>
                  {detailData?.map((item, index) => (
                    <tr
                      key={index}
                      style={{
                        color:
                          moment().diff(
                            moment(item.ngay_du_kien_sua),
                            "days"
                          ) === 0
                            ? "red"
                            : "",
                      }}
                      onClick={() => {
                        setSoMay(item.so_may);
                        setNhanVienId(item.nhan_vien_id);
                        setLichSuId(item.id);
                      }}
                    >
                      <td>{item.so_may}</td>
                      <td>{item.loi_gap_phai}</td>
                      <td>{moment(item.ngay_gap_loi).format("DD-MM-YYYY")}</td>
                      <td>
                        {moment(item.ngay_du_kien_sua).format("DD-MM-YYYY")}
                      </td>
                      <td>{item.trang_thai ? "Đã sửa" : "Chưa sửa"}</td>
                      <td style={{ display: "flex", alignItems: "center" }}>
                        {item?.ho_ten_nhan_vien}
                        {user?.role === "admin" ? (
                          <Dropdown key={index}>
                            <MenuButton
                              slots={{ root: IconButton }}
                              slotProps={{
                                root: { color: "neutral" },
                              }}
                              sx={{ float: "right" }}
                            >
                              <MoreVert />
                            </MenuButton>
                            <Menu sx={{ zIndex: "10000" }}>
                              <MenuItem
                                onClick={() => {
                                  setOpenNV(true);
                                }}
                              >
                                <EditIcon />
                                Câp nhật nhân viên
                              </MenuItem>
                            </Menu>
                          </Dropdown>
                        ) : null}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Sheet>
          </DialogContent>
        </ModalDialog>
      </Modal>
      <ModalNhanVien
        open={openNV}
        setOpen={setOpenNV}
        setOpenDetail={setOpenDetail}
        nhanVienId={nhanVienId}
        lichSuId={lichSuId}
        soMay={soMay}
        handleXemChiTietPhong={handleXemChiTietPhong}
      />
    </>
  );
}
