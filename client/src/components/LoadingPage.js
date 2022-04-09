import React from 'react'
import { LinearProgress, Paper, Box } from '@mui/material'

import './LoadingPage.css'

const LoadingPage = () => {
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
        <LinearProgress />
        <Box
          sx={{
            border:'solid',
            width: '30vw',
            height: '30vh',
            margin: 'auto',
            marginTop: '35vh',
            left: '0',
            right: '0'

          }}
        >
          Here should be a logo
          <br />
          EVE Dealer Online preAlpha 1.0.0
        </Box>
      </Paper>
    </>
  )
}

export default LoadingPage