import { Grid, Box, Typography } from "@mui/material"
import style from '../../styles/dashboard.module.css'
import ApiServices from '../../config/ApiServices';
import ApiEndpoint from '../../config/ApiEndpoint';
import { toast } from 'react-toastify';
import React, { useContext, useEffect } from 'react'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Chartbh from "react-google-charts";
import { DateRangePicker } from 'rsuite';
import moment from 'moment';
export const data = [
  ['x', 'dogs'],
  [0, 0],
  [1, 10],
  [2, 23],
  [3, 17],
  [4, 18],
  [5, 9],
  [6, 15],
  [0, 0],
];
export 
const Usercount = (props) => {

  console.log(props, "props11")
  const [signupCount, setSignupCount] = React.useState(0);
  const [activeCount, setActiveCount] = React.useState(0);
  const [inactiveCount, setInactiveCount] = React.useState(0);
  const [age, setAge] = React.useState('year');
  const [startDate, setDateStart] = React.useState('');
  const [dateEnd, setDateEnd] = React.useState('');
  const [CharacterData, setDatachart] = React.useState(['Year','x'])
  console.log(CharacterData, 'CharacterData');
  const data2 = [
    ['Year','x']
  
  ];
  const children = data2.concat(CharacterData);
console.log(data,'children');
  const options2 = {
    hAxis: {
    },
    vAxis: {
    },
    series: {
      1: { curveType: "function" },
    },
    'height': 315,
    backgroundColor: '#634BBF',
    color: '#FFFFFF',
    borderRadius: 50
  };
  const options = {
    hAxis: {
    },
    vAxis: {
    },
    series: {
      1: { curveType: "function" },
    },
    'height': 315,
    backgroundColor: '#634BBF',
    color: '#FFFFFF',
    borderRadius: 50
  }
  console.log(moment(dateEnd).format('yyyy-MM-DD'), 'activeCount');
  const handleChange = (event) => {
    setAge(event.target.value);
    if (event.target.value == 'custome') {

    } else {
      setDateStart('')
      setDateEnd('')
      chartloginuser(event.target.value);
    }

  };
  React.useEffect(() => {
    if (!!props.props.profile && !!props.props.profile.token) {
      DASHBOARD_CHART()
      chartloginuser()
    }
  }, [])
  const chartloginuser = async (value) => {
    var headers = {
      "Content-Type": "application/json",
      "x-access-token": props.props.profile.token
    }
    var body = {
      "type": value,
    }
    if (!!startDate) {
      body.startDay = moment(startDate).format('yyyy-MM-DD'),
        body.type = 'custome'
    }
    if (!!dateEnd) {
      body.endDay = moment(dateEnd).format('yyyy-MM-DD')
    }
    console.log(body, 'bodybody')
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
    var body = {
      "title_movie": "Black adam"
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
    if (data.status == true) {
      const csvall = [];
      for (let index = 0; index < data.data.length; index++) {
        const element = data.data[index];
        console.log(element, 'password514');
        csvall.push([element._id,element.count])
        // csvall.push(JSON.parse(JSON.stringify(object)))

      }
      setDatachart(csvall)
    }
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
            {age == 'custome' ?
              <Box className={style.boxdate} >
                <DateRangePicker
                  selected={dateEnd}
                  onChange={endDate => {
                    setDateStart(endDate[0])
                    setDateEnd(endDate[1])
                  }}
                  onClose={() => { chartloginuser() }}
                  placeholder="SELECT START RANGE - END RANGE"
                  format="yyyy-MM-dd"
                  className={style.datepikarname}
                  character="-"
                />
              </Box> : ""}
            <Select
              className={style.selectbox}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              onChange={handleChange}
            >
              <MenuItem value={'year'} className={style.mebnuitem}>2022</MenuItem>
              <MenuItem value={'today'} className={style.mebnuitem}>Today</MenuItem>
              <MenuItem value={'week'} className={style.mebnuitem}>This Week</MenuItem>
              <MenuItem value={'month'} className={style.mebnuitem}>This Month</MenuItem>
              <MenuItem value={'custome'} className={style.mebnuitem}>Custom Range</MenuItem>
            </Select>
          </Box>
        </Grid>
        <Grid item xs={12} md={4} sm={12} display={'flex'} justifyContent={'end'}>
          <Box className={style.singdiv}>
            <Box>
              <img src="./image/Vector (34).svg" className={style.threeuser} />
              <p className={style.signtxt}>Number of users registered</p>
              <p className={style.signnum}>{inactiveCount} </p>
            </Box>


          </Box>

        </Grid>
        <Grid item xs={12} md={4} sm={12} className={style.topgrid} display={'flex'} justifyContent={'end'}>

          <Box className={style.singdiv}>
            <Box>
              <Box >

                <img src="./image/Vector (36).svg" className={style.threeuser} />

              </Box>
              <p className={style.signtxt}>Number reviews given</p>
              <p className={style.signnum}> {signupCount} </p>

            </Box>
          </Box>

        </Grid>
        <Grid item xs={12} md={4} sm={12} display={'flex'} justifyContent={'end'}>

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
        <Grid item xs={12} sm={12} display={"flex"} flexWrap={"wrap"} >
          <Grid item xs={12} md={6} sm={12} className={style.listnumandgata}>
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
          <Grid item xs={12} md={6} sm={12}  >
            <Box className={style.listchatext}>
              <Typography>Number Review
              </Typography>

              <Chartbh
                chartType="LineChart"
                data={children}
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
