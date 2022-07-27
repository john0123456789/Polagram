from flask import Blueprint, request, redirect
from flask_login import login_required, current_user
from app.models import Like, db

like_routes = Blueprint('likes', __name__)

@like_routes.route('/')
def likes():
    likes = Like.query.all()
    return {'likes': [like.to_dict() for like in likes]}


@like_routes.routes('/<int:id>', methods=['POST'])
@login_required
def like_post(id):

    liked = Like (
        userId = current_user.id,
        postId = id
    )
    db.session.add(liked)
    db.session.commit()


@like_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def unlike_post(id):
    like = Like.query.get(id)
    db.session.delete(like)
    db.session.commit()
