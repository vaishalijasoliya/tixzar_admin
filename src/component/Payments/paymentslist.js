import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import { addDays } from 'date-fns';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import styles from '../../styles/user/paymenttable.module.css';
import Toolbar from '@mui/material/Toolbar';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import { DateRangePickerComponent } from '@syncfusion/ej2-react-calendars';
import { useRouter } from 'next/router';

import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import SearchIcon from '@mui/icons-material/Search';
import { Types } from '../../constants/actionTypes';
import { connect } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import ApiServices from '../../config/ApiServices';
import ApiEndpoint from '../../config/ApiEndpoint';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import { CSVLink, CSVDownload } from "react-csv";
import "react-datepicker/dist/react-datepicker.css";
import { DateRangePicker } from 'rsuite';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment'

import { Calendar } from 'react-date-range';

import { Router } from '../../../node_modules/next/router';
// import { log } from 'console';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

const style = { width: 260, display: 'block', marginBottom: 10 };

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));
const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));
// function createData(User, Name, Email, Phone, Gender, All) {
//   return {
//     User, Name, Email, Phone, Gender, All
//   };
// }

// const rows = [
//   createData("./image/Ellipse 19.png","virang","virangjasoliya@gmail.com",8733973323,"Male","$100"),
//   createData("./image/Ellipse 19.png","virang","virangjasoliya@gmail.com",8733973323,"Male","$100"),
//   createData("./image/Ellipse 19.png","virang","virangjasoliya@gmail.com",8733973323,"Male","$100"),
//   createData("./image/Ellipse 19.png","virang","virangjasoliya@gmail.com",8733973323,"Male","$100"),
//   createData("./image/Ellipse 19.png","virang","virangjasoliya@gmail.com",8733973323,"Male","$100"),
//   createData("./image/Ellipse 19.png","virang","virangjasoliya@gmail.com",8733973323,"Male","$100"),
//   createData("./image/Ellipse 19.png","virang","virangjasoliya@gmail.com",8733973323,"Male","$100"),
//   createData("./image/Ellipse 19.png","virang","virangjasoliya@gmail.com",8733973323,"Male","$100"),
//   // createData('Donut', 452, 25.0, 51, 4.9),
//   // createData('Eclair', 262, 16.0, 24, 6.0),
//   // createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   // createData('Gingerbread', 356, 16.0, 49, 3.9),
//   // createData('Honeycomb', 408, 3.2, 87, 6.5),
//   // createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   // createData('Jelly Bean', 375, 0.0, 94, 0.0),
//   // createData('KitKat', 518, 26.0, 65, 7.0),
//   // createData('Lollipop', 392, 0.2, 98, 0.0),
//   // createData('Marshmallow', 318, 0, 81, 2.0),
//   // createData('Nougat', 360, 19.0, 9, 37.0),
//   // createData('Oreo', 437, 18.0, 63, 4.0),
// ]



function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const EnhancedTable = (props) => {

  const router = useRouter();

  // console.log(props, 'mirav');
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [denselist, setDenselist] = React.useState(false);
  const [resetBtnClicked, setresetBtnClicked] = React.useState(false);


  const [rowsPerPage, setRowsPerPage] = React.useState(7);
  const [paymentlist, setPaymentlist] = React.useState([]);
  const [payment, setPayment] = React.useState([]);
  const [customer, setCustomer] = React.useState([]);
  const [startDate, setStartDate] = React.useState("");
  const [dateStart, setDateStart] = React.useState("");
  const [dateEnd, setDateEnd] = React.useState("");
  const [saesData, setSaesData] = React.useState("");
  const [customerList, setCustomerList] = React.useState([]);

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ]);
  
  

  const isSelected = (name) => customer.indexOf(name) !== -1;
