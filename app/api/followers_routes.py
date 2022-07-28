from flask import Blueprint, request, redirect
from flask_login import login_required, current_user
from app.models import Follower, db

follow_routes = Blueprint('followers', __name__)

@follow_routes.route('/<int:id>')
def followers(id):
    followers = Follower.query.filter_by(followingId=id)
    following = Follower.query.filter_by(followerId=id)
    return {'followers': [follower.to_dict() for follower in followers],
            'following': [follower.to_dict() for follower in following]}


@follow_routes.route('/<int:id>/dead', methods=['POST'])
@login_required
def follow_user(id):

    followed = Follower (
        followerId = id,
        followingId = current_user.id
    )
    db.session.add(followed)
    db.session.commit()


@follow_routes.route('/<int:id>/dead', methods=['DELETE'])
@login_required
def unfollow_user(id):
    follow = Follower.query.get(id)
    db.session.delete(follow)
    db.session.commit()
