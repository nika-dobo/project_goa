from flask import Flask, request, jsonify
import json
import os

app = Flask(__name__)
DATA_FILE = 'data.json'

def load_data():
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, 'r') as file:
            return json.load(file)
    return {'users': []}

def save_data(data):
    with open(DATA_FILE, 'w') as file:
        json.dump(data, file)

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    users_data = load_data()
    if any(user['username'] == username for user in users_data['users']):
        return jsonify({'status': 'failure', 'message': 'Username already exists'})

    users_data['users'].append({'username': username, 'password': password})
    save_data(users_data)
    return jsonify({'status': 'success'})

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    users_data = load_data()
    if any(user['username'] == username and user['password'] == password for user in users_data['users']):
        return jsonify({'status': 'success'})
    return jsonify({'status': 'failure', 'message': 'Invalid credentials'})

if __name__ == '__main__':
    app.run(debug=True)
    