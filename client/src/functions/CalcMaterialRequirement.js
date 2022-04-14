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

const getProperFacility = (facilityList, itemGroup, itemID, bluepringME, idToGroup) => {
  // console.log('fetching facility...')
  console.log('id: %s', itemID)
  console.log('Group: %s', idToGroup[itemID])
  console.log(itemGroup['basicComponents'][idToGroup[itemID]])
  // console.log(itemGroup)
  var structureData = {
    0: { me: 0.0, te: 0.0, name: "NPC空间站(默认)", size: 'xl'},
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

  var result = {
    default: true,
    facilityName: '',
    type: '',
    typeID: -1,
    me: 1
  }

  var typeSelector = { small: 512, medium: 256, large: 128, xlarge: 64, equipment: 32, 
    architect: 16, basicComponent: 8, advancedComponent: 4, drone: 2, ammunition: 1 }
  for (let i in facilityList) {
    let me = structureData[facilityList[i].typeID].me
    if (itemGroup['ships'][idToGroup[itemID]] !== undefined) {
      if (itemGroup['ships'][idToGroup[itemID]].size === 'xlarge' && structureData[facilityList[i].typeID].size === 'm') {
        continue
      }
      var shipType = 0
      if (itemGroup['ships'][idToGroup[itemID]].adv) {
        shipType += 1024
      }
      shipType += typeSelector[itemGroup['ships'][idToGroup[itemID]].size]
      for (let j in facilityList[i].rigs) {
        if ((facilityList[i].rigs[j].rigType & shipType) === shipType) {
          if (result.default || result.me > getBonuses(bluepringME, me, facilityList[i].rigs[j].rigTech, facilityList[i].sec)) {
            result.me = getBonuses(bluepringME, me, facilityList[i].rigs[j].rigTech, facilityList[i].sec)
            result.facilityName = facilityList[i].name
            result.type = structureData[facilityList[i].typeID].name
            result.typeID = facilityList[i].typeID
            break
          }
        }
      }
    }
    else if (itemGroup['equipments'][idToGroup[itemID]] !== undefined) {
      for (let j in facilityList[i].rigs) {
        if ((facilityList[i].rigs[j].rigType & typeSelector['equipment']) === typeSelector['equipment']) {
          if (result.default || result.me > getBonuses(bluepringME, me, facilityList[i].rigs[j].rigTech, facilityList[i].sec)) {
            result.me = getBonuses(bluepringME, me, facilityList[i].rigs[j].rigTech, facilityList[i].sec)
            result.facilityName = facilityList[i].name
            result.type = structureData[facilityList[i].typeID].name
            result.typeID = facilityList[i].typeID
            break
          }
        }
      }
    }
    else if (itemGroup['architectures'][idToGroup[itemID]] !== undefined) {
      for (let j in facilityList[i].rigs) {
        if ((facilityList[i].rigs[j].rigType & typeSelector['architect']) === typeSelector['architect']) {
          if (result.default || result.me > getBonuses(bluepringME, me, facilityList[i].rigs[j].rigTech, facilityList[i].sec)) {
            result.me = getBonuses(bluepringME, me, facilityList[i].rigs[j].rigTech, facilityList[i].sec)
            result.facilityName = facilityList[i].name
            result.type = structureData[facilityList[i].typeID].name
            result.typeID = facilityList[i].typeID
            break
          }
        }
      }
    }
    else if (itemGroup['basicComponents'][idToGroup[itemID]] !== undefined) {
      for (let j in facilityList[i].rigs) {
        if ((facilityList[i].rigs[j].rigType & typeSelector['basicComponent']) === typeSelector['basicComponent']) {
          if (result.default || result.me > getBonuses(bluepringME, me, facilityList[i].rigs[j].rigTech, facilityList[i].sec)) {
            result.me = getBonuses(bluepringME, me, facilityList[i].rigs[j].rigTech, facilityList[i].sec)
            result.facilityName = facilityList[i].name
            result.type = structureData[facilityList[i].typeID].name
            result.typeID = facilityList[i].typeID
            break
          }
        }
      }
    }
    else if (itemGroup['advancedComponents'][idToGroup[itemID]] !== undefined) {
      for (let j in facilityList[i].rigs) {
        if ((facilityList[i].rigs[j].rigType & typeSelector['advancedComponent']) === typeSelector['advancedComponent']) {
          if (result.default || result.me > getBonuses(bluepringME, me, facilityList[i].rigs[j].rigTech, facilityList[i].sec)) {
            result.me = getBonuses(bluepringME, me, facilityList[i].rigs[j].rigTech, facilityList[i].sec)
            result.facilityName = facilityList[i].name
            result.type = structureData[facilityList[i].typeID].name
            result.typeID = facilityList[i].typeID
            break
          }
        }
      }
    }
    else if (itemGroup['drones'][idToGroup[itemID]] !== undefined) {
      for (let j in facilityList[i].rigs) {
        if ((facilityList[i].rigs[j].rigType & typeSelector['drone']) === typeSelector['drone']) {
          if (result.default || result.me > getBonuses(bluepringME, me, facilityList[i].rigs[j].rigTech, facilityList[i].sec)) {
            result.me = getBonuses(bluepringME, me, facilityList[i].rigs[j].rigTech, facilityList[i].sec)
            result.facilityName = facilityList[i].name
            result.type = structureData[facilityList[i].typeID].name
            result.typeID = facilityList[i].typeID
            break
          }
        }
      }
    }
    else if (itemGroup['ammunition'][idToGroup[itemID]] !== undefined) {
      for (let j in facilityList[i].rigs) {
        if ((facilityList[i].rigs[j].rigType & typeSelector['ammunition']) === typeSelector['ammunition']) {
          if (result.default || result.me > getBonuses(bluepringME, me, facilityList[i].rigs[j].rigTech, facilityList[i].sec)) {
            result.me = getBonuses(bluepringME, me, facilityList[i].rigs[j].rigTech, facilityList[i].sec)
            result.facilityName = facilityList[i].name
            result.type = structureData[facilityList[i].typeID].name
            result.typeID = facilityList[i].typeID
            break
          }
        }
      }
    }
  }
  return result;
}

/**
 * calc the material requirement after applying all material reduction factor
 *
 */
const calcMaterialRequirement = (baseCount, processCount, itemID, bpID, myBp, idToGroup, itemGroup) => {
  const selectBp = () => {
    var result = {
      me: 0,
      te: 0
    }
    // console.log(bpID)
    // console.log(myBp)

    var bpVault = {}
    for (var i in myBp.content) {
      bpVault[myBp.content[i].bpid] = {
        mefficent: myBp.content[i].mefficent,
        tefficent: myBp.content[i].tefficent
      }
    }

    if (bpID in bpVault) {
      result = {
        me: bpVault[bpID]['mefficent'],
        te: bpVault[bpID]['tefficent']
      }
      // console.log(result)
    }
    return result
  }
  //---------------------------
  const facilityList = [
    {
      typeID: 0,
      sec: 2,
      name: '测试建筑 T1改',
      rigs: {
        0: {
          rigType: 2047,
          rigTech: 0
        }
      }
    },
    {
      typeID: 0,
      sec: 2,
      name: '测试建筑 组件T2改',
      rigs: {
        0: {
          rigType: 12,
          rigTech: 2
        }
      }
    }
  ]
  //---------------------------
  var manuDetail = getProperFacility(facilityList, itemGroup, itemID, selectBp().me, idToGroup)

  return {
    material: Math.max(processCount, Math.ceil((baseCount * manuDetail.me * processCount).toFixed(2))),
    facilityName: manuDetail.facilityName
  }
}

export default calcMaterialRequirement