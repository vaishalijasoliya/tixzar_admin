import { Box, Button, TableFooter, TableRow, TableCell, Pagination, TableContainer, Paper, Table, TableBody, createTheme, Divider, Grid, IconButton, InputAdornment, Menu, MenuItem, Tab, Tabs, TextField, ThemeProvider, Typography } from "@mui/material";
import React from "react";
import Styles from './manageruser.module.css'
import { TabContext, TabPanel } from "@mui/lab";
import Review_box from "./review_data";
import ApiServices from '../../config/ApiServices'
import ApiEndpoint from '../../config/ApiEndpoint';


function createData(name, calories, fat) {
  return { name, calories, fat };
}

const Movie_review_Pages = (props) => {
  console.log(props, 'sdgghbddd');
  const [value, setValue] = React.useState('All Reviews');
  const [page, setPage] = React.useState(0);
  const [datalist, setData] = React.useState()
  const [currentPage, setCurrentPage] = React.useState(1);
  const [userSearchmenu, setDatalistlogin] = React.useState([])
  const [anchorEl, setAnchorEl] = React.useState(null);
  const accounttype = async (value) => {
    var body = {
      status:value
    }
    var headers = {
        "Content-Type": "application/json",
        "x-access-token": props.props.profile.token
    }
    props.props.loaderRef(true)
    var data = await ApiServices.PostApiCall(ApiEndpoint.ADMIN_USER_LIST, JSON.stringify(body), headers);
    props.props.loaderRef(false)
    console.log(data,'datadata');
    if (!!data) {
      if (data.status == true) {
        const accoyty = [];
        const csvall = [];
        for (let index = 0; index < data.data.length; index++) {
          const element = data.data[index];
          console.log(element, 'passwlllord514');
          // for (let index = 0; index < data.data.userDetails.length; index++) {
            // const elementlist = data.userDetails[index];
            console.log(element.userDetails.id,'elementlist');
          const object = {
            followers: element.followers,
            reviews: element.reviews,
            id:element.userDetails.id,
            name:element.userDetails.name,
            status:element.userDetails.status,
            profile_photo:element.userDetails.profile_photo
          }
          console.log(object, 'object');
        // }
           accoyty.push(JSON.parse(JSON.stringify(object)))

        }
         setDatalistlogin(accoyty)
      }
}

    console.log(data, 'datadata')
}
React.useEffect(() => {
  if (!!props.props.profile && !!props.props.profile.token) {
    accounttype()
  }
}, [])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const Search_bar_ = (e) => {
    const value = e.target.value
    console.log(value, 'is_value_______')
    if (typeof value !== 'object') {
      if (!value || value == '') {
        setReview_detials(resetData);
      } else {
        var filteredData = Review_details.filter((item) => {
          console.log(item.name, 'filtrer')
          let searchValue = item.name.toLowerCase()
          return searchValue.includes(value.toString().toLowerCase())
        })
        setReview_detials(filteredData)
      }
    } else {
      setReview_detials(resetData);
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
      <Box className={Styles.Movie_main_box}>
        <Box className={Styles.Content_div}>
          <TabContext value={value}>
            <Tabs value={value} onChange={handleChange} className={Styles.Tab_Bar_} aria-label="disabled tabs example" centered>
              <Tab label="All Reviews" className={Styles.Tabs_} onClick={()=>{accounttype('active')}} value={'All Reviews'} />
              <Tab label="Flaged Reviews" className={Styles.Tabs_} onClick={()=>{accounttype('flaged')}} value="Flaged Reviews" />
            </Tabs>
            <TabPanel className={Styles.Tab_panel_} value={'All Reviews'}>
              <TableContainer component={Paper} className={Styles.listmeneuet}>
                <Table sx={{ minWidth: 500 }} className={Styles.tebaldata} aria-label="custom pagination table">
                  <TableBody>
                    {userSearchmenu.map((item, idx) => (

                      <TableRow key={item.name} className={Styles.tabalrodata}>
                        <TableCell >
                          <Box className={Styles.listdatatebal}>
                            <img src={item.profile_photo} className={Styles.User_Image} />
                            <div className={Styles.typotdanfr}>
                              <Typography className={Styles.User_name_bold} >{item.name}</Typography>
                              <Typography className={Styles.listtypoandtext}>{item.Description_txt}</Typography>

                            </div>
                          </Box>
                        </TableCell>
                        <TableCell
                         style={{ width: 200 }}
                          align="left">
                         <Typography className={Styles.listtypoangyo}>
                          {/* {item.Rating_start} */}
                        {item.reviews.toString().length == 5?'10K':item.reviews.toString().length == 6?'100K':item.reviews.toString().length >= 7?'1M':item.reviews}
                        </Typography>
                        <Typography className={Styles.reviewdata}>
                        Reviews Given
                        </Typography>
                        </TableCell>
                        <TableCell style={{ width: 200 }} align="left">
                        <Typography className={Styles.listtypoangyo}>
                          {/* {item.Rating_start} */}
                        {item.followers.toString().length == 5?'10K':item.followers.toString().length == 6?'100K':item.followers.toString().length >= 7?'1M':item.followers}
                        </Typography>
                        <Typography className={Styles.reviewdata}>
                        Followers
                        </Typography>
                       
                        </TableCell>
                        <TableCell style={{ width: 200 }} align="left">
                        <Box style={{ justifyContent: 'flex-end', display: 'flex' }}>
                        <Button className={Styles.deleteBtn}>
                            <img src="./image/dustbin.svg" />
                        </Button>
                    </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </TabPanel>
            <TabPanel className={Styles.Tab_panel_} value={'Flaged Reviews'}>
            <TableContainer component={Paper} className={Styles.listmeneuet}>
                <Table sx={{ minWidth: 500 }} className={Styles.tebaldata} aria-label="custom pagination table">
                  <TableBody>
                    {userSearchmenu.map((item, idx) => (

                      <TableRow key={item.name} className={Styles.tabalrodata}>
                        <TableCell >
                          <Box className={Styles.listdatatebal}>
                            <img src={item.profile_photo} className={Styles.User_Image} />
                            <div className={Styles.typotdanfr}>
                              <Typography className={Styles.User_name_bold} >{item.name}</Typography>
                              <Typography className={Styles.listtypoandtext}>{item.Description_txt}</Typography>

                            </div>
                          </Box>
                        </TableCell>
                        <TableCell
                         style={{ width: 200 }}
                          align="left">
                         <Typography className={Styles.listtypoangyo}>
                          {/* {item.Rating_start} */}
                        {item.reviews.toString().length == 5?'10K':item.reviews.toString().length == 6?'100K':item.reviews.toString().length >= 7?'1M':item.reviews}
                        </Typography>
                        <Typography className={Styles.reviewdata}>
                        Reviews Given
                        </Typography>
                        </TableCell>
                        <TableCell style={{ width: 200 }} align="left">
                        <Typography className={Styles.listtypoangyo}>
                          {/* {item.Rating_start} */}
                        {item.followers.toString().length == 5?'10K':item.followers.toString().length == 6?'100K':item.followers.toString().length >= 7?'1M':item.followers}
                        </Typography>
                        <Typography className={Styles.reviewdata}>
                        Followers
                        </Typography>
                       
                        </TableCell>
                        <TableCell style={{ width: 200 }} align="left">
                        <Box style={{ justifyContent: 'flex-end', display: 'flex' }}>
                        <Button className={Styles.deleteBtn}>
                            <img src="./image/dustbin.svg" />
                        </Button>
                       
                        
                    </Box>
                    {item.status == 'flaged'?
                        <Button className={Styles.deleteBtn}>
                            <img src="./image/dustbin.svg" />
                        </Button>:''
                        }
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </TabPanel>
          </TabContext>
        </Box>
      </Box>
    </Box>
  )
}

export default Movie_review_Pages


