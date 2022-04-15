import React from 'react'
import { Box, Paper, Typography, Divider, Autocomplete, TextField, 
  Button, Backdrop, ClickAwayListener, Avatar } from '@mui/material'

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

  const secLvls = [
    { id: 0, label: "高安" },
    { id: 1, label: "低安" },
    { id: 2, label: "零零与虫洞" }
  ]

  const [rigList, setRigList] = React.useState([])
  const [secLevel, setSec] = React.useState(0)
  const [rigSlots, setRigSlots] = React.useState({
    0: {rigType: 0, rigTech :0, rigName: '无改装件'},
    1: {rigType: 0, rigTech :0, rigName: '无改装件'},
    2: {rigType: 0, rigTech :0, rigName: '无改装件'}
  })
  const [selectedFacility, setFacility] = React.useState()

  const handleSubmit = () => {
    var res = {
      typeID: selectedFacility,
      sec: secLevel,
      name: document.getElementById('name').value,
      rigs: rigSlots
    }
    fetch('api/structures/add', {
      body: JSON.stringify({ 
        data: JSON.stringify(res)
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
        hooks.setAddFacilityWindowOpen(false)
        hooks.updateStructureList()
      }
      else
      {
        alert('请求失败！')
        hooks.setAddFacilityWindowOpen(false)
      }
    })
    .catch((err) => {
      console.warn(err)
    })
  }

  const handleClickAway = () => {
    hooks.setAddFacilityWindowOpen(false)
  }

  const handleChangeSec = (val) => {
    setSec(val.id)
  }

  const handleChange = (event, val) => {
    setFacility(val.id)
    setRigList(hooks.rigsList[val.size])
  }

  const handleChangeRig = (val, rigSlotId) => {
    var tmp = rigSlots
    tmp[rigSlotId].rigType = val.bonus
    tmp[rigSlotId].rigTech = val.tech
    tmp[rigSlotId].rigName = val.label
    setRigSlots(tmp)
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
                <TextField 
                  label='设置建筑名称'
                  id='name'
                  fullWidth
                />
              </Box>
              {
                selectedFacility === undefined && (
                  <Box
                    sx={{
                      padding: '0 0 20px 0',
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
                )
              }
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
                          padding: '0 20px 20px 20px',
                          margin: 'auto',
                          left: '0',
                          right: '0'
                        }}
                      >
                        <Avatar
                          sx={{
                            width: 128, 
                            height: 128,
                            margin: 'auto',
                            left: '0',
                            right: '0'
                          }}
                          src={'https://images.evetech.net/types/' + selectedFacility + '/render?size=128'}
                        />
                      </Box>
                      <Box
                        sx={{
                          textAlign: 'center'
                        }}
                      >
                        <Box
                          sx={{
                            padding: '10px 10px 10px 10px'
                          }}
                        >
                          <Autocomplete
                            disablePortal
                            options={secLvls}
                            id='secLvl'
                            renderInput={(params) => <TextField {...params} label="安全等级" />}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            onChange={(event, value) => handleChangeSec(value)}
                          />
                        </Box>
                        <Box
                          sx={{
                            padding: '10px 10px 10px 10px'
                          }}
                        >
                          <Autocomplete
                            disablePortal
                            options={rigList}
                            id='rig-1'
                            renderInput={(params) => <TextField {...params} label="选择改装件 - 1" />}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            onChange={(event, value) => handleChangeRig(value, 0)}
                          />
                        </Box>
                        <Box
                          sx={{
                            padding: '10px 10px 10px 10px'
                          }}
                        >
                          <Autocomplete
                            disablePortal
                            options={rigList}
                            id='rig-2'
                            renderInput={(params) => <TextField {...params} label="选择改装件 - 2" />}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            onChange={(event, value) => handleChangeRig(value, 1)}
                          />
                        </Box>
                        <Box
                          sx={{
                            padding: '10px 10px 10px 10px'
                          }}
                        >
                          <Autocomplete
                            disablePortal
                            options={rigList}
                            id='rig-1'
                            renderInput={(params) => <TextField {...params} label="选择改装件 - 3" />}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            onChange={(event, value) => handleChangeRig(value, 2)}
                          />
                        </Box>
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
                  onClick={handleSubmit}
                >
                  添加
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