import React from 'react'
import { Box, Avatar, Typography, Button } from '@mui/material'

const EmptyBackground = (hooks) => {
  return (
    <>
      <Box
        sx={{
          margin: 'auto',
          left: '0',
          right: '0',
          textAlign: 'center',
          marginTop: '25vh'
        }}
      >
        <Avatar
          src='empty_facility_list.svg'
          sx={{ 
            width: 192, 
            height: 192,
            margin: 'auto',
            left: '0',
            right: '0'
          }}
        />
        <Typography
          variant='h6'
          sx={{
            fontWeight: 'bold',
            padding: '20px 20px 20px 20px',
            color: '#cccccc',
            opacity: 0.8
          }}
        >
          没有东西哦
        </Typography>
        <Button
          variant='outlined'
          onClick={() => hooks.setAddFacilityWindowOpen(true)}
        >
          添加建筑
        </Button>
      </Box>
    </>
  )
}

export default EmptyBackground