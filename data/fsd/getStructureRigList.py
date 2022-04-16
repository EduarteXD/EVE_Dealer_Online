import re
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


def calc_bonus(name, size):
    if size == 'm':
        if re.search('制造材料效率', name, flags=0):
            if re.search('高级', name, flags=0) and re.search('舰船', name, flags=0):
                ans = 1024
                if re.search('小型舰船', name, flags=0):
                    ans += 512
                if re.search('中型舰船', name, flags=0):
                    ans += 256
                if re.search('大型舰船', name, flags=0):
                    ans += 128
                return ans
            if re.search('舰船制造', name, flags=0):
                if re.search('小型舰船', name, flags=0):
                    return 512
                if re.search('中型舰船', name, flags=0):
                    return 256
                if re.search('大型舰船', name, flags=0):
                    return 128
            if re.search('舰载机', name, flags=0):
                return 2
            if re.search('高级', name, flags=0) and re.search('组件', name, flags=0):
                return 4
            if re.search('组件', name, flags=0):
                return 8
            if re.search('弹药', name, flags=0):
                return 1
            if re.search('建筑', name, flags=0):
                return 16
            if re.search('装备', name, flags=0):
                return 32
    if size == 'l':
        if re.search('制造效率', name, flags=0):
            if re.search('高级', name, flags=0) and re.search('舰船', name, flags=0):
                ans = 1024
                if re.search('小型舰船', name, flags=0):
                    ans += 512
                if re.search('中型舰船', name, flags=0):
                    ans += 256
                if re.search('大型舰船', name, flags=0):
                    ans += 128
                return ans
            if re.search('舰船制造', name, flags=0):
                if re.search('小型舰船', name, flags=0):
                    return 512
                if re.search('中型舰船', name, flags=0):
                    return 256
                if re.search('大型舰船', name, flags=0):
                    return 128
            if re.search('舰载机', name, flags=0):
                return 2
            if re.search('高级', name, flags=0) and re.search('组件', name, flags=0):
                return 4
            if re.search('组件', name, flags=0):
                return 8
            if re.search('弹药', name, flags=0):
                return 1
            if re.search('建筑', name, flags=0):
                return 16
            if re.search('装备', name, flags=0):
                return 32
    if size == 'xl':
        if re.search('制造效率', name, flags=0):
            if re.search('舰船', name, flags=0):
                return 1984
            if re.search('建筑', name, flags=0):
                return 28
            if re.search('设备', name, flags=0):
                return 33


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
                bonus = 0
                if calc_bonus(obj[key]['name']['zh'], 'm') is not None:
                    bonus = calc_bonus(obj[key]['name']['zh'], 'm')
                tech_level = 3
                if re.search('I', obj[key]['name']['zh'], flags=0):
                    tech_level = 1
                if re.search('II', obj[key]['name']['zh'], flags=0):
                    tech_level = 2
                conv['m'].append({'label': obj[key]['name']['zh'], 'id': key, 'bonus': bonus, 'tech': tech_level})
            if obj[key]['marketGroupID'] == 2348:
                bonus = 0
                if calc_bonus(obj[key]['name']['zh'], 'l') is not None:
                    bonus = calc_bonus(obj[key]['name']['zh'], 'l')
                tech_level = 3
                if re.search('I', obj[key]['name']['zh'], flags=0):
                    tech_level = 1
                if re.search('II', obj[key]['name']['zh'], flags=0):
                    tech_level = 2
                conv['l'].append({'label': obj[key]['name']['zh'], 'id': key, 'bonus': bonus, 'tech': tech_level})
            if obj[key]['marketGroupID'] == 2349:
                bonus = 0
                if calc_bonus(obj[key]['name']['zh'], 'xl') is not None:
                    bonus = calc_bonus(obj[key]['name']['zh'], 'xl')
                tech_level = 3
                if re.search('I', obj[key]['name']['zh'], flags=0):
                    tech_level = 1
                if re.search('II', obj[key]['name']['zh'], flags=0):
                    tech_level = 2
                conv['xl'].append({'label': obj[key]['name']['zh'], 'id': key, 'bonus': bonus, 'tech': tech_level})
    res = {
        'version': version,
        'payload': conv
    }


outPut.write(json.dumps(res, ensure_ascii=False))
outPut.close()
