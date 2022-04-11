import React from 'react'
import { Box, LinearProgress, TextField, Grid, Card, Divider, Typography, Button, Table,
  TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar } from '@mui/material'
import resolveMarket from '../functions/ResolveEsiMarket'
import resolveClipboard from '../functions/ResolveClipboard'
import getItemList from '../functions/GetItemList'

const ValuationPage = (hooks) => {
  const [requestSent, setRequestStat] = React.useState(false)
  const [haveResult, setResult] = React.useState(false)
  const [isLoading, setLoading] = React.useState(true)
  const [result, setData] = React.useState({})

  if (!requestSent)
  {
    setRequestStat(true)
    if (!hooks.marketRequested)
    {
      fetch('https://esi.evepc.163.com/latest/markets/prices/?datasource=serenity')
      .then(response => response.json())
      .then((data) => {
        // setMarketData(data)
        hooks.setMarketData(resolveMarket(data))
        hooks.setMarketRequest(true)
      })
  
    }
    getItemList(setLoading)
  }

  const handleCalc = () => {
    setResult(false)
    // console.log(resolveClipboard(document.getElementById('contract').value, marketData))
    setData(resolveClipboard(document.getElementById('contract').value, hooks.marketData))
    // console.log(result)
    setResult(true)
    document.getElementById('contract').value = ''
  }

  return (
    <>
      {
        isLoading ? (
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
                md={4}
                sm={11.5}
                xs={11.5}
              >
                <Card>
                  <Typography
                    variant='h6'
                    sx={{
                      padding: '15px 15px 15px 15px'
                    }}
                  >
                    粘贴合同内容
                  </Typography>
                  <Divider />
                  <Grid
                    container
                    spacing={2}
                    sx={{
                      padding: '20px 0 20px 0'
                    }}
                  >
                    <Grid
                      item
                      xs={0.5}
                    />
                    <Grid
                      item
                      xs={11}
                    >
                      <TextField
                      id='contract'
                      label='合同内容'
                      multiline
                      fullWidth
                      minRows={4}
                      maxRows={12}
                    />
                    </Grid>
                    <Grid
                      item
                      xs={0.5}
                    />
                  </Grid>
                  <Box
                    sx={{
                      padding: '0 20px 20px 20px'
                    }}
                  >
                    <Button 
                      variant="contained"
                      onClick={handleCalc}
                    >
                      计算
                    </Button>
                    <Button 
                      variant="outlined"
                      sx={{
                        marginLeft: '15px'
                      }}
                      onClick={() => {
                        document.getElementById('contract').value = ''
                      }}
                    >
                      清除
                    </Button>
                  </Box>
                </Card>
              </Grid>
              <Grid
                item
                md={8}
                sm={11.5}
                xs={11.5}
              >
                <Card>
                  <Typography
                    variant='h6'
                    sx={{
                      padding: '15px 15px 15px 15px'
                    }}
                  >
                    估价
                  </Typography>
                  <Divider />
                  {
                    haveResult ? (
                      <>
                        <TableContainer
                          component={Paper}
                        >
                          <Table aria-label="result">
                            <TableHead>
                              <TableRow>
                                <TableCell>项目</TableCell>
                                <TableCell align="right">数量</TableCell>
                                <TableCell align="right">总价(成交均价)</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {
                                Object.keys(result).map((key) => (
                                  <TableRow
                                    key={result[key].name}
                                    sx={{
                                      '&:last-child td, &:last-child th': { border: 0 }
                                    }}
                                  >
                                    <TableCell 
                                      component='th'
                                      scope='row'
                                    >
                                      <Grid
                                        container
                                      >
                                        {
                                          result[key].id !== undefined && (
                                            <Grid 
                                              item
                                              md={1}
                                            >
                                            <img
                                              src={'icons/' + result[key].id + '_64.png' }
                                              style={{
                                                width: '32px',
                                                height: '32px'
                                              }}
                                            />
                                            </Grid>
                                          )
                                        }
                                        <Grid 
                                          item
                                          md={8}
                                        >
                                          <Typography
                                            mt={0.5}
                                          >
                                            {result[key].name}
                                          </Typography>
                                        </Grid>
                                      </Grid>
                                    </TableCell>
                                    <TableCell align="right">{result[key].count}</TableCell>
                                    <TableCell align="right">{result[key].totValue}</TableCell>
                                  </TableRow>
                                ))
                              }
                             </TableBody>
                          </Table>
                        </TableContainer>
                      </>
                    ) : (
                      <>
                        <Grid
                          container
                        >
                          <Grid
                            item
                            md={1}
                          >
                            <Box
                              sx={{
                                padding: '20px 20px 20px 20px',
                              }}
                            >
                              <Avatar 
                                src="noitem.svg"
                              />
                            </Box>
                          </Grid>
                          <Grid
                            item
                            md={4}
                          >
                            <Box>
                              <Typography 
                                variant='h6'
                                sx={{
                                  padding: '20px 20px 20px 20px',
                                  margin: 'auto',
                                  marginTop: '3px',
                                  verticalAlign: 'center'
                                }}
                              >
                                这里没有东西喔
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </>
                    )
                  }
                </Card>
              </Grid>
            </Grid>
          </>
        )
      }
    </>
  )
}

export default ValuationPage