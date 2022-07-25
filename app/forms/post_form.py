from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired


class PostsForm(FlaskForm):
    caption = StringField('caption', validators=[DataRequired()])
    imageURL = StringField('imageURL', validators=[DataRequired()])
