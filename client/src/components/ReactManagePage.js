import React from 'react'
import {
  Box, Paper, Grid, LinearProgress, Typography, Divider, TextField, TableContainer,
  Table, TableHead, TableBody, TableRow, TableCell, Button
} from '@mui/material'

import getMatchedReacts from '../functions/GetMatchedReacts'
import getItemList from '../functions/GetItemList'
import getIdToName from '../functions/GetIdToName'
import getReactions from '../functions/GetReactions'
import reactDetail from '../functions/ReactDetail'

import ReactTableRow from './widgets/ReacTableRow'
import SetProcessCountWindow from './widgets/SetProcessCountWindow'

const ReactManagePage = () => {
  const [isItemListLoading, setItemListLoading] = React.useState(true)
  const [isIdToNameLoading, setIdToNameLoading] = React.useState(true)
  const [isReactionLoading, setReactionLoading] = React.useState(true)
  const [showSettingWindow, setSettingWindow] = React.useState(false)
  const [requestSent, setReqStat] = React.useState(false)
  const [toProduce, setToProduce] = React.useState({})
  const [matched, setMatched] = React.useState({})
  const [reacts, setReacts] = React.useState({})
  const [nameToId, setNameToId] = React.useState({})
  const [idToName, setIdToName] = React.useState({})
  const [toReact, setToReact] = React.useState([])

  if (!requestSent) {
    setReqStat(true)
    getItemList((stat) => {
      setItemListLoading(stat)
      if (!stat) {
        setNameToId(JSON.parse(window.localStorage['itemList']))
      }
    })
    getIdToName((stat) => {
      setIdToNameLoading(stat)
      if (!stat) {
        setIdToName(JSON.parse(window.localStorage['ID2Name']))
      }
    })
    getReactions((stat) => {
      setReactionLoading(stat)
      if (!stat) {
        setReacts(JSON.parse(window.localStorage['reactions']))
      }
    })
  }

  const handleChange = () => {
    if (document.getElementById('prodName').value.trim().replace(/[^\u4E00-\u9FA5]/g, '') !== '') {
      getMatchedReacts(document.getElementById('prodName').value.trim().replace(/[^\u4E00-\u9FA5]/g, ''),
        setMatched, nameToId, reacts, idToName)
    }
    else {
      setMatched({})
    }
  }

  const handleSubmit = (count) => {
    var current = toReact
    current.push(reactDetail(toProduce.id, reacts, idToName, count))
    console.log(current)
    setToReact([...current])
    document.getElementById('prodName').value=''
    handleChange()
  }

  const handleAdd = (id) => {
    setToProduce({
      name: idToName[id],
      id: id,
      count: 1
    })
    setSettingWindow(true)
  }

  return (
    <>
      {
        isItemListLoading || isIdToNameLoading || isReactionLoading ? (
          <Box
            sx={{
              textAlign: 'center'
            }}
          >
            <LinearProgress />
          </Box>
        ) : (
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
            <Grid
              item
              xs={12}
            >
              <Paper>
                <Typography
                  variant='h6'
                  sx={{
                    padding: '20px 20px 20px 20px'
                  }}
                >
                  添加反应规划
                </Typography>
                <Divider />
                <Grid
                  container
                  spacing={2}
                  sx={{
                    padding: '20px 20px 20px 20px'
                  }}
                >
                  <Grid
                    item
                    md={4}
                    xs={12}
                  >
                    <TextField
                      fullWidth
                      label='输入产品名称'
                      onChange={handleChange}
                      id='prodName'
                    />
                  </Grid>
                  <Grid
                    item
                    md={8}
                    xs={12}
                  >
                    <TableContainer
                      component={Paper}
                    >
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>
                              名称
                            </TableCell>
                            <TableCell
                              align='right'
                            >
                              操作
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {
                            Object.keys(matched).map((key) => (
                              <TableRow
                                key={matched[key]}
                              >
                                <TableCell>
                                  <Grid
                                    container
                                    sx={{
                                      verticalAlign: 'middle'
                                    }}
                                  >
                                    <Grid
                                      item
                                      md={1.5}
                                    >
                                      <img
                                        alt={key}
                                        src={'https://images.evetech.net/types/' + matched[key] + '/icon?size=32'}
                                        style={{
                                          width: '32px',
                                          height: '32px'
                                        }}
                                      />
                                    </Grid>
                                    <Grid
                                      item
                                      xl={0}
                                      lg={0.1}
                                      md={0.5}
                                      xs={1}
                                    />
                                    <Grid
                                      item
                                      md={8}
                                    >
                                      <Typography>
                                        {key}
                                      </Typography>
                                    </Grid>
                                  </Grid>
                                </TableCell>
                                <TableCell
                                  align='right'
                                >
                                  <Button
                                    variant='outlined'
                                    onClick={() => handleAdd(matched[key])}
                                  >
                                    添加到规划
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))
                          }
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid
              item
              xs={12}
            >
              <Paper>
                <Typography
                  variant='h6'
                  sx={{
                    padding: '20px 20px 20px 20px'
                  }}
                >
                  用料
                </Typography>
                <Divider />
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>名称</TableCell>
                        <TableCell align='right'>需求数量</TableCell>
                        <TableCell align='right'>生成数量</TableCell>
                        <TableCell align='right'>操作</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {
                        Object.keys(toReact).map((key) => (
                          <ReactTableRow 
                            key={key}
                            data={toReact[key]}
                          />
                        ))
                      }
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
          </Grid>
        )
      }
      {
        showSettingWindow && (
          <SetProcessCountWindow 
            toProduce={toProduce}
            setToProduce={setToProduce}
            setSettingWindow={setSettingWindow}
            showSettingWindow={showSettingWindow}
            handleSubmit={handleSubmit}
          />
        )
      }
    </>
  )
}

export default ReactManagePage