from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy 
from flask_marshmallow import Marshmallow
from flask_cors import CORS, cross_origin

import os
import requests
import json

# Init app
app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))
cors = CORS(app, resources={r"/*": {"origins": "*"}})
#print(basedir)

# Database
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'db.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
#print(app.config)
app.config['CORS_HEADERS'] = 'Content-Type'

# Init db
db = SQLAlchemy(app)
# Init ma
ma = Marshmallow(app)


# Person Class/Model
class Person(db.Model):
  row_id = db.Column(db.Integer, primary_key=True)
  id = db.Column(db.String(100))
  name = db.Column(db.String(100))
  password = db.Column(db.String(200))

  def __init__(self, id, name, password):
    self.id = id
    self.name = name
    self.password = password


# Person Schema
class PersonSchema(ma.Schema):
  class Meta:
    fields = ('id', 'name', 'password')

# Init schema
person_schema = PersonSchema()
persons_schema = PersonSchema(many=True)

# Create a customer
@app.route('/add', methods=['POST'])
@cross_origin()
def add_customer():
  print(request.json)
  id = request.json['id']
  name = request.json['name']
  password = request.json['password']

  new_customer = Person(id, name, password)

  db.session.add(new_customer)
  db.session.commit()
  return person_schema.jsonify(new_customer)


# # Get Single Products
# @app.route('/product/<id>', methods=['GET'])
# @cross_origin()
# def get_product(id):
#   product = Product.query.get(id)
#   return product_schema.jsonify(product)

#Check login credientials
@app.route('/login', methods=['POST'])
@cross_origin()
def login():
  userName = request.json['name']
  password = request.json['password']

  customer_dict = {
    "limzeyang": "1",
    "marytan": "2",
    "prasannaghali": "3"
  }
  # print(customer_dict[userName])
  # print(userName)
  # print(userPassword)

  customer = Person.query.get(customer_dict[userName])
  customer = person_schema.jsonify(customer)
  #json1_file = json.loads(customer)
  data = json.loads(customer.data)
  legit_password = data["password"]

  print(legit_password)
  if legit_password == password:
    return userName

  return "invalid inputs"


# 3.1 Customers Information
# GET Customer ID
@app.route('/get_customer_id/<userName>', methods=['GET'])
@cross_origin()
def get_customer_id(userName):
  print(userName)
  url = 'http://techtrek-api-gateway.ap-southeast-1.elasticbeanstalk.com/customers/' + userName
  r = requests.get(url, headers={'identity': 'Group28', 'token': 'cdf48b04-7b42-43a4-a78a-1b781fd3f2d0'} ).json()

  return r


# GET Customer Details
@app.route('/get_customer_details/<userName>', methods=['GET'])
@cross_origin()
def get_customer_details(userName):
  url = 'http://techtrek-api-gateway.ap-southeast-1.elasticbeanstalk.com/customers/' + userName
  r = requests.get(url, headers={'identity': 'Group28', 'token': 'cdf48b04-7b42-43a4-a78a-1b781fd3f2d0'} ).json()
  customer_id = r['customerId']

  secondary_url = 'http://techtrek-api-gateway.ap-southeast-1.elasticbeanstalk.com/customers/' + customer_id + '/details'

  r_customer_details = requests.get(secondary_url, headers={'identity': 'Group28', 'token': 'cdf48b04-7b42-43a4-a78a-1b781fd3f2d0'} ).json()
  print(r_customer_details)
  return r_customer_details

# 3.3 Accounts
# GET List of Deposit Accounts
@app.route('/get_customer_deposit_account/<userName>', methods=['GET'])
@cross_origin()
def get_list_deposit_accounts(userName):
  url = 'http://techtrek-api-gateway.ap-southeast-1.elasticbeanstalk.com/customers/' + userName
  r = requests.get(url, headers={'identity': 'Group28', 'token': 'cdf48b04-7b42-43a4-a78a-1b781fd3f2d0'} ).json()
  customer_id = r['customerId']

  secondary_url = 'http://techtrek-api-gateway.ap-southeast-1.elasticbeanstalk.com/accounts/deposit/' + customer_id
  print(secondary_url)
  r_customer_deposit_account = requests.get(secondary_url, headers={'identity': 'Group28', 'token': 'cdf48b04-7b42-43a4-a78a-1b781fd3f2d0'} ).json()
  r_customer_deposit_account = jsonify(r_customer_deposit_account)

  test = r_customer_deposit_account
  data = json.loads(test.data)
  print(data[0]['accountId'])
  
  return r_customer_deposit_account


