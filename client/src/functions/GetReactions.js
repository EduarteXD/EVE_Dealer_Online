const getReactions = (setLoading) => {
  var storage = window.localStorage

  fetch('api/data/reactions/version')
    .then(response => response.json())
    .then((dat) => {
      if(storage['reactionsVersion'] === undefined || storage['reactionsVersion'] !== dat.version)
      {
        fetch('api/data/reactions')
        .then(response => response.json())
        .then((data) => {
          storage['reactionsVersion'] = data.version
          storage['reactions'] = JSON.stringify(data.payload)
          setLoading(false)
        })
      }
      else
      {
        setLoading(false)
      }
    })
}

export default getReactions