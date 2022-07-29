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
            'followingId': self.followingId,
            'follower': self.followerIds.username
        }

    followerIds = db.relationship("User", back_populates="followers", foreign_keys=[followerId])
    followingIds = db.relationship("User", back_populates="following", foreign_keys=[followingId])
