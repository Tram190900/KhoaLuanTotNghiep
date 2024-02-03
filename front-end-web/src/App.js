
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./view/Login";
import LayoutLogin from "./layout/LayoutLogin";
import LayoutMain from "./layout/LayoutMain";
import { createContext, useState } from "react";

export const MenuContext = createContext(null);

function App() {
  const [menuActive, setMenuActive] = useState("may-tinh");
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
        </Routes>
      </BrowserRouter>
    </MenuContext.Provider>
  );
}

export default App;
