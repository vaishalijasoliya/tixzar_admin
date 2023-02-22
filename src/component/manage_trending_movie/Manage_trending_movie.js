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
import { toast } from 'react-toastify';
import DatePickerll from "react-datepicker";
import moment from 'moment';

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
    const [filterScripList, setFilterScripList] = React.useState([])
    const [userdata, setUserdata] = React.useState([])
    const [resetdata, setResetdata] = React.useState([])
    const [startDate, setStartDate] = React.useState('');
    const [endDate, setEndDate] = React.useState('');
    const [iddata, setDataid] = React.useState('')
    const [tesxtdata, setTextdata] = React.useState('')
    console.log(iddata.id, 'iddata');
    const [script, setScript] = React.useState('')
    console.log(filterScripList, 'filterScripList')
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
                    accoyty.push(JSON.parse(JSON.stringify(object)))

                }
                setDatalistlogin(accoyty)
            }
        }
    }
    const filterScrip = async (text) => {
        var body = {
            "name": text
        }
        var headers = {
            "Content-Type": "application/json",
            "x-access-token": props.props.profile.token
        }
        props.props.loaderRef(true)

        var accountList = await ApiServices.PostApiCall(ApiEndpoint.ADMIN_MOVIE_LIST, JSON.stringify(body), headers)
        props.props.loaderRef(false)

        console.log('getScirp', accountList)

        const lebal = []
        if (!!accountList) {
            if (accountList.status == true) {
                var accountLableList = []
                for (let index = 0; index < accountList.data.length; index++) {
                    const element = accountList.data[index];
                    var obj = {
                        id: element.id,
                        image: element.image,
                        title: element.title,
                        crew: element.crew
                    }
                    accountLableList.push(JSON.parse(JSON.stringify(obj)))
                    console.log(element, 'element');
                    lebal.push(JSON.parse(JSON.stringify(obj)))
                }
            }
        } else {

        }
        console.log(accountLableList, 'accountLableList');
        setFilterScripList(accountLableList)
        setUserdata(accountLableList)
        setResetdata(accountLableList)

    }


    const Search_bar_ = (e) => {
        const value = e.target.value
        console.log(value, 'is_value_______')
        if (typeof value !== 'object') {
            if (!value || value == '') {
                setFilterScripList(userdata);
            } else {
                filterScrip(value)
            }
        } else {
            setFilterScripList(resetdata);
        }
    }
    const EDITPATT = async () => {
        var body = {
            'id_imdb_movie': iddata.id,
            'position': tesxtdata,
            'image_url': iddata.image,
            'title': iddata.title,
            'start_date': startDate,
            'end_date': endDate
        }
        var headers = {
            "Content-Type": "application/json",
            "x-access-token": props.props.profile.token
        }
        props.props.loaderRef(true)
        var data = await ApiServices.PostApiCall(ApiEndpoint.ADMIN_TRENDINGMOVIE_EDIT, JSON.stringify(body), headers);
        props.props.loaderRef(false)
        if (!!data) {
            if (data.status == true) {
                toast.success(data.message)
                chartloginuser()
            } else {
                toast.error(data.message)

            }
        } else {
            toast.error('Something went wrong.')
        }

        console.log(data, 'datadata')
    }
    React.useEffect(() => {
        if (!!props.props.profile && !!props.props.profile.token) {
            chartloginuser()
            filterScrip()
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
                    >
                        <Box className={Styles.listpopuy22}>
                            <Box className={Styles.Search_div}>
                                <TextField
                                    placeholder="Search"
                                    className={Styles.Search_Bar_input}
                                    id="input-with-icon-textfield"
                                    onChange={(e) => {
                                        filterScrip(e.target.value)
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
                                            }} 
                                            // onClick={handleClick}
                                            >
                                                <img src="./image/Faders.svg" />
                                            </Button>
                                        )
                                    }}
                                    variant="outlined"
                                />
                            </Box>
                            {!!filterScripList ? <Box className={Styles.listboxpoputdata}>
                                {filterScripList.map((item, idx) => (
                                    <Button onClick={() => {
                                        var obj = {
                                            id: item.id,
                                            title: item.title,
                                            image: item.image
                                        }
                                        setDataid(obj)
                                    }} className={item.id == iddata.id ? Styles.listbtoommovi22 : Styles.listbtoommovi}>
                                        <Avatar className={Styles.avtarmovigo} src={item.image}></Avatar>
                                        <div className={Styles.listdevanfpopup}>
                                            <Typography className={Styles.loreamdatago}>{item.title}</Typography>
                                            <Typography className={Styles.loreamdatago22}>{item.crew}</Typography>
                                        </div>
                                    </Button>
                                ))}

                            </Box> : <Box className={Styles.listboxpoputdata}>

                            </Box>}

                            <Box className={Styles.boxandlistdata}>
                                <Box className={Styles.lisysetandnot}>

                                    <Typography>Set Position:</Typography>
                                    <TextField
                                        className={Styles.INPUTDATAPUSH}
                                        fullWidth
                                        type="number"
                                        onChange={(e) => { setTextdata(e.target.value) }}
                                    />

                                </Box>
                                <Box className={Styles.lisysetandnot}>
                                    <input type='datetime-local'
                                        className={Styles.listdatepikar}
                                        onChange={(e) => {
                                            console.log(e.target.value, 'e.target.value')
                                            setStartDate(e.target.value)
                                        }}
                                    />
                                    <input type='datetime-local'
                                        className={Styles.listdatepikar}
                                        onChange={(e) => {
                                            console.log(e.target.value, 'akkajaja')
                                            setEndDate(e.target.value)
                                        }} />
                                </Box>
                            </Box>
                            <Box>
                                {iddata.id == '' || tesxtdata == '' || startDate == '' || endDate == '' ? <Button className={Styles.updeatbtoon} >Update</Button> :
                                    <Button className={Styles.updeatbtoon} onClick={() => { EDITPATT(), handleCloselist() }}>Update</Button>}
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

                                        <Button className={Styles.menuicon}
                                        //  onClick={handleClick}
                                         ><MoreVertIcon /></Button>
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
