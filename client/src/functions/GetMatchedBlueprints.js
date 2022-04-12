const getMatchedBlueprints = (inputed, setMatched) => {
  // var re = new RegExp(inputed)
  var storage = window.localStorage
  var nameToID = JSON.parse(storage['itemList'])
  var idToName = JSON.parse(storage['ID2Name'])
  var blueprints = JSON.parse(storage['blueprintList'])
  var result ={}
  for (var name in nameToID) {
    var str = name
    if (str.search(inputed) >= 0) {
      if (blueprints[nameToID[name]] !== undefined) {
        // result[name] = nameToID[name]
        result[idToName[blueprints[nameToID[name]].bp]] = blueprints[nameToID[name]].bp
        /*
        if (str.search('版') < 0) {
          if (blueprints[nameToID[name]].mt[0].typeID !== nameToID[name]) {
            result[name] = nameToID[name]
          }
        }
        */
      }
    }
  }
  setMatched(result)
  // console.log(result)
}

export default getMatchedBlueprints