import React, { useContext, useEffect, useState } from "react";
import { getAPI } from "../../api";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Grid from "@mui/material/Unstable_Grid2";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { MenuContext } from "../../App";
import { Link, useNavigate } from "react-router-dom";
import BusinessIcon from "@mui/icons-material/Business";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import CardContent from "@mui/material/CardContent";
import clsx from "clsx";
import style from "./phongMay.module.scss";
import PrimarySearchAppBar from "../../components/AppBar/PrimarySearchAppBar";

export default function PhongMay(props) {
  const id = 2;
  const [dsToaNha, setDsToaNha] = useState([]);
  const menu = useContext(MenuContext);

  const xemDanhSachToaNha = async () => {
    const result = await getAPI("/toanha");
    if (result.status === 200) {
      setDsToaNha(result.data);
    }
  };

  useEffect(() => {
    xemDanhSachToaNha();
  }, []);
  const navigate = useNavigate();

  return (
    <div>
      <PrimarySearchAppBar />
      <div className="p-3">
        <h1>Quản lý phòng máy</h1>
        <Breadcrumbs
          aria-label="breadcrumb"
          onClick={() => menu.setMenuActive("phong-may")}
        >
          <Link underline="hover" color="inherit" href="/">
            Quản lý phòng máy
          </Link>
          <Typography color="text.primary">Tòa nhà</Typography>
        </Breadcrumbs>
        <Grid
          mt={3}
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          {dsToaNha.map((toaNha) => (
            <Grid xs={6}>
              <Tooltip title="Double Click để xem chi tiết">
                <Button
                  className={clsx(style.button)}
                  onDoubleClick={() => {
                    navigate("/danhsachphongmay", {
                      state: {
                        toaNha_id: toaNha.id,
                        tenToaNha: toaNha.tenToaNha,
                      },
                    });
                  }}
                >
                  <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                      <BusinessIcon sx={{ fontSize: 400 }} />
                      <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                      >
                        {toaNha.tenToaNha}
                      </Typography>
                    </CardContent>
                  </Card>
                </Button>
              </Tooltip>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}

{
  /* <Grid xs={6} height={"25"}>
<Card variant="outlined">
  <CardActions onClick={() => menu.setMenuActive("")}>
    <Button
    sx={{fontSize:'20px'}}
      endIcon={<BusinessIcon />}
      onClick={() => {
        navigate("/danhsachphongmay", {
          state: {
            toaNha_id: toaNha.id,
            tenToaNha: toaNha.tenToaNha,
          },
        });
      }}
    >
      {toaNha.tenToaNha}
    </Button>
  </CardActions>
</Card>
</Grid> */
}
