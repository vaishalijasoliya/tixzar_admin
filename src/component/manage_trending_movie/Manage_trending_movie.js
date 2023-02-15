import { Box, Button, createTheme, TextField, InputAdornment, Menu, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ThemeProvider, Typography, Avatar } from "@mui/material";
import React from "react";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Styles from './manage_trending_movie.module.css'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import ApiServices from '../../config/ApiServices'
import ApiEndpoint from '../../config/ApiEndpoint';
const theme = createTheme({
    palette: {
        primary: {
            main: '#fff',
        },
        secondary: {
            main: 'rgba(255, 0, 0, 0.2)',
        },
    },

});

const Manage_trending_movie = (props) => {

    console.log(props, 'props');
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [resetData, setResetData] = React.useState(
        [
            {
                name: 'Simon Alex11',
                Description_txt: '1', User_Photo: './image/Movie_3.png',
                Rating_start: 1,
                Status: 'flaged'
            },
            {
                name: 'Albot Sevrus',
                Description_txt: '2', User_Photo: './image/Movie_3.png',
                Rating_start: 1000,
                Status: null
            }, {
                name: 'Simon Alex',
                Description_txt: '3', User_Photo: './image/Movie_3.png',
                Rating_start: 10000,
                Status: null
            }, {
                name: 'Albot Sevrus',
                Description_txt: '4', User_Photo: './image/Movie_3.png',
                Rating_start: 2,
                Status: 'flaged'

            }, {
                name: 'Simon Alex2',
                Description_txt: '5', User_Photo: './image/Movie_3.png',
                Rating_start: 100000,
                Status: 'flaged'
            },
            {
                name: 'Albot Sevrus2',
                Description_txt: '6', User_Photo: './image/Movie_3.png',
                Rating_start: 100000,
                Status: null
            }, {
                name: 'Simon Alex2',
                Description_txt: '7', User_Photo: './image/Movie_3.png',
                Rating_start: 10000000,
                Status: null
            }, {
                name: 'Albot Sevrus2',
                Description_txt: '8', User_Photo: './image/Movie_3.png',
                Rating_start: 18,
                Status: 'flaged'

            }
        ])
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const [openlist, setOpenlist] = React.useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');
    const [datalistlogin, setDatalistlogin] = React.useState([])
    console.log(datalistlogin, 'datalistlogin')
    const handleClickOpen = () => {
        setOpenlist(true);
    };

    const handleCloselist = () => {
        setOpenlist(false);
    };

    const handleMaxWidthChange = (event) => {
        setMaxWidth(
            // @ts-expect-error autofill of arbitrary value is not handled.
            event.target.value,
        );
    };

    const handleFullWidthChange = (event) => {
        setFullWidth(event.target.checked);
    };
    const chartloginuser = async () => {
        var headers = {
            "Content-Type": "application/json",
            "x-access-token": props.props.profile.token
        }
        var body = {

        }
        props.props.loaderRef(true)
        var data = await ApiServices.PostApiCall(ApiEndpoint.USER_TRENDINGMOVIE_LIST, JSON.stringify(body), headers)
        props.props.loaderRef(false)
        console.log(data, 'mydatvvaLIST');

        if (!!data) {
            if (data.status == true) {
                const accoyty = [];
                const csvall = [];
                for (let index = 0; index < data.data.length; index++) {
                    const element = data.data[index];
                    console.log(element, 'password514');
                    const object = {
                        id: element.id_imdb_movie,
                        title: element.title_name,
                        tixzarRating: element.tixzarRating,
                        logoUrl: element.image_url,

                    }
                    // console.log(object, 'object');

                    accoyty.push(JSON.parse(JSON.stringify(object)))

                }
                setDatalistlogin(accoyty)
            }
        }
    }
    React.useEffect(() => {
        if (!!props.props.profile && !!props.props.profile.token) {
            chartloginuser()
        }
    }, [])
    return (
        <Box className="mainView_of_all_pages">
            <Box className={Styles.Top_box}>
                <ThemeProvider theme={theme}>
                    <Button className='Btn_grad_' onClick={handleClickOpen} color="primary">
                        <AddRoundedIcon />
                        <Typography className="Btn_grad_txt" style={{
                            marginLeft: '10px'
                        }}>
                            Add New Movie
                        </Typography>
                    </Button>
                    <Dialog
                        fullWidth={fullWidth}
                        maxWidth={'md'}
                        open={openlist}
                        onClose={handleCloselist}
                    // style={{maxWidth:'300px'}}

                    >
                        <Box className={Styles.listpopuy22}>
                            <Box className={Styles.Search_div}>
                                {/* <TextField
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
                                /> */}
                                <></>
                                <Autocomplete
                                    sx={{ flex: 1, }}
                                    fullWidth
                                    disablePortal={false}
                                    options={filterScripList}
                                    name="script"
                                    value={script}
                                    onChange={(event, value, reason, details) => {
                                        // filterScriplist()
                                        if (!!value) {
                                            if (!!stockInterval) {
                                                clearInterval(stockInterval)
                                            }
                                            getScripPrice(value)
                                            setLotSize(parseFloat(value.lotSize))
                                            stockInterval = setInterval(() => {
                                                getScripPrice(value)
                                            }, 3000);
                                        } else {
                                            if (!!stockInterval) {
                                                clearInterval(stockInterval)
                                            }
                                        }
                                        setScriptError(false)
                                        setScript(value)
                                    }}
                                    onClose={(event, reason) => {
                                        setFilterScripList(defaultScripList)
                                    }}
                                    renderInput={(params) => <TextField  {...params}
                                        name='script'
                                        // error={Boolean(formik.touched.script && formik.errors.script)}
                                        fullWidth
                                        // helperText={formik.touched.script && formik.errors.script}
                                        onBlur={formik.handleBlur}
                                        // onChange={formik.handleChange}
                                        onChange={(text) => {
                                            console.log(text.target.value, 'jjahhahha')
                                            setFilatlist(text.target.value)
                                            filterScrip(text.target.value)
                                            filterScriplist(text.target.value)
                                            // formik.handleChange()
                                        }}
                                        className={styles.listtextfils22}
                                    // error={scriptError}
                                    // helperText={scriptError ? 'Scrip is required' : undefined}
                                    // label={scripLable} 

                                    />
                            </Box>
                            <Box className={Styles.listboxpoputdata}>
                                <Button className={Styles.listbtoommovi}>
                                    <Avatar className={Styles.avtarmovigo} src="./image/Movie_3.png"></Avatar>
                                    <div className={Styles.listdevanfpopup}>
                                        <Typography className={Styles.loreamdatago}>Lorem Ispum</Typography>
                                        <Typography className={Styles.loreamdatago22}>Sed euismod leo augue</Typography>
                                    </div>
                                </Button>
                                <Button className={Styles.listbtoommovi}>
                                    <Avatar className={Styles.avtarmovigo} src="./image/Movie_3.png"></Avatar>
                                    <div className={Styles.listdevanfpopup}>
                                        <Typography className={Styles.loreamdatago}>Lorem Ispum</Typography>
                                        <Typography className={Styles.loreamdatago22}>Sed euismod leo augue</Typography>
                                    </div>
                                </Button> <Button className={Styles.listbtoommovi}>
                                    <Avatar className={Styles.avtarmovigo} src="./image/Movie_3.png"></Avatar>
                                    <div className={Styles.listdevanfpopup}>
                                        <Typography className={Styles.loreamdatago}>Lorem Ispum</Typography>
                                        <Typography className={Styles.loreamdatago22}>Sed euismod leo augue</Typography>
                                    </div>
                                </Button>
                                <Button className={Styles.listbtoommovi}>
                                    <Avatar className={Styles.avtarmovigo} src="./image/Movie_3.png"></Avatar>
                                    <div className={Styles.listdevanfpopup}>
                                        <Typography className={Styles.loreamdatago}>Lorem Ispum</Typography>
                                        <Typography className={Styles.loreamdatago22}>Sed euismod leo augue</Typography>
                                    </div>
                                </Button>
                            </Box>
                            <Box className={Styles.lisysetandnot}>
                                <Typography>Set Position:</Typography>
                                <TextField
                                    className={Styles.INPUTDATAPUSH}
                                    fullWidth
                                    type="number"
                                />
                            </Box>
                            <Box>
                                <Button className={Styles.updeatbtoon}>Update</Button>
                            </Box>
                        </Box>
                    </Dialog>
                </ThemeProvider>
            </Box>
            <Box>
                <TableContainer sx={{ marginTop: ' 30px' }}>
                    <Table >
                        <TableHead>
                            <TableRow className={Styles.Table_head_row}>
                                <TableCell className={[Styles.Table_head_cell, Styles.Tredding_cell]} style={{ borderTopLeftRadius: '12px' }} >Trending</TableCell>
                                <TableCell className={[Styles.Table_head_cell, Styles.Movie_details_cell]} >Movie</TableCell>
                                <TableCell className={[Styles.Table_head_cell, Styles.Tixzr_rating_cell]} >Tixzr Rating</TableCell>
                                <TableCell className={[Styles.Table_head_cell, Styles.Menu_cell]} style={{ borderTopRightRadius: '12px' }}></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* {stableSort(payment, getComparator(order, orderBy))
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row, index) => {
                          const isItemSelected = isSelected(row.name);
                          const labelId = `enhanced-table-checkbox-${index}`;

                          return ( */}
                            {datalistlogin.map((item, index) => (
                                <TableRow style={{ background: index % 2 == 0 ? '#291E3Dred' : '#332E59' }} className={Styles.Table_row}>
                                    <TableCell className={[Styles.Table_Body_cell, Styles.Tredding_cell, Styles.Tredding_cell_body]}  >#{index + 1}</TableCell>
                                    <TableCell className={[Styles.Table_Body_cell, Styles.Movie_details_cell, Styles.Movie_details_body]} >
                                        <img src={item.logoUrl} />
                                        <Typography>{item.title}</Typography>
                                    </TableCell>
                                    <TableCell className={[Styles.Table_Body_cell, Styles.Tixzr_rating_cell, Styles.Tixzr_rating_cell_body]} ><Typography>{item.tixzarRating == null ? '0' : item.tixzarRating}%</Typography></TableCell>
                                    <TableCell className={[Styles.Table_Body_cell, Styles.Menu_cell]} >

                                        <Button className={Styles.menuicon} onClick={handleClick}><MoreVertIcon /></Button>
                                        <Menu
                                            anchorEl={anchorEl}
                                            id="account-menu"
                                            className={Styles.menudatacss}
                                            open={open}
                                            onClose={handleClose}
                                            // onClick={handleClose}
                                            // style={{ backgroundColor: '#332E59' }}
                                            PaperProps={{
                                                elevation: 0,
                                                style: { background: '#282042', padding: '0px' },
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
                                                        // background: '#332E59',
                                                        // bgcolor: '#332E59'
                                                    },
                                                },
                                            }}
                                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                        >
                                            <Box style={{ display: 'flex', alignItems: "center" }}>
                                                <img width='50px' height='50px' style={{ borderRadius: '5PX', margin: '0px 12px 0px 6px' }} src="./image/Movie_3.png" />
                                                <Typography className={Styles.typomenu}>Alita</Typography>
                                                <TextField
                                                    className={Styles.INPUTDATAPUSH}
                                                    fullWidth
                                                    type="number"
                                                />
                                            </Box>
                                        </Menu>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {/* );
                        })} */}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    )
}



export default Manage_trending_movie