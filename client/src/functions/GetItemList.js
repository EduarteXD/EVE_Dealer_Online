/**
 * @description Fetch the item list into local storage, Should only be used in a PAGE
 * @param setLoading: the hook which controls loading page display
 */
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