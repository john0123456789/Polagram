from .db import db


class Like(db.Model):
    __tablename__ = 'likes'

    id = db.Column(db.Integer, primary_key=True)
    postId = db.Column(db.Integer,db.ForeignKey("posts.id"), nullable=False)
    userId = db.Column(db.Integer,db.ForeignKey("users.id"), nullable=False)
    totalLikes = db.Column(db.Integer, nullable=False)

    userIds = db.relationship("User", back_populates="likes")
    likeIds = db.relationship("Post", back_populates="likes")

    def to_dict(self):
        return {
            'id': self.id,
            'postId': self.postId,
            'userId': self.userId,
            'totalLikes': self.totalLikes,
            'liker': self.userIds.username,
        }
