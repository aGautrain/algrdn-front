import React, { useState } from 'react';
import { Fab, Grid, makeStyles, Typography } from '@material-ui/core';
import LoginDialog from './LoginDialog';
import { ExitToApp } from '@material-ui/icons';
import Home from './Home';


const useStyles = makeStyles(() => ({
  app: {
    backgroundColor: '#282c34',
    minHeight: '100vh'
  },
  title: {
    color: 'lightgray',
    opacity: 1
  },
  logout: {
    position: 'fixed',
    bottom: '2rem',
    right: '2rem'
  }
}))

const App = () => {
  const classes = useStyles()
  const [token, setToken] = useState('')
  console.info(token)

  return (
    <div className={classes.app}>
      <Grid container justify="center">

        <Grid item xs={10}>
        <Typography variant="h1" className={classes.title} gutterBottom>
          Algordien
        </Typography>
        </Grid>

        <Grid item>
          { token && <Home token={token} /> }
        </Grid>

      </Grid>
      
      { !token ? <LoginDialog storeToken={setToken} /> : <Fab color="secondary" className={classes.logout} onClick={() => setToken('')}><ExitToApp /></Fab> }
    </div>
  );
}

export default App;
