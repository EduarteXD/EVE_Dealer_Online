import React from 'react'
import { Divider, Grid, Typography, Paper, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Button, Box, LinearProgress, Avatar } from '@mui/material'

import getItemList from '../functions/GetItemList'
import getBlueprintList from '../functions/GetBlueprintList'
import getMatchedBlueprints from '../functions/GetMatchedBlueprints'
import getIdToName from '../functions/GetIdToName'
import SetBlueprintInfoWindow from './widgets/SetBlueprintInfoWindow'

const BlueprintsVaultPage = () => {
  const [matched, setMatched] = React.useState({})
  const [requestSent, setReqStat] = React.useState(false)
  const [isLoadingBp, setBpLoading] = React.useState(true)
  const [isID2NameLoading, setID2NameLoading] = React.useState(true)
  const [isLoadingItem, setItemLoading] = React.useState(true)
  const [settingOpen, setSettingOpen] = React.useState(false)
  // const [ID2NameLoaded, setID2NameLoaded] = React.useState(false)
  const [nameToID, setNameToID] = React.useState({})
  const [requestedBp, setReqBp] = React.useState(false)
  const [blueprints, setBlueprints] = React.useState({})
  const [myBp, setMyBp] = React.useState({
    exists: false
  })
  const [ID2Name, setID2Name] = React.useState({})
  const [bpInfo, setbpInfo] = React.useState({
    id: 4311,
    name: '龙卷风级蓝图'
  })

  const updateBpList = () => {
    fetch('api/blueprint/query')
    .then((response) => response.json())
    .then((data) => {
      setMyBp({
        exists: true,
        content: data
      })
    })
    .catch((err) => {
      console.warn(err)
    })
  }

  if (!requestedBp) {
    setReqBp(true)
    updateBpList()
  }

  const handleChange = () => {
    if (document.getElementById('object').value.trim().replace(/[^\u4E00-\u9FA5]/g,'') !== '') {
      // remove non-Chinese characters
      getMatchedBlueprints(document.getElementById('object').value.trim().replace(/[^\u4E00-\u9FA5]/g,''), setMatched, ID2Name, blueprints, nameToID)
    }
    else {
      setMatched({})
    }
  }

  const handleClick = (key, name) => {
    setbpInfo({
      id: key,
      name: name
    })
    setSettingOpen(true)
  }

  if (!requestSent) {
    setReqStat(true)
    getBlueprintList((stat) => {
      setBpLoading(stat)
      if (!stat) {
        setBlueprints(JSON.parse(window.localStorage['blueprintList']))
      }
    })
    getItemList((stat) => {
      setItemLoading(stat)
      if (!stat) {
        setNameToID(JSON.parse(window.localStorage['itemList']))
      }
    })
    getIdToName((stat) => {
      setID2NameLoading(stat)
      if (!stat) {
        setID2Name(JSON.parse(window.localStorage['ID2Name']))
      }
    })
  }

  return (
    <>
      {isLoadingBp || isLoadingItem || isID2NameLoading ? (
        <>
          <Box
            sx={{
              textAlign: "center",
            }}
          >
            <LinearProgress />
          </Box>
        </>
      ) : (
        <>
          <Grid
            container
            spacing={2}
            sx={{
              width: "85vw",
              margin: "auto",
              left: "0",
              right: "0",
              marginTop: "5vh"
            }}
          >
            <Grid item xs={0} />
            <Grid item xs={12}>
              <Paper>
                <Typography
                  variant="h6"
                  sx={{
                    padding: "20px 20px 20px 20px",
                  }}
                >
                  添加 / 修改蓝图
                </Typography>
                <Divider />
                <Grid
                  container
                  spacing={2}
                  sx={{
                    padding: "20px 20px 20px 20px",
                  }}
                >
                  <Grid item md={4} xs={12}>
                    <TextField
                      id="object"
                      fullWidth
                      label="请输入蓝图名称"
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item md={8} xs={12}>
                    <TableContainer component={Paper}>
                      <Table aria-label="result">
                        <TableHead>
                          <TableRow>
                            <TableCell>名称</TableCell>
                            <TableCell align="right">操作</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {Object.keys(matched).map((key) => (
                            <TableRow
                              key={matched[key]}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell>
                                <Grid 
                                  container
                                  sx={{
                                    verticalAlign: 'middle'
                                  }}
                                >
                                  <Grid item md={1.5}>
                                    <img
                                      alt={key}
                                      src={
                                        "https://images.evetech.net/types/" +
                                        matched[key] +
                                        "/bp?size=32"
                                      }
                                      style={{
                                        width: "32px",
                                        height: "32px",
                                      }}
                                    />
                                  </Grid>
                                  <Grid item xl={0} lg={0.1} md={0.5} xs={1} />
                                  <Grid item md={8}>
                                    <Typography>{key}</Typography>
                                  </Grid>
                                </Grid>
                              </TableCell>
                              <TableCell align="right">
                                <Button
                                  variant="outlined"
                                  onClick={() => handleClick(matched[key], key)}
                                >
                                  设置蓝图研究
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={0} />
            <Grid item xs={12}>
              <Paper>
                <Typography
                  variant='h6'
                  sx={{
                    padding: '20px 20px 20px 20px'
                  }}
                >
                  我的蓝图
                </Typography>
                <Divider />
                {
                  myBp.exists ? (
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>名称</TableCell>
                            <TableCell align="right">材料效率</TableCell>
                            <TableCell align="right">时间效率</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {
                            Object.keys(myBp.content).map((key) => (
                              <TableRow key={key}>
                                <TableCell>
                                  <Grid container>
                                    <Grid item md={1}>
                                      <img
                                        alt={key + 'bp'}
                                        src={
                                          "https://images.evetech.net/types/" +
                                          myBp.content[key].bpid +
                                          "/bp?size=32"
                                        }
                                        style={{
                                          width: "32px",
                                          height: "32px",
                                        }}
                                      />
                                    </Grid>
                                    <Grid item md={8}>
                                      <Typography mt={0.5}>{ID2Name[myBp.content[key].bpid]}</Typography>
                                    </Grid>
                                  </Grid>
                                </TableCell>
                                <TableCell align="right">{myBp.content[key].mefficent}</TableCell>
                                <TableCell align="right">{myBp.content[key].tefficent}</TableCell>
                              </TableRow>
                            ))
                          }
                        </TableBody>
                      </Table>
                    </TableContainer>
                  ) : (
                    <>
                      <Grid
                        container
                        spacing={0}
                        sx={{
                          padding: '20px 20px 20px 20px'
                        }}
                      >
                        <Grid
                          item
                          xs={0}
                        >
                          <Avatar
                            src="noitem.svg"
                          />
                        </Grid>
                        <Grid
                          item
                          xs={8}
                        >
                          <Typography
                            variant='h6'
                            sx={{
                              paddingLeft: '20px',
                              margin: 'auto',
                              marginTop: '3px',
                              verticalAlign: 'center'
                            }}
                          >
                            空空如也~
                          </Typography>
                        </Grid>
                      </Grid> 
                    </>
                  )
                }
                
              </Paper>
            </Grid>
            <Grid item xs={0} md={7} />
          </Grid>
          {
            settingOpen && (
              <SetBlueprintInfoWindow
                bpInfo={bpInfo}
                settingOpen={settingOpen}
                setSettingOpen={setSettingOpen}
                updateBpList={updateBpList}
              />
            )
          }
        </>
      )}
    </>
  )
}

export default BlueprintsVaultPage
