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


# Create a Person
@app.route('/person', methods=['POST'])
def add_person():
  name = request.json['name']
  occupation = request.json['occupation']
  age = request.json['age']

  new_person = Person(name, occupation, age)

  db.session.add(new_person)
  db.session.commit()

  return person_schema.jsonify(new_person)


# Get All Person
@app.route('/person', methods=['GET'])
def get_persons():
  all_person = Person.query.all()
  result = persons_schema.dump(all_person)
  return jsonify(result)


# Get Single Person
@app.route('/person/<id>', methods=['GET'])
def get_product(id):
  person = Person.query.get(id)
  return person_schema.jsonify(person)


# Update a Person
@app.route('/person/<id>', methods=['PUT'])
def update_product(id):
  person = Person.query.get(id)
  print(request.json)
  name = request.json['name']
  age = request.json['age']
  occupation = request.json['occupation']

  person.name = name
  person.age = age
  person.occupation = occupation

  db.session.commit()

  return person_schema.jsonify(person)


# Delete Person
@app.route('/person/<id>', methods=['DELETE'])
def delete_person(id):
  person = Person.query.get(id)
  db.session.delete(person)
  db.session.commit()

  return person_schema.jsonify(person)


# Get All Person
@app.route('/crypto', methods=['GET'])
def get_crypto():
  r = requests.get('http://techtrek-api-gateway.ap-southeast-1.elasticbeanstalk.com/customers/marytan', headers={'identity': 'Group28', 'token': 'cdf48b04-7b42-43a4-a78a-1b781fd3f2d0'} ).json()
  #r = requests.get('https://api.coindesk.com/v1/bpi/currentprice.json').json()
  #print(r)
  # return r['bpi']['EUR']['rate']
  return r


# Run Server
if __name__ == '__main__':
  app.run(debug=True)
