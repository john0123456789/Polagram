from flask import Blueprint, request, redirect
from flask_login import login_required
from app.models import Like, db

like_routes = Blueprint('likes', __name__)

@like_routes.route('/')
def likes():
    likes = Like.query.all()
    return {'likes': [like.to_dict() for like in likes]}
