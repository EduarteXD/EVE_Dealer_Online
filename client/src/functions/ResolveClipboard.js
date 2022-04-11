var storage = window.localStorage

const resolveClipboard = (data, marketData) => {
  var items = {}
  var nameToID = JSON.parse(storage['itemList'])
  data.trim().split('\n').forEach((val) => {
    var dat = val.trim().split(/\s/)
    var name = dat[0]
    var count = dat[1].replace(/,/g, "")
    /*
    if (dat[1] == 'I' || dat[1] == 'II'){
      name = dat[0] + ' ' + dat[1]
      count = dat[2]
    }
    */
    if (!isNaN(parseInt(dat[2].replace(/,/g, ""))))
    {
      name = dat[0] + ' ' + dat[1]
      count = dat[2].replace(/,/g, "")
    }
    var id = nameToID[name]
    if (items[id] === undefined)
    {
      items[id] = {
        count: 0,
        name: ''
      }
    }
    items[id].count = parseInt(count) + items[id].count
    items[id].name = name
    // console.log('装备：' + name + ' 数量：' + count + " id：" + id)
  })

  const format = (num) => {
    var reg=/\d{1,3}(?=(\d{3})+$)/g;
    return (num + '').replace(reg, '$&,');
  }

  var totCount = 0
  var totValue = 0
  for (var i in items)
  {
    totCount = totCount + items[i].count
    totValue = parseInt(marketData[i].avg * items[i].count) + totValue
    items[i].totValue = format(parseInt(marketData[i].avg * items[i].count))
    items[i].count = format(items[i].count)
    items[i].discount = 100
    items[i].id = i
    // console.log('id: ' + i + ' 装备：' + items[i].name + ' 数量：' + items[i].count + ' 总价：' + format(items[i].totValue))
  }
  items[0] = {
    totValue: format(totValue),
    count: format(totCount),
    name: '总计'
  }
  return items
}

export default resolveClipboard