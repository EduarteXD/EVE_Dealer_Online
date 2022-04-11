import React from 'react'
import { Paper, Grid, TextField, Box, Button, Snackbar, IconButton, Avatar } from '@mui/material'
import { Close } from '@mui/icons-material'

import './LoadingPage.css'

const LoginPage = (hooks) => {

  const [regNotify, setNotify] = React.useState(false)
  const [invalid, setInvalid] = React.useState(false)

  const sendNotify = () => {
    setNotify(true)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setNotify(false)
  }

  const CloseInvalidMsg = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setInvalid(false)
  }

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <Close fontSize="small" />
      </IconButton>
    </>
  )

  const actionInvalid = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={CloseInvalidMsg}
      >
        <Close fontSize="small" />
      </IconButton>
    </>
  )

  const handleLogin = () => {
    if (document.getElementById("usr").value === '' || document.getElementById("pwd").value === '')
    {
      setInvalid(true)
    }
    else
    {
      fetch('api/login', {
        body: JSON.stringify({ 
          name: document.getElementById("usr").value,
          pwd: document.getElementById("pwd").value
        }),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }
      })
      .then((response) => response.json())
      .then((data) => {
        if (data.ok)
        {
          hooks.setUserStat(true)
        }
        else
        {
          alert('登录失败')
        }
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      handleLogin()
    }
  }

  return (
    <>
      <Grid 
        container 
        spacing={2}
        sx={{
          width: '75vw',
          margin: 'auto',
          left: '0',
          right: '0'
        }}
      >
        <Grid item xl={4.25} lg={4} md={2.5} sm={1} xs={0} />
        <Grid item xl={3.5} lg={4} md={7} sm={10} xs={12}>
          <Paper
            elevation={3}
            sx={{
              height: '380px',
              margin: 'auto',
              position: 'flex',
              marginTop: '28vh',
              left: '0',
              right: '0',
              textAlign: 'center'
            }}
          >
            <Box
              sx={{
                height: '8vh',
                padding: '20px 0 0 0'
              }}
            >
              <Avatar 
                src="login.svg"
                sx={{ 
                  width: 64, 
                  height: 64,
                  margin: 'auto',
                  left: '0',
                  right: '0'
                }}
              />
            </Box>
            <Box
              component="form"
              sx={{
                '& > :not(style)': { m: 1, width: '28ch' },
                paddingTop: '10px'
              }}
            >
              <TextField 
                id="usr" 
                label="用户名" 
                variant="outlined"
                onKeyDown={handleKeyDown}
              />
              <TextField 
                id="pwd" 
                label="密码" 
                variant="outlined" 
                type="password"
                onKeyDown={handleKeyDown}
              />
              <Button 
                variant="outlined"
                sx={{
                  padding: '10px 0 10px 0',
                }}
                onClick={handleLogin}
              >
                登录
              </Button>
              <Button 
                variant="text"
                onClick={sendNotify}
              >
                注册
              </Button>
            </Box>
          </Paper>
        </Grid>
        <Grid item xl={4.25} lg={4} md={2.5} sm={1} xs={0} />
      </Grid>
      <Snackbar
        open={regNotify}
        autoHideDuration={3000}
        onClose={handleClose}
        message="注册功能暂未开启，请联系管理员注册！"
        action={action}
      />
      <Snackbar
        open={invalid}
        autoHideDuration={3000}
        onClose={CloseInvalidMsg}
        message="请求不合法！"
        action={actionInvalid}
      />
    </>
  )
}

export default LoginPage