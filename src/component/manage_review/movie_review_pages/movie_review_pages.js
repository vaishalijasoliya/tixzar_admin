import { Box, Button, createTheme, Divider, Grid, Rating, InputAdornment, Menu, MenuItem, Tab, Tabs, TextField, ThemeProvider, Typography } from "@mui/material";
import React from "react";
import Styles from '../manage_review.module.css'
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import { TabContext, TabPanel } from "@mui/lab";
import Review_box from "./review_box";
import { PersonAdd } from "@mui/icons-material";
import { Btn_txt } from "../moview_box";
import FlagCircleRoundedIcon from '@mui/icons-material/FlagCircleRounded';
import ApiServices from '../../../config/ApiServices'
import ApiEndpoint from '../../../config/ApiEndpoint';
import { useRouter, withRouter } from 'next/router';
import { toast } from 'react-toastify';




const Movie_review_Pages = (props) => {
    const router = useRouter();
    const [value, setValue] = React.useState('All Reviews');
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [datatital, setDatatital] = React.useState('')
    const [description, setDeshcaripsan] = React.useState('')
    const [imgurldata, setImgurldata] = React.useState()
    const [datamenu, setDatamenu] = React.useState([])
    const [setdata, setSetadata] = React.useState([])
    const [reset, setRrset] = React.useState([])

    const [reatiang, setRtiangstar] = React.useState()
    const[datatab,setDatatab] =React.useState('active')
    const[stardata,setStardata]=React.useState(0)
    console.log(reatiang, 'reatiang')
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    React.useEffect(() => {
        if (!!props.props.profile && !!props.props.profile.token) {
            accounttype(router.query.emailID)
        }
    }, [props.router])
    const accounttype = async (value) => {
        var body = {
            'id_imdb_movie': value,
            'status': datatab,
            'star':stardata
        }
        console.log(body,'bodybody');
        var headers = {
            "Content-Type": "application/json",
            "x-access-token": props.props.profile.token
        }
        props.props.loaderRef(true)
        var data = await ApiServices.PostApiCall(ApiEndpoint.ADMIN_REWIEW_LIST, JSON.stringify(body), headers);
        props.props.loaderRef(false)
        console.log(data, 'datadata')
        if (data.status == true) {
            setDatatital(data.data.title)
            setDeshcaripsan(data.data.description)
            setImgurldata(data.data.image_url)
            setRtiangstar(data.data.tixzarRating)
            const accoyty = [];
            const csvall = [];
            for (let index = 0; index < data.data.reviewList.length; index++) {
                const element = data.data.reviewList[index];
                console.log(element, 'password514');
                const object = {
                    id: element.userDetails.id,
                    title: element.userDetails.name,
                    description: element.description,
                    logoUrl: element.userDetails.profile_photo,
                    avg: element.avg,
                    status:element.userDetails.status
                }
                accoyty.push(JSON.parse(JSON.stringify(object)))
            }
            setDatamenu(accoyty)
            setSetadata(accoyty)
        } else {

        }
    }
    const EDITPATT = async (value) => {
        var body = {
'id_user':value
        }
        var headers = {
          "Content-Type": "application/json",
          "x-access-token": props.props.profile.token
        }
        props.props.loaderRef(true)
        var data = await ApiServices.PostApiCall(ApiEndpoint.ADMIN_USER_DELETE, JSON.stringify(body), headers);
        props.props.loaderRef(false)
        if (!!data) {
          if (data.status == true) {
            toast.success(data.message)
          } else {
            toast.error(data.message)
    
          }
        } else {
          toast.error('Something went wrong.')
        }
    
        console.log(data, 'datadata')
      }

    const handleClose = () => {
        setAnchorEl(null);
    };
  
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const Search_bar_ = (e) => {
        const value = e.target.value
        console.log(value, 'is_value_______')
        if (typeof value !== 'object') {
            if (!value || value == '') {
                setDatamenu(setdata);
            } else {
                var filteredData = datamenu.filter((item) => {
                    console.log(item.name, 'filtrer')
                    let searchValue = item.title.toLowerCase()
                    return searchValue.includes(value.toString().toLowerCase())
                })
                setDatamenu(filteredData)
            }
        } else {
            setDatamenu(setdata);
        }
    }
    const theme = createTheme({
        palette: {
            primary: {
                main: 'rgba(99, 75, 191,0.2)',
            },
            secondary: {
                main: 'rgba(255, 0, 0, 0.2)',
            },
        },

    });

    return (
        <Box className="mainView_of_all_pages">
            <Box className={Styles.Movie_review_top_div}>
                <Typography className={[Styles.top_movie_txt]} sx={{ fontSize: '42px !important' }}>
                    {datatital}
                </Typography>
                <Button className={Styles.Icon_Button} size="small" href="/Manage_Reviews" >
                    <img src="./image/Back_icon.svg" />
                </Button>
            </Box>
            <Box className={Styles.Movie_main_box}>
                <Box className={Styles.Movie_details_box}>
                    <Grid container>
                        <Grid item sm={12} xl={2} lg={2} md={2} >
                            <img src={imgurldata} className={Styles.Movie_img_} />
                        </Grid>
                        <Grid item sm={12} xl={8} lg={8} md={8} padding={'19px'} className={Styles.listgroigdesh}>
                            <Typography className={Styles.Heading_Des}>Description</Typography>
                            <Typography className={Styles.Description_txt}>{description}</Typography>
                        </Grid>
                        <Grid item sm={12} xl={2} lg={2} md={2} >
                            <Typography className={Styles.Heading_Des}>Tixzar Rating</Typography>
                            <Box className={Styles.Rating_start_box}>
                                <StarRoundedIcon fontSize="35px" color="#FFE600" style={{ fontSize: '33px', color: '#FFE600' }} />
                                <Typography textAlign={'center'} className={Styles.Heading_Des}>{reatiang == null?'':(reatiang.toFixed(2))}/10</Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                <Box className={Styles.Search_div}>
                    <TextField
                        placeholder="Search"
                        className={Styles.Search_Bar_input}
                        id="input-with-icon-textfield"
                        onChange={(e) => {
                            console.log(e.target.value, 'is_value____')
                            Search_bar_(e)
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <img src="./image/MagnifyingGlass.svg" />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <Button size="small" style={{
                                    minWidth: '35px'
                                }} onClick={handleClick}>
                                    <img src="./image/Faders.svg" />
                                </Button>
                            )
                        }}
                        variant="outlined"
                    />
                </Box>
              
                <Box className={Styles.Content_div}>
                    <TabContext value={value}>
                        <Tabs value={value} onChange={handleChange} className={Styles.Tab_Bar_} aria-label="disabled tabs example" centered>
                            <Tab label="All Reviews" className={datatab =='active'? Styles.Tabs_321:Styles.Tabs_}  onClick={()=>{setDatatab('active')}} value={'All Reviews'} />
                            <Tab label="Flaged Reviews" className={datatab =='flaged'? Styles.Tabs_321:Styles.Tabs_} onClick={()=>{setDatatab('flaged')}} value="flaged" />
                        </Tabs>
                        <TabPanel className={Styles.Tab_panel_22} value={'All Reviews'}>
                            {datamenu.map((data) => {
                                console.log(data, 'is_review_array___')
                                return (
                                    <Grid container className={Styles.listcontenar}>
                                        <Grid item xs={12} sm={12} md={2} lg={1.5} xl={1.5}>
                                            <img src={data.logoUrl} className={Styles.User_Image} />
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
                                            <Typography className={Styles.User_name_bold} >{data.title}</Typography>
                                            <Typography className={Styles.Review_txt}>{data.description}</Typography>
                                            <Box className={Styles.Rating_start_box} style={{ justifyContent: 'flex-start' }}>
                                                <Rating className={Styles.Rating_star}
                                                 value={((parseFloat(data.avg) / 2)).toFixed(2)} onChange={(event, newValue) => {
                                                    setValue(newValue);
                                                }} readOnly />
                                                <Typography className={Styles.Rating_number}>{((parseFloat(data.avg) / 2)).toFixed(2)}</Typography>
                                            </Box>

                                        </Grid>
                                        <Grid item xs={12} sm={12} md={1} lg={1.5} xl={1.5} sx={{ justifyContent: "flex-end", display: 'flex' }}>
                                            <Box style={{ justifyContent: 'flex-end', display: 'flex' }}>
                                                <Button className={Styles.deleteBtn} onClick={()=>{EDITPATT(data.id)}}>
                                                    <img src="./image/dustbin.svg" />
                                                </Button>
                                            </Box>
                                        </Grid>
                                        <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                        elevation: 0,
                        style: { background: '#332E59', border: "1px solid white" },
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                // bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                                background: '#332E59',
                                bgcolor: '#332E59'
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <ThemeProvider theme={theme}>
                        <Box className={Styles.Menu_Item}>
                            <Typography className={Styles.Filter_head}>Category</Typography>
                            <Box className={Styles.Btn_rows}>
                                <Button color="primary" variant="contained" className={Styles.Filter_btns}>
                                    <Btn_txt data={'Lorem Ipsum'} />
                                </Button>
                                <Button color="primary" variant="contained" className={Styles.Filter_btns}>
                                    <Btn_txt data={'Lorem'} />
                                </Button>
                            </Box>
                            <Box className={Styles.Btn_rows}>
                                <Button color="primary" variant="contained" className={Styles.Filter_btns}>
                                    <Btn_txt data={'Lorem'} />
                                </Button><Button color="primary" variant="contained" className={Styles.Filter_btns}>
                                    <Btn_txt data={'Lorem Ipsum'} />
                                </Button>
                            </Box>
                        </Box>
                        <Divider />
                        {console.log(data,'agagagaggaaa')}
                        <Box className={Styles.Menu_Item}>
                            <Typography className={Styles.Filter_head}>Reviews</Typography>
                            <Box className={Styles.Btn_rows}>
                                <Button onClick={()=>{
                                    accounttype(router.query.emailID)
                                    setStardata(5)}} color="primary" variant="contained" className={Styles.Filter_btns}>
                                    <Btn_txt data={'5 Star'} />
                                </Button>
                                <Button onClick={()=>{
                                    accounttype(router.query.emailID)
                                    setStardata(4)}} color="primary" variant="contained" className={Styles.Filter_btns}>
                                    <Btn_txt data={'4 Star'} />
                                </Button>
                                <Button onClick={()=>{
                                     accounttype(router.query.emailID)
                                    setStardata(3)}}  color="primary" variant="contained" className={Styles.Filter_btns}>
                                    <Btn_txt data={'3 Star'} />
                                </Button>
                            </Box>
                            <Box className={Styles.Btn_rows}>
                                <Button onClick={()=>{
                                     accounttype(router.query.emailID)
                                    setStardata(2)}}  color="primary" variant="contained" className={Styles.Filter_btns}>
                                    <Btn_txt data={'2 Star'} />
                                </Button><Button onClick={()=>{
                                     accounttype(router.query.emailID)
                                    setStardata(1)}}  color="primary" variant="contained" className={Styles.Filter_btns}>
                                    <Btn_txt data={'1 Star'} />
                                </Button>
                            </Box>
                        </Box>
                    </ThemeProvider>
                </Menu>
                                        {data.status == 'flaged' ? 
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
                                        </Grid>:''}

                                    </Grid>
                                )
                            })}

                        </TabPanel>
                        <TabPanel className={Styles.Tab_panel_22} value={'flaged'}>
                        {datamenu.map((data) => {
                                console.log(data, 'is_review_array___')
                                return (
                                    <Grid container className={Styles.listcontenar}>
                                        <Grid item xs={12} sm={12} md={2} lg={1.5} xl={1.5}>
                                            <img src={data.logoUrl} className={Styles.User_Image} />
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
                                            <Typography className={Styles.User_name_bold} >{data.title}</Typography>
                                            <Typography className={Styles.Review_txt}>{data.description}</Typography>
                                            <Box className={Styles.Rating_start_box} style={{ justifyContent: 'flex-start' }}>
                                                <Rating className={Styles.Rating_star}
                                                 value={((parseFloat(data.avg) / 2)).toFixed(2)} onChange={(event, newValue) => {
                                                    setValue(newValue);
                                                }} readOnly />
                                                <Typography className={Styles.Rating_number}>{((parseFloat(data.avg) / 2)).toFixed(2)}</Typography>
                                            </Box>

                                        </Grid>
                                        <Grid item xs={12} sm={12} md={1} lg={1.5} xl={1.5} sx={{ justifyContent: "flex-end", display: 'flex' }}>
                                            <Box style={{ justifyContent: 'flex-end', display: 'flex' }}>
                                                <Button className={Styles.deleteBtn} onClick={()=>{EDITPATT(data.id)}}>
                                                    <img src="./image/dustbin.svg" />
                                                </Button>
                                            </Box>
                                        </Grid>
                                        {data.status == 'flaged' ? 
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
                                        </Grid>:''}


                                    </Grid>
                                )
                            })}
                        </TabPanel>
                    </TabContext>
                </Box>
            </Box>
        </Box>
    )
}




export default (withRouter(Movie_review_Pages))