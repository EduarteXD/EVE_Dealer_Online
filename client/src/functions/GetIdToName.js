/**
 * @description Fetch the idToName data into local storage, Should only be used in a PAGE
 * @param setLoading: the hook which controls loading page display
 */
 const getIdToName = (setLoading) => {
  var storage = window.localStorage

  fetch('api/data/idtoname/version')
    .then(response => response.json())
    .then((dat) => {
      if(storage['ID2NameVersion'] === undefined || storage['ID2NameVersion'] !== dat.version)
      {
        fetch('api/data/idtoname')
        .then(response => response.json())
        .then((data) => {
          storage['ID2NameVersion'] = data.version
          storage['ID2Name'] = JSON.stringify(data.payload)
          setLoading(false)
        })
      }
      else
      {
        setLoading(false)
      }
    })
}

export default getIdToName