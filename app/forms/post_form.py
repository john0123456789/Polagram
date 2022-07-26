from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

class PostsForm(FlaskForm):
    userId = IntegerField('userId', validators=[DataRequired()])
    caption = StringField('caption', validators=[DataRequired()])
    imageURL = StringField('imageURL', validators=[DataRequired()])
