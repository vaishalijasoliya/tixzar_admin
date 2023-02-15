import { Grid, Box, Card, CardContent, LinearProgress, Tabs, Tab, Button, TabPanel, Typography } from "@mui/material"
import style from '../../styles/dashboard.module.css'
import MediaControlCard from "./card"
//import Chartdata from './chart'
// import Mytable from "./hedartext"
// import MediaControlCard from "./card"
import Chartdata from './chart'
import ApiServices from '../../config/ApiServices';
import ApiEndpoint from '../../config/ApiEndpoint';
import { toast } from 'react-toastify';
import StickyHeadTable from "./table"
import React, { useContext, useEffect } from 'react'
// import SupportContext from "../../context/SupportContext";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { GridGoldenratio } from "@mui/icons-material";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chartbh from "react-google-charts";
import DatePickerll from "react-datepicker";

export const data = [
  ['x', 'dogs'],
  [0, 0],
  [1, 10],
  [2, 23],
  [3, 17],
  [4, 18],
  [5, 9],
  [6, 15],
  [7, 27],
];
export const data2 = [
  ['x', 'dogs'],
  [0, 0],
  [1, 10],
  [2, 23],
  [3, 17],
  [4, 18],
  [5, 9],
  [6, 15],
  [7, 27],
];
export const options = {
  // title: "Number of ticked booked",
  hAxis: {
    // title: "Time",
  },
  vAxis: {
    // title: "Popularity",
  },
  series: {
    1: { curveType: "function" },
  },
  // 'width': 430,
  'height': 315,
  backgroundColor: '#634BBF',
  color: '#FFFFFF',
  borderRadius: 50
};
export const options2 = {
  // title: "Number Review",
  hAxis: {
    // title: "Time",
  },
  vAxis: {
    // title: "Popularity",
  },
  series: {
    1: { curveType: "function" },
  },
  // 'width': 450,
  'height': 315,
  backgroundColor: '#634BBF',
  color: '#FFFFFF',
  borderRadius: 50
};
const Usercount = (props) => {

  console.log(props, "props11")
  const [signupCount, setSignupCount] = React.useState(0);
  const [activeCount, setActiveCount] = React.useState(0);
  const [inactiveCount, setInactiveCount] = React.useState(0);
  const [age, setAge] = React.useState('');
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');
  console.log(props.props.profile.token,'activeCount');
  const handleChange = (event) => {
    setAge(event.target.value);
    chartloginuser(event.target.value);
  };
  React.useEffect(() => {
      if (!!props.props.profile && !!props.props.profile.token) {
        DASHBOARD_CHART()
        chartloginuser()
      }
  }, [])

  // const { activeSupportId, setActiveSupportId, setActiveSupportObject } = useContext(SupportContext);

  const handleClick = (id = string, data = object) => {
    viewSupportMsg(key)
    setUserData(data)

  }
  const chartloginuser = async (value) => {

    // console.log(props, 'myyypropsssss')

    var headers = {
        "Content-Type": "application/json",
        "x-access-token": props.props.profile.token
    }

    var body = {
        "type": value,
    }
    props.props.loaderRef(true)
    var data = await ApiServices.PostApiCall(ApiEndpoint.DASHBOARD_LIST, JSON.stringify(body), headers);
    props.props.loaderRef(false)

    console.log(props.props, 'myyyydata')
    if (!!data) {
      if (data.status == true) {
          console.log(data)
          setActiveCount(data.data.userDeletedCount)
          setInactiveCount(data.data.userRegisterCount)
          setSignupCount(data.data.userReviewCount)
      }
  }



}
const DASHBOARD_CHART = async (value) => {

  // console.log(id, 'id')
  var body = {
     
  }
  console.log(body, 'bodybody');
  var headers = {
      "Content-Type": "application/json",
      "x-access-token": props.props.profile.token
  }
  props.props.loaderRef(true)
  var data = await ApiServices.PostApiCall(ApiEndpoint.DASHBOARD_CHART, JSON.stringify, headers)
  props.props.loaderRef(false)
  console.log(data, 'mydata');

  console.log(data, 'virang33');

  // if (data.status == true) {
  //     const arr = []
  //     const date = []
  //     const tabaldata = []
  //     const tabalnumbar = []
  //     const tabaldatapatt = []
  //     for (let index = 0; index < data.lastProfitChart.length; index++) {
  //         const element = data.lastProfitChart[index][0];
  //         const elementlist = data.lastProfitChart[index][1];
  //         date.push(elementlist)
  //         console.log(element, 'elementlist');
  //         arr.push(element)
  //         tabalnumbar.push([elementlist, element])
  //     }


  //     for (let index = 0; index < data.profitChart.length; index++) {
  //         const element = data.profitChart[index][0];
  //         const elementlist = data.profitChart[index][1];
  //         // tabaldata.push(tabalelement)
  //         // console.log(tabalelement, 'tabalelement')
  //     }
  //     const apidata = []
  //     apidata.push(data)
  //     // setRows(tabaldata)profitChart
  //     setDatatavapofit(tabaldatapatt)
  //     setRows(tabalnumbar)
  //     // setTaballist(tabaldata)
  //     setScript(data.profitChart)
  //     setData(data)
  //     setProfiatincart(data.profit)
  //     setOnlineUserList(arr)
  //     setonlineDate(date)
  // }



}



  return (
    <>
      <Grid className={style.listcontenarhome} container  >
        <Grid item xs={12} md={12} sm={12} display={'flex'} justifyContent={'end'}>
          <Box className={style.listboxselectdat}>
            <Select
              className={style.selectbox}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              //   label="Age"
              onChange={handleChange}
            >
              {/* <Box className={style.mebnuitem}> */}
              <MenuItem value={'year'} className={style.mebnuitem}>2022</MenuItem>
              <MenuItem value={'today'} className={style.mebnuitem}>Today</MenuItem>
              <MenuItem value={'week'} className={style.mebnuitem}>This Week</MenuItem>
              <MenuItem value={'month'} className={style.mebnuitem}>This Month</MenuItem>
              <MenuItem value={'custome'} className={style.mebnuitem}>Custom Range</MenuItem>
              {/* <MenuItem value={60} className={style.mebnuitem}>
              </MenuItem> */}
              {/* </Box> */}
            </Select>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}  sm={12}  display={'flex'} justifyContent={'end'}>
          <Box className={style.singdiv}>
            <Box>
              {/* <div className={style.threeuser}> */}
              <img src="./image/Vector (34).svg" className={style.threeuser} />
              {/* <AccountCircleIcon  className={style.threeuser}/> */}
              {/* </div> */}
              <p className={style.signtxt}>Number of users registered</p>
              <p className={style.signnum}>{inactiveCount} </p>

            </Box>


          </Box>

        </Grid>
        <Grid item xs={12} md={4}  sm={12}  className={style.topgrid} display={'flex'} justifyContent={'end'}>

          <Box className={style.singdiv}>
            <Box>
              <Box >

                <img src="./image/Vector (36).svg" className={style.threeuser} />

              </Box>
              <p className={style.signtxt}>Number reviews given</p>
              <p className={style.signnum}> {signupCount} </p>

            </Box>
            {/* <Box> */}

            {/* </Box> */}
          </Box>

        </Grid>
        <Grid item xs={12} md={4}  sm={12}  display={'flex'} justifyContent={'end'}>

          <Box className={style.singdiv}>
            <Box>
              <Box>

                <img src="./image/Vector (35).svg" className={style.threeuser} />

              </Box>
              <p className={style.signtxt}>Number of users uninstalled
              </p>
              <p className={style.signnum}>{activeCount} </p>

            </Box>


          </Box>

        </Grid>
        <Grid item xs={12}  sm={12}  display={"flex"} flexWrap={"wrap"} >
          <Grid item xs={12} md={6}  sm={12}  className={style.listnumandgata}>
            <Box className={style.listchatext}>
              <Typography>Number of ticked booked
              </Typography>
              <Chartbh
                chartType="LineChart"

                data={data}
                className={style.listchartnme}
                options={options}
                style={{ borderRadius: '15px' }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}  sm={12}  >
            <Box className={style.listchatext}>
              <Typography>Number Review
              </Typography>

              <Chartbh
                chartType="LineChart"
                data={data2}
                className={style.listchartnme}
                options={options2}
                style={{ borderRadius: '15px' }}
              />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}
export default Usercount