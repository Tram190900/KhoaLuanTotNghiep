import React, { useContext, useEffect, useState } from "react";
import { getAPI } from "../../api";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Grid from "@mui/material/Unstable_Grid2";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { MenuContext } from "../../App";
import { Link, useNavigate } from "react-router-dom";

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
    <div className="p-3">
      <h1>Quản lý phòng máy</h1>
      <Breadcrumbs
        aria-label="breadcrumb"
        onClick={() => menu.setMenuActive("phong-may")}
      >
        <Link underline="hover" color="inherit" href="/quan-ly-phong-may">
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
          <Grid xs={6} height={"25"}>
            <Card variant="outlined">
              <CardContent>{toaNha.tenToaNha}</CardContent>
              <CardActions onClick={() => menu.setMenuActive("")}>
                {/* <Link to={pathname: {`/quan-ly-phong-may/danhsachphongmay/${toaNha.id}`}
                }>
                  Xem chi tiết
                </Link> */}
                <Button
                  /* to={{
                    pathname: "/quan-ly-phong-may/danhsachphongmay",
                    state: {id: toaNha.id, name: toaNha.tenToaNha}, // your data array of objects
                  }} */
                  // navigate('/componentB',{state:{id:1,name:'sabaoon'}})
                  onClick={() => {
                    navigate("/quan-ly-phong-may/danhsachphongmay", {
                      state: {
                        toaNha_id: toaNha.id,
                        tenToaNha: toaNha.tenToaNha,
                      },
                    });
                  }}
                >
                  Xem chi tiết
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
