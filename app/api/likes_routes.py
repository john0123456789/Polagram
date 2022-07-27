from flask import Blueprint, jsonify, request, redirect
from flask_login import login_required, current_user
from app.models import db, Like, Post
from app.forms import CommentForm

like_routes = Blueprint("likes", __name__)




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
