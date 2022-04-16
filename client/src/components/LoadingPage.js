import React from 'react'
import { LinearProgress, Paper, Box, Avatar, Typography, Button } from '@mui/material'

import './LoadingPage.css'

const LoadingPage = (hooks) => {
  return (
    <>
      <Paper 
        elevation={0}
        sx={{
          width: '100vw',
          height: '100vh',
          position: 'absolute',
          top: '0',
          zIndex: '999'
        }}
      >
        {
          !hooks.loadFail && (
            <LinearProgress />
          )
        }
        <Box
          sx={{
            width: '90vw',
            margin: 'auto',
            marginTop: '20vh',
            left: '0',
            right: '0',
            textAlign: 'center'
          }}
        >
          <Avatar
            src='loading_anime.svg'
            sx={{ 
              width: 192, 
              height: 192,
              margin: 'auto',
              left: '0',
              right: '0'
            }}
          />
          {
            !hooks.loadFail && (
              <Typography 
                variant='h6'
                sx={{
                  padding: '20px 20px 20px 20px'
                }}
              >
                加载中
              </Typography>
            )
          }
        </Box>
        {
          hooks.loadFail && (
            <Box
              sx={{
                width: '40vw',
                margin: 'auto',
                left: '0',
                right: '0',
                textAlign: 'center',
                paddingTop: '40px'
              }}
            >
              <Button
                variant="outlined"
                onClick={() => window.location.reload()}
              >
                刷新
              </Button>
              <Typography
                sx={{
                  padding: '10px 10px 10px 10px'
                }}
              >
                ::后端服务器加载失败::
              </Typography>
            </Box>
          )
        }
      </Paper>
    </>
  )
}

export default LoadingPage