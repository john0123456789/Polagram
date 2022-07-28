from .db import db
import datetime


class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer,db.ForeignKey("users.id"), nullable=False)
    postId = db.Column(db.Integer,db.ForeignKey("posts.id"), nullable=False)
    content = db.Column(db.String(500), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.now())



    def to_dict(self):
        return {
            'id': self.id,
            'userIds': self.userId.to_dict(),
            'postId': self.postId.to_dict(),
            'content': self.content,
            'poster': self.userIds.to_dict()
        }
    userIds = db.relationship("User", back_populates="comments")
    postIds = db.relationship("Post", back_populates="comments")
