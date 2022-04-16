import React from 'react'
import { Card, Grid, CardContent, CardMedia, Typography, CardActionArea } from '@mui/material'

const FacilityCard = (hooks) => {
  return (
    <>
      <Grid
        item
        md={3}
        xs={12}
      >
        <Card>
          <CardActionArea>
            <CardMedia
              component='img'
              height='250'
              image={'https://images.evetech.net/types/' + hooks.typeID + '/render?size=512'}
            />
            <CardContent>
              <Typography
                gutterBottom
                variant='h5'
              >
                {hooks.name}
              </Typography>
              {
                Object.keys(hooks.rigs).map((key) => (
                  <Typography
                    key={key}
                    variant='body1'
                    color="text.secondary"
                  >
                    · {hooks.rigs[key].rigName}
                  </Typography>
                ))
              }
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </>
  )
}

export default FacilityCard