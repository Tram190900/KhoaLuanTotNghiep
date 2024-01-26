import React from "react";
import style from "./login.module.scss";
import clsx from "clsx";
import { Button, Input } from "@mui/joy";
import {useNavigate} from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  return (
    <div className={clsx(style.login)}>
      <div className={clsx(style.loginContainer)}>
        <h1>Đăng nhập</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            navigate('/quan-ly-phong-may')
          }}
        >
          <Input type="text" placeholder="Tên đăng nhập" />
          <Input type="password" placeholder="Mật khẩu" />
          <Button onClick={()=>navigate('/quan-ly-phong-may')}>Đăng nhập</Button>
        </form>
      </div>
    </div>
  );
}
