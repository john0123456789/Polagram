from .db import db
import datetime



class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer,db.ForeignKey("users.id"), nullable=False)
    caption = db.Column(db.String(400), nullable=False)
    imageURL = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.now())

    userIds = db.relationship("User", back_populates="posts")
    likes = db.relationship("Like", back_populates="likeIds")
    comments = db.relationship("Comment", back_populates="postIds")

    def to_dict(self):
        return {
            'id': self.id,
            'user': self.userIds.to_dict(),
            'caption': self.caption,
            'imageURL': self.imageURL,
            'time': self.created_at,
            # 'comments': self.comments
        }
