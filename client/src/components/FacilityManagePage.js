import React from 'react'
import { Box, LinearProgress } from '@mui/material'

import EmptyBackground from './widgets/EmptyFacilityBackground'
import AddFacilityWindow from './widgets/AddFacilityWindow'

import getStructureRigs from '../functions/GetStructureRigs'

const FacilityManagePage = () => {
  const [isRigListLoading, setRigListLoading] = React.useState(true)
  const [requestSent, setReqStat] = React.useState(false)
  const [rigsList, setRigsList] = React.useState({})
  const [addFacilityWindowOpen, setAddFacilityWindowOpen] = React.useState(false)

  if (!requestSent) {
    setReqStat(true)
    getStructureRigs((stat) => {
      setRigListLoading(stat)
      if (!stat) {
        setRigsList(JSON.parse(window.localStorage['structureRigs']))
      }
    })
  }

  return (
    <>
      {
        isRigListLoading ? (
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
            <EmptyBackground 
              setAddFacilityWindowOpen={setAddFacilityWindowOpen}
            />
            {
              addFacilityWindowOpen && (
                <AddFacilityWindow 
                  rigsList={rigsList}
                  setAddFacilityWindowOpen={setAddFacilityWindowOpen}
                />
              )
            }
          </>
        )
      }
    </>
  )
}

export default FacilityManagePage