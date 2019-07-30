import os
from flask_cors import CORS
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)


@app.route('/hospital', methods=['POST'])
def hospital_setting():
    print(request.data)
    file = request.files['file']
    print(file)
    #file.save(os.path.join('D:/', secure_filename(file.filename)))
    return jsonify({'name': 'liwen', 'words': 'hi'})


if __name__ == '__main__':
    app.run()
