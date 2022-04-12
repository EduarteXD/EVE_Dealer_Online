const getMatchedItem = (inputed, setMatched) => {
  // var re = new RegExp(inputed)
  var storage = window.localStorage
  var nameToID = JSON.parse(storage['itemList'])
  var blueprints = JSON.parse(storage['blueprintList'])
  var result ={}
  for (var name in nameToID) {
    var str = name
    if (/*re.search(nameToID[name])*/str.search(inputed) >= 0) {
      // console.log(nameToID[name])
      // console.log(blueprints[nameToID[name]])
      if (blueprints[nameToID[name]] !== undefined) {
        if (str.search('版') < 0) {
          if (blueprints[nameToID[name]].mt[0].typeID !== nameToID[name]) {
            result[name] = nameToID[name]
          }
        }
      }
    }
  }
  setMatched(result)
  // console.log(result)
}

export default getMatchedItem