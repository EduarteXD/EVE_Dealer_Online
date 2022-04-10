import React from 'react'
import { Grid, Card, Typography, Divider, Avatar, IconButton, Box, Tooltip, Button } from '@mui/material'
import { SupervisedUserCircleOutlined, HowToRegOutlined } from '@mui/icons-material'

const WelcomePage = (hooks) => {
  if (hooks.userInfo.rule !== undefined)
  {
    return (
      <>
        <Grid
          container 
          spacing={2}
          sx={{
            width: '85vw',
            margin: 'auto',
            left: '0',
            right: '0',
            marginTop: '5vh'
          }}
        >
          <Grid
            item
            md={12}
            sm={11.5}
          >
            <Typography 
              variant='h4'
              sx={{
                padding: '20px 20px 20px 20px',
                textAlign: 'center'
              }}
            >
              欢迎使用: EVE商人助手Online!
            </Typography>
          </Grid>
          <Grid
              item
              md={8}
              sm={11.5}
              xs={11.5}
          >
            <Card>
              <Typography 
                variant='h6'
                sx={{
                  padding: '20px 20px 20px 20px'
                }}
              >
                估算收入
              </Typography>
              <Divider />
              <Grid
                container
                spacing={1}
                sx={{
                  padding: '15px 15px 15px 15px'
                }}
              >
                <Grid
                  item
                  md={4}
                  sm={6}
                  xs={6}
                >
                  <Box>
                    <Typography>
                      今日累计
                    </Typography>
                    <Typography>
                      ...ISK
                    </Typography>
                  </Box>
                </Grid>
                <Grid
                  item
                  md={4}
                  sm={6}
                  xs={6}
                >
                  <Box>
                    <Typography>
                      最近7日
                    </Typography>
                    <Typography>
                      ...ISK
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
              <Box
                sx={{
                  padding: '5px 5px 5px 5px'
                }}
              >
                <Button
                  variant="text"
                >
                  查看报告
                </Button>
              </Box>
            </Card>
          </Grid>
          <Grid
            item
            md={4}
            sm={11.5}
            xs={11.5}
          >
            <Card>
              <Typography 
                variant='h6'
                sx={{
                  padding: '20px 20px 20px 20px'
                }}
              >
                账号状态
              </Typography>
              <Divider />
              <Grid
                container
                spacing={1}
                sx={{
                  padding: '15px 15px 15px 15px'
                }}
              >
                <Grid
                  item
                  md={6}
                  sx={{
                    textAlign: 'center'
                  }}
                >
                  <Tooltip title={'版本：' + hooks.userInfo.rule}>
                    <IconButton>
                      {
                        hooks.userInfo.rule === 'SUPER' && (
                          <SupervisedUserCircleOutlined
                            fontSize='large'
                          />
                        )
                      }
                      {
                        hooks.userInfo.rule === 'USER' && (
                          <HowToRegOutlined
                            fontSize='large'
                          />
                        )
                      }
                    </IconButton>
                  </Tooltip>
                </Grid>
                <Grid
                  item
                  md={6}
                  sx={{
                    textAlign: 'center'
                  }}
                >
                  <Typography>
                    到期时间
                  </Typography>
                  <Typography>
                    Unlimited
                  </Typography>
                </Grid>
              </Grid>
              <Box
                sx={{
                  padding: '5px 5px 5px 5px'
                }}
              >
                <Button
                  variant="text"
                >
                  续费管理
                </Button>
              </Box>
            </Card>
          </Grid>
          <Grid
            item
            md={6}
            sm={11.5}
            xs={11.5}
          >
            <Card>
              <Typography 
                variant='h6'
                sx={{
                  padding: '20px 20px 20px 20px'
                }}
              >
                角色管理
              </Typography>
              <Divider />
              <Box
                sx={{
                  padding: '5px 5px 5px 5px'
                }}
              >
                <Tooltip title='详情'>
                  <IconButton>
                    <Avatar src='https://image.evepc.163.com/Character/93800049_64.jpg' />
                  </IconButton>
                </Tooltip>
                <Tooltip title='添加'>
                  <IconButton>
                    <Avatar>
                      +
                    </Avatar>
                  </IconButton>
                </Tooltip>
              </Box>
            </Card>
          </Grid>
          <Grid
              item
              md={6}
              sm={11.5}
              xs={11.5}
            >
            <Card>
              <Typography 
                variant='h6'
                sx={{
                  padding: '20px 20px 20px 20px'
                }}
              >
                TODO List
              </Typography>
              <Divider />
              
            </Card>
          </Grid>
        </Grid>
      </>
    )
  }
}

export default WelcomePage