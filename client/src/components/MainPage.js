import React from 'react'
import { Collapse } from '@mui/material'
import LoginPage from './LoginPage'
import BackgroundFrame from './BackgroundFrame'

const MainPage = (hooks) => {
  const [requestSent, setRequest] = React.useState(false)
  const [loggedIn, setUserStat] = React.useState(false)
  
  const getData = () => {
    fetch('api/user')
    .then((response) => response.json())
    .then((data) => {
      if (data.login){
        setUserStat(true)
        hooks.setAppStat(
          {
            requestSent: hooks.appStat.requestSent,
            isLoading: false
          }
        )
      }
      else{
        hooks.setAppStat(
          {
            requestSent: hooks.appStat.requestSent,
            isLoading: false
          }
        )
      }
    })
    .catch((err) => {
      // console.warn(err)
      hooks.setFail(true)
    })
  }

  if (!requestSent)
  {
    setRequest(true)
    getData()
  }

  return (
    <>
      {
        loggedIn ? (
          <BackgroundFrame />
        ) : (
          <LoginPage
            setUserStat={setUserStat}
          />
        )
      }
    </>
  )
}

export default MainPage