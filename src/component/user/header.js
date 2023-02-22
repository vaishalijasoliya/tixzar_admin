import styles from "../../styles/user/hedar.module.css";
import NotificationsIcon from '@mui/icons-material/Notifications'; import * as React from "react";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import { connect } from "react-redux";
import { Types } from "../../../src/constants/actionTypes";
import { useRouter } from "next/router";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Button, Box, ListItemIcon } from "@mui/material";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
let stockInterval = null;
import { toast } from 'react-toastify';

import { styled } from '@mui/material/styles';
import LockIcon from '@mui/icons-material/Lock';
import LogoutIcon from '@mui/icons-material/Logout';
const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
  border: `2px solid ${theme.palette.background.paper}`,
}));
const Nevbar = (props) => {
  console.log(props.props.profile.profile_photo,'listprjjjops');
  const [userCount, setUserCount] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorE2, setAnchorE2] = React.useState(null)
  const open = Boolean(anchorEl);
  const open2 = Boolean(anchorE2)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick_2 = (event) => {
    setAnchorE2(event.currentTarget);
  };
  const handleClose_2 = () => {
    setAnchorE2(null);
  };
  const router = useRouter();
  // console.log(props.router, "myprops");

  // const getCountuser = async () => {
  //   // console.log(props, "myusercount");
  //   var headers = {
  //     "Content-Type": "application/json",
  //     "x-access-token": props.props.profile.token,
  //   };
  //   var data = await ApiServices.GetApiCall(
  //     ApiEndpoint.USER_NOTIFICATION_COUNT,
  //     headers
  //   );
  //   if (!!data) {
  //     if (data.status == true) {
  //       setUserCount(data.data);
  //     } else {
  //     }
  //   } else {
  //   }
  //   console.log(userCount, "pending");
  // };

  // stockInterval = setInterval(() => {
  //   getCountuser()
  // }, 3000);

  // React.useLayoutEffect(() => {
  //   return () => {
  //     if (!!stockInterval) {
  //       clearInterval(stockInterval)
  //     }
  //   }
  // }, [])

  // React.useEffect(() => {
  //   getCountuser();
  // }, []);

  // const onHandleclick = () => {
  //   router.push("./notification");
  // };

  return (
    <>
      <Grid
        container
        spacing={1}
        alignItems="center"
        className={styles.maencontainer}
      >
        <Grid className={styles.textheging} item xs={12} md={6}>
          <Typography
            variant="h3"
            gutterBottom
            component="div"
            className={styles.hedingh3}
          >
            {props.data.title}
          </Typography>
          {props.data.desc && (
            <Typography sx={{ p: 1 }} className={styles.text}>
              {props.data.desc}{" "}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12} className={styles.img2} md={6}>
          {/* <Button className={styles.clrred}>
            <SearchIcon className={styles.ikonbel} />
          </Button> */}
          <Badge
            onClick={handleClick}
            badgeContent={userCount}
            color="secondary"
            className={styles.clrred2}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar className={styles.clrred} variant="rounded">
              <NotificationsIcon
                color="action"
                className={styles.ikonbel}
              />

            </Avatar>

          </Badge>
          <Menu

            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            PaperProps={{
              elevation: 0,

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
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <Box className={styles.listBoxdatamenu}>
              <Typography>Notification</Typography>
              <Divider />
              <Typography className={styles.tobatlistdata}>Today</Typography>
            </Box>
            <Box className={styles.btnnotiboxlist}>
              {/* <MenuItem> */}
              <div className={styles.listmenudata}>
                <div className={styles.listbtndivbott}>
                  <Button>
                    <Box className={styles.itemlistmoj}>
                      <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        badgeContent={
                          <SmallAvatar className={styles.listnonebott} alt="Remy Sharp" src="./image/Vector.svg" />
                        }
                      >
                        <Avatar className={styles.avtarhomevok} alt="Travis Howard" src="./image/Ellipse 25.svg" />
                      </Badge>
                      <div>
                        <Typography className={styles.listtyponame}>
                          {/* <Typography className={styles.listtyponame}> */}
                          John Smith reviewed on a movie Spiderman
                          {/* </Typography> */}
                        </Typography>
                        <Typography className={styles.listtyponame22}>1h ago</Typography>
                      </div>
                    </Box>
                  </Button>
                </div>
                <div className={styles.listbtndivbott}>
                  <Button>
                    <Box className={styles.itemlistmoj}>
                      <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        badgeContent={
                          <SmallAvatar className={styles.listnonebott} alt="Remy Sharp" src="./image/Vector.svg" />
                        }
                      >
                        <Avatar className={styles.avtarhomevok} alt="Travis Howard" src="./image/Ellipse 25.svg" />
                      </Badge>
                      <div>
                        <Typography className={styles.listtyponame}>
                          {/* <Typography className={styles.listtyponame}> */}
                          John Smith reviewed on a movie Spiderman
                          {/* </Typography> */}
                        </Typography>
                        <Typography className={styles.listtyponame22}>1h ago</Typography>
                      </div>
                    </Box>
                  </Button>
                </div>    <div className={styles.listbtndivbott}>
                  <Button>
                    <Box className={styles.itemlistmoj}>
                      <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        badgeContent={
                          <SmallAvatar className={styles.listnonebott} alt="Remy Sharp" src="./image/Vector.svg" />
                        }
                      >
                        <Avatar className={styles.avtarhomevok} alt="Travis Howard" src="./image/Ellipse 25.svg" />
                      </Badge>
                      <div>
                        <Typography className={styles.listtyponame}>
                          {/* <Typography className={styles.listtyponame}> */}
                          John Smith reviewed on a movie Spiderman
                          {/* </Typography> */}
                        </Typography>
                        <Typography className={styles.listtyponame22}>1h ago</Typography>
                      </div>
                    </Box>
                  </Button>
                </div>
                {/* </MenuItem> */}
                <div className={styles.listbtndivbott}>
                  <Button>
                    <Box className={styles.itemlistmoj}>
                      <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        badgeContent={
                          <SmallAvatar className={styles.listnonebott} alt="Remy Sharp" src="./image/Vector.svg" />
                        }
                      >
                        <Avatar className={styles.avtarhomevok} alt="Travis Howard" src="./image/Ellipse 25.svg" />
                      </Badge>
                      <div>
                        <div className={styles.listtyponame}>
                          {/* <Typography className={styles.listtyponame}> */}
                          John Smith reviewed on a movie Spiderman
                          {/* </Typography> */}
                        </div>
                        <div className={styles.listtyponame22}>1h ago</div>
                      </div>
                    </Box>
                  </Button>
                </div>
              </div>
            </Box>
          </Menu>

          <Menu
            anchorEl={anchorE2}
            id="account-menu"
            open={open2}
            onClose={handleClose_2}
            onClick={handleClose_2}
            PaperProps={{
              elevation: 0,
              style: {
                background: '#634BBF', padding: '0px', borderRadius: '10px', width: '250px'
              },
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
                  bgcolor: '#634BBF',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <div className={styles.listprofiledata}>
              <Button href="./My_Profile"  className={styles.buttonmypor}>
                <PersonIcon />
                <Typography>My Profile</Typography>
              </Button>
            </div>
            <div>
              <Button className={styles.buttonmypor}>
                <LockIcon />
                <Typography>Forgot Password</Typography>
              </Button>
            </div>
            <div>
              <Button onClick={() => {
                        var profile = ""
                        props.save_user_data({ user: "" })
                        router.push('/');
                        toast.success('Logout Successfully!')
                      }} className={styles.buttonmypor2}>
                <LogoutIcon />
                <Typography>Logout</Typography>
              </Button>
            </div>
          </Menu>
          <div className={styles.pohotloho1}>
          {/* <img src={props.props.profile.profile_photo} /> */}
            <Avatar
              src={props.props.profile.profile_photo}
              className={styles.pohotloho}
            />
          </div>
          <Box>
            <Button className={styles.arrrinhedar} onClick={handleClick_2} ><KeyboardArrowDownIcon /></Button>

          </Box>
        </Grid>
      </Grid>
    </>
  );
};
const mapStateToProps = (state) => ({
  profile: state.user.profile,
});

const mapDispatchToProps = (dispatch) => ({
  save_user_data: (data) => dispatch({ type: Types.LOGIN, payload: data }),
});
export default connect(mapStateToProps, mapDispatchToProps)(Nevbar);
