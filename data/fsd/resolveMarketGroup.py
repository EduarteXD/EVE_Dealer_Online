import yaml
import json

file = open('marketGroups.yaml', 'rb')
outPut = open('marketGroups.json', 'w', encoding='utf8')

yamlStr = file.read()
file.close()
data = yaml.load(yamlStr, Loader=yaml.FullLoader)
sonExists = {}
obj = {}
for key, val in data.items():
    obj[key] = val
    if 'parentGroupID' in val:
        sonExists[val['parentGroupID']] = True


def get_father(group_id):
    if 'parentGroupID' in obj[group_id]:
        return get_father(obj[group_id]['parentGroupID'])
    return group_id


conv = {
    'ships': {},
    'equipments': {}
}

for key in obj:
    # print(get_father(key))
    if get_father(key) == 4 and key != 4:
        if 'zh' in obj[key]['nameID'] and key not in sonExists:
            if obj[key]['nameID']['zh'] in ['艾玛', '加达里', '盖伦特', '三神裔', '联合矿业', '米玛塔尔']:
                if obj[obj[obj[key]['parentGroupID']]['parentGroupID']]['nameID']['zh'] == '舰船':
                    conv['ships'][key] = obj[obj[key]['parentGroupID']]['nameID']['zh']
                else:
                    conv['ships'][key] = obj[obj[obj[key]['parentGroupID']]['parentGroupID']]['nameID']['zh']
            else:
                conv['ships'][key] = obj[key]['nameID']['zh']
    if get_father(key) == 9 and key != 9:
        if 'zh' in obj[key]['nameID'] and key not in sonExists:
            conv['equipments'][key] = obj[obj[key]['parentGroupID']]['nameID']['zh']

outPut.write(json.dumps(conv, ensure_ascii=False))
outPut.close()
