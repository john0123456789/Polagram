from .db import db


class Follower(db.Model):
    __tablename__ = 'followers'

    id = db.Column(db.Integer, primary_key=True)
    followerId = db.Column(db.Integer,db.ForeignKey("users.id"))
    followingId = db.Column(db.Integer, db.ForeignKey("users.id"))

    def to_dict(self):
        return{
            'id': self.id,
            'followerId': self.followerId,
            'followingId': self.followingId
        }

    # followIds = db.relationship("User", back_populates="follow")
