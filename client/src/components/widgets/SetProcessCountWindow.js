import React from 'react'
import { Box, Paper, Typography, Divider, Grid, Button, Backdrop, ClickAwayListener, TextField } from '@mui/material'

const SetProcessCountWindow = (hooks) => {
  const handleSubmit = () => {
    hooks.setToProduce({
      name: hooks.toProduce.name,
      id: hooks.toProduce.id,
      count: document.getElementById('processCount').value
    })
    hooks.handleSubmit(document.getElementById('processCount').value)
    hooks.setSettingWindow(false)
  }

  const handleClickAway = () => {
    hooks.setSettingWindow(false)
  }

  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={hooks.showSettingWindow}
      >
        <ClickAwayListener onClickAway={handleClickAway}>
          <Box
            sx={{
              width: {
                md: '550px',
                xs: '90vw'
              },
              position: 'fixed',
              margin: 'auto',
              left: '0',
              right: '0',
              verticalAlign: 'center'
            }}
          >
            <Paper
              elevation={3}
            >
              <Typography 
                variant='h6'
                sx={{
                  padding: '20px 20px 20px 20px'
                }}
              >
                设置生产流程
              </Typography>
              <Divider />
              <Box
                sx={{
                  textAlign: 'center'
                }}
              >
                <img
                  alt={hooks.toProduce.id}
                  src={
                    "https://images.evetech.net/types/" +
                    hooks.toProduce.id +
                    "/icon?size=64"
                  }
                  style={{
                    padding: '20px 20px 10px 20px'
                  }}
                />
                <Typography
                  sx={{
                    fontSize: '18px',
                    padding: '0 20px 10px 20px'
                  }}
                >
                  {hooks.toProduce.name}
                </Typography>
              </Box>
              <Grid
                container
                sx={{
                  padding: '10px 0 20px 0'
                }}
              >
                <Grid item xs={3} />
                <Grid item xs={6} >
                  <Box>
                    <TextField
                      fullWidth
                      defaultValue='1'
                      id='processCount'
                      label='生产流程'
                    />
                  </Box>
                </Grid>
                <Grid item xs={3} />
              </Grid>
              <Divider />
              <Box
                sx={{
                  padding: '20px 20px 20px 20px'
                }}
              >
                <Button
                  variant='outlined'
                  onClick={handleSubmit}
                >
                  提交
                </Button>
              </Box>
            </Paper>
          </Box>
        </ClickAwayListener>
      </Backdrop>
    </>
  )
}

export default SetProcessCountWindow