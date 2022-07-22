from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class Like(db.Model):
    __tablename__ = 'likes'

    id = db.Column(db.Integer, primary_key=True)
    postId = db.Column(db.Integer,db.ForeignKey("post.id"), nullable=False)
    userId = db.Column(db.Integer,db.ForeignKey("user.id"), nullable=False)
    totalLikes = db.Column(db.Integer, nullable=False)

    userIds = db.relationship("User", back_populates="likes")
    likeIds = db.relationship("Post", back_populates="likes")
