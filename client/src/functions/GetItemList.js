const getItemList = (setLoading) => {
  var storage = window.localStorage

  fetch('api/data/itemlist/version')
    .then(response => response.json())
    .then((dat) => {
      if(storage['itemListVersion'] === undefined || storage['itemListVersion'] !== dat.version)
      {
        fetch('api/data/itemlist')
        .then(response => response.json())
        .then((data) => {
          storage['itemListVersion'] = data.version
          storage['itemList'] = JSON.stringify(data.payload)
          setLoading(false)
        })
      }
      else
      {
        setLoading(false)
      }
    })
}

export default getItemList