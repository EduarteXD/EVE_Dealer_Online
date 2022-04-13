/**
 * calc the overall material efficency bonuses
 * @param blueprintME blueprint material efficency bonuses in percent
 * @param structureME base structure material efficency bonuses in percent
 * @param structureRigTech structure rig tech level if doesn't have a rig, give 0
 * @param StructureRigSecMod the security level of the area of the structure, 0 for HSec, 1 for LSec and 2 for NSec or WSpace
 */
const getBonuses = (bluepringME, structureME, structureRigTech, secLevel) => {
  var StructureRigSecMod = [1, 1.9, 2.1]
  var structureRigME = [0, 2, 2.4]
  var totME = (100 - bluepringME) / 100 * (100 - structureME) / 100 * 
    (100 - (structureRigME[structureRigTech] * StructureRigSecMod[secLevel])) / 100
  return totME
}

/**
 * calc the material requirement after applying all material reduction factor
 * @param baseCount base material requirement per process
 * @param processCount total process count = ⌈ total need / product count per process ⌉
 * @param itemID itemID
 * @param blueprintsData all of the blueprints in vault {bpid: {me, te}, ...}
 * @param itemToBp map of item id : blueprint id
 * @param itemToGroup map of item id : group id
 * @param structureStatics all of the data of structure groups {structureGroupID: {me, te}, ...}
 */
const calcMaterialRequirement = (baseCount, processCount, itemID, blueprintsData, itemToBp, itemToGroup, structureStatics) => {
  var structureData = {
    35825: { me: 1.0, te: 15.0, name: "莱塔卢", size: 'm' },
    35826: { me: 1.0, te: 20.0, name: "阿兹贝尔", size: 'l' },
    35827: { me: 1.0, te: 30.0, name: "索迪约", size: 'xl' },
    35832: { me: 0, te: 0, name: "空堡", size: 'm' },
    35833: { me: 0, te: 0, name: "铁壁", size: 'l' },
    35834: { me: 0, te: 0, name: "星城", size: 'xl' },
    35835: { me: 0, te: 0, name: "阿塔诺", size: 'm' },
    35836: { me: 0, te: 0, name: "塔塔拉", size: 'l' },
    40340: { me: 0, te: 0, name: "昇威豪华星城", size: 'xl' },
    47512: { me: 0, te: 10.0, name: "\"莫罗\"铁壁", size: 'l' },
    47513: { me: 0, te: 0, name: "\"德拉库斯\"铁壁", size: 'l' },
    47514: { me: 0, te: 0, name: "\"地平线\"铁壁", size: 'l' },
    47515: { me: 0, te: 0, name: "\"马金尼斯\"铁壁", size: 'l' },
    47516: { me: 0, te: 0, name: "\"普罗米修斯\"铁壁", size: 'l' }
  }
  
  var blueprintID = itemToBp[itemID].bp
  var blueprintGroup = itemToGroup[itemID]
  var blueprintME = blueprintsData[blueprintID].me
  var structureID = structureData[blueprintGroup].structureTypeID
  var structureME = structureStatics[structureID].me
  var structureRigTech = structureData[blueprintGroup].rigTech
  var secLevel = structureData[blueprintGroup].secLevel
  bonus = getBonuses(blueprintME, structureME, structureRigTech, secLevel)
  return Math.max(processCount, Math.ceil((baseCount * bonus * processCount / 100).toFixed(2)))
}

export default calcMaterialRequirement