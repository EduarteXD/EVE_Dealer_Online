import React from 'react'
import { Box, Paper, Typography, Divider, Slider, Grid, Button, Backdrop, ClickAwayListener } from '@mui/material'

const SetBlueprintInfoWindow = (hooks) => {
  const[mEff, setME] = React.useState(0)
  const[tEff, setTE] = React.useState(0)

  const material = (e, v) => {
    setME(v)
  }

  const time = (e, v) => {
    setTE(v)
  }

  const handleSubmit = () => {
    fetch('api/blueprint/add', {
      body: JSON.stringify({ 
        id: hooks.bpInfo.id,
        me: mEff,
        te: tEff
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
        hooks.setSettingOpen(false)
        hooks.updateBpList()
      }
      else
      {
        alert('请求失败！')
        hooks.setSettingOpen(false)
      }
    })
    .catch((err) => {
      console.warn(err)
    })
  }

  const handleClickAway = () => {
    hooks.setSettingOpen(false)
  }

  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={hooks.settingOpen}
      >
        <ClickAwayListener onClickAway={handleClickAway}>
          <Box
            sx={{
              width: {
                md: '550px',
                xs: '90vw',
                position: 'fixed',
                margin: 'auto',
                left: '0',
                right: '0',
                top: '30vh'
              }
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
                修改蓝图属性
              </Typography>
              <Divider />
              <Box
                sx={{
                  textAlign: 'center'
                }}
              >
                <img
                  src={
                    "https://images.evetech.net/types/" +
                    hooks.bpInfo.id +
                    "/bp?size=64"
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
                  {hooks.bpInfo.name}
                </Typography>
                <Divider
                  sx={{
                    width: '50%',
                    margin: 'auto',
                    left: '0',
                    right: '0'
                  }}
                />
              </Box>
              <Grid
                container
                sx={{
                  padding: '10px 0 20px 0'
                }}
              >
                <Grid item xs={3} />
                <Grid item xs={2} >
                  <Typography
                    mt={0.4}
                  >
                    材料效率：
                  </Typography>
                </Grid>
                <Grid item xs={4} >
                  <Box>
                    <Slider
                      aria-label="material"
                      defaultValue={0}
                      valueLabelDisplay="auto"
                      onChange = {material}
                      step={1}
                      min={0}
                      max={10}
                    />
                  </Box>
                </Grid>
                <Grid item xs={3} />
                <Grid item xs={3} />
                <Grid item xs={2} >
                  <Typography
                    mt={0.4}
                  >
                    时间效率：
                  </Typography>
                </Grid>
                <Grid item xs={4} >
                  <Box>
                    <Slider
                      aria-label="time"
                      defaultValue={0}
                      valueLabelDisplay="auto"
                      onChange = {time}
                      step={2}
                      min={0}
                      max={20}
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

export default SetBlueprintInfoWindow