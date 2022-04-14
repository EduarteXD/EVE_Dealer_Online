/**
 * @description Fetch the idToName data into local storage, Should only be used in a PAGE
 * @param setLoading: the hook which controls loading page display
 */
 const getIdToGroup = (setLoading) => {
  var storage = window.localStorage

  fetch('api/data/idtogroup/version')
    .then(response => response.json())
    .then((dat) => {
      if(storage['ID2GroupVersion'] === undefined || storage['ID2GroupVersion'] !== dat.version)
      {
        fetch('api/data/idtogroup')
        .then(response => response.json())
        .then((data) => {
          storage['ID2GroupVersion'] = data.version
          storage['ID2Group'] = JSON.stringify(data.payload)
          setLoading(false)
        })
      }
      else
      {
        setLoading(false)
      }
    })
}

export default getIdToGroup