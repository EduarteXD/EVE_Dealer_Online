import React from 'react'
import { Box } from '@mui/material'

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
          position: 'absolute',
          top: '80px',
          right: '30px',
          zIndex: '1000'
        }}
      >
        dev build @20220411#5
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