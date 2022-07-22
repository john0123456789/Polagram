from .db import db



class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer,db.ForeignKey("users.id"), nullable=False)
    caption = db.Column(db.String(400), nullable=False)
    imageURL = db.Column(db.String(255), nullable=False)

    userIds = db.relationship("User", back_populates="posts")
    likes = db.relationship("Like", back_populates="likeIds")
    comments = db.relationship("Comment", back_populates="postIds")