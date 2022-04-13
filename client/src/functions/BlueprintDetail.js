const blueprintDetail = (itemID) => {
  /*
    result = {
      materials: [
          {
            id: id, 
            quantity: quantity, <- per process
            toBuy: true,
            dividable: false,
            depth: 0,
            resolve: {}
          },
          {
            id: id, 
            toBuy: true
            dividable: true,
            resolve: {
              materials: [
                {
                  id: id, 
                  quantity: quantity,
                  toBuy: true,
                  dividable: false,
                  depth: 1,
                  resolve: {}
                }
              ],
              blueprintID: id,
              perProcess: perProcessMade,
              name: name
            }
          }
      ],
      blueprintID: id,
      perProcess: perProcessMade,
      name: name
    }
  */
  var storage = window.localStorage
  var blueprints = JSON.parse(storage['blueprintList'])
  var ID2Name = JSON.parse(storage['ID2Name'])
  
  const calc = (itemID, depth) => {
    // console.log(blueprints)
    if (itemID in blueprints) {
      var blueprint = blueprints[itemID]
      // console.log(blueprint)
      var resolvedItems = []
      /*
        for (var key in blueprint.mt)
        {
          resolvedItem[key] = blueprintDetail(blueprint.mt.typeID, blueprint.mt.quantity)
        }
      */
      var i = 0
      for (var key in blueprint.mt)
      {
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
  return result
}

export default blueprintDetail