import React from "react";
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

export default function Login() {
  const navigate = useNavigate();
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
              <p className={clsx(style.form__askText)}>Người dùng mới?</p>
              <Link href="#" className={clsx(style.form__linkText)}>
                Create an account
              </Link>
            </div>
          </div>
          {/* <div className={clsx(style.notice_box)}>
            <div className={clsx(style.notice_icon)}>
              <svg
                aria-hidden="true"
                role="img"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2m1 14a1 1 0 0 1-2 0v-5a1 1 0 0 1 2 0Zm-1-7a1 1 0 1 1 1-1a1 1 0 0 1-1 1"
                ></path>
              </svg>
            </div>
            <div className={clsx(style.notice_text)}>

            </div>
          </div> */}
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
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                // type="submit"
                onClick={()=>navigate('/quan-ly-phong-may')}
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
  );
}
