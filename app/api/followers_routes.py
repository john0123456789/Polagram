from flask import Blueprint
from flask_login import login_required
from app.models import db, Follower


follow_routes = Blueprint("followers", __name__, url_prefix="")


@follow_routes.route('/')
def get_followers():
    followers = Follower.query.all()
    data = [follower.to_dict() for follower in followers]
    return {'followers': data}
