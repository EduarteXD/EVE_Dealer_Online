import React from 'react'
import { Box } from '@mui/material'

import LoadingPage from './components/LoadingPage'
import MainPage from './components/MainPage'

const App = () => {
  const [appStat, setAppStat] = React.useState({
    requestSent: false,
    isLoading: true
  })

  return (
    <>
      <MainPage
        setAppStat={setAppStat}
        appStat={appStat}
      />
      {
        appStat.isLoading && (
          <>
            <LoadingPage />
          </>
        )
      }
    </>
  )
}

export default App;