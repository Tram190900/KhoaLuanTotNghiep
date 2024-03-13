import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./view/Login";
import LayoutLogin from "./layout/LayoutLogin";
import LayoutMain from "./layout/LayoutMain";
import { createContext, useState } from "react";
import DanhSachPhongMay from "./view/PhongMay/DanhSachPhongMay/DanhSachPhongMay";
import DanhSachMayTinh from "./view/PhongMay/DanhSachMayTinh/DanhSachMayTinh";

export const MenuContext = createContext(null);

function App() {
  const [menuActive, setMenuActive] = useState("phong-may");
  const valueContext={
    menuActive,
    setMenuActive
  }
  return (
    <MenuContext.Provider value={valueContext}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LayoutLogin />}>
            <Route path="/login" element={<Login />} />
            <Route path="/quan-ly-phong-may" element={<LayoutMain />}></Route>
          </Route>
          <Route path="/danhsachphongmay" element={<DanhSachPhongMay />} />
          <Route path="/danhsachmaytinh" element={<DanhSachMayTinh />} />
        </Routes>
      </BrowserRouter>
    </MenuContext.Provider>
  );
}

export default App;
