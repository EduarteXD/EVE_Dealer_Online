import React from 'react'
import { Button, Grid, Paper, Typography, Divider, Avatar, TextField } from '@mui/material'

const ManufacturePage = () => {
  const [lineCount, setCount] = React.useState(0)

  return (
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
                lg={3}
                md={4}
                sm={12}
              >
                <Typography
                  sx={{
                    paddingBottom: '10px'
                  }}
                >
                  生产对象
                </Typography>
                <TextField
                  id='object'
                  label='请输入生产对象'
                />
              </Grid>
              <Grid
                item
                md={4}
                sm={12}
              >
                <Typography
                  sx={{
                    paddingBottom: '10px'
                  }}
                >
                  计算依赖
                </Typography>
                <Button 
                  variant='outlined'
                  
                >
                  生成简报
                </Button>
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
              lineCount === 0 ? (
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
              ) : (
                <>
                
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

export default ManufacturePage