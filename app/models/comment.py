from .db import db



class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer,db.ForeignKey("users.id"), nullable=False)
    postId = db.Column(db.Integer,db.ForeignKey("posts.id"), nullable=False)
    content = db.Column(db.String(500), nullable=False)

    userIds = db.relationship("User", back_populates="comments")
    postIds = db.relationship("Post", back_populates="comments")
