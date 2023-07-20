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
    return jsonify(theData)

@app.route('/send/json', methods=['POST'])
def receive_json():
    data = request.get_json()
    userId = request.args.get('userId')
    for i in range(1, len(data)+1):
        data[i-1]['id'] = i

    conn = connection()
    with conn.cursor() as cursor:
        query = "DELETE FROM user_goals WHERE user_id = %s"
        cursor.execute(query, (userId,))
        for i in range(len(data)):
            query = "INSERT INTO user_goals (user_id, custom_id, completed, task) Values (%s, %s, %s, %s)"
            user_id = userId
            custom_id = data[i]['id']
            completed = data[i]['complete']
            task = data[i]['task']
            cursor.execute(query, (user_id, custom_id, completed, task))

    conn.commit()
    conn.close()
    return ""

if __name__ == " __main__":
    app.run(debug=True)
