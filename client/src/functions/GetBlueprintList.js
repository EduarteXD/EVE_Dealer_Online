/**
 * @description Fetch the blueprints data into local storage, Should only be used in a PAGE
 * @param setLoading: the hook which controls loading page display
 */
 const getBlueprintList = (setLoading) => {
  var storage = window.localStorage

  fetch('api/data/blueprints/version')
    .then(response => response.json())
    .then((dat) => {
      if(storage['blueprintListVersion'] === undefined || storage['blueprintListVersion'] !== dat.version)
      {
        fetch('api/data/blueprints')
        .then(response => response.json())
        .then((data) => {
          storage['blueprintListVersion'] = data.version
          storage['blueprintList'] = JSON.stringify(data.payload)
          setLoading(false)
        })
      }
      else
      {
        setLoading(false)
      }
    })
}

export default getBlueprintList