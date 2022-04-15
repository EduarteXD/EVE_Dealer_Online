import React from 'react'
import { Box, LinearProgress } from '@mui/material'

import EmptyBackground from './widgets/EmptyFacilityBackground'
import AddFacilityWindow from './widgets/AddFacilityWindow'
import getItemList from '../functions/GetItemList'

const FacilityManagePage = () => {
  const [isLoading, setLoading] = React.useState(true)
  const [nameToId, setnameToId] = React.useState()
  const [requestSent, setReqStat] = React.useState(false)

  if (!requestSent) {
    setReqStat(true)
    setLoading(false)
  }
  return (
    <>
      {
        isLoading ? (
          <>
            <Box
              sx={{
                textAlign: "center",
              }}
            >
              <LinearProgress />
            </Box>
          </>
        ) : (
          <>
            <EmptyBackground />
            <AddFacilityWindow />
          </>
        )
      }
    </>
  )
}

export default FacilityManagePage