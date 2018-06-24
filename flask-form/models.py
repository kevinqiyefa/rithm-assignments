from app import db

from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField, SelectField, TextAreaField
from wtforms.validators import InputRequired, URL, NumberRange, Length, Optional, DataRequired


class Pet(db.Model):

    __tablename__ = "pets"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, nullable=False)
    species = db.Column(db.Text, nullable=False)
    photo_url = db.Column(db.Text)
    age = db.Column(db.Integer, nullable=False)
    notes = db.Column(db.Text)
    available = db.Column(db.Boolean, default=True, nullable=False)


db.create_all()


class AddPetForm(FlaskForm):
    """Form for adding Pets."""

    name = StringField(
        "Pet Name: ",
        validators=[
            InputRequired(),
            Length(
                message='Length should be between 3 and 20 characters.',
                min=3,
                max=20)
        ])
    species = SelectField(
        'Please select a species: ',
        validators=[DataRequired(message='Sorry, you have to make a choice.')],
        choices=[('Dog', 'Dog'), ('Cat', 'Cat'), ('Porcupine', 'Porcupine')],
        default='dog')

    photo_url = StringField(
        "Photo URL: ",
        validators=[
            Optional(),
            URL(message='Sorry, this is not a valid URL,')
        ])
    age = IntegerField(
        "Age: ",
        validators=[
            InputRequired(),
            NumberRange(
                message='Range should be between 0 and 30.', min=0, max=30)
        ])
    notes = TextAreaField(
        "Notes: ",
        validators=[
            Optional(),
            Length(message='Length should be at least 5 characters.', min=5)
        ])
    available = BooleanField('Available? ', default=True)


class EditPetForm(FlaskForm):
    photo_url = StringField(
        "Photo URL: ",
        validators=[
            Optional(),
            URL(message='Sorry, this is not a valid URL,')
        ])
    notes = TextAreaField(
        "Notes: ",
        validators=[
            Optional(),
            Length(message='Length should be at least 5 characters.', min=5)
        ])
    available = BooleanField('Available? ', default=True)


class RealPet():
    def __init__(self, pet_name, pet_pic):
        self.pet_name = pet_name
        self.pet_pic = pet_pic
