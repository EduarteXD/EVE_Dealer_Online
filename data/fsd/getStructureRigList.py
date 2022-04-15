import yaml
import json


outPut = open('structureRigList.json', 'w', encoding='utf8')
genType = input("方法:")
version = input("版本号:")


def get_father(group_id):
    if 'parentGroupID' in obj[group_id]:
        return get_father(obj[group_id]['parentGroupID'])
    return group_id


def level_up(key_id, levels):
    if levels == 0:
        return key_id
    if 'parentGroupID' in obj[key_id]:
        key_id = obj[key_id]['parentGroupID']
    else:
        return key_id
    return level_up(key_id, levels - 1)


res = {}


if genType == '1':
    file = open('marketGroups.yaml', 'rb')
    yamlStr = file.read()
    file.close()
    data = yaml.load(yamlStr, Loader=yaml.FullLoader)
    sonExists = {}
    obj = {}
    for key, val in data.items():
        obj[key] = val
        if 'parentGroupID' in val:
            sonExists[val['parentGroupID']] = True
    conv = {}
    for key in obj:
        if 'zh' in obj[key]['nameID'] and key not in sonExists:
            if get_father(key) == 2203:
                conv[key] = obj[key]['nameID']['zh']
    res = {
        'version': version,
        'payload': conv
    }
if genType == '2':
    conv = {
        'm': [],
        'l': [],
        'xl': []
    }
    file = open('typeIDs.yaml', 'rb')
    yamlStr = file.read()
    file.close()
    data = yaml.load(yamlStr, Loader=yaml.FullLoader)
    obj = {}
    for key, val in data.items():
        obj[key] = val
    for key in obj:
        if 'zh' in obj[key]['name'] and 'marketGroupID' in obj[key]:
            if obj[key]['marketGroupID'] == 2347:
                conv['m'].append({'name': obj[key]['name']['zh']})
            if obj[key]['marketGroupID'] == 2348:
                conv['l'].append({'name': obj[key]['name']['zh']})
            if obj[key]['marketGroupID'] == 2349:
                conv['xl'].append({'name': obj[key]['name']['zh']})
    res = {
        'version': version,
        'payload': conv
    }


outPut.write(json.dumps(res, ensure_ascii=False))
outPut.close()
