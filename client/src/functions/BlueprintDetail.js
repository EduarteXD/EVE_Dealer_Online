const blueprintDetail = (itemID) => {
  var storage = window.localStorage
  var blueprints = JSON.parse(storage['blueprintList'])
  var ID2Name = JSON.parse(storage['ID2Name'])
  /*
    result = {
      materials: [
          {
            id: id, 
            quantity: quantity, <- per process
            toBuy: true,
            dividable: false,
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
      var resolve = blueprintDetail(blueprint.mt[key].typeID)
      resolvedItems[i] = {
        id: blueprint.mt[key].typeID,
        name: ID2Name[blueprint.mt[key].typeID],
        quantity: blueprint.mt[key].quantity,
        toBuy: true,
        dividable: 'materials' in resolve,
        resolve: resolve
      }
      i++
    }
    var result = {
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

export default blueprintDetail