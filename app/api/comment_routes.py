from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import db, Comment, Post


bp = Blueprint("comments", __name__, url_prefix="")


@bp.route('/')
def get_comments():
    comments = Comment.query.all()
    data = [comment.to_dict() for comment in comments]
    return {'comments': data}