# GET Balance of a Deposit Account
@app.route('/accounts/deposit_balance/<userName>', methods=['GET'])
@cross_origin()
def get_balance_deposit_accounts(userName):
  url = 'http://techtrek-api-gateway.ap-southeast-1.elasticbeanstalk.com/customers/' + userName
  r = requests.get(url, headers={'identity': 'Group28', 'token': 'cdf48b04-7b42-43a4-a78a-1b781fd3f2d0'} ).json()
  customer_id = r['customerId']

  secondary_url = 'http://techtrek-api-gateway.ap-southeast-1.elasticbeanstalk.com/accounts/deposit/' + customer_id
  print(secondary_url)
  r_customer_deposit_account = requests.get(secondary_url, headers={'identity': 'Group28', 'token': 'cdf48b04-7b42-43a4-a78a-1b781fd3f2d0'} ).json()
  r_customer_deposit_account = jsonify(r_customer_deposit_account)

  test = r_customer_deposit_account
  data = json.loads(test.data)
  print(data[0]['accountId'])
  
  account_id = data[0]['accountId']
  tiertary_url = 'http://techtrek-api-gateway.ap-southeast-1.elasticbeanstalk.com/accounts/deposit/{}/balance?month=1&year=2018'.format(account_id)
  print(tiertary_url)
  r_balance = requests.get(tiertary_url, headers={'identity': 'Group28', 'token': 'cdf48b04-7b42-43a4-a78a-1b781fd3f2d0'}).json()
  
  return r_balance

@app.route('/get_transaction/<userName>', methods=['GET'])
@cross_origin()
def get_transaction(userName):
  url = 'http://techtrek-api-gateway.ap-southeast-1.elasticbeanstalk.com/customers/' + userName
  r = requests.get(url, headers={'identity': 'Group28', 'token': 'cdf48b04-7b42-43a4-a78a-1b781fd3f2d0'} ).json()
  customer_id = r['customerId']

  secondary_url = 'http://techtrek-api-gateway.ap-southeast-1.elasticbeanstalk.com/accounts/deposit/' + customer_id
  print(secondary_url)
  r_customer_deposit_account = requests.get(secondary_url, headers={'identity': 'Group28', 'token': 'cdf48b04-7b42-43a4-a78a-1b781fd3f2d0'} ).json()
  r_customer_deposit_account = jsonify(r_customer_deposit_account)

  test = r_customer_deposit_account
  data = json.loads(test.data)
  print(data[0]['accountId'])

  account_id = data[0]['accountId']
  tiertary_url = 'http://techtrek-api-gateway.ap-southeast-1.elasticbeanstalk.com/transactions/{}?from=01-01-2018&to=02-01-2019'.format(account_id)
  print(tiertary_url)
  tiertary_r = requests.get(tiertary_url, headers={'identity': 'Group28', 'token': 'cdf48b04-7b42-43a4-a78a-1b781fd3f2d0'} ).json()
  tiertary_r = jsonify(tiertary_r)


  return tiertary_r

# GET Personal Messages
@app.route('/get_personal_message/<userName>', methods=['GET'])
@cross_origin()
def get_personal_message(userName):
  url = 'http://techtrek-api-gateway.ap-southeast-1.elasticbeanstalk.com/customers/' + userName
  r = requests.get(url, headers={'identity': 'Group28', 'token': 'cdf48b04-7b42-43a4-a78a-1b781fd3f2d0'} ).json()
  customer_id = r['customerId']

  secondary_url = 'http://techtrek-api-gateway.ap-southeast-1.elasticbeanstalk.com/message/' + customer_id
  r_secondary = requests.get(secondary_url, headers={'identity': 'Group28', 'token': 'cdf48b04-7b42-43a4-a78a-1b781fd3f2d0'} ).json()
  r_secondary = jsonify(r_secondary)


  return r_secondary


# Run Server
if __name__ == '__main__':
  app.run(debug=True, host='0.0.0.0')
