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
// import calender from "../../../public/image/calender.png";


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
function createData(User, Name, Email, Phone, Gender, All) {
  return {
    User, Name, Email, Phone, Gender, All
  };
}





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
const headCells = [
  {
    id: 'User',
    disablePadding: false,
    label: 'User',
    align:"center"
  },
  {
    id: 'Email',
    disablePadding: false,
    label: 'Email',
  },
  {
    id: 'Phone',
    disablePadding: false,
    label: 'Phone',
  },
  {
    id: 'Gender',
    disablePadding: false,
    label: 'Gender',
  },
  {
    id: 'All',
    numeric: true,
    disablePadding: false,
    label: 'All',
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.All}
            align={headCell.numeric ? 'left' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.All ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected, status } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
          className={styles.hedingtbl}
        >
          {status} Users
        </Typography>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};
const EnhancedTable = (props) => {


  // console.log(props, 'mirav');
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(7);
  const [signupList, setSignupList] = React.useState([]);
  const [onlineList, setOnlineList] = React.useState([]);
  const [inactiveList, setInactiveList] = React.useState([]);
  const [customer, setCustomer] = React.useState([]);
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [customerList, setCustomerList] = React.useState([]);
  const [dateStart, setDateStart] = React.useState("");
  const [dateEnd, setDateEnd] = React.useState("");
  const [tableData, setTableData] = React.useState([]);
  const isSelected = (name) => customer.indexOf(name) !== -1;



  const handleChangePage = (event = unknown, newPage = number) => {
    setPage(newPage);
  };
  const handleChange = (newValue) => {
    setStartDate(newValue);
  };

  React.useEffect(() => {
    console.log(props.userList, 'props.userList')
    if (!!props.profile && !!props.profile.token) {
      setCustomerList(props.userList);
      setCustomer(props.userList);

    }
  }, [props.userList])
  const handleChangeRowsPerPage = (event = React.ChangeEvent) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  return (
    <Grid container>
      <Grid container display={'flex'} className={styles.hadpeg}>
        <Grid className={styles.inputbox} item  sm={12} md={3} xs={12} >
          <Box className={styles.boxreting} display={'flex'}>

            <input type="text" id='myserchbtn' name="search" placeholder="Search" className={styles.searchbtn} autoComplete="off" onChange={(e) => {
              setPage(0)
              var value = e.target.value
              if (typeof value !== 'object') {
                if (!value || value == '') {
                  setCustomer(customerList);
                } else {
                  var filteredData = customerList.filter((item) => {
                    let searchValue = item.Name.toLowerCase();
                    return searchValue.includes(value.toString().toLowerCase())
                  })
                  setCustomer(filteredData);
                }
              }
            }} />
          </Box>
        </Grid>
        <Grid className={styles.maxbox} item xs={12} md={9} sm={12}>
          <Box className={styles.boxdate} >

            <DateRangePicker
              selected={dateStart} onChange={startDate => { }}
              selected={dateEnd} onChange={endDate => {
                if (!!endDate) {
                  props.getSingUpUserList(endDate[0], endDate[1])
                  props.getOnlineiUserList(endDate[0], endDate[1])
                  props.getInActiveUserList(endDate[0], endDate[1])
                  setDateStart(endDate[0])
                  setDateEnd(endDate[1])
                  // userListfilter(endDate[0], endDate[1])
                } else {
                  props.getSingUpUserList()
                  props.getOnlineiUserList()
                  props.getInActiveUserList()
                  setDateStart('')
                  setDateEnd('')
                }
              }}
              placeholder="SELECT START RANGE - END RANGE"
              format="LLLL d, yyyy"
              className={styles.datepikarname}
              character="-"
              caretAs={calenderIcon}
              // placement="topStart"
            // selected={startDate} onChange={startDate => { }}
            // selected={endDate} onChange={endDate => {
            //   if (!!endDate) {
            //     setStartDate(endDate[0])
            //     setEndDate(endDate[1])
            //     props.filterList(endDate[0], endDate[1])
            //   } else {
            //     props.filterList('', '')
            //   }
            // }}

            />
          </Box>
        {/* </Grid> */}
        {/* <Grid className={styles.maxbox} item xs={12} md={2} sm={12}> */}
          <Button className={styles.megobtn} disabled ={ props.csvlist.length > 0 ? false : true} >
            <CSVLink data={props.csvlist} filename={"user.csv"} clssName={styles.csvlinkfor}>
              Download CSV
            </CSVLink>
          </Button>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} md={12}  >
          <div >
            <Box sx={{ width: '100%' }} >
              <Paper sx={{ width: '100%', mb: 2 }} className={styles.maentebal} >
                <EnhancedTableToolbar status={props.status} numSelected={selected.length} />
                <TableContainer>
                  <Table
                    sx={{ minWidth: 750 }}
                    aria-labelledby="tableTitle"
                    size={dense ? 'small' : 'medium'}
                  >
                    <EnhancedTableHead
                      numSelected={selected.length}
                      order={order}
                      orderBy={orderBy}
                      onRequestSort={handleRequestSort}
                      rowCount={customer.length}

                    >
                    </EnhancedTableHead>
                    <TableBody>
                      {stableSort(customer, getComparator(order, orderBy))
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row, index) => {
                          const isItemSelected = isSelected(row.name);
                          const labelId = `enhanced-table-checkbox-${index}`;

                          return (
                            <TableRow>

                              <TableCell
                                align="center"
                                component="th"
                                id={labelId}
                                scope="row"
                                padding="none">
                                <div className={styles.vatar}><Avatar alt="Profile Picture" src={row.User} /> <span className={styles.pohottest}>{row.Name}</span></div></TableCell>
                              <TableCell  >{row.Email}</TableCell>
                              <TableCell align="center">{row.Phone}</TableCell>
                              <TableCell align="center">{row.Gender}</TableCell>
                              <TableCell align="center">{row.All}</TableCell>
                            </TableRow>
                          );
                        })}

                      {/* {emptyRows > 0 && ( */}
                      <TableRow >
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[7, 10, 25, 100]}
                  component="div"
                  className={styles.bakgvcal}
                  count={customer.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
                {/* <TablePagination
                  className={styles.bakgvcal}
                  rowsPerPageOptions={[7, 10, 25, 50, 75]}
                  component="div"
                  count={customer.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                /> */}
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

