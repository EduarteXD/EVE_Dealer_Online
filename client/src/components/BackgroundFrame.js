import React from 'react'
import { AppBar, Box, Toolbar, IconButton, Typography, Badge, Tooltip, Avatar, Drawer,
   List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material'
import { Menu, NotificationsNoneOutlined, HomeOutlined, PriceChangeOutlined, ConstructionOutlined,
  FactoryOutlined, InfoOutlined, ArchitectureOutlined, ScienceOutlined, LogoDev, ArrowCircleUp, 
  SettingsOutlined, ChangeCircleOutlined, Inventory2Outlined, ShowChartOutlined } from '@mui/icons-material'

import WelcomePage from './WelcomePage'
import ValuationPage from './ValuationPage'
import ManufacturePage from './ManufacturePage'
import PurchasingListPage from './PurchasingListPage'
import BlueprintsVaultPage from './BlueprintsVaultPage'

import AboutPage from './AboutPage'

import './BackgroundFrame.css'

const Frame = () => {
  const [page, setPage] = React.useState(0)
  const [notifyCount, setNotifyCount] = React.useState(0)
  const [drawerStat, setDrawer] = React.useState(false)
  const [reqSent, setReqStat] = React.useState(false)
  const [indusAlert, setIndusAlert] = React.useState(true)
  const [userInfo, setUserInfo] = React.useState({})
  const [toTop, setToTop] = React.useState(false)
  /*
  const [marketRequested, setMarketRequest] = React.useState(false)
  const [marketData, setMarketData] = React.useState({})
  */

  const changePage = (pageNum) => {
    if (pageNum === page)
    {
      return
    }
    setPage(pageNum)
    setDrawer(false)
  }

  const toggleDrawer = (stat) => {
    setDrawer(stat)
  }

  if (!reqSent)
  {
    setReqStat(true);
    fetch('api/user/info')
    .then(response => response.json())
    .then((data) => {
      setUserInfo(data)
    })
    .catch((err) => {
      console.warn(err)
    })
  }

  window.onscroll = () => {
    if (!toTop && document.body.scrollTop + document.documentElement.scrollTop > 100) {
      setToTop(true)
    }
    else if (toTop && document.body.scrollTop + document.documentElement.scrollTop <= 100)
    {
      setToTop(false)
    }
  }

  const gotoTop = () => {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }

  const title = ['Welcome aboard!', '物资估价', '蓝图管理', '生产管理', '采购清单', '反应管理']
  const titleEn = ['Welcome aboard!', 'Contract Evaluation', 'Blueprints Management', 
    'Industry Management', 'Purchasing List', 'React Management']

  if (userInfo.avatar !== undefined)
  {
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
                    <Avatar alt={userInfo.uname} src={"https://ixnet.icu/avatar/" + userInfo.avatar} />
                  </IconButton>
                </Tooltip>
              </Box>
            </Toolbar>
          </AppBar>
          {
            page === 0 && (
              <WelcomePage userInfo={userInfo} />
            )
          }
          {
            page === 1 && (
              <ValuationPage
                // marketData={marketData}
                // setMarketData={setMarketData}
                // marketRequested={marketRequested}
                // setMarketRequest={setMarketRequest}
              />
            )
          }
          {
            page === 2 && (
              <BlueprintsVaultPage />
            )
          }
          {
            page === 3 && (
              <ManufacturePage
                setPage={setPage}
                indusAlert={indusAlert}
                setIndusAlert={setIndusAlert}
              />
            )
          }
          {
            page === 4 && (
              <PurchasingListPage />
            )
          }
          {
            page === 99 && (
              <AboutPage />
            )
          }
          <Drawer
            anchor="left"
            open={drawerStat}
            onClose={() => toggleDrawer(false)}
          >
            <Box 
              sx={{
                width: {
                  xs: '73vw',
                  sm: '50vw',
                  md: '22vw',
                  lg: '20vw',
                  xl: '18vw'
                }
              }}
            >
              <List>
                <ListItem button key="main" onClick={() => changePage(0)}>
                  <ListItemIcon>
                    <HomeOutlined />
                  </ListItemIcon>
                  <ListItemText primary="主页" />
                </ListItem>
                <Divider />
                <ListItem button key="valuation" onClick={() => changePage(1)}>
                  <ListItemIcon>
                    <PriceChangeOutlined />
                  </ListItemIcon>
                  <ListItemText primary="物资估价" />
                </ListItem>
                <ListItem button key="blueprint" onClick={() => changePage(2)}>
                  <ListItemIcon>
                    <ArchitectureOutlined />
                  </ListItemIcon>
                  <ListItemText primary="蓝图管理" />
                  <ListItemIcon>
                    <ConstructionOutlined />
                  </ListItemIcon>
                </ListItem>
                <ListItem button key="facility" onClick={() => changePage(6)}>
                  <ListItemIcon>
                    <SettingsOutlined />
                  </ListItemIcon>
                  <ListItemText primary="设施管理" />
                  <ListItemIcon>
                    <LogoDev />
                  </ListItemIcon>
                </ListItem>
                <ListItem button key="industry" onClick={() => changePage(3)}>
                  <ListItemIcon>
                    <FactoryOutlined />
                  </ListItemIcon>
                  <ListItemText primary="生产管理" />
                  <ListItemIcon>
                    <ConstructionOutlined />
                  </ListItemIcon>
                </ListItem>
                <ListItem button key="react" onClick={() => changePage(5)}>
                  <ListItemIcon>
                    <ScienceOutlined />
                  </ListItemIcon>
                  <ListItemText primary="反应管理" />
                  <ListItemIcon>
                    <LogoDev />
                  </ListItemIcon>
                </ListItem>
                <ListItem button key="recycle" onClick={() => changePage(7)}>
                  <ListItemIcon>
                    <ChangeCircleOutlined />
                  </ListItemIcon>
                  <ListItemText primary="化矿回收" />
                  <ListItemIcon>
                    <LogoDev />
                  </ListItemIcon>
                </ListItem>
                <ListItem button key="inventory" onClick={() => changePage(8)}>
                  <ListItemIcon>
                    <Inventory2Outlined />
                  </ListItemIcon>
                  <ListItemText primary="库存管理" />
                  <ListItemIcon>
                    <LogoDev />
                  </ListItemIcon>
                </ListItem>
                <ListItem button key="market" onClick={() => changePage(8)}>
                  <ListItemIcon>
                    <ShowChartOutlined />
                  </ListItemIcon>
                  <ListItemText primary="市场信息" />
                  <ListItemIcon>
                    <LogoDev />
                  </ListItemIcon>
                </ListItem>
                <Divider />
                <ListItem button key="about" onClick={() => changePage(99)}>
                  <ListItemIcon>
                    <InfoOutlined />
                  </ListItemIcon>
                  <ListItemText primary="关于本软件" />
                </ListItem>
              </List>
            </Box>
          </Drawer>
        </Box>
        {
          toTop && (
            <Box
              sx={{
                position: 'fixed',
                bottom: '20px',
                right: '20px' 
              }}
            >
              <Tooltip title='返回顶部'>
                <IconButton
                  onClick={gotoTop}
                >
                    <ArrowCircleUp 
                      fontSize='large'
                    />
                </IconButton>
              </Tooltip>
            </Box>
          )
        }
        <Box 
          sx={{
            height: '20vh'
          }}
        />
      </>
    )
  }
}

export default Frame