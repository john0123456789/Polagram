from flask import Blueprint, request, redirect
from flask_login import login_required, current_user
from app.models import Follower, db
from app.forms.follow_form import FollowForm

follow_routes = Blueprint('followers', __name__)

@follow_routes.route('/<int:id>')
@login_required
def followers(id):
    followers = Follower.query.filter_by(followingId=id)
    following = Follower.query.filter_by(followerId=id)
    return {'followers': [follower.to_dict() for follower in followers],
            'following': [follower.to_dict() for follower in following]}

@follow_routes.route('/new/', methods=['POST'])
@login_required
def follow_user():
    form = FollowForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        followed = Follower (
            followerId = form.data["followerId"],
            followingId = form.data["followingId"],
        )

        db.session.add(followed)
        db.session.commit()
        return followed.to_dict()
    return ("error")

@follow_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def unfollow_user(id):
    follow = Follower.query.get(id)
    db.session.delete(follow)
    db.session.commit()
    return follow.to_dict()
