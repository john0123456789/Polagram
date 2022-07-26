from flask import Blueprint, jsonify, request, redirect
from flask_login import login_required
from app.models import db, Comment
from app.forms import CommentForm


comment_routes = Blueprint("comments", __name__, url_prefix="")


@comment_routes.route('/')
def get_comments():
    comments = Comment.query.all()
    data = [comment.to_dict() for comment in comments]
    return {'comments': data}

@comment_routes.route('/create/<int:id>', methods=['POST'])
def post_comment():
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    comment = Comment(
        userId=form.data['userId'],
        postId=form.data['postId'],
        content=form.data['content']
    )
    db.session.add(comment)
    db.session.commit()
    return redirect('/comments')

@comment_routes.route('/<int:id>', methods=['PUT'])
def put_comment(id):
    comment = Comment.query.get(id)
    data = request.json
    comment.content = data['content']
    db.session.commit()
    return comment.to_dict()

@comment_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_comment(id):
    comment = Comment.query.get(id)
    db.session.delete(comment)
    db.session.commit()

    return "Comment has been removed."
