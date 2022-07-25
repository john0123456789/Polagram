from flask import Blueprint, request
from flask_login import login_required
from app.models import Post, Comment, comment, db
from app.forms.post_form import PostsForm

post_routes = Blueprint('posts', __name__)

def validation_errors_to_error_messages(validation_errors):
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@post_routes.route('/')
def posts():
    posts = Post.query.all()
    return {'posts': [post.to_dict() for post in posts]}

@post_routes.route('/create', methods=['POST'])
def post_post():
    form = PostsForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        post = Post(
            caption=form.data['caption'],
            imageURL=form.data['imageURL']
        )
        db.session.add(post)
        db.session.commit()
        return post.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@post_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_post(id):
    post = Post.query.get(id)
    allComments = Comment.query.filter_by(postId=id)
    for comments in allComments:
        db.session.delete(comments)
    db.session.delete(post)
    db.session.commit()

    return "Post has been removed."
