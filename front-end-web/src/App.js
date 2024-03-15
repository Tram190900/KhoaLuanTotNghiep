import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./view/Login";
import LayoutLogin from "./layout/LayoutLogin";
import LayoutMain from "./layout/LayoutMain";
import { createContext, useState } from "react";
import DanhSachPhongMay from "./view/PhongMay/DanhSachPhongMay/DanhSachPhongMay";
import DanhSachMayTinh from "./view/PhongMay/DanhSachMayTinh/DanhSachMayTinh";
import PhongMay from "./view/PhongMay";
import MayTinh from "./view/MayTinh";
import ThietBi from "./view/ThietBi";
import PhanMem from "./view/PhanMem";
import MonHoc from "./view/MonHoc";
import NhanVien from "./view/NhanVien";
import LichSuSuaChua from "./view/LichSuSuaChua";
import ThongKe from "./view/ThongKe";

export const MenuContext = createContext(null);

function App() {
  const [menuActive, setMenuActive] = useState("phong-may");
  const valueContext = {
    menuActive,
    setMenuActive,
  };
  return (
    <MenuContext.Provider value={valueContext}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LayoutLogin />}>
            <Route path="/login" element={<Login />} />
            <Route path="/quan-ly-phong-may" element={<LayoutMain />}>
              <Route index element={<PhongMay />}></Route>
              <Route path="danhsachphongmay" element={<DanhSachPhongMay />} />
              <Route path="danhsachmaytinh" element={<DanhSachMayTinh />} />
              <Route path="may-tinh" element={<MayTinh />} />
              <Route path="thiet-bi" element={<ThietBi />} />
              <Route path="phan-mem" element={<PhanMem />} />
              <Route path="mon-hoc" element={<MonHoc />} />
              <Route path="nhan-vien" element={<NhanVien />} />
              <Route path="lich-su-sua-chua" element={<LichSuSuaChua />} />
              <Route path="thong-ke" element={<ThongKe />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </MenuContext.Provider>
  );
}

export default App;
