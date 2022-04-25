import React from 'react'
import { Paper, Grid, Typography, Avatar, Divider, Box, IconButton, Tooltip } from '@mui/material'

const AboutPage = () => {
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
          <Paper
            sx={{
              textAlign: 'center'
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
                  margin: 'auto',
                  left: '0',
                  right: '0'
                }}
                src='logo.svg'
              />
            </Box>
            <Divider
              sx={{
                width: '60vw',
                margin: 'auto',
                left: '0',
                right: '0'
              }}
            />
            <Box
              sx={{
                padding: '20px 20px 15px 20px'
              }}
            >
              <Typography>
                EVE小助手 Online dev build @20220423#0
              </Typography>
            </Box>
            <Box
              sx={{
                padding: '0 20px 15px 20px'
              }}
            >
              <Typography
                variant='h6'
              >
                1 Contributor(s):
              </Typography>
            </Box>
            <Box
              sx={{
                padding: '0 20px 20px 20px',
                width: '60vw',
                margin: 'auto',
                left: '0',
                right: '0'
              }}
            >
              <Tooltip title="Eduarte">
                <IconButton onClick={() => window.location.replace('https://go.oxdl.cn/aF')}>
                  <Avatar 
                    src='https://q1.qlogo.cn/g?b=qq&nk=2054315307&s=640' 
                    sx={{
                      margin: 'auto',
                      left: '0',
                      right: '0'
                    }}
                  />
                </IconButton>
              </Tooltip>
            </Box>
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

export default AboutPage