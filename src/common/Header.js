import React, { useEffect, useState } from 'react';
import {AppBar,Toolbar,IconButton,Typography,Stack,Button} from '@mui/material';
import Diversity1Icon from '@mui/icons-material/Diversity1';
// import '../../App.css'

const Header =()=>{ 
  return <div>
    <AppBar position='static'>
      <Toolbar>
        <IconButton sixe='large' edge='start' color='inherit' aria-label='logo'>
        <Diversity1Icon/>
        </IconButton>
        <Typography variant='h6' component='div' sx={{flexGrow:1}}>
          JPORTAL
        </Typography>
        <Stack direction='row' spacing={2}>
        <Button color='inherit'>Signup</Button>
        <Button color='inherit'>About</Button>
        <Button color='inherit'>Login</Button>
        </Stack>
      </Toolbar>
    </AppBar>
  </div>
}

export default Header;

