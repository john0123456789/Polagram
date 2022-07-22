from .db import db
from flask_login import UserMixin


class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer,db.ForeignKey("user.id"), nullable=False)
    postId = db.Column(db.Integer,db.ForeignKey("post.id"), nullable=False)
    content = db.Column(db.String(500), nullable=False)

    userIds = db.relationship("User", back_populates="comments")
    # postIds = db.relationship("Post", back_populates="comments")
