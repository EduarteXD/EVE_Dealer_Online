const getItemGroup = (setLoading) => {
  var storage = window.localStorage

  fetch('api/data/itemgroup/version')
    .then(response => response.json())
    .then((dat) => {
      if (storage['itemgroupVersion'] === undefined || storage['itemgroupVersion'] !== dat.version) {
        fetch('api/data/itemgroup')
          .then(response => response.json())
          .then((data) => {
            storage['itemgroupVersion'] = data.version
            storage['itemgroup'] = JSON.stringify(data.payload)
            setLoading(false)
          })
      }
      else {
        setLoading(false)
      }
    })
}

export default getItemGroup