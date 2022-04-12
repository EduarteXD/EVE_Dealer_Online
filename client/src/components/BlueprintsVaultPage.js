import React from 'react'
import { Divider, Grid, Typography, Paper, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Button, Box, LinearProgress } from '@mui/material'

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
  const [bpInfo, setbpInfo] = React.useState({
    id: 4311,
    name: '龙卷风级蓝图'
  })

  const handleChange = () => {
    if (document.getElementById('object').value.trim().replace(/[^\u4E00-\u9FA5]/g,'') !== '') {
      getMatchedBlueprints(document.getElementById('object').value.trim().replace(/[^\u4E00-\u9FA5]/g,''), setMatched)
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
    getBlueprintList(setBpLoading)
    getItemList(setItemLoading)
    getIdToName(setID2NameLoading)
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
              marginTop: "5vh",
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
                  添加蓝图
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
                                <Grid container>
                                  <Grid item md={1.5}>
                                    <img
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
                                    <Typography mt={0.5}>{key}</Typography>
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
          </Grid>
          {
            settingOpen && (
              <SetBlueprintInfoWindow
                bpInfo={bpInfo}
                settingOpen={settingOpen}
                setSettingOpen={setSettingOpen}
              />
            )
          }
        </>
      )}
    </>
  )
}

export default BlueprintsVaultPage
