const blueprintDetail = (itemID, updateMaterialRequirement, blueprints, ID2Name, count) => {
  const calc = (itemID, depth) => {
    if (itemID in blueprints) {
      var blueprint = blueprints[itemID]
      var resolvedItems = []
      var i = 0
      for (var key in blueprint.mt) {
        var resolve = calc(blueprint.mt[key].typeID, depth + 1)
        resolvedItems[i] = {
          id: blueprint.mt[key].typeID,
          depth: depth,
          name: ID2Name[blueprint.mt[key].typeID],
          quantity: blueprint.mt[key].quantity,
          toBuy: true,
          dividable: 'materials' in resolve,
          resolve: resolve
        }
        i++
      }
      var result = {
        id: itemID,
        name: ID2Name[itemID],
        blueprintID: blueprint.bp,
        perProcess: blueprint.pq,
        materials: resolvedItems
      }
      return result
    }
    else
    {
      return {}
    }
  }

  var result = calc(itemID, 0)
  result = updateMaterialRequirement(result, 0, result.materials.length, result.blueprintID, count)
  return result
}

export default blueprintDetail