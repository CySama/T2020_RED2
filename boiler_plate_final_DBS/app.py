from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy 
from flask_marshmallow import Marshmallow 
import os
import requests

# Init app
app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))
#print(basedir)

# Database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'db.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
#print(app.config)

# Init db
db = SQLAlchemy(app)
# Init ma
ma = Marshmallow(app)


# Person Class/Model
class Person(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(100))
  occupation = db.Column(db.String(200))
  age = db.Column(db.Integer)

  def __init__(self, name, occupation, age):
    self.name = name
    self.occupation = occupation
    self.age = age


# Person Schema
class PersonSchema(ma.Schema):
  class Meta:
    fields = ('id', 'name', 'occupation', 'age')

# Init schema
person_schema = PersonSchema()
persons_schema = PersonSchema(many=True)


# Get customer id
@app.route('/get_customer_id/<userName>', methods=['GET'])
def get_customer_id(userName):
  print(userName)
  url = 'http://techtrek-api-gateway.ap-southeast-1.elasticbeanstalk.com/customers/' + userName
  r = requests.get(url, headers={'identity': 'Group28', 'token': 'cdf48b04-7b42-43a4-a78a-1b781fd3f2d0'} ).json()
  #r = requests.get('https://api.coindesk.com/v1/bpi/currentprice.json').json()
  #print(r)
  # return r['bpi']['EUR']['rate']
  return r


# Get Customer Details
@app.route('/get_customer_details', methods=['GET'])
def get_customer_details():
  r = requests.get('http://techtrek-api-gateway.ap-southeast-1.elasticbeanstalk.com/customers/marytan', headers={'identity': 'Group28', 'token': 'cdf48b04-7b42-43a4-a78a-1b781fd3f2d0'} ).json()
  customer_id = r['customerId']

  url = 'http://techtrek-api-gateway.ap-southeast-1.elasticbeanstalk.com/customers/marytan'

  r_customer_details = requests.get('http://techtrek-api-gateway.ap-southeast-1.elasticbeanstalk.com/customers/marytan', headers={'identity': 'Group28', 'token': 'cdf48b04-7b42-43a4-a78a-1b781fd3f2d0'} ).json()

  #r = requests.get('https://api.coindesk.com/v1/bpi/currentprice.json').json()
  #print(r)
  # return r['bpi']['EUR']['rate']
  return customer_id


# Run Server
if __name__ == '__main__':
  app.run(debug=True)
