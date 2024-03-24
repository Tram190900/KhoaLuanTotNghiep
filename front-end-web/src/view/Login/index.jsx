import React, { useContext, useState } from "react";
import style from "./login.module.scss";
import clsx from "clsx";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
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
    <div style={{ height: "100%" }}>
      <main className={clsx(style.login)}>
        <a className={clsx(style.logo)} href="/">
          <div className={clsx(style.logo__image)}>
            <img src={require("../../assets/logo/logoIUH.svg").default} alt="" />
          </div>
        </a>
        <div className={clsx(style.content__left)}>
          <h3 className={clsx(style.content__left_title)}>Hi, Welcome back</h3>
          <img
            className={clsx(style.content__left_title)}
            alt=""
            src={require("../../assets/illustrations/illustration_dashboard.png")}
          />
        </div>
        <div className={clsx(style.content_right)}>
          <div className={clsx(style.content_right_form)}>
            <h4 className={clsx(style.form__title)}>Đăng nhập hệ thống</h4>
            <div className={clsx(style.form__createUser)}>
              {/* <p className={clsx(style.form__askText)}>Người dùng mới?</p> */}
              {/* <Link href="#" className={clsx(style.form__linkText)}>
                Create an account
              </Link> */}
            </div>
          </div>
          <Box
            sx={{
              mb: 7,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              className={clsx(style.form_textInput)}
              component="form"
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="Tên đăng nhập"
                label="Tên đăng nhập"
                name="email"
                autoComplete="email"
                autoFocus
                value={tenTK}
                onChange={(e)=>setTenTK(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Mật khẩu"
                type="password"
                id="password"
                autoComplete="current-password"
                value={matKhau}
                onChange={(e)=>setMatKhau(e.target.value)}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                // type="submit"
                onClick={()=>handleLogin()}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </div>
      </main>
    </div>
    // <div className={clsx(style.login)}>
    //   <div className={clsx(style.loginContainer)}>
    //     <h1>Đăng nhập</h1>
    //     <form
    //       onSubmit={(e) => {
    //         e.preventDefault();
    //         navigate("/quan-ly-phong-may");
    //       }}
    //     >
    //       <Input
    //         type="text"
    //         placeholder="Tên đăng nhập"
    //         value={tenTK}
    //         onChange={(e) => setTenTK(e.target.value)}
    //       />
    //       <Input
    //         type="password"
    //         placeholder="Mật khẩu"
    //         value={matKhau}
    //         onChange={(e) => setMatKhau(e.target.value)}
    //       />
    //       <Button onClick={() => handleLogin()}>Đăng nhập</Button>
    //     </form>
    //   </div>
    // </div>
  );
}
