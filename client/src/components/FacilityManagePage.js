import React from 'react'
import { Box, LinearProgress, Grid, Button, Divider, Paper, Typography } from '@mui/material'

import EmptyBackground from './widgets/EmptyFacilityBackground'
import AddFacilityWindow from './widgets/AddFacilityWindow'
import FacilityCard from './widgets/FacilityCard'

import getStructureRigs from '../functions/GetStructureRigs'

const FacilityManagePage = () => {
  const [isRigListLoading, setRigListLoading] = React.useState(true)
  const [requestSent, setReqStat] = React.useState(false)
  const [rigsList, setRigsList] = React.useState({})
  const [addFacilityWindowOpen, setAddFacilityWindowOpen] = React.useState(false)
  const [structureList, setStructureList] = React.useState()

  if (!requestSent) {
    setReqStat(true)
    getStructureRigs((stat) => {
      setRigListLoading(stat)
      if (!stat) {
        setRigsList(JSON.parse(window.localStorage['structureRigs']))
      }
    })
    fetch('api/structures/query')
      .then((response) => response.json())
      .then((data) => {
        if (data[0] !== undefined) {
          var flist = []
          for (var key in data) {
            flist[parseInt(key)] = JSON.parse(data[key].data)
          }
          setStructureList(flist)
        }
        else {
          setStructureList(undefined)
        }
      })
  }

  const updateStructureList = () => {
    fetch('api/structures/query')
      .then((response) => response.json())
      .then((data) => {
        if (data[0] !== undefined) {
          var flist = []
          for (var key in data) {
            flist[parseInt(key)] = JSON.parse(data[key].data)
          }
          setStructureList(flist)
        }
        else {
          setStructureList(undefined)
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
            {
              structureList !== undefined ? (
                <>
                  <Grid
                    container
                    spacing={2}
                    sx={{
                      width: '75vw',
                      margin: 'auto',
                      left: '0',
                      right: '0',
                      marginTop: '10vh'
                    }}
                  >
                    {
                      structureList.map((key) => (
                        <FacilityCard
                          key={key.name}
                          rigs={key.rigs}
                          typeID={key.typeID}
                          name={key.name}
                        />
                      ))
                    }
                    <Grid
                      item
                      md={3}
                      xs={12}
                    >
                      <Paper>
                        <Typography
                          variant='h6'
                          sx={{
                            padding: '20px 20px 20px 20px'
                          }}
                        >
                          添加建筑
                        </Typography>
                        <Divider />
                        <Box
                          sx={{
                            padding: '20px 20px 20px 20px'
                          }}
                        >
                          <Button
                            variant='outlined'
                            onClick={() => setAddFacilityWindowOpen(true)}
                          >
                            添加
                          </Button>
                        </Box>
                      </Paper>
                    </Grid>
                  </Grid>
                </>
              ) : (
                <EmptyBackground
                  setAddFacilityWindowOpen={setAddFacilityWindowOpen}
                />
              )
            }
            {
              addFacilityWindowOpen && (
                <AddFacilityWindow
                  rigsList={rigsList}
                  setAddFacilityWindowOpen={setAddFacilityWindowOpen}
                  updateStructureList={updateStructureList}
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