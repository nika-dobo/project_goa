from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os
import base64

Server = Flask(__name__)
CORS(Server)

DATA_FILE = 'data.json'

def Encode(data):
    return base64.b64encode(data.encode()).decode()


def Decode(data):
    decoded_data = base64.b64decode(data.encode()).decode()
    return decoded_data


def load_data():
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, 'r') as file:
            return json.load(file)
    return {'users': []}

def save_data(data):
    with open(DATA_FILE, 'w') as file:
        json.dump(data, file)

@Server.route('/signup', methods=['POST'])
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
        if any(Decode(user['username']) == username for user in users_data['users']):
            return jsonify({'status': 'failure', 'message': 'Username already exists'})
        if any(Decode(user['email']) == email for user in users_data['users']):
            return jsonify({'status': 'failure', 'message': 'Email is already registered'})
        
        users_data['users'].append({
            'username': Encode(username),
            'firstName': Encode(firstName),
            'lastName': Encode(lastName),
            'dateOfBirth': Encode(dateOfBirth),
            'password': Encode(password),
            'email': Encode(email),
            'id': len(users_data['users']) + 1
        })
        save_data(users_data)
        return jsonify({'status': 'success'})
    except Exception as ErrorMessage:
        print('Error:', ErrorMessage)
        return jsonify({'status': 'failure', 'message': str(ErrorMessage)})

@Server.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        print('Received login data:', data)
        username = data.get('username')
        password = data.get('password')
        email = data.get('email')

        users_data = load_data()
        
        user = next((user for user in users_data['users'] if Decode(user['username']) == username and Decode(user['password']) == password and Decode(user['email']) == email), None)
        if user:
            user_data = json.dumps({
                'username': Decode(user['username']),
                'firstName': Decode(user['firstName']),
                'lastName': Decode(user['lastName']),
                'dateOfBirth': Decode(user['dateOfBirth']),
                'password': Decode(user['password']),
                'email': Decode(user['email']),
                'id': user['id']
            })
            return jsonify({'status': 'success', 'message': 'Login successful','Data':user_data})
        else:
            return jsonify({'status': 'failure', 'message': 'Invalid username, password or email'})
    except Exception as ErrorMessage:
        print('Error:', ErrorMessage)
        return jsonify({'status': 'failure', 'message': str(ErrorMessage)})

if __name__ == '__main__':
    Server.run(debug=True)
    