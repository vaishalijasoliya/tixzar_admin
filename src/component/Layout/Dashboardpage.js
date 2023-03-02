import { Grid, Box, Typography } from "@mui/material";
import style from "../../styles/dashboard.module.css";

export const Top_3_boxes = ({ Number_user, Title, Img_src }) => {
  return (
    <Grid
      item
      xs={12}
      md={4}
      sm={12}
      display={"flex"}
      justifyContent={"end"}
      className={style.topgrid}
    >
      <Box className={style.singdiv}>
        <Box>
          <Box>
            <img src={Img_src} className={style.threeuser} />
          </Box>
          <p className={style.signtxt}>{Title}</p>
          <p className={style.signnum}>{Number_user} </p>
        </Box>
      </Box>
    </Grid>
  );
};
