from flask import Flask, render_template, request
import pymongo
import os

# Flask apps
app = Flask(__name__)
# Initialize mongodb
db = pymongo.MongoClient('mongodb', 27017).db

# Home page
@app.route('/')
def index():
    return render_template('index.html')

# Add user to db ajax view
@app.route('/add', methods = ['POST'])
def add_user():
    try:
        name = request.data.decode("utf-8")
        user_id = str(db.users.insert_one({'name': name}).inserted_id)
        data = {
                'dbkey': user_id,
                'name': name,
                'status':True
                }
    except Exception as e:
        data = {
                'error': str(e),
                'status': False
                }
        return data
    return data

# Get all users in db view
@app.route('/all')
def get_all():
    users_dictionary = list(db.users.find({},{'_id':0}))
    users_list = [x['name'] for x in users_dictionary]
    return render_template('whowas.html', users_list=users_list)
