const getMatchedBlueprints = (inputed, setMatched, idToName, blueprints, nameToID) => {
  var result ={}
  for (var name in nameToID) {
    var str = name
    if (str.search(inputed) >= 0) {
      if (blueprints[nameToID[name]] !== undefined) {
        result[idToName[blueprints[nameToID[name]].bp]] = blueprints[nameToID[name]].bp
      }
    }
  }
  setMatched(result)
}

export default getMatchedBlueprints