console.log(saesData,'saesData');
  const handleChangePage = (event = unknown, newPage = number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event = React.ChangeEvent) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const getInActiveUserList = async (startDate, endDate) => {

    var headers = {
      "Content-Type": "application/json",
      "x-access-token": props.props.profile.token
    }
    console.log(startDate, endDate, "startDate");

    // endDate=="" ? "virang":"mirav"
    var body = {};
    if (!!startDate && !!endDate) {
      body.start_day = moment(startDate).format("MM/DD/YYYY")
      body.end_day = moment(endDate).format("MM/DD/YYYY")
    }
    props.props.loaderRef(true)
    const data = await ApiServices.PostApiCall(ApiEndpoint.USER_PAYMENT_LIST, JSON.stringify(body), headers);
    props.props.loaderRef(false)
    // console.log(data, "DATA")
    if (!!data) {
      if (data.status == true && data.data.length > 0) {
        console.log(data.data, 'dataa');
        const inactiveData = [];
        for (let index = 0; index < data.data.length; index++) {
          const element = data.data[index];
          const object = {
            id: element.id,
            All: element.payment,
            Email: element.email,
            Gender: element.gender,
            Name: element.full_name,
            Phone: element.phone_number,
            User: element.profile_photo
          }
          inactiveData.push(object)
        }
        setPayment(inactiveData)
        setPaymentlist(inactiveData)
        // setActiveuser('inactive')
      } else {
        setPayment([])
        setPaymentlist([])
      }
    }
  }
  // console.log(payment, "paymentlist");
  React.useEffect(() => {
    if (!!props.props.profile && !!props.props.profile.token) {
      getInActiveUserList()
      // usercountlist()
      // getactiveUserListdate()
      // getonlineUserListdate()
      // getinactiveUserListdate()
    }
  }, [])




  return (
    <Grid container>
      <Grid container display={'flex'} className={styles.hadpeg}>
        <Grid className={styles.inputbox} item xs={12} md={3}  >
          <Box className={styles.boxreting} display={'flex'}>

            <input type="text" id='myserchbtn' name="search" placeholder="Search" className={styles.searchbtn} autoComplete="off" 
                         value={saesData} 

            onChange={(e) => {
              setPage(0)
              var value =e.target.value
             setSaesData(e.target.value)
            //  onChange={(e) => setText(e.target.value)}
              if (typeof value !== 'object') {
                if (!value || value == '') {
                  setPayment(paymentlist);
                } else {
                  var filteredData = paymentlist.filter((item) => {
                    let searchValue = item.Name.toLowerCase();
                    return searchValue.includes(value.toString().toLowerCase())
                  })
                  setPayment(filteredData);
                }
              }
            }} />
{/* { console.log( value,'paymentlist')} */}

          </Box>
        </Grid>
        <Grid className={styles.maxbox} item xs={12} md={9}>

        {/* <DateRangePicker
    onChange={item => setState([item.selection])}
    showSelectionPreview={true}
    moveRangeOnFirstSelection={false}
    months={2}
    ranges={state}
    direction="horizontal"
  /> */}
        {denselist == false ?
          <Box className={styles.boxdate} >

            <DateRangePicker

              selected={dateEnd} onChange={endDate => {
                if (!!endDate) {
                  getInActiveUserList(endDate[0], endDate[1])
                  setDateStart(endDate[0])
                  setDateEnd(endDate[1])
                  // userListfilter(endDate[0], endDate[1])
                } else {
                  getInActiveUserList()
                  setDateStart('')
                  setDateEnd('')
                }
              }}
              placeholder="SELECT START RANGE - END RANGE"
              format="LLLL d, yyyy"
              className={styles.datepikarname}
              character="-"
              caretAs={calenderIcon}
            />

          </Box>:
          <Box className={styles.boxdate} >
          <Box className={styles.datepikarname}
 placeholder="SELECT START RANGE - END RANGE" onClick={()=>{setDenselist(false)}}></Box>
          {/* <DateRangePickerComponent ></DateRangePickerComponent> */}

            <DateRangePicker
             selected={dateEnd} onChange={endDate => {
                if (!!endDate) {
                  getInActiveUserList(endDate[0], endDate[1])
                  setDateStart(endDate[0])
                  setDateEnd(endDate[1])
                  // userListfilter(endDate[0], endDate[1])
                } else {
                  getInActiveUserList()
                  setDateStart('')
                  setDateEnd('')
                }
              }}
              // onChange={endDate => {
              //   setDenselist(false)
              // }}
              placeholder="SELECT START RANGE - END RANGE"
              format="LLLL d, yyyy"
              className={styles.datepikarname}
              character="-"
              caretAs={calenderIcon}
            />
            
          </Box>}
          {console.log(denselist,'denselist')}
          {denselist == false ?

          <Button className={styles.resetBtn}  onClick={() => {
            getInActiveUserList()
            setDateStart('')
            setDateEnd('')
            setSaesData('')
            setPaymentlist('')  
            setDenselist(true)
            setresetBtnClicked(true)         
            //  router.push('/')
            }} >
            RESET
          </Button>:
          <Button className={styles.resetBtn}  onClick={() => {
            getInActiveUserList()
            setDateStart('')
            setDateEnd('')
            setSaesData('')
            setPaymentlist('')  
            setDenselist(false)
            setresetBtnClicked(true)         
            //  router.push('/')
            }} >
            RESET
          </Button>}
          {/* </Grid> */}
          {/* <Grid className={styles.maxbox} item xs={12} md={3}> */}
          <Button className={styles.megobtn} disabled={payment.length > 0 ? false : true} >
            <CSVLink data={payment} filename={"payments.csv"} name={"virang"} clssName={styles.csvlinkfor}>
              Download CSV
            </CSVLink>
          </Button>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} md={12}  >
          <div >
            <Box sx={{ width: '100%' }} >
              <Paper sx={{ width: '100%', mb: 2 }} className={styles.maentebal2} >
                <TableContainer>
                  <Table
                    sx={{ minWidth: 750 }}
                    aria-labelledby="tableTitle"
                    size={dense ? 'small' : 'medium'}
                  >   <TableHead>
                      <TableRow>
                        <TableCell align="left">User</TableCell>
                        <TableCell align="left">change to email</TableCell>
                        <TableCell align="left">Phone</TableCell>
                        <TableCell align="left">Gender</TableCell>
                        <TableCell align="left">Amount</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {stableSort(payment, getComparator(order, orderBy))
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row, index) => {
                          const isItemSelected = isSelected(row.name);
                          const labelId = `enhanced-table-checkbox-${index}`;

                          return (
                            <TableRow
                            >

                              <TableCell
                                align="center"
                                component="th"
                                id={labelId}
                                scope="row"
                                padding="none">
                                <div className={styles.vatar}><Avatar alt="Profile Picture" src={row.User} /> <span className={styles.pohottest}>{row.Name}</span></div></TableCell>
                              <TableCell  >{row.Email}</TableCell>
                              <TableCell >{row.Phone}</TableCell>
                              <TableCell >{row.Gender}</TableCell>
                              <TableCell >£ {(row.All).toFixed(2)}</TableCell>
                            </TableRow>
                          );
                        })}

                      {/* {emptyRows > 0 && ( */}
                      <TableRow
                      // style={{
                      //   height: (dense ? 33 : 53) * emptyRows,
                      // }}
                      >
                      </TableRow>
                      {/* )} */}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[7, 10, 25, 100]}
                  component="div"
                  className={styles.bakgvcal}
                  count={payment.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Paper>


            </Box>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
}
const mapStateToProps = (state) => ({
  profile: state.user.profile
});

const mapDispatchToProps = (dispatch) => ({
  save_user_data: (data) =>
    dispatch({ type: Types.LOGIN, payload: data }),
});

const calenderIcon = () => {
  return (
    <img src="./image/calender.png" className="calenderimg"/>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(EnhancedTable);