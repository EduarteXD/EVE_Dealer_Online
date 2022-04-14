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


def level_up(key_id, levels):
    if levels == 0:
        return key_id
    if 'parentGroupID' in obj[key_id]:
        key_id = obj[key_id]['parentGroupID']
    else:
        return key_id
    return level_up(key_id, levels - 1)


def match(keywords, to_match):
    for keyword in keywords:
        if re.search(keyword, to_match, flags=0):
            return True
    return False


# keywords
advanced = ['高级', '采掘者', '战略', '后勤舰', '侦察舰', '隐形特勤', '截击舰', '重型突击', '突击护卫舰', '重型拦截']
small = ['护卫舰', '驱逐舰', '穿梭机', '隐形特勤', '截击舰']
middle = ['巡洋舰', '战列巡洋舰', '工业舰', '采矿驳船', '采掘者', '后勤舰', '侦察舰']
large = ['战列舰', '货舰']
x_large = ['旗舰']

conv = {
    'superCapitals': ['万古级', '夜神级', '飞龙级', '冥府级', '归魂者级', '仇恨级', '科莫多级', '征服者级', '摩洛克级', '神使级',
                      '俄洛巴斯级', '勒维亚坦级', '拉格纳洛克级'],
    'ships': {},
    'equipments': {},
    'architectures': {},
    'basicComponents': {},
    'advancedComponents': {},
    'drones': {},
    'ammunition': {}
}

for key in obj:
    if 'zh' in obj[key]['nameID'] and key not in sonExists:
        # 舰船
        if get_father(key) == 4:
            conv['ships'][key] = obj[key]['nameID']['zh']
            if conv['ships'][key] in ['艾玛', '加达里', '盖伦特', '非种族', '联合矿业', '米玛塔尔', '三神裔']:
                conv['ships'][key] = obj[obj[key]['parentGroupID']]['nameID']['zh']
                if obj[obj[obj[key]['parentGroupID']]['parentGroupID']]['nameID']['zh'] != '舰船':
                    if obj[obj[key]['parentGroupID']]['nameID']['zh'] != '货舰' and \
                            obj[obj[key]['parentGroupID']]['nameID']['zh'] != '战略货舰':
                        conv['ships'][key] = obj[obj[obj[key]['parentGroupID']]['parentGroupID']]['nameID']['zh']
            if conv['ships'][key][0:2] == '海军' or conv['ships'][key][0:2] == '非帝' or conv['ships'][key][0:2] == '势力':
                conv['ships'][key] = obj[obj[key]['parentGroupID']]['nameID']['zh']
                if conv['ships'][key] == '航空母舰':
                    conv['ships'][key] = obj[obj[obj[key]['parentGroupID']]['parentGroupID']]['nameID']['zh']
            if conv['ships'][key] in ['战力辅助舰', '无畏舰', '先驱者无畏舰', '统一合作关系部', '泰坦']:
                conv['ships'][key] = obj[obj[obj[key]['parentGroupID']]['parentGroupID']]['nameID']['zh']
        # 设备：改装件 955，个人可部署477->404，舰船装备 9，植入体和货柜
        if get_father(key) == 9 or get_father(key) == 955 or \
                (get_father(key) == 477 and
                 (obj[level_up(key, 1)]['nameID']['zh'] == '可部署建筑' or
                  obj[level_up(key, 2)]['nameID']['zh'] == '可部署建筑')) or \
                (obj[level_up(key, 3)]['nameID']['zh'] == '植入体' or
                 obj[level_up(key, 3)]['nameID']['zh'] == '植入体'):
            conv['equipments'][key] = obj[key]['nameID']['zh']
            if conv['equipments'][key] in ['微型', '小型', '中型', '大型', '超大型', '旗舰'] or conv['equipments'][key][0:5] \
                    == '植入体插槽' or \
                    conv['equipments'][key] in ['艾玛', '加达里', '盖伦特', '非种族', '联合矿业', '米玛塔尔', '三神裔']:
                conv['equipments'][key] = obj[level_up(key, 1)]['nameID']['zh']
        # 建筑：建筑组件，建筑装备，建筑改装件，昇威建筑，母星建筑和燃料快
        if (get_father(key) == 477 and (obj[level_up(key, 1)]['nameID']['zh'] in
                                        ['堡垒', '导航建筑', '工程复合体', '精炼厂'] or
                                        obj[level_up(key, 1)]['nameID']['zh'] == '母星建筑' or
                                        obj[level_up(key, 2)]['nameID']['zh'] == '母星建筑' or
                                        obj[level_up(key, 3)]['nameID']['zh'] == '母星建筑')) or \
                (get_father(key) == 475 and (obj[key]['nameID']['zh'] == '燃料块' or
                                             obj[key]['nameID']['zh'] == '建筑组件')) or \
                get_father(key) == 2202 or get_father(key) == 2203:
            conv['architectures'][key] = obj[key]['nameID']['zh']
        # 基础旗舰组件
        if get_father(key) == 475 and obj[key]['nameID']['zh'] == '标准旗舰组件':
            conv['basicComponents'][key] = obj[key]['nameID']['zh']
        # 高级组件：高级组件，高级旗舰组件，工具，数据接口，三级科技组件
        if get_father(key) == 475 and (obj[level_up(key, 1)]['nameID']['zh'] == '高级组件' or
                                       obj[level_up(key, 1)]['nameID']['zh'] == '高级旗舰组件' or
                                       obj[key]['nameID']['zh'] == '子系统组件' or
                                       obj[key]['nameID']['zh'] == 'R.Db'):
            conv['advancedComponents'][key] = obj[key]['nameID']['zh']
            if conv['advancedComponents'][key] in ['艾玛', '加达里', '盖伦特', '非种族', '联合矿业', '米玛塔尔', '三神裔']:
                conv['advancedComponents'][key] = obj[level_up(key, 1)]['nameID']['zh']
        # 弹药：弹药和脚本
        if get_father(key) == 11:
            conv['ammunition'][key] = obj[level_up(key, 1)]['nameID']['zh']
        # 无人机：无人机和舰载机
        if get_father(key) == 157:
            if obj[level_up(key, 1)]['nameID']['zh'] != '无人机':
                conv['drones'][key] = obj[level_up(key, 1)]['nameID']['zh']
            else:
                conv['drones'][key] = obj[key]['nameID']['zh']

    # if get_father(key) == 157:
    #     if 'zh' in obj[key]['nameID'] and key not in sonExists:
    #         conv['drones'][key] = {'category': ''}
    #         conv['drones'][key]['category'] = obj[key]['nameID']['zh']
    # if get_father(key) == 11:
    #     if 'zh' in obj[key]['nameID'] and key not in sonExists:
    #         conv['ammunition'][key] = {'category': ''}
    #         conv['ammunition'][key]['category'] = obj[key]['nameID']['zh']
    #         if conv['ammunition'][key]['category'] in ['小型', '中型', '大型', '超大型']:
    #             conv['ammunition'][key]['category'] = obj[obj[key]['parentGroupID']]['nameID']['zh']
    # if get_father(key) == 475:
    #     if 'zh' in obj[key]['nameID'] and key not in sonExists:
    #         conv['components'][key] = {'category': ''}
    #         conv['components'][key]['category'] = obj[key]['nameID']['zh']
    #         if conv['components'][key]['category'] in ['艾玛', '加达里', '盖伦特', '三神裔']:
    #             conv['components'][key]['category'] = obj[obj[key]['parentGroupID']]['nameID']['zh']

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
