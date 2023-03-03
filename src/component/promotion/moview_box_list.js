import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import Styles from "../manage_review/manage_review.module.css";

export const Movie_Box = ({ data }) => {
  const router = useRouter();
  return (
    <>
      <Box
        className={Styles.movie_box}
        onClick={() => {
          router.push({
            pathname: "./Manage_Movie_details",
            query: { emailID: data.id },
          });
        }}
      >
        <>
          <div className={Styles.Llistsffsffs}>
            <img src={data.logoUrl} className={Styles.Movie_img_22} />
          </div>
          <Typography className={Styles.Movie_name_}>
            {data.title_name}
          </Typography>
        </>
      </Box>
    </>
  );
};

export const Btn_txt = ({ data }) => {
  return (
    <Typography color={"##FFFFFF"} textTransform="capitalize" fontSize={"16px"}>
      {data}
    </Typography>
  );
};
