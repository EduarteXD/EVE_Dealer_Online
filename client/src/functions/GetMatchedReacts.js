const getMatchedReacts = (inputed, setMatched, idToName, reacts, nameToID) => {
  var result ={}
  var count = 0
  for (var name in nameToID) {
    if (count < 20) {
      var str = name
      if (str.search(inputed) >= 0) {
        if (reacts[nameToID[name]] !== undefined) {
          result[idToName[reacts[nameToID[name]].bp]] = reacts[nameToID[name]].bp
          count++
        }
      }
    }
  }
  setMatched(result)
}

export default getMatchedReacts