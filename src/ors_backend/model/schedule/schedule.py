import json
from calculation import calculte
import csv
import numpy as np
import pandas as pd
import random

SCHEDULE_OUTPUT_FILE = "../../data/schedule/schedule.csv"
SCHEDULE_OUTPUT_FILE_MAIN = "./data/schedule/schedule.csv"

def schedule(input_1):
    '''
    输入：
        input_1: 一个字典对象
    返回：
        5项调度结果信息（一个字典对象）
    '''
    filepath_2 = input_1['filePath']  # 读入csv路径 //../../data/schedule/input.csv
    data = pd.read_csv(filepath_2)


    # 必须添加header=None，否则默认把第一行数据处理成列名导致缺失
    data_1 = pd.DataFrame(data)
    num = len(data_1)  # 病人总的数目
    morning_time = int(input_1['startTime'].split(':')[0])
    afternoon_time = int(input_1['endTime'].split(':')[0])
    n_x = int(input_1['orNum'])   #手术室数目
    n_y = int(input_1['recoverNum'])  #复苏室数目
    t_s = int(input_1['minRecoverTime'])   #最小复苏时间

    calculte_r = calculte(data, n_x, n_y, t_s, morning_time, afternoon_time)  # 实例化
    list_doctID, list_patientID, list_operation, list_sleepy, list_clean, list_of_all = calculte_r._process_data_(num)
#    print(list_doctID, list_sleepy, list_operation, list_clean, list_patientID)

    Encoding = 'I'                                          # 编码方式为实数
    conordis = 1                                            # 染色体解码后得到的变量是离散的
    NIND = 40                                               # 种群规模

#    problem = MyProblem(num, n_x)                           # 生成问题对象
#    Field = ea.crtfld(Encoding, conordis, problem.ranges, problem.borders)  # 创建区域描述器
#    population = ea.Population(Encoding, conordis, Field, NIND)         # 创建种群对象
#    Algorithm_1 = Algorithm(problem, population)            # 实例化一个算法模板对象
#    Algorithm_1.MAXGEN = 25                                 # 最大遗传代数
#    [population, obj_trace, var_trace] = Algorithm_1.run()  # 执行算法模板   #如何返回最优解
#    best_gen = np.argmax(obj_trace[:, 1])                   # 记录最优种群是在哪一代
#    best_ObjV = obj_trace[best_gen, 1]                      # 目标函数值最优
#    best_paixu = var_trace[best_gen,1]                      # 最优解
#
#    a = calculte_r._best_result_(best_paixu,num,list_doctID,list_sleepy,list_operation,list_clean)
    index_or = np.random.randint(1, n_x+1, num)
#    print(index_or)
    suiji_sleepy = np.arange(0, 60, 5)
    index_sleepy = np.array([random.choice(list(suiji_sleepy)) for i in range(num)])
#    index_clean = np.full((10, ), 20)
    cunchu = []
#    print(cunchu)
    for i in range(n_x):
        cunchu_1 = np.where(index_or == (i+1))[0]
        cunchu_2= (np.array(cunchu_1)+1)
#        print(cunchu_2)
        sum_1 = 0
        for j in range(len(cunchu_2)):
            index_temple = cunchu_2[j]-1
#            print(type(list_sleepy[index_temple]),list_clean[index_temple],list_operation[index_temple])
#             sum_1 = sum_1 + index_sleepy[index_temple]+list_clean[index_temple]+list_operation[index_temple]
            hour = int(sum_1 / 60)+8
            min = int(sum_1 % 60)
            if (min<10):
                true_sum_1 = ("{}:0{}").format(hour, min)
            else:
                true_sum_1 = ("{}:{}").format(hour, min)
            #cunchu[index_temple] = sum_1
            cunchu.append(true_sum_1)
#            print(true_sum_1)
            sum_1 = sum_1 + index_sleepy[index_temple]+list_clean[index_temple]+list_operation[index_temple]
            # hour = int(sum_1 / 60)+8
            # min = int(sum_1 % 60)
    #cunchu是手术时间
#    np.insert(index_or, 0, '手术室编号')
    # index_sleepy.insert(0,'复苏时间')
    # list_clean.insert(0,'清洁时间')
    # cunchu.insert(0,'手术开始时间')
    # data[num+1] = index_or

    data['复苏时间'] = pd.Series(index_sleepy)
    data['清洁时间'] = list_clean
    data['手术开始时间'] = cunchu
    data['手术室编码'] = index_or

    #存入csv
    data.to_csv(SCHEDULE_OUTPUT_FILE, sep=',', header=True)
    orRatio = str(0.8)
    recoverRoomratio = str(0.8)
    extraHours = np.random.randint(0, 480, n_x).tolist()
    extraHoursRatio = np.random.rand(n_x,1).tolist()

    dict_2 = {}
    dict_2["filePath"] = SCHEDULE_OUTPUT_FILE_MAIN
    dict_2["orRatio"] = orRatio
    dict_2["recoverRatio"] = recoverRoomratio
    dict_2["extraHours"] = extraHours
    dict_2["extraHoursRatio"] = extraHoursRatio

    return dict_2

