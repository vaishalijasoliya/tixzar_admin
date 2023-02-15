import styles from './promotion.module.scss';
import Grid from '@mui/material/Grid';
import { Types } from '../../constants/actionTypes';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';
import { Avatar, Button } from '@mui/material';
import { useState, useEffect } from "react";
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import { Box } from '@mui/system';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
const index = (props) => {
  const [createObjectURL, setCreateObjectURL] = useState(null);
  const [image, setImage] = useState(null);

  const handleChangeImage = (e) => {
    console.log(e.target.files[0], "myfile");
    const filetypes = e.target.files[0].type;
    const extension = filetypes.substring(0, 5)
    // setImgupload(extension)
    console.log(extension, "filetypes");
    console.log(e.target.files[0], "myfiletype");
    // uploadItem(e.target.files[0], extension)
    if (e.target.files && e.target.files[0]) {
      const i = e.target.files[0];

      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
    }
  }
  return (
    <>
      <Grid container spacing={0} className={styles.lispotfusl} style={{ height: '84vh', padding: '40px' }} >
        {/* <Grid xs={12} sm={4} md={3}> */}
        <Grid item md={3} sm={12} xs={12}>
          <div className={styles.listmenuuppohot}>
            <img src={createObjectURL} className={styles.avtaruplo} />
            <div>
              <IconButton className={styles.iconbtnop} color="primary" aria-label="upload picture" component="label">

                <input type="file" name="myImage" hidden onChange={handleChangeImage} />
                <Box className={styles.myimmmglist} >
                  <CameraAltIcon style={{ color: '#ffffff' }} className={styles.cemeraicon} />
                </Box>

              </IconButton>
            </div>
          </div>
        </Grid>
        <Grid item md={9} sm={12} xs={12} className={styles.listtexttypoanf}>
          <Box className={styles.listloevetypo}>
            <Typography>
              Fantastic Beasts The
              Crimes of Grindelwald
            </Typography>
            <Button><ModeEditIcon /></Button>
          </Box>
          <Box className={styles.listloevetypo}>
            <Typography style={{ fontSize: '20px' }} className={styles.listbtnuudesr}>
              Description
            </Typography>
            <Button><ModeEditIcon /></Button>
          </Box>
          <Box className={styles.texttayoanfdafa}>
            <Typography>Curabitur vestibulum arcu turpis, quis egestas lacus fringilla sit amet. Duis posuere enim vitae urna placerat placerat. Aenean tincidunt magna rutrum urna euismod dapibus. Maecenas vel augue auctor, dictum orci non, fermentum diam. In vehicula vestibulum.
              Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed euismod justo sit amet mauris dapibus semper. </Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
const mapStateToProps = (state) => ({
  profile: state.user.profile
});

const mapDispatchToProps = (dispatch) => ({
  save_user_data: (data) =>
    dispatch({ type: Types.LOGIN, payload: data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(index);
