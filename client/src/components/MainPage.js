import React, { useEffect } from 'react'
import LoginPage from './LoginPage'
import BackgroundFrame from './BackgroundFrame'

const MainPage = (hooks) => {
  const [requestSent, setRequest] = React.useState(false)
  const [loggedIn, setUserStat] = React.useState(false)
  const [completed, setCompleted] = React.useState(false)
  
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
        setCompleted(true)
      }
      else{
        hooks.setAppStat(
          {
            requestSent: hooks.appStat.requestSent,
            isLoading: false
          }
        )
        setCompleted(true)
      }
    })
    .catch((err) => {
      console.warn(err)
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
        completed && (
          loggedIn ? (
            <BackgroundFrame />
          ) : (
            <LoginPage
              setUserStat={setUserStat}
            />
          )
        )
      }
    </>
  )
}

export default MainPage