import React from 'react'
import { AppBar, Box, Toolbar, IconButton, Typography, Badge, Tooltip, Avatar, Drawer,
   List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material'
import { Menu, NotificationsNoneOutlined, HomeOutlined, AutorenewOutlined, LocalOfferOutlined } from '@mui/icons-material'

const Frame = () => {

  const [page, setPage] = React.useState(0)
  const [notifyCount, setNotifyCount] = React.useState(0)
  const [drawerStat, setDrawer] = React.useState(false)

  const toggleDrawer = (stat) => {
    setDrawer(stat)
  }

  const title = ['Welcome aboard!']

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
        >
          <Toolbar>
            <Tooltip title="菜单">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ 
                mr: 2 
              }}
              onClick={() => toggleDrawer(true)}
            >
              <Menu />
            </IconButton>
            </Tooltip>
            <Typography 
              variant="h6" 
              component="div"
            >
              {title[page]}
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Box>
              <Tooltip title="通知">
                <IconButton
                  size="large"
                  edge="end"
                  color="inherit"
                  aria-label="menu"
                  sx={{ 
                    mr: 3
                  }}
                >
                  <Badge badgeContent={notifyCount} color="error">
                    <NotificationsNoneOutlined />
                  </Badge>
                </IconButton>
              </Tooltip>
              <Tooltip title="用户信息">
                <IconButton>
                  <Avatar alt="Avatar" src="https://ixnet.icu/avatar/" />
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer
          anchor="left"
          open={drawerStat}
          onClose={() => toggleDrawer(false)}
        >
          <Box 
            sx={{
              width: {
                xs: '80vw',
                md: '15vw'
              }
            }}
          >
            <List>
              <ListItem button key="main">
                <ListItemIcon>
                  <HomeOutlined />
                </ListItemIcon>
                <ListItemText primary="主页" />
              </ListItem>
              <Divider />
              <ListItem button key="refine">
                <ListItemIcon>
                  <AutorenewOutlined />
                </ListItemIcon>
                <ListItemText primary="化矿计算器" />
              </ListItem>
              <ListItem button key="store">
                <ListItemIcon>
                  <LocalOfferOutlined />
                </ListItemIcon>
                <ListItemText primary="库存管理" />
              </ListItem>
            </List>
          </Box>
        </Drawer>
      </Box>
    </>
  )
}

export default Frame