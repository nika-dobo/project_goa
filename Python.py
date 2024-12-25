from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

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
    try:
        data = request.get_json()
        print('Received data:', data)
        username = data.get('username')
        firstName = data.get('firstName')
        lastName = data.get('lastName')
        dateOfBirth = data.get('dateOfBirth')
        password = data.get('password')
        email = data.get('email')

        users_data = load_data()
        if any(user['username'] == username for user in users_data['users']):
            return jsonify({'status': 'failure', 'message': 'Username already exists'})
        if any(user['email'] == email for user in users_data['users']):
            return jsonify({'status': 'failure', 'message': 'Email is already registered'})

        users_data['users'].append({
            'username': username,
            'firstName': firstName,
            'lastName': lastName,
            'dateOfBirth': dateOfBirth,
            'password': password,
            'email': email
        })
        save_data(users_data)
        return jsonify({'status': 'success'})
    except Exception as e:
        print('Error:', e)
        return jsonify({'status': 'failure', 'message': str(e)})

@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        print('Received login data:', data)
        username = data.get('username')
        password = data.get('password')
        email = data.get('email')

        users_data = load_data()
        user = next((user for user in users_data['users'] if user['username'] == username and user['password'] == password and user['email'] == email), None)
        if user:
            return jsonify({'status': 'success', 'message': 'Login successful'})
        else:
            return jsonify({'status': 'failure', 'message': 'Invalid username, password or email'})
    except Exception as e:
        print('Error:', e)
        return jsonify({'status': 'failure', 'message': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
    