import os
import sys
from flask_cors import CORS
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from ors_backend.model.predict.predict import predict

app = Flask(__name__)
CORS(app)
app.config['JSON_AS_ASCII'] = False


@app.route('/hospital', methods=['POST'])
def hospital_setting():
    #print(request.get_json())
    workPath = sys.path[0]
    file = request.files['file']
    file.save(os.path.join(workPath, 'ors_backend/data/predict/raw1.csv'))
    #print(file)
    save_path = predict(os.path.join(workPath, 'ors_backend/data/predict/raw.csv'))
    print(save_path)
    return jsonify({'name': 'liwen', 'words': 'hi'})

@app.route('/table', methods=['POST'])
def table():
    print(request.get_json())
    return jsonify({'name': 'liwen', 'words': 'hi'})


if __name__ == '__main__':
    app.run()
