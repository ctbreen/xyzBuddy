from flask import Flask, jsonify, request
import json
import psycopg2

app = Flask(__name__)

def connection():
    conn = psycopg2.connect(
        dbname='xyzbuddy',
        user='dummyuser',
        password='dummypassword',
        host='localhost',
        port='5432'
    )
    return conn

#list API route
@app.route("/list", methods=['GET'])
def list(): 
    userId = request.args.get('userId')

    conn = connection()
    
    theData = []
    with conn.cursor() as cursor:
        query = "SELECT * FROM user_goals WHERE user_id = %s"
        cursor.execute(query, (userId,))
        rows = cursor.fetchall()
        for i in range(len(rows)):
            theData.append({'complete': rows[i][2], 'id': rows[i][1],  'task': rows[i][3]})
    conn.commit()
    conn.close()
    print(userId)
    return jsonify(theData)

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
