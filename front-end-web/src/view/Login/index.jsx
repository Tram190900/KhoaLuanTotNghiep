import React, { useContext, useState } from "react";
import style from "./login.module.scss";
import clsx from "clsx";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import { getAPI } from "../../api";
import Swal from "sweetalert2";
import { MenuContext } from "../../App";

export default function Login() {
  const navigate = useNavigate();
  const [tenTK, setTenTK] = useState("");
  const [matKhau, setMatKhau] = useState("");
  const [loading, setLoading] = useState(false);
  const menu = useContext(MenuContext);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const result = await getAPI(`/taikhoan/${tenTK}`);
      if (result.status === 200) {
        localStorage.setItem("user", JSON.stringify(result.data));
        navigate("/");
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
      Swal.fire({
        icon: "error",
        text: "Tên đăng nhập hoặc mật khẩu sai",
      });
    }
  };
  onkeyup = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <>
      {loading ? (
        <Box className={style.loadingWrap}>
          <CircularProgress />
        </Box>
      ) : null}
      <div style={{ height: "100%" }}>
        <main className={clsx(style.login)}>
          <a className={clsx(style.logo)} href="/">
            <div className={clsx(style.logo__image)}>
              <img
                src={require("../../assets/logo/logoIUH.svg").default}
                alt=""
              />
            </div>
          </a>
          <div
            className={clsx(
              style.content__left,
              menu.isPhone ? style.isPhone : ""
            )}
          >
            <h3 className={clsx(style.content__left_title)}>
              Hi, Welcome back
            </h3>
            <img
              className={clsx(style.content__left_title)}
              alt=""
              src={require("../../assets/illustrations/illustration_dashboard.png")}
            />
          </div>
          <div
            className={clsx(
              style.content_right,
              menu.isPhone ? style.isPhone : ""
            )}
          >
            <div className={clsx(style.content_right_form)}>
              <h4 className={clsx(style.form__title)}>Đăng nhập hệ thống</h4>
              <div className={clsx(style.form__createUser)}></div>
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
                  onChange={(e) => setTenTK(e.target.value)}
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
                  onChange={(e) => setMatKhau(e.target.value)}
                />
                {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
                <Button
                  // type="submit"
                  onClick={() => handleLogin()}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Đăng nhập
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Quên mật khẩu?
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </div>
        </main>
      </div>
    </>
  );
}
