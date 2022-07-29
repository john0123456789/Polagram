from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired

class LikesForm(FlaskForm):
    postId = IntegerField('postId', validators=[DataRequired()])
    userId = IntegerField('userId', validators=[DataRequired()])
