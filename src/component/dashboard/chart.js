import style from '../../styles/dashboard.module.css'
import dynamic from 'next/dynamic';
import React, { Component } from "react";
import ApiServices from '../../config/ApiServices';
import ApiEndpoint from '../../config/ApiEndpoint';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import { red } from '@mui/material/colors';
import { Chartbh } from "react-google-charts";


// const Chartdyanamic = dynamic(() => import("react-apexcharts"), { ssr: false });
export const data = [
    [
      { type: "date", label: "Day" },
      "Average temperature",
      "Average hours of daylight",
    ],
    [new Date(2014, 0), -0.5, 5.7],
    [new Date(2014, 1), 0.4, 8.7],
    [new Date(2014, 2), 0.5, 12],
    [new Date(2014, 3), 2.9, 15.3],
    [new Date(2014, 4), 6.3, 18.6],
    [new Date(2014, 5), 9, 20.9],
    [new Date(2014, 6), 10.6, 19.8],
    [new Date(2014, 7), 10.3, 16.6],
    [new Date(2014, 8), 7.4, 13.3],
    [new Date(2014, 9), 4.4, 9.9],
    [new Date(2014, 10), 1.1, 6.6],
    [new Date(2014, 11), -0.2, 4.5],
  ];
  
  export const options = {
    chart: {
      title: "Average Temperatures and Daylight in Iceland Throughout the Year",
    },
    width: 900,
    height: 500,
    series: {
      // Gives each series an axis name that matches the Y-axis below.
      0: { axis: "Temps" },
      1: { axis: "Daylight" },
    },
    axes: {
      // Adds labels to each axis; they don't have to match the axis names.
      y: {
        Temps: { label: "Temps (Celsius)" },
        Daylight: { label: "Daylight" },
      },
    },
  };
const Chart = (props) => {

    const [onlineUserList, setOnlineUserList] = React.useState([]);
    const [onlineDate, setonlineDate] = React.useState([]);
    const datafdgd = [
        ["Task",1]
    ]
    console.log(props, 'chartprops')

    // var options = {

    //     chart: {
    //         id: "basic-bar",
    //         height: 250,
    //         maxWidth: '500px',
    //         stacked: true,
    //         toolbar: {
    //             show: false
    //         },
    //         zoom: {
    //             enabled: true
    //         },
    //         lagend: {
    //             show: false
    //         },
    //         dataLables: {
    //             enabled: true,
    //             style: {
    //                 color: 'red'
    //             }
    //         }
    //     },


    //     plotOptions: {
    //         bar: {
    //             columnWidth: '11px',
    //             borderRadius: 5,

    //         },

    //     },
    //     fill: {
    //         type: "gradient",
    //         gradient: {
    //             type: "vertical",
    //             colorStops: [
    //                 {
    //                     offset: 0,
    //                     color: "#0E144A",
    //                     opacity: 1
    //                 },
    //             ]
    //         }
    //     },
    //     xaxis: {
    //         categories: onlineDate,
    //     },

    // }
    var series = [
        {
            name: "Users",
            data: onlineUserList
        },
    ]
    // const mydata

    // const chartloginuser = async (id, status) => {

    //     // console.log(props, 'myyypropsssss')

    //     var headers = {
    //         "Content-Type": "application/json",
    //         "x-access-token": props.props.props.profile.token
    //     }

    //     var body = {
    //         "id_review": id,
    //         "review_status": status
    //     }


    //     props.props.props.loaderRef(true)
    //     var mydata = await ApiServices.PostApiCall(ApiEndpoint.ADMIN_ONLINEUSER_LIST, JSON.stringify(body), headers);
    //     props.props.props.loaderRef(false)

    //     console.log(mydata, 'myyyydata')
    //     if (!!mydata) {
    //         if (mydata.status == true) {
    //             const arr = []
    //             const date = []
    //             for (let index = 0; index < mydata.data.length; index++) {
    //                 const element = mydata.data[index];
    //                 console.log(element, 'element11')
    //                 arr.push(element.datecount)
    //                 date.push(element.date)
    //             }
    //             setOnlineUserList(arr)
    //             setonlineDate(date)
    //         }
    //     }



    // }
    // React.useEffect(() => {
    //     if (!!props.props.props.profile && !!props.props.props.profile.token) {
    //         chartloginuser()
    //     }
    // }, [])

    return (
        <div className={style.chartdiv}>
            <div className={style.mainchart}>
                <h3>Active Users</h3>
                <Chartbh
      chartType="Line"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
            </div>
        </div>
    );
}


// export default Chart
const mapStateToProps = (state) => ({
    profile: state.user.profile
});

const mapDispatchToProps = (dispatch) => ({
    save_user_data: (data) =>
        dispatch({ type: Types.LOGIN, payload: data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chart);