import React, { useContext, useState } from "react";
import style from "./login.module.scss";
import clsx from "clsx";
import { Button, Input } from "@mui/joy";
import { useNavigate } from "react-router-dom";
import { getAPI } from "../../api";
import Swal from "sweetalert2";
import { MenuContext } from "../../App";

export default function Login() {
  const menu = useContext(MenuContext);
  const navigate = useNavigate();
  const [tenTK, setTenTK] = useState("");
  const [matKhau, setMatKhau] = useState("");

  const handleLogin = async () => {
    try {
      const result = await getAPI(`/taikhoan/${tenTK}`);
      if (result.status === 200) {
        localStorage.setItem('user', JSON.stringify(result.data));
        navigate("/quan-ly-phong-may");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: "Tên đăng nhập hoặc mật khẩu sai",
      });
      console.log(error);
    }
  };
  return (
    <div className={clsx(style.login)}>
      <div className={clsx(style.loginContainer)}>
        <h1>Đăng nhập</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            navigate("/quan-ly-phong-may");
          }}
        >
          <Input
            type="text"
            placeholder="Tên đăng nhập"
            value={tenTK}
            onChange={(e) => setTenTK(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Mật khẩu"
            value={matKhau}
            onChange={(e) => setMatKhau(e.target.value)}
          />
          <Button onClick={() => handleLogin()}>Đăng nhập</Button>
        </form>
      </div>
    </div>
  );
}
