from .db import db


class Like(db.Model):
    __tablename__ = 'likes'

    id = db.Column(db.Integer, primary_key=True)
    postId = db.Column(db.Integer,db.ForeignKey("post.id"), nullable=False)
    userId = db.Column(db.Integer,db.ForeignKey("user.id"), nullable=False)
    totalLikes = db.Column(db.Integer, nullable=False)

    userIds = db.relationship("User", back_populates="likes")
    likeIds = db.relationship("Post", back_populates="likes")
