import React from 'react'
import { Button, Grid, Paper, Typography, Divider, Avatar, TextField, Box, LinearProgress, Table, 
  TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

import getItemList from '../functions/GetItemList'
import getBlueprintList from '../functions/GetBlueprintList'
import getMatchedItem from '../functions/GetMatchedItem'
import blueprintDetail from '../functions/BlueprintDetail'

const ManufacturePage = () => {
  const [reqestSent, setRequestStat] = React.useState(false)
  const [isLoading, setLoading] = React.useState(true)
  const [isBpLoading, setLoadingBp] = React.useState(true)
  const [brief, setBrief] = React.useState({
    exists: false
  })
  const [matched, setMatched] = React.useState({})

  const handleClick = (id) => {
    console.log(blueprintDetail(id))
  }

  const handleChange = () => {
    if (document.getElementById('object').value.trim().replace(/[^\u4E00-\u9FA5]/g,'') !== '')
    {
      getMatchedItem(document.getElementById('object').value.trim().replace(/[^\u4E00-\u9FA5]/g,''), setMatched)
    }
    else
    {
      setMatched({})
    }
  }

  if (!reqestSent)
  {
    setRequestStat(true)
    getItemList(setLoading)
    getBlueprintList(setLoadingBp)
  }

  return (
    <>
      {
        isLoading || isBpLoading ? (
          <>
            <Box
              sx={{
                textAlign: 'center'
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
                width: '85vw',
                margin: 'auto',
                left: '0',
                right: '0',
                marginTop: '5vh'
              }}
            >
              <Grid
                item
                xs={0}
              />
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
                    添加生产计划
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
                        id='object'
                        fullWidth
                        label='请输入生产对象'
                        onChange={handleChange}
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
                        <Table aria-label="result">
                          <TableHead>
                            <TableRow>
                              <TableCell>名称</TableCell>
                              <TableCell align='right'>操作</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {
                              Object.keys(matched).map((key) => (
                                <TableRow
                                  key={matched[key]}
                                  sx={{
                                    '&:last-child td, &:last-child th': { border: 0 }
                                  }}
                                >
                                  <TableCell>
                                    <Grid
                                      container
                                    >
                                      <Grid 
                                        item
                                        md={1.5}
                                      >
                                        <img 
                                          // src={'icons/' + matched[key] + '_64.png'}
                                          src={'https://images.evetech.net/types/' + matched[key] + '/icon?size=32'}
                                          style={{
                                            width: '32px',
                                            height: '32px'
                                          }}
                                        />
                                      </Grid>
                                      <Grid 
                                        item
                                        md={8}
                                      >
                                        <Typography
                                          mt={0.5}
                                        >
                                          {key}
                                        </Typography>
                                      </Grid>
                                    </Grid>
                                  </TableCell>
                                  <TableCell align='right'>
                                    <Button variant='outlined' onClick={() => handleClick(matched[key])}>
                                      创建简报
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
                xs={0}
              />
              <Grid
                item
                xs={0}
              />
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
                    简报
                  </Typography>
                  <Divider />
                  {
                    brief.exists ? (
                      <>
                        <TableContainer>
                          <Table aria-label="result">
                            <TableHead>
                              <TableRow>
                                <TableCell>名称</TableCell>
                                <TableCell align='right'>自制</TableCell>
                                <TableCell align='right'>需求数量</TableCell>
                                <TableCell align='right'>生产/购买数量</TableCell>
                                <TableCell align='right'>操作</TableCell>
                              </TableRow>
                            </TableHead>
                          </Table>
                        </TableContainer>
                      </>
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
              <Grid
                item
                xs={0}
              />
            </Grid>
          </>
        )
      }
    </>
  )
}

export default ManufacturePage