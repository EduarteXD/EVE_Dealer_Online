import React from 'react'
import { Box, Paper, Typography, Divider, Autocomplete, TextField, Slider, Grid, Button, Backdrop, ClickAwayListener, Avatar } from '@mui/material'
import { VerticalAlignBottom } from '@mui/icons-material'

const AddFacilityWindow = (hooks) => {
  const options = [
    { id: 35825, label: "莱塔卢", size:'m' },
    { id: 35826, label: "阿兹贝尔", size:'l' },
    { id: 35827, label: "索迪约", size:'xl' },
    { id: 35832, label: "空堡", size:'m' },
    { id: 35833, label: "铁壁", size:'l' },
    { id: 35834, label: "星城", size:'xl' },
    { id: 35835, label: "阿塔诺", size:'m' },
    { id: 35836, label: "塔塔拉", size:'l' },
    { id: 40340, label: "昇威豪华星城", size:'xl' },
    { id: 47512, label: "\"莫罗\"铁壁", size:'l' },
    { id: 47513, label: "\"德拉库斯\"铁壁", size:'l' },
    { id: 47514, label: "\"地平线\"铁壁", size:'l' },
    { id: 47515, label: "\"马金尼斯\"铁壁", size:'l' },
    { id: 47516, label: "\"普罗米修斯\"铁壁", size:'l' }
  ]

  const [selectedFacility, setFacility] = React.useState()

  const handleSubmit = () => {
    fetch('api/blueprint/add', {
      body: JSON.stringify({

      }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.ok) {
          hooks.setSettingOpen(false)
          hooks.updateBpList()
        }
        else {
          alert('请求失败！')
          hooks.setSettingOpen(false)
        }
      })
      .catch((err) => {
        console.warn(err)
      })
  }

  const handleClickAway = () => {
    // hooks.setSettingOpen(false)
  }

  const handleChange = (event, value) => {
    if (document.getElementById('category').value !== undefined) {
      setFacility(value.id)
    }
  }

  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <ClickAwayListener onClickAway={handleClickAway}>
          <Box
            sx={{
              width: {
                md: '550px',
                xs: '90vw',
                verticalAlign: 'center',
                position: 'fixed',
                margin: 'auto',
                left: '0',
                right: '0'
              },
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
                添加建筑
              </Typography>
              <Divider />
              <Box
                sx={{
                  padding: '20px 0 20px 0',
                  width: '80%',
                  margin: 'auto',
                  left: '0',
                  right: '0'
                }}
              >
                <Autocomplete
                  disablePortal
                  options={options}
                  id='category'
                  fullWidth
                  renderInput={(params) => <TextField {...params} label="选择建筑类型" />}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  onChange={handleChange}
                />
              </Box>
              {
                selectedFacility !== undefined && (
                  <>
                    <Box
                      sx={{
                        width: '80%',
                        margin: 'auto',
                        left: '0',
                        right: '0'
                      }}
                    >
                    <Box
                      sx={{
                        padding: '20px 20px 20px 20px'
                      }}
                    >
                      <Avatar
                        sx={{
                          width: 128, 
                          height: 128,
                        }}
                        src={'https://images.evetech.net/types/' + selectedFacility + '/render?size=128'}
                      />
                    </Box>
                    </Box>
                  </>
                )
              }
              <Divider />
              <Box
                sx={{
                  padding: '20px 20px 20px 20px'
                }}
              >
                <Button
                  variant='outlined'
                  onClick={() => {
                    // alert(hooks.nameToId[document.getElementById('category').value])
                  }}
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

export default AddFacilityWindow