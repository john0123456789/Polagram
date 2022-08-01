from flask import Blueprint, request, redirect
from flask_login import login_required, current_user
from app.models import Like, Post, db
from app.forms.like_form import LikesForm

like_routes = Blueprint('likes', __name__)

@like_routes.route('/')
def likes():
    likes = Like.query.all()
    return {'likes': [like.to_dict() for like in likes]}


@like_routes.route('/new/', methods=['POST'])
@login_required
def like_post():
    form = LikesForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    liked = Like (
        userId = form.data["userId"],
        postId = form.data["postId"],
        totalLikes = 0
    )

    db.session.add(liked)
    db.session.commit()
    return liked.to_dict()


@like_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def unlike_post(id):
    like = Like.query.get(id)
    print("THIS IS THE LIKE---------", like)
    db.session.delete(like)
    db.session.commit()
    return like.to_dict()
