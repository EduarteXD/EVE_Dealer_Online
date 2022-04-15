const getStructureRigs = (setLoading) => {
  var storage = window.localStorage

  fetch('api/data/structurerigs/version')
    .then(response => response.json())
    .then((dat) => {
      if (storage['structureRigsVersion'] === undefined || storage['structureRigsVersion'] !== dat.version) {
        fetch('api/data/structurerigs')
          .then(response => response.json())
          .then((data) => {
            storage['structureRigsVersion'] = data.version
            storage['structureRigs'] = JSON.stringify(data.payload)
            setLoading(false)
          })
      }
      else {
        setLoading(false)
      }
    })
}

export default getStructureRigs