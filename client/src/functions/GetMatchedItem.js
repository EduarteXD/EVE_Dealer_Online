const getMatchedItem = (inputed, setMatched, nameToID, blueprints) => {
  var storage = window.localStorage
  // var nameToID = JSON.parse(storage['itemList'])
  // var blueprints = JSON.parse(storage['blueprintList'])
  var result ={}
  var count = 0
  for (var name in nameToID) {
    var str = name
    if (count < 20) {
      if (str.search(inputed) >= 0) {
        if (blueprints[nameToID[name]] !== undefined) {
          if (str.search('版') < 0) {
            if (blueprints[nameToID[name]].mt[0].typeID !== nameToID[name]) {
              result[name] = nameToID[name]
              count++
            }
          }
        }
      }
    }
  }
  setMatched(result)
}

export default getMatchedItem