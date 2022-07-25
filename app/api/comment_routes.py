from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import db, Comment, Post
from app.forms import CommentForm


bp = Blueprint("comments", __name__, url_prefix="")


@bp.route('/')
def get_comments():
    comments = Comment.query.all()
    data = [comment.to_dict() for comment in comments]
    return {'comments': data}

@bp.route('/', methods=['POST'])
def post_comment():
    form = CommentForm
    form['csrf_token'].data = request.cookies['csrf_token']
    pass


@bp.route('/<int:id>', methods=['DELETE'])
def delete_comment(id):
    comment = Comment.query.get(id)
    db.session.delete(comment)
    db.session.commit()
    return comment.to_dict()
