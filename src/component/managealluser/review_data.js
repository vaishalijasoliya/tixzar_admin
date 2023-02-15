import { Box, Button, createTheme, Grid, Rating, ThemeProvider, Typography } from "@mui/material";
import { purple } from "@mui/material/colors";
import React from "react";
import Styles from './manageruser.module.css'
import FlagCircleRoundedIcon from '@mui/icons-material/FlagCircleRounded';


const Review_box = ({ data }) => {
    console.log(data, 'is___data____')
    const [value, setValue] = React.useState(2)
    const theme = createTheme({
        palette: {
            primary: {
                main: '#FF0000',
            },
            secondary: {
                main: 'rgba(255, 0, 0, 0.2)',
            },
        },

    });
    return (
        <Box className={Styles.Review_box_}>
            <Grid container>
                <Grid item xs={12} sm={12} md={2} lg={1.5} xl={1.5}>
                    <img src={data.User_Photo} className={Styles.User_Image} />
                </Grid>
                <Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
                    <Typography className={Styles.User_name_bold} >{data.name}</Typography>
                    <Typography>{data.Description_txt}</Typography>
            

                </Grid>
                <Grid item xs={12} sm={12} md={1} lg={1.5} xl={1.5} sx={{ justifyContent: "flex-end", display: 'flex' }}>
                    <Box style={{ justifyContent: 'flex-end', display: 'flex' }}>
                        <Button className={Styles.deleteBtn}>
                            <img src="./image/dustbin.svg" />
                        </Button>
                    </Box>
                </Grid>

            </Grid>
            {/* {data.Status ? data.Status == 'flaged' ?
                <Grid container>
                    <Grid item xs={12} sm={12} md={1.5} lg={1.5} xl={1.5} />
                    <Grid item xs={12} sm={12} md={10.5} lg={10.5} xl={10.5} sx={{ justifyContent: "space-between", display: 'flex', alignItems: 'center' }}>
                        <ThemeProvider theme={theme} >
                            <Box >
                                <Button className={Styles.Flaged_button} variant='contained' color="secondary" >
                                    <Typography color={'#FF0000'} textTransform="capitalize" fontSize={'16px'}>
                                        Click Here
                                    </Typography>
                                </Button>
                                <Button className={Styles.Flaged_button} style={{ marginLeft: '5px' }} variant='contained' color="secondary" >
                                    <Typography color={'#FF0000'} textTransform="capitalize" fontSize={'16px'} >
                                        Click Here
                                    </Typography>
                                </Button>
                            </Box>
                            <FlagCircleRoundedIcon color="primary" />
                        </ThemeProvider>
                    </Grid>
                </Grid>
                : "" : ""} */}


        </Box>
    )
}

export default Review_box