const reactDetail = (itemID, reacts, ID2Name, count) => {
  const calc = (itemID, depth) => {
    if (itemID in reacts) {
      var formula = reacts[itemID]
      var resolvedItems = []
      var i = 0
      for (var key in formula.mt) {
        var resolve = calc(formula.mt[key].typeID, depth + 1)
        resolvedItems[i] = {
          id: formula.mt[key].typeID,
          depth: depth,
          name: ID2Name[formula.mt[key].typeID],
          quantity: formula.mt[key].quantity,
          toBuy: true,
          dividable: 'materials' in resolve,
          resolve: resolve
        }
        i++
      }
      var result = {
        id: itemID,
        name: ID2Name[itemID],
        quantity: count,
        formulaID: formula.bp,
        perProcess: formula.pq,
        materials: resolvedItems
      }
      return result
    }
    else {
      return {}
    }
  }

  var result = calc(itemID, 0)
  // console.log(result)
  // result = updateMaterialRequirement(result, 0, result.materials.length, result.formulaID, count)
  return result
}

export default reactDetail