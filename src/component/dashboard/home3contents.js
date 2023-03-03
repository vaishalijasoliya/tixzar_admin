import { Grid, Box, Typography } from "@mui/material";
import style from "../../styles/dashboard.module.css";
import ApiServices from "../../config/ApiServices";
import ApiEndpoint from "../../config/ApiEndpoint";
import { toast } from "react-toastify";
[];
import React, { useContext, useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Chartbh from "react-google-charts";
import { DateRangePicker } from "rsuite";
import moment from "moment";
import { Top_3_boxes } from "../Layout/Dashboardpage";
// import Chart from "react-apexcharts";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export const data = [
  ["x", "tickets"],
  [0, 0],
  [1, 1],
  [2, 23],
  [3, 17],
  [4, 18],
  [5, 9],
  [6, 15],
  [3, 0],
];
export const Usercount = (props) => {
  console.log(props, "props11____");
  const [signupCount, setSignupCount] = React.useState(0);
  const [activeCount, setActiveCount] = React.useState(0);
  const [inactiveCount, setInactiveCount] = React.useState(0);
  const [age, setAge] = React.useState("year");
  const [startDate, setDateStart] = React.useState("");
  const [dateEnd, setDateEnd] = React.useState("");
  const [CharacterData, setDatachart] = React.useState(["Year", "x"]);
  const [chartData, setChartData] = React.useState([]);
  const [selectedDate, setSelectedDate] = React.useState("year");
  const [dateArray_data, setDateArray_Data] = React.useState([]);
  const [reviewArray_data, setReviewArray_data] = React.useState([]);

  const data2 = [["Year", "x"]];
  const options2 = {
    series: {
      1: { curveType: "function" },
    },
    height: 315,
    backgroundColor: "#634BBF",
    color: "red",
    borderRadius: 50,
  };
  const options = {
    hAxis: {},
    vAxis: {},
    series: {
      1: { curveType: "function" },
    },
    height: 315,
    backgroundColor: "#634BBF",
    color: "#FFFFFF",
    borderRadius: 50,
  };
  const handleChange = (event) => {
    setAge(event.target.value);
    if (event.target.value == "custome") {
    } else {
      setDateStart("");
      setDateEnd("");
      setSelectedDate(event.target.value);
    }
  };
  React.useEffect(() => {
    if (!!props.props.profile && !!props.props.profile.token) {
      DASHBOARD_CHART();
      chartloginuser();
    }
    // props.props.loaderRef(true);
  }, [selectedDate]);
  const chartloginuser = async (value) => {
    var headers = {
      "Content-Type": "application/json",
      "x-access-token": props.props.profile.token,
    };
    var body = {
      type: selectedDate,
    };
    if (!!startDate) {
      (body.startDay = moment(startDate).format("yyyy-MM-DD")),
        (body.type = "custome");
    }
    if (!!dateEnd) {
      body.endDay = moment(dateEnd).format("yyyy-MM-DD");
    }
    console.log(body, "bodybody");
    props.props.loaderRef(true);
    var data = await ApiServices.PostApiCall(
      ApiEndpoint.DASHBOARD_LIST,
      JSON.stringify(body),
      headers
    );
    props.props.loaderRef(false);

    console.log(data, "myyyydata");

    const Date_arr = [];
    const Review_arr = [];

    if (!!data) {
      if (data.status == true) {
        console.log(data);
        setActiveCount(data.data.userDeletedCount);
        setInactiveCount(data.data.userRegisterCount);
        setSignupCount(data.data.userReviewCount);
        const ChartData_arr = [];

        const Object_first = ["Year", "Review"];
        ChartData_arr.push(Object_first);
        for (let index = 0; index < data.data.reviews.length; index++) {
          const element = data.data.reviews[index];
          console.log(element, "is_____element");
          if (element.count > 0) {
            Date_arr.push(moment(element.date).format(""));
            Review_arr.push(element.count);
            // ChartData_arr.push(element);
          }

          const Next_array = [
            moment(element.date).format("DD MMM,YY"),
            element.count,
          ];
          ChartData_arr.push(Next_array);
        }

        setReviewArray_data(Review_arr);
        setDateArray_Data(Date_arr);

        console.log(ChartData_arr, "Chart_data___arr");
        setChartData(ChartData_arr);
      }
    }
  };

  const Select_Array = [
    {
      value: "year",
      name: "This year",
    },
    {
      value: "today",
      name: "Today",
    },
    {
      value: "week",
      name: "This Week",
    },
    {
      value: "month",
      name: "This month",
    },
    {
      value: "custome",
      name: "Custome",
    },
  ];

  const DASHBOARD_CHART = async (value) => {
    // var body = {};
    var headers = {
      "Content-Type": "application/json",
      "x-access-token": props.props.profile.token,
    };

    var body = {
      type: value,
    };
    if (!!startDate) {
      (body.startDay = moment(startDate).format("yyyy-MM-DD")),
        (body.type = "custome");
    }
    if (!!dateEnd) {
      body.endDay = moment(dateEnd).format("yyyy-MM-DD");
    }

    props.props.loaderRef(true);
    var data = await ApiServices.PostApiCall(
      ApiEndpoint.DASHBOARD_CHART,
      JSON.stringify(body),
      headers
    );
    props.props.loaderRef(false);

    console.log(data, "is___dashboard__data");

    if (data.status == true) {
      const csvall = [];
      for (let index = 0; index < data.data.length; index++) {
        const element = data.data[index];
        console.log(element, "password514");
        csvall.push([element._id, element.count]);
        // csvall.push(JSON.parse(JSON.stringify(object)))
      }
      setDatachart(csvall);
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
  };

  return (
    <>
      <Grid className={style.listcontenarhome} container>
        <Grid
          item
          xs={12}
          md={12}
          sm={12}
          lg={12}
          xl={12}
          display={"flex"}
          justifyContent={"end"}
        >
          <Box className={style.listboxselectdat}>
            {age == "custome" ? (
              <Box className={style.boxdate}>
                <DateRangePicker
                  selected={dateEnd}
                  onChange={(endDate) => {
                    setDateStart(endDate[0]);
                    setDateEnd(endDate[1]);
                  }}
                  style={{ left: "50%" }}
                  onClose={() => {
                    chartloginuser();
                  }}
                  menuStyle={{ left: "50%" }}
                  placeholder="SELECT START RANGE - END RANGE"
                  format="yyyy-MM-dd"
                  className={style.datepikarname}
                  character=" ~ "
                />
              </Box>
            ) : (
              ""
            )}
            <Select
              className={style.selectbox}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              onChange={handleChange}
            >
              {Select_Array.map((item) => {
                return (
                  <MenuItem value={item.value} className={style.mebnuitem}>
                    {item.name}
                  </MenuItem>
                );
              })}
            </Select>
          </Box>
        </Grid>
        {/* <Grid
          item
          xs={12}
          md={4}
          sm={12}
          display={"flex"}
          justifyContent={"end"}
        >
          <Box className={style.singdiv}>
            <Box>
              <img src="./image/Vector (34).svg" className={style.threeuser} />
              <p className={style.signtxt}>Number of users registered</p>
              <p className={style.signnum}>{inactiveCount} </p>
            </Box>
          </Box>
        </Grid> */}
        <Top_3_boxes
          Img_src={"./image/Vector (34).svg"}
          Title={"Number of users registered"}
          Number_user={inactiveCount}
        />
        <Top_3_boxes
          Img_src={"./image/Vector (36).svg"}
          Title={"Number reviews given"}
          Number_user={signupCount}
        />
        <Top_3_boxes
          Img_src={"./image/Vector (35).svg"}
          Title={"Number of users uninstalled"}
          Number_user={activeCount}
        />

        <Grid item xs={12} sm={12} display={"flex"} flexWrap={"wrap"}>
          <Grid item xs={12} md={6} sm={12} className={style.listnumandgata}>
            <Box className={style.listchatext}>
              <Typography>Number of ticked booked</Typography>
              <Chartbh
                chartType="LineChart"
                data={chartData}
                className={style.listchartnme}
                options={options}
                style={{ borderRadius: "15px" }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6} sm={12}>
            <Box className={style.listchatext}>
              <Typography>Number Review</Typography>

              <Chartbh
                chartType="LineChart"
                data={chartData}
                className={style.listchartnme}
                options={options2}
                style={{ borderRadius: "15px" }}
              />

              {/* <Chart
                options={ChartDetails.options}
                series={ChartDetails.series}
                // height={"315"}
                type="line"
              /> */}
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
export default Usercount;
