import React from 'react'
import { Box, Card, Paper, Grid, LinearProgress, Typography, Divider, TextField, TableContainer, 
  Table, TableHead, TableBody, TableRow, TableCell, Button } from '@mui/material'

import getMatchedReacts from '../functions/GetMatchedReacts'

const ReactManagePage = (hooks) => {
  const [isLoading, setLoadingStat] = React.useState(true)

  if (isLoading) {
    setLoadingStat(false)
  }

  return (
    <>
      {
        isLoading ? (
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
            sx={{
              width: "85vw",
              margin: "auto",
              left: "0",
              right: "0",
              marginTop: "5vh"
            }}
          >
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
                  spacing={1}
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
                          <TableRow>
                            <TableCell>
                              这里是名称
                            </TableCell>
                            <TableCell
                              align='right'
                            >
                              <Button
                                variant='outlined'
                              >
                                添加到规划
                              </Button>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        )
      }
    </>
  )
}

export default ReactManagePage