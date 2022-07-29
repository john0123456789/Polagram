from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired

class FollowForm(FlaskForm):
    followerId = IntegerField('followerId', validators=[DataRequired()])
    followingId = IntegerField('followingId', validators=[DataRequired()])
