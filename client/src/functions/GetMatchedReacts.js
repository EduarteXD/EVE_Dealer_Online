const getMatchedReacts = (inputed, setMatched, nameToID, reacts, idToName) => {
  var result ={}
  var count = 0
  for (var name in nameToID) {
    if (count < 20) {
      var str = name
      if (str.search(inputed) >= 0) {
        if (reacts[nameToID[name]] !== undefined) {
          console.log(name)
          result[name] = nameToID[name]
          count++
        }
      }
    }
  }
  setMatched(result)
}

export default getMatchedReacts