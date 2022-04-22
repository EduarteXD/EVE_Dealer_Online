import React from 'react'
import { TableRow, TableCell, Grid, Typography, Button } from '@mui/material'

const ReactTableRow = (hooks) => {
  const renderName = (name, depth) => {
    var prefix = '|—\xa0'
    for (var i = depth; i > 0; i--) {
      prefix = '\xa0\xa0\xa0\xa0\xa0' + prefix
    }
    return prefix + name
  }

  const handleDivide = (key) => {
    // console.log(hooks.data)
    var newMat = []
    for (var i in hooks.data.materials) {
      if (i <= key) {
        newMat[i] = hooks.data.materials[i]
      }
    }
    for (i = 1; i <= hooks.data.materials[key].resolve.materials.length; i++) {
      newMat[parseInt(key) + i] = hooks.data.materials[key].resolve.materials[i - 1]
      newMat[parseInt(key) + i].quantity *= Math.ceil(newMat[key].quantity / newMat[key].resolve.perProcess)
    }
    for (i; i + parseInt(key) < hooks.data.materials.length + hooks.data.materials[key].resolve.materials.length; i++) {
      newMat[parseInt(key) + i] = hooks.data.materials[parseInt(key) + i - hooks.data.materials[key].resolve.materials.length]
    }
    hooks.handleUpdate(newMat, hooks.pos)
    newMat[key].toBuy = false
    // console.log(newMat)
  }

  return (
    <>
      <TableRow
        key={hooks.data.id}
        sx={{
          background: '#f2f2f2'
        }}
      >
        <TableCell>
          <Grid
            container
          >
            <Grid
              item
              md={0.5}
            >
              <img
                alt={hooks.data.id}
                src={'https://images.evetech.net/types/' + hooks.data.id + '/icon?size=32'}
                style={{
                  width: '32px',
                  height: '32px'
                }}
              />
            </Grid>
            <Grid
              item
              xl={1}
              lg={2}
              md={3}
              xs={0}
            />
            <Grid
              item
              md={6}
            >
              <Typography
                mt={0.6}
              >
                {hooks.data.name}
              </Typography>
            </Grid>
          </Grid>
        </TableCell>
        <TableCell align='right'>{hooks.data.quantity} 流程</TableCell>
        <TableCell align='right'>{hooks.data.quantity} 流程</TableCell>
        <TableCell align='right'></TableCell>
      </TableRow>
      {
        Object.keys(hooks.data.materials).map((key) => (
          <TableRow
            key={key.toString() + hooks.data.materials[key].id}
          >
            <TableCell>
              <Grid
                container
              >
                <Grid
                  item
                  md={0.5}
                >
                  <img
                    alt={hooks.data.materials[key].id}
                    src={'https://images.evetech.net/types/' + hooks.data.materials[key].id + '/icon?size=32'}
                    style={{
                      width: '32px',
                      height: '32px'
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xl={1}
                  lg={2}
                  md={3}
                  xs={0}
                />
                <Grid
                  item
                  md={6}
                >
                  <Typography
                    mt={0.6}
                  >
                    {renderName(hooks.data.materials[key].name, hooks.data.materials[key].depth)}
                  </Typography>
                </Grid>
              </Grid>
            </TableCell>
            <TableCell align='right'>{hooks.data.quantity * hooks.data.materials[key].quantity}</TableCell>
            <TableCell align='right'>{hooks.data.quantity * hooks.data.materials[key].quantity}</TableCell>
            <TableCell align='right'>
                {
                  hooks.data.materials[key].dividable && (
                    hooks.data.materials[key].toBuy ? (
                      <Button
                        variant='outlined'
                        onClick={() => handleDivide(key)}
                      >
                        反应
                      </Button>
                    ) : (
                      <Button
                        variant='outlined'
                      >
                        撤销
                      </Button>
                    )
                  )
                }
            </TableCell>
          </TableRow>
        ))
      }
    </>
  )
}

export default ReactTableRow