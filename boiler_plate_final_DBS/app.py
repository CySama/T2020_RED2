from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy 
from flask_marshmallow import Marshmallow
from flask_cors import CORS, cross_origin

import os
import requests

# Init app
app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))
cors = CORS(app)
#print(basedir)

# Database
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
@app.route('/login/<userName>', methods=['GET'])
@cross_origin()
def login(userName):
  print(userName)
  customer = Person.query.get(1)
  customer = person_schema.jsonify(customer)

  return person_schema.jsonify(customer)


# 3.1 Customers Information
# GET Customer ID
@app.route('/get_customer_id/<userName>', methods=['GET'])
@cross_origin()
def get_customer_id(userName):
  print(userName)
  url = 'http://techtrek-api-gateway.ap-southeast-1.elasticbeanstalk.com/customers/' + userName
  r = requests.get(url, headers={'identity': 'Group28', 'token': 'cdf48b04-7b42-43a4-a78a-1b781fd3f2d0'} ).json()
  #r = requests.get('https://api.coindesk.com/v1/bpi/currentprice.json').json()
  #print(r)
  # return r['bpi']['EUR']['rate']
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
  print(r_customer_deposit_account)
  return r_customer_deposit_account




# Run Server
if __name__ == '__main__':
  app.run(debug=True)
