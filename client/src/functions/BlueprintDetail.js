var storage = window.localStorage
var blueprints = JSON.parse(storage['blueprintList']);

const blueprintDetail = (itemID) => {
  /*
    result = {
      materials: [
          {
            id: id, 
            quantity: quantity, <- per process
            toBuy: true,
            module: false,
            resolve: {}
          },
          {
            id: id, 
            toBuy: true
            module: true,
            resolve: {
              materials: [
                {
                  id: id, 
                  quantity: quantity,
                  toBuy: true,
                  resolve: {}
                }
              ],
              blueprintID: id
            }
          }
      ],
      blueprintID: id
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
        quantity: blueprint.mt[key].quantity,
        toBuy: true,
        module: 'materials' in resolve,
        resolve: resolve
      }
      i++
    }
    var result = {
      materials: resolvedItems,
      blueprintID: blueprint.bp
    }
    return result
  }
  else
  {
    return {}
  }
}

export default blueprintDetail