from flask import Flask, jsonify, request
import json

app = Flask(__name__)

#list API route
@app.route("/list")
def list():
    f = open('data.json')
    data = json.load(f)
    return jsonify(data)

@app.route('/send/json', methods=['POST'])
def receive_json():
    data = request.get_json()
    f = open('data.json', 'w')
    #old_data = json.load(f)
    #update ids so that they begin at 1 again
    for i in range(1, len(data)+1):
        data[i-1]['id'] = i
    json.dump(data, f)
    return ""

if __name__ == " __main__":
    app.run(debug=True)
