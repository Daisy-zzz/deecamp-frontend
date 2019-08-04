import os
import sys
import pandas as pd
from flask_cors import CORS
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from ors_backend.model.predict.predict import predict

app = Flask(__name__)
CORS(app)
app.config['JSON_AS_ASCII'] = False


@app.route('/predict', methods=['POST'])
def hospital_setting():
    file = request.files['file']
    raw_data = pd.DataFrame(pd.read_csv(file))
    predicted_data = predict(raw_data)
    return jsonify({
        "key": "0",
        "id": "1",
        "name": "张三",
        "gender": "男",
        "age": "70",
        "department": "心血管科",
        "operatingName": "心脏搭桥手术",
        "doctorName": "李四",
        "predTime": "120",
        "orId": "",
        "startTime": ""
    }, {
        "key": "1",
        "id": "2",
        "name": "王小二",
        "gender": "女",
        "age": "23",
        "department": "妇产科",
        "operatingName": "剖腹产手术",
        "doctorName": "王小二",
        "predTime": "100",
        "orId": "5",
        "startTime": "15:00"
    })

@app.route('/table', methods=['POST'])
def table():
    print(request.get_json())
    return jsonify({'name': 'liwen', 'words': 'hi'})

if __name__ == '__main__':
    app.run()
