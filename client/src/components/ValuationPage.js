import React from 'react'
import { Box, LinearProgress } from '@mui/material'
import resolveMarket from '../functions/ResolveEsiMarket'

const ValuationPage = (hooks) => {
  const [requestSent, setRequestStat] = React.useState(false)
  const [isLoading, setLoading] = React.useState(true)
  const [marketData, setMarketData] = React.useState({})

  var storage = window.localStorage

  if (!requestSent)
  {
    setRequestStat(true)
    fetch('https://esi.evepc.163.com/latest/markets/prices/?datasource=serenity')
    .then(response => response.json())
    .then((data) => {
      setMarketData(data)
      resolveMarket(data)
    })

    fetch('api/data/itemlist/version')
    .then(response => response.json())
    .then((dat) => {
      if(storage['itemListVersion'] === undefined || storage['itemListVersion'] !== dat.version)
      {
        fetch('api/data/itemlist')
        .then(response => response.json())
        .then((data) => {
          storage['itemListVersion'] = data.version
          storage['itemList'] = JSON.stringify(data.payload)
          setLoading(false)
        })
      }
      else
      {
        setLoading(false)
      }
    })
  }

  return (
    <>
      {
        isLoading ? (
          <>
            <Box
              sx={{
                textAlign: 'center'
              }}
            >
              <LinearProgress />
            </Box>
          </>
        ) : (
          <>

          </>
        )
      }
    </>
  )
}

export default ValuationPage