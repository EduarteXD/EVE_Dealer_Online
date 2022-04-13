const getMatchedBlueprints = (inputed, setMatched, idToName, blueprints, nameToID) => {
  var result ={}
  var count = 0
  for (var name in nameToID) {
    if (count < 20) {
      var str = name
      if (str.search(inputed) >= 0) {
        if (blueprints[nameToID[name]] !== undefined) {
          result[idToName[blueprints[nameToID[name]].bp]] = blueprints[nameToID[name]].bp
          count++
        }
      }
    }
  }
  setMatched(result)
}

export default getMatchedBlueprints