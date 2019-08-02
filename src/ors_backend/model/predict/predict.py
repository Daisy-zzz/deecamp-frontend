import pandas as pd
import numpy as np
import os

def predict(filepath):
    data = pd.read_csv(filepath, encoding='gbk', index_col=0)
    data['time'] = (np.random.randn(data.shape[0]) * 10 + 50)//1
    d = os.path.dirname(__file__)
    parent_path = os.path.dirname(d) 
    parent_path = os.path.dirname(parent_path) 
    savepath = os.path.join(parent_path, 'data/predict/predicted.csv')
    data.to_csv(savepath)
    return savepath
