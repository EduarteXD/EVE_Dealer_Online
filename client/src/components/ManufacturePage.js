import React from 'react'
import { Button, Grid, Paper, Typography, Divider, Avatar, TextField, Box, LinearProgress, Table, 
  TableBody, TableCell, TableContainer, TableHead, TableRow, Alert, IconButton, Collapse,
  FormControlLabel, FormGroup, Switch } from '@mui/material'
import { AccountTreeOutlined, Close } from '@mui/icons-material'
import ShowTotValue from './widgets/TotValueWindow'

import getItemList from '../functions/GetItemList'
import getBlueprintList from '../functions/GetBlueprintList'
import getMatchedItem from '../functions/GetMatchedItem'
import blueprintDetail from '../functions/BlueprintDetail'
import getIdToName from '../functions/GetIdToName'
import getEsiMarketData from '../functions/GetEsiMarketData'
import getIdToGroup from '../functions/GetIdToGroup'
import calcMaterialRequirement from '../functions/CalcMaterialRequirement'
import getItemGroup from '../functions/GetItemGroup'
import SetProcessCountWindow from './widgets/SetProcessCountWindow'

const ManufacturePage = (hooks) => {
  const [reqestSent, setRequestStat] = React.useState(false)
  const [isLoading, setLoading] = React.useState(true)
  const [isBpLoading, setLoadingBp] = React.useState(true)
  const [isId2NameLoading, setLoadingId2Name] = React.useState(true)
  const [isId2GroupLoading, setLoadingId2Group] = React.useState(true)
  const [isItemGroupLoading, setItemGroupLoading] = React.useState(true)
  const [isEsiMarketLoading, setEsiLoading] = React.useState(true)
  const [toProduce, setToProduce] = React.useState({})
  const [showSettingWindow, setSettingWindow] = React.useState(false)
  const [brief, setBrief] = React.useState({
    exists: false
  })
  const [matched, setMatched] = React.useState({})
  const [market, setMarketInfo] = React.useState(undefined)
  const [useLite, switchToLite] = React.useState(false)

  const [useFacility, setFacility] = React.useState(undefined)

  const [myBp, setMyBp] = React.useState({})
  const [idToName, setIdToName] = React.useState({})
  const [itemGroup, setItemGroup] = React.useState({})
  const [idToGroup, setIdToGroup] = React.useState({})
  const [nameToId, setNameToId] = React.useState({})
  const [blueprintList, setBlueprintList] = React.useState({})
  const [structureList, setStructureList] = React.useState()

  const [showWidget, setWidget] = React.useState(false)
  window.onscroll = () => {
    if (!showWidget && document.body.scrollTop + document.documentElement.scrollTop > 200) {
      setWidget(true)
    }
    else if (showWidget && document.body.scrollTop + document.documentElement.scrollTop <= 200)
    {
      setWidget(false)
    }
    if (!hooks.toTop && document.body.scrollTop + document.documentElement.scrollTop > 100) {
      hooks.setToTop(true)
    }
    else if (hooks.toTop && document.body.scrollTop + document.documentElement.scrollTop <= 100)
    {
      hooks.setToTop(false)
    }
  }

  const switchBrief = () => {
    switchToLite(!useLite)
  }

  const format = (num) => {
    var reg=/\d{1,3}(?=(\d{3})+$)/g
    return (num + '').replace(reg, '$&,')
  }

  const handleClick = (id) => {
    setToProduce({
      name: idToName[id],
      id: id, 
      count: 1
    })
    setSettingWindow(true)
  }


  /**
   * @description Setup the brief
   */
  const handleSubmit = (count) => {
    var id = toProduce.id
    // var count = toProduce.count
    // console.log(count)
    var detail = blueprintDetail(id, updateMaterialRequirement, blueprintList, idToName, count)
    detail.totVal = 0
    for (var key in detail.materials) {
      if (detail.materials[key].toBuy) {
        // console.log(idToName[detail.materials[key].id])
        // console.log(market[detail.materials[key].id])
        if (market[detail.materials[key].id] === undefined) {
          market[detail.materials[key].id] = {
            adj: NaN,
            avg: NaN
          }
        }
        var lineValue = market[detail.materials[key].id].avg * detail.materials[key].quantity
        if (!isNaN(lineValue)) {
          detail.totVal = parseInt(detail.totVal) + parseInt(lineValue)
        }
      }
    }
    setBrief({
      exists: true,
      content: detail
    })
    document.getElementById('object').value=''
    handleChange(false)
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }

  const updateMaterialRequirement = (content, start, end, bpID, count) => {
    // var bpID = content.blueprintID
    var temp = JSON.parse(JSON.stringify(content))
    for (var i = start; i < end; i++) {
      var result = calcMaterialRequirement(temp.materials[i].quantity, count, temp.id/*temp.materials[i].id*/, bpID, myBp, idToGroup, itemGroup, structureList)
      temp.materials[i].quantity = result.material
    }
    setFacility(result.facilityName)
    return temp
  }

  const renderName = (name, depth) => {
    var prefix = '|—\xa0'
    for (var i = depth; i > 0; i--) {
      prefix = '\xa0\xa0\xa0\xa0\xa0' + prefix
    }
    return prefix + name
  }

  const stepTwo = () => {
    var toBuy = {}
    for (var key in brief.content.materials) {
      if (brief.content.materials[key].toBuy)
      {
        if (toBuy[brief.content.materials[key].id] !== undefined) {
          toBuy[brief.content.materials[key].id].quantity += parseInt(brief.content.materials[key].quantity)
        }
        else {
          toBuy[brief.content.materials[key].id] = {
            name: brief.content.materials[key].name,
            quantity: parseInt(brief.content.materials[key].quantity),
            id: brief.content.materials[key].id
          }
        }
      }
    }
    window.sessionStorage['brief'] = JSON.stringify(toBuy)
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
    hooks.setPage(4)
  }

  /**
   * @description Divide a item into materials
   */
  const handleDivide = (key) => {
    brief.content.materials[key].toBuy = false
    var temp = JSON.parse(JSON.stringify(brief))
    var originEnd = Object.keys(brief.content.materials).length
    var insertLen = Object.keys(brief.content.materials[key].resolve.materials).length
    /* 
      Create a space to insert the materials needed to manufacture the item 
      In order to show the materials it need below it
      before:
        /-ItemA
        /-ItemB
      after:
        /-ItemA
        / /-{space to insert the material}
        / /-{space to insert the material}
        /-ItemB
    */
    for (var i = parseInt(key) + 1; i < parseInt(originEnd); i++) {
      temp.content.materials[parseInt(i) + parseInt(insertLen)] = brief.content.materials[i]
    }
    for (var j in brief.content.materials[key].resolve.materials) {
      var manuDetail = calcMaterialRequirement(brief.content.materials[key].resolve.materials[j].quantity, 
        Math.ceil(brief.content.materials[key].quantity / brief.content.materials[key].resolve.perProcess), 
        temp.content.materials[key].id, temp.content.materials[key].resolve.blueprintID, myBp, idToGroup, itemGroup, structureList)
      brief.content.materials[key].resolve.materials[j].quantity = manuDetail.material
      temp.content.materials[parseInt(key) + parseInt(j) + 1] = brief.content.materials[key].resolve.materials[j]
      // brief.content.materials[key].resolve.materials[j].quantity = brief.content.materials[key].resolve.materials[j].quantity * Math.ceil(brief.content.materials[key].quantity / brief.content.materials[key].resolve.perProcess)
      // temp.content.materials[parseInt(key) + parseInt(j) + 1] = brief.content.materials[key].resolve.materials[j]
      temp.content.materials[key].useFacility = manuDetail.facilityName
      // console.log(facilitiesInUse)
    }
    temp.content.totVal = 0
    for (let key in temp.content.materials) {
      if (!isNaN(market[temp.content.materials[key].id].avg) && temp.content.materials[key].toBuy) {
        temp.content.totVal += parseInt(market[temp.content.materials[key].id].avg * temp.content.materials[key].quantity)
      }
    }
    // console.log(temp)
    // console.log(insertLen)
    // temp.content = updateMaterialRequirement(temp.content, key + 1, key + 1 + insertLen, temp.content.materials[key].resolve.blueprintID)
    // console.log(temp)
    setBrief({...temp})
  }

  /**
   * @description Fold materials into a item 
   */
  const handleReject = (key) => {
    var temp = {
      exists: true,
      content: {
        materials: [],
        blueprintID: brief.content.blueprintID,
        id: brief.content.id,
        name: brief.content.name,
        totVal: 0,
        perProcess: brief.content.perProcess
      }
    }
    var start = parseInt(key) + 1
    var foldLevel = brief.content.materials[key].depth
    var toDelete = 0
    while (brief.content.materials[toDelete + start] !== undefined && 
      brief.content.materials[toDelete + start].depth > foldLevel) {
      toDelete++
    }
    for (let i = 0; i < start; i++)
    {
      temp.content.materials[i] = brief.content.materials[i]
    }
    for (let i = start; brief.content.materials[i] !== undefined; i++) {
      if (brief.content.materials[i + toDelete] !== undefined) {
        temp.content.materials[i] = brief.content.materials[i + toDelete]
      }
    }
    temp.content.materials[key].toBuy = true
    temp.content.totVal = 0
    for (let key in temp.content.materials) {
      if (!isNaN(market[temp.content.materials[key].id].avg) && temp.content.materials[key].toBuy) {
        temp.content.totVal += parseInt(market[temp.content.materials[key].id].avg * temp.content.materials[key].quantity)
      }
    }
    temp.content.materials[key].useFacility = undefined
    setBrief(temp)
  }

  const handleChange = (rstBrief=true) => {
    if (document.getElementById('object').value.trim().replace(/[^\u4E00-\u9FA5]/g,'') !== '') {
      getMatchedItem(document.getElementById('object').value.trim().replace(/[^\u4E00-\u9FA5]/g,''), setMatched, nameToId, blueprintList)
    }
    else {
      setMatched({})
    }
    if (rstBrief) {
      setBrief({
        exists: false
      })
    }
  }

  const updateBpList = () => {
    fetch('api/blueprint/query')
    .then((response) => response.json())
    .then((data) => {
      setMyBp({
        exists: true,
        content: data
      })
    })
    .catch((err) => {
      console.warn(err)
    })
  }

  if (!reqestSent)
  {
    setRequestStat(true)
    updateBpList()
    getIdToName((stat) => {
      setLoadingId2Name(stat)
      if (!stat) {
        setIdToName(JSON.parse(window.localStorage['ID2Name']))
      }
    })
    getItemList((stat) => {
      setLoading(stat)
      if (!stat) {
        setNameToId(JSON.parse(window.localStorage['itemList']))
      }
    })
    getBlueprintList((stat) => {
      setLoadingBp(stat)
      if (!stat) {
        setBlueprintList(JSON.parse(window.localStorage['blueprintList']))
      }
    })
    getEsiMarketData((stat) => {
      setEsiLoading(stat)
      if (!stat) {
        setMarketInfo(JSON.parse(window.sessionStorage['EsiMarketData']))
      }
    })
    getIdToGroup((stat) => {
      setLoadingId2Group(stat)
      if (!stat) {
        setIdToGroup(JSON.parse(window.localStorage['ID2Group']))
      }
    })
    getItemGroup((stat) => {
      setItemGroupLoading(stat)
      if (!stat) {
        setItemGroup(JSON.parse(window.localStorage['itemgroup']))
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

  return (
    <>
      {
        isLoading || isBpLoading || isId2NameLoading || isEsiMarketLoading || isId2GroupLoading || isItemGroupLoading ? (
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
            <Collapse in={hooks.indusAlert}>
              <Alert
                severity="info"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      hooks.setIndusAlert(false);
                    }}
                  >
                    <Close fontSize="inherit" />
                  </IconButton>
                }
              >
                你可以先前往蓝图管理界面设置你的蓝图时间 / 材料信息，如没有设置蓝图信息，则会按照默认无研究状态进行计算
              </Alert>
            </Collapse>
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
                xs={0}
              />
              <Grid
                item
                xs={12}
              >
                <Paper>
                  <Typography
                    variant='h6'
                    sx={{
                      padding: '20px 20px 20px 20px'
                    }}
                  >
                    添加生产计划
                  </Typography>
                  <Divider />
                  <Grid
                    container
                    spacing={2}
                    sx={{
                      padding: '20px 20px 20px 20px'
                    }}
                  >
                    <Grid
                      item
                      md={4}
                      xs={12}
                    >
                      <TextField
                        id='object'
                        fullWidth
                        label='请输入生产对象'
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid
                      item
                      md={8}
                      xs={12}
                    >
                      <TableContainer
                        component={Paper}
                      >
                        <Table aria-label="result">
                          <TableHead>
                            <TableRow>
                              <TableCell>名称</TableCell>
                              <TableCell align='right'>操作</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {
                              Object.keys(matched).map((key) => (
                                <TableRow
                                  key={matched[key]}
                                  sx={{
                                    '&:last-child td, &:last-child th': { border: 0 }
                                  }}
                                >
                                  <TableCell>
                                    <Grid
                                      container
                                      sx={{
                                        verticalAlign: 'middle'
                                      }}
                                    >
                                      <Grid 
                                        item
                                        md={1.5}
                                      >
                                        <img 
                                          alt={key}
                                          src={'https://images.evetech.net/types/' + matched[key] + '/icon?size=32'}
                                          style={{
                                            width: '32px',
                                            height: '32px'
                                          }}
                                        />
                                      </Grid>
                                      <Grid 
                                        item
                                        xl={0}
                                        lg={0.1}
                                        md={0.5}
                                        xs={1}
                                      />
                                      <Grid 
                                        item
                                        md={8}
                                      >
                                        <Typography>
                                          {key}
                                        </Typography>
                                      </Grid>
                                    </Grid>
                                  </TableCell>
                                  <TableCell align='right'>
                                    <Button variant='outlined' onClick={() => handleClick(matched[key])}>
                                      创建简报
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))
                            }
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              <Grid
                item
                xs={0}
              />
              <Grid
                item
                xs={0}
              />
              <Grid
                item
                xs={12}
              >
                <Paper>
                  <Typography
                    variant='h6'
                    sx={{
                      padding: '20px 20px 20px 20px'
                    }}
                  >
                    简报
                    <FormGroup>
                      <FormControlLabel control={<Switch onChange={switchBrief} />} label="精简模式" />
                    </FormGroup>
                  </Typography>
                  <Divider />
                  {
                    brief.exists ? (
                      <>
                        <TableContainer>
                          <Table aria-label="result">
                            <TableHead>
                              <TableRow>
                                <TableCell>名称</TableCell>
                                <TableCell align='right'>设施</TableCell>
                                {
                                  !useLite && (
                                    <>
                                      <TableCell align='right'>自制</TableCell>
                                      <TableCell align='right'>需求数量</TableCell>
                                    </>
                                  )
                                }
                                <TableCell align='right'>生产/购买数量</TableCell>
                                <TableCell align='right'>估价</TableCell>
                                <TableCell align='right'>操作</TableCell>
                              </TableRow>
                              <TableRow
                                /*
                                sx={{
                                  backgroundColor: '#f2f2f2'
                                }}
                                */
                              >
                                <TableCell>
                                  <Grid 
                                    container
                                    sx={{
                                      verticalAlign: 'middle'
                                    }}
                                  >
                                    <Grid 
                                      item
                                      md={1}
                                    >
                                      <img
                                        alt={brief.content.name}
                                        src={'https://images.evetech.net/types/' + brief.content.id + '/icon?size=32'}
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
                                      <Typography>
                                        {brief.content.name}
                                      </Typography>
                                    </Grid>
                                  </Grid>
                                </TableCell>
                                <TableCell align='right'>
                                  {useFacility !== undefined && (
                                    useFacility
                                  )}
                                </TableCell>
                                {
                                  !useLite && (
                                    <>
                                      <TableCell align='right'>是</TableCell>
                                      <TableCell align='right'>{toProduce.count}</TableCell>
                                    </>
                                  )
                                }
                                <TableCell align='right'>{toProduce.count}</TableCell>
                                <TableCell align='right'>{format(brief.content.totVal)} 星币</TableCell>
                                <TableCell align='right'></TableCell>
                              </TableRow>
                              </TableHead>
                              <TableBody>
                              {
                                Object.keys(brief.content.materials).map((key) => (
                                  <TableRow
                                    key={key}
                                    sx={
                                      brief.content.materials[key].toBuy ? {} : {backgroundColor: '#f2f2f2'}
                                    }
                                  >
                                    <TableCell>
                                      <Grid 
                                        container
                                      >
                                        <Grid 
                                          item
                                          md={1}
                                        >
                                          <img
                                            alt={brief.content.materials[key].name}
                                            src={'https://images.evetech.net/types/' + brief.content.materials[key].id + '/icon?size=32'}
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
                                            {renderName(brief.content.materials[key].name, brief.content.materials[key].depth)}
                                          </Typography>
                                        </Grid>
                                      </Grid>
                                    </TableCell>
                                    <TableCell align='right'>
                                      {brief.content.materials[key].useFacility !== undefined && (
                                        brief.content.materials[key].useFacility
                                      )}
                                    </TableCell>
                                    {
                                      !useLite && (
                                        <>
                                          <TableCell
                                            align='right'
                                          >
                                            {brief.content.materials[key].toBuy ? '否' : '是'}
                                          </TableCell>
                                          <TableCell
                                            align='right'
                                          >
                                            {format(brief.content.materials[key].quantity)}
                                          </TableCell>
                                        </>
                                      )
                                    }
                                    <TableCell
                                      align='right'
                                    >
                                      {
                                        brief.content.materials[key].toBuy ? (
                                          format(brief.content.materials[key].quantity)
                                        ) : (
                                          format(
                                            Math.ceil(brief.content.materials[key].quantity / brief.content.materials[key].resolve.perProcess) * brief.content.materials[key].resolve.perProcess
                                          )
                                        )
                                      }
                                    </TableCell>
                                    <TableCell
                                      align='right'
                                    >
                                      {
                                        brief.content.materials[key].toBuy ? (
                                          <>
                                            {
                                              !isNaN(market[brief.content.materials[key].id].avg) ? (
                                                format(
                                                  parseInt(
                                                    market[brief.content.materials[key].id].avg * brief.content.materials[key].quantity
                                                  )
                                                )
                                              ) : (
                                                <>
                                                  <Typography
                                                    sx={{
                                                      color: 'red'
                                                    }}
                                                  >
                                                    无报价
                                                  </Typography>
                                                </>
                                              )
                                            }
                                            {
                                              !isNaN(market[brief.content.materials[key].id].avg) && (
                                                <>
                                                  &nbsp;星币
                                                </>
                                              )
                                            }
                                          </>
                                        ) : (
                                          <>
                                            <AccountTreeOutlined
                                              sx={{
                                                opacity: 0.5
                                              }}
                                            />
                                          </>
                                        )
                                      }
                                    </TableCell>
                                    <TableCell
                                      align='right'
                                    >
                                      {
                                        brief.content.materials[key].dividable ? (
                                          brief.content.materials[key].toBuy ? (
                                            <>
                                              <Button variant='outlined' onClick={() => handleDivide(key)}>
                                                自制
                                              </Button>
                                            </>
                                          ) : (
                                            <>
                                              <Button variant='outlined' onClick={() => handleReject(key)}>
                                                撤销
                                              </Button>
                                            </>
                                        )) : (
                                          <></>
                                        )
                                      }
                                    </TableCell>
                                  </TableRow>
                                ))
                              }
                              <TableRow>
                                <TableCell></TableCell>
                                <TableCell align='right'></TableCell>
                                {
                                  !useLite && (
                                    <>
                                      <TableCell align='right'></TableCell>
                                      <TableCell align='right'></TableCell>
                                    </>
                                  )
                                }
                                <TableCell align='right'></TableCell>
                                <TableCell align='right'></TableCell>
                                <TableCell align='right'>
                                  <Button 
                                    variant='outlined' 
                                    onClick={() => stepTwo()}
                                  >
                                    下一步
                                  </Button>
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </>
                    ) : (
                      <>
                        <Grid
                          container
                          spacing={0}
                          sx={{
                            padding: '20px 20px 20px 20px'
                          }}
                        >
                          <Grid
                            item
                            xs={0}
                          >
                            <Avatar
                              src="noitem.svg"
                            />
                          </Grid>
                          <Grid
                            item
                            xs={8}
                          >
                            <Typography
                              variant='h6'
                              sx={{
                                paddingLeft: '20px',
                                margin: 'auto',
                                marginTop: '3px',
                                verticalAlign: 'center'
                              }}
                            >
                              空空如也~
                            </Typography>
                          </Grid>
                        </Grid>                      
                      </>
                    )
                  }
                </Paper>
              </Grid>
              <Grid
                item
                xs={0}
              />
            </Grid>
            {
              brief.exists && showWidget && (
                <ShowTotValue
                  val={format(brief.content.totVal)}
                />
              )
            }
            {
              showSettingWindow && (
                <SetProcessCountWindow 
                  toProduce={toProduce}
                  setToProduce={setToProduce}
                  setSettingWindow={setSettingWindow}
                  showSettingWindow={showSettingWindow}
                  handleSubmit={handleSubmit}
                />
              )
            }
          </>
        )
      }
    </>
  )
}

export default ManufacturePage