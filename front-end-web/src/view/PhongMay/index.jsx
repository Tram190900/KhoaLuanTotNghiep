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
              <CardActions onClick={() => menu.setMenuActive("")}>
                <Button
                sx={{fontSize:'20px'}}
                  endIcon={<BusinessIcon />}
                  onClick={() => {
                    navigate("/quan-ly-phong-may/danhsachphongmay", {
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
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
