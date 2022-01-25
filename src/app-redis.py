import uuid, os
from urllib.parse import urlparse
from flask import Flask, render_template, request
import redis

# Flask apps
app = Flask(__name__)

# Connect RedisDB
url = urlparse(os.environ.get("REDIS_URL"))
db = redis.Redis(
        host=url.hostname,
        port=url.port,
        username=url.username,
        password=url.password
        )

# Home page
@app.route('/')
def index():
    return render_template('index.html')

# Add user to db ajax view
@app.route('/add', methods = ['POST'])
def add_user():
    try:
        name = request.data.decode("utf-8")
        key = str(uuid.uuid4())
        db.set(key,name)
        data = {
                'dbkey': key,
                'name': name,
                'status':True
                }
    except Exception as e:
        print(str(e))
        data = {
                'error': str(e),
                'status': False
                }
        return data
    return data

# Get all users in db view
@app.route('/all')
def get_all():
    users_list = []
    keys = db.keys('*')
    for key in keys:
        users_list.append(db.get(key).decode('utf-8'))

    return render_template('whowas.html', users_list=users_list)
