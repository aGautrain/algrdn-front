import React, { useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { AccountCircle, VpnKey } from '@material-ui/icons';
import { CircularProgress, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@material-ui/core';

// Composant qui affiche un Dialog avec un champ username et un champ password,
// fais la requete d'authentification au serveur, attend un token en retour et renvoie le token au composant parent

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  form: {
    paddingBottom: theme.spacing(3)
  },
  authenticationField: {
    margin: theme.spacing(1),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(4),
  },
  field: {
    width: '15rem'
  }
}))

const LoginDialog: React.FC<{ storeToken: (token: string) => void }> = ({ storeToken }) => {
  const classes = useStyles()
  const [open, setOpen] = useState(true);
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const submitLogin = useCallback(() => {
    console.info({ username, password })

    // TODO request with credentials to retrieve authentication token

    setLoading(true)
    setTimeout(() => { setLoading(false); setOpen(false); storeToken(username) }, 100)
  }, [username, password, setLoading, storeToken])

  return (
      <Dialog open={open}>
        <DialogTitle>
          Authentication
        </DialogTitle>
        <DialogContent dividers>

          <form className={classes.form} autoComplete="off" noValidate>
        
            <div className={classes.authenticationField}>
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item>
                  <AccountCircle color="primary"/>
                </Grid>
                <Grid item>
                  <TextField className={classes.field} value={username} disabled={loading} onChange={(e) => setUsername(e.target.value)} label="Username" />
                </Grid>
              </Grid>
            </div>

            <div className={classes.authenticationField}>
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item>
                  <VpnKey color="primary"/>
                </Grid>
                <Grid item>
                  <TextField className={classes.field} value={password} disabled={loading} onChange={(e) => setPassword(e.target.value)} type="password" label="Password" />
                </Grid>
              </Grid>
            </div>

          </form>
        </DialogContent>
        <DialogActions>
          { loading && <CircularProgress size={20} />}
          <Button autoFocus disabled={loading} onClick={submitLogin} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
  )
}

export default LoginDialog