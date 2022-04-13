import React from 'react'
import { Box, Paper, Typography, Divider } from '@mui/material'

const ShowTotValue = (hooks) => {
  return (
    <>
      <Box
        sx={{
          zIndex: '999',
          position: 'fixed',
          margin: 'auto',
          right: '50px',
          top: '70px'
        }}
      >
        <Paper
          elevation={3}
        >
          <Typography
            sx={{
              padding: '10px 20px 10px 20px'
            }}
          >
            当前预期制造成本：
          </Typography>
          <Divider />
          <Typography
            sx={{
              padding: '10px 20px 5px 20px'
            }}
          >
            {hooks.val} 星币
          </Typography>
        </Paper>
      </Box>
    </>
  )
}

export default ShowTotValue