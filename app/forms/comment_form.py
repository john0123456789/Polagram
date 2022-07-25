from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

class CommentForm(FlaskForm):
    userId = IntegerField('userId', validators=DataRequired[DataRequired()])
    postId = IntegerField('postId', validators=DataRequired[DataRequired()])
    content = StringField('content', validators=DataRequired[DataRequired()])
