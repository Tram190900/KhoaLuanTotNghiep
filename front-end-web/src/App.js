import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./view/Login";
import LayoutLogin from "./layout/LayoutLogin";
import LayoutMain from "./layout/LayoutMain";
import { createContext, useEffect, useState } from "react";
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
import ThongTinMayTinh from "./view/PhongMay/ThongTinMayTinh/ThongTinMayTinh";
import LichTruc from "./view/LichTruc";
import ProtectedRouter from "./layout/ProtectedRouter";

export const MenuContext = createContext(null);

function App() {
  const [menuActive, setMenuActive] = useState("phong-may");
  const [thongBao, setThongBao] = useState();
  const [isPhone, setIsPhone] = useState(false)
  const valueContext = {
    menuActive,
    setMenuActive,
    thongBao,
    setThongBao,
    isPhone,
    setIsPhone
  };
  useEffect(() => {
    const handleResize = () => {
      setIsPhone(window.innerWidth <= 992);
    };
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <MenuContext.Provider value={valueContext}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LayoutLogin />}>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectedRouter>
                  <LayoutMain />
                </ProtectedRouter>
              }
            >
              <Route index element={<PhongMay />}></Route>
              <Route path="danhsachphongmay" element={<DanhSachPhongMay />} />
              <Route path="danhsachmaytinh" element={<DanhSachMayTinh />} />
              <Route path="thongtinmaytinh" element={<ThongTinMayTinh />} />
              <Route path="may-tinh" element={<MayTinh />} />
              <Route path="thiet-bi" element={<ThietBi />} />
              <Route path="phan-mem" element={<PhanMem />} />
              <Route path="mon-hoc" element={<MonHoc />} />
              <Route path="nhan-vien" element={<NhanVien />} />
              <Route path="lich-su-sua-chua" element={<LichSuSuaChua />} />
              <Route path="thong-ke" element={<ThongKe />} />
              <Route path="lich-truc" element={<LichTruc />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </MenuContext.Provider>
  );
}

export default App;
