from .db import db


class Follower(db.Model):
    __tablename__ = 'followers'

    id = db.Column(db.Integer, primary_key=True)
    followerId = db.Column(db.Integer,db.ForeignKey("users.id"))
    followingId = db.Column(db.Integer, db.ForeignKey("users.id"))
