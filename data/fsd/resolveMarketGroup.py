import re
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


def match(keywords, to_match):
    for keyword in keywords:
        if re.search(keyword, to_match, flags=0):
            return True
    return False


# keywords
advanced = ['高级', '采掘者', '战略', '后勤舰', '侦察舰', '隐形特勤', '截击舰', '重型突击', '突击护卫舰']
small = ['护卫舰', '驱逐舰', '穿梭机', '隐形特勤', '截击舰']
middle = ['巡洋舰', '战列巡洋舰', '工业舰', '采矿驳船', '采掘者', '后勤舰', '侦察舰']
large = ['战列舰', '货舰']
x_large = ['旗舰']

conv = {
    'ships': {},
    'equipments': {},
    'rigs': {},
    'drones': {}
}

for key in obj:
    # print(get_father(key))
    if get_father(key) == 4:
        if 'zh' in obj[key]['nameID'] and key not in sonExists:
            conv['ships'][key] = obj[key]['nameID']['zh']
            if conv['ships'][key] in ['艾玛', '加达里', '盖伦特', '三神裔', '联合矿业', '米玛塔尔']:
                conv['ships'][key] = obj[obj[key]['parentGroupID']]['nameID']['zh']
                if obj[obj[obj[key]['parentGroupID']]['parentGroupID']]['nameID']['zh'] != '舰船':
                    if obj[obj[key]['parentGroupID']]['nameID']['zh'] != '货舰' and \
                            obj[obj[key]['parentGroupID']]['nameID']['zh'] != '战略货舰':
                        conv['ships'][key] = obj[obj[obj[key]['parentGroupID']]['parentGroupID']]['nameID']['zh']
            if conv['ships'][key][0:2] == '海军' or conv['ships'][key][0:2] == '非帝' or conv['ships'][key][0:2] == '势力':
                conv['ships'][key] = obj[obj[key]['parentGroupID']]['nameID']['zh']
                if conv['ships'][key] == '航空母舰':
                    conv['ships'][key] = obj[obj[obj[key]['parentGroupID']]['parentGroupID']]['nameID']['zh']
            if conv['ships'][key] in ['战力辅助舰', '泰坦', '无畏舰', '先驱者无畏舰']:
                conv['ships'][key] = obj[obj[obj[key]['parentGroupID']]['parentGroupID']]['nameID']['zh']

    if get_father(key) == 9:
        if 'zh' in obj[key]['nameID'] and key not in sonExists:
            conv['equipments'][key] = {'category': ''}
            conv['equipments'][key]['category'] = obj[obj[key]['parentGroupID']]['nameID']['zh']
    if get_father(key) == 955:
        if 'zh' in obj[key]['nameID'] and key not in sonExists:
            conv['rigs'][key] = {'category': ''}
            conv['rigs'][key]['category'] = obj[obj[key]['parentGroupID']]['nameID']['zh']
    if get_father(key) == 157:
        if 'zh' in obj[key]['nameID'] and key not in sonExists:
            conv['drones'][key] = {'category': ''}
            conv['drones'][key]['category'] = obj[obj[key]['parentGroupID']]['nameID']['zh']

for key in conv['ships']:
    belong = {
        'size': '',
        'adv': False,
        'category': conv['ships'][key]
    }
    if match(advanced, conv['ships'][key]):
        belong['adv'] = True
    if match(small, conv['ships'][key]):
        belong['size'] = 'small'
    if match(middle, conv['ships'][key]):
        belong['size'] = 'medium'
    if match(large, conv['ships'][key]):
        belong['size'] = 'large'
    if match(x_large, conv['ships'][key]):
        belong['size'] = 'xlarge'
    conv['ships'][key] = belong

outPut.write(json.dumps(conv, ensure_ascii=False))
outPut.close()
