import React from 'react'
import { Box, Typography } from '@mui/material'

import './App.css'

import LoadingPage from './components/LoadingPage'
import MainPage from './components/MainPage'

const App = () => {
  const [loadFail, setFail] = React.useState(false)
  const [appStat, setAppStat] = React.useState({
    requestSent: false,
    isLoading: true
  })

  const boxClass = appStat.isLoading ? 'basket' : 'basket hide'

  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          bottom: '30px',
          left: '30px',
          zIndex: '1000'
        }}
      >
        <Typography
          sx={{
            opacity: '0.2',
            color: 'gray'
          }}
        >
          dev build @20220416#0
        </Typography>
      </Box>
      <MainPage
        setAppStat={setAppStat}
        appStat={appStat}
        setFail={setFail}
      />
      <Box
        className={boxClass}
      >
        <LoadingPage 
          loadFail={loadFail} 
        />
      </Box>
    </>
  )
}

export default App;