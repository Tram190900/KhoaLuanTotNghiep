import React from "react";
import style from "./login.module.scss";
import clsx from "clsx";
import { Button, Input } from "@mui/joy";

export default function Login() {
  return (
    <div className={clsx(style.login)}>
      <div className={clsx(style.loginContainer)}>
        <h1>Đăng nhập</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <Input type="text" placeholder="Tên đăng nhập" />
          <Input type="password" placeholder="Mật khẩu" />
          <Button>Đăng nhập</Button>
        </form>
      </div>
    </div>
  );
}
