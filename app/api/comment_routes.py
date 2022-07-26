from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Comment
from app.forms import CommentForm


comment_routes = Blueprint("comments", __name__, url_prefix="")


@comment_routes.route('/')
def get_comments():
    comments = Comment.query.all()
    data = [comment.to_dict() for comment in comments]
    return {'comments': data}

@comment_routes.route('/', methods=['POST'])
def post_comment():
    form = CommentForm
    form['csrf_token'].data = request.cookies['csrf_token']
    pass


@comment_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_comment(id):
    comment = Comment.query.get(id)
    db.session.delete(comment)
    db.session.commit()

    return "Comment has been removed."
