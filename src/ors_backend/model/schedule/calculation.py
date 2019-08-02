import json
import numpy as np
class calculte():
    def __init__(self, data, n_x, n_y, t_s, morning_time, afternoon_time):
        self.data = data
        self.n_x = n_x
        self.n_y = n_y
        self.t_s = t_s
        self.morning = morning_time
        self.afternoon_time = afternoon_time

    def _process_data_(self, num):
        list_patientID = np.array(self.data['就诊号'])[:]
        list_doctID = np.array(self.data['医生'])[:]
        list_sleepy = np.array(self.data['麻醉方式'])[:]
        list_operation = np.array(self.data['time'])[:]
        list_clean = np.array(self.data['手术级别'])[:]
        list_operation = (np.ceil(list_operation / 5) * 5).astype(np.int)
        list_sleepy.reshape((num, 1))
        for i in range(num):
            b = list_sleepy[i]
            if (b == '全身麻醉' or b == '全身麻醉(喉罩)'):
                tb = 60
            else:
                tb = 0
            list_sleepy[i] = tb
        list_clean.reshape((num, 1))
        for i in range(num):
            a = list_clean[i]
            if a == '1.0':
                tp = 10
            elif a == '2.0' or a == '3.0':
                tp = 20
            else:
                tp = 30
            list_clean[i] = tp
        c = np.vstack((list_doctID, list_patientID, list_operation, list_sleepy, list_clean))
        key = [i + 1 for i in range(num)]
        e = []   #存储了所有信息的列表，每一个列表的内容是一个字典
        for i in range(num):
            f = dict()
            d = c[:, i]
            f[key[i]] = d
            e.append(f)
        return list_doctID, list_patientID, list_operation, list_sleepy, list_clean, e

    def _best_result_(self,best_paixu,Num,list_doctID,list_sleepy,list_operation,list_clean):
        return list_1,list_2,list_3

    def _get_list_(self,a):
        key = []
        dic = {}
        key_2 = ['time_of_operation', 'time_of_sleep', 'time_of_clean']
        for i in range(self.n_x):
            c = a[i]
            key.append('手术室{}'.format(i+1))
            x = []
            for j in range(int(len(c) / 3)):
                e = 3 * j
                d = c[e:e + 3]
                f = dict(zip(key_2, d))
                x.append(f)
            dic[key[i]] = x
        return dic

    def _output_date_(self,output_1):
        f = open('output.json', 'w', encoding='utf-8')
        json.dump(output_1, f, ensure_ascii=False, indent=4)
        f.close()
