import React from "react"
import { Grid, Paper, Typography, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton,
  Tooltip, Snackbar } from "@mui/material"
import { ContentCopy } from '@mui/icons-material'

const PurchasingListPage = () => {
  const [msgOpen, setMsg] = React.useState(false)
  var brief = JSON.parse(window.sessionStorage['brief'])
  var market = JSON.parse(window.sessionStorage['EsiMarketData'])

  const copy = () => {
    var content = ''

    for (var key in brief) {
      content = content + brief[key].name + ' x' + brief[key].quantity + '\n'
    }

    navigator.clipboard.writeText(content)
    setMsg(true)
  }

  const format = (num) => {
    var reg=/\d{1,3}(?=(\d{3})+$)/g
    return (num + '').replace(reg, '$&,')
  }

  return (
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
                padding: "20px 20px 20px 20px"
              }}
            >
              采购清单&nbsp;
              <Tooltip title='复制采购清单'>
                <IconButton onClick={copy}>
                  <ContentCopy
                    fontSize='small'
                  />
                </IconButton>
              </Tooltip>
            </Typography>
            <Divider />
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>名称</TableCell>
                    <TableCell align="right">数量</TableCell>
                    <TableCell align="right">估价</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    Object.keys(brief).map((key) => (
                      <TableRow
                        key={key}
                      >
                        <TableCell>
                          <Grid container>
                            <Grid item md={1}>
                              <img
                                src={
                                  "https://images.evetech.net/types/" + brief[key].id + "/icon?size=32"
                                }
                                style={{
                                  width: "32px",
                                  height: "32px"
                                }}
                              />
                            </Grid>
                            <Grid item xl={1} lg={2} md={3} xs={0} />
                            <Grid item md={6}>
                              <Typography mt={0.6}>{brief[key].name}</Typography>
                            </Grid>
                          </Grid>
                        </TableCell>
                        <TableCell align="right">{format(brief[key].quantity)}</TableCell>
                        <TableCell align="right">{format(parseInt(brief[key].quantity * market[brief[key].id].avg))} 星币</TableCell>
                      </TableRow>
                    ))
                  }
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
        <Grid item xs={0} />
      </Grid>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        open={msgOpen}
        onClose={() => setMsg(false)}
        message="已复制"
        autoHideDuration={1000}
      />
    </>
  );
};

export default PurchasingListPage;
