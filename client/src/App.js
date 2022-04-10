import React from 'react'
import { Box } from '@mui/material'

import './App.css'

import LoadingPage from './components/LoadingPage'
import MainPage from './components/MainPage'

const App = () => {
  const [appStat, setAppStat] = React.useState({
    requestSent: false,
    isLoading: true
  })

  const boxClass = appStat.isLoading ? 'basket' : 'basket hide'

  return (
    <>
      <MainPage
        setAppStat={setAppStat}
        appStat={appStat}
      />
      <Box
        className={boxClass}
      >
        <LoadingPage />
      </Box>
    </>
  )
}

export default App;