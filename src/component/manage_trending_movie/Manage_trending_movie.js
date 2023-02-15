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
                    
                </ThemeProvider>
            </Box>
           
            
        </Box>
    )
}



export default Manage_trending_movie
