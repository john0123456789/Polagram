from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class Follower(db.Model):
    __tablename__ = 'followers'

    id = db.Column(db.Integer, primary_key=True)
    followerId = db.Column(db.Integer,db.ForeignKey("user.id"))
    followingId = db.Column(db.Integer, db.ForeignKey("user.id"))
