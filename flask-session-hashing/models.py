from app import db

from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField, SelectField, TextAreaField, PasswordField
from wtforms.validators import InputRequired, URL, NumberRange, Length, Optional, DataRequired, EqualTo
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()


class Pet(db.Model):

    __tablename__ = "pets"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, nullable=False)
    species = db.Column(db.Text, nullable=False)
    photo_url = db.Column(db.Text)
    age = db.Column(db.Integer, nullable=False)
    notes = db.Column(db.Text)
    available = db.Column(db.Boolean, default=True, nullable=False)


class User(db.Model):

    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.Text, nullable=False)
    username = db.Column(db.Text, unique=True, nullable=False)
    password = db.Column(db.Text, nullable=False)

    @classmethod
    def signup(cls, fullname, username, password):
        """Register a user, hashing their password."""

        hashed = bcrypt.generate_password_hash(password)
        hashed_utf8 = hashed.decode("utf8")
        return cls(full_name=fullname, username=username, password=hashed_utf8)

    @classmethod
    def authenticate(cls, username, password):
        """Validate that user exists & password is correct.

        Return user if valid; else return False.
        """

        user = User.query.filter_by(username=username.upper()).first()
        if user:
            if bcrypt.check_password_hash(user.password, password):
                return user
        return False

    def get_firstname(self):
        return self.full_name.split()[0]


db.create_all()


class SignUpForm(FlaskForm):
    """Form for register."""
    full_name = StringField(
        "Full Name: ",
        validators=[
            InputRequired(),
            Length(
                message='Length should be between 3 and 20 characters.',
                min=3,
                max=35)
        ])

    username = StringField(
        "User Name: ",
        validators=[
            InputRequired(),
            Length(
                message='Length should be between 3 and 20 characters.',
                min=3,
                max=35)
        ])

    password = PasswordField(
        'New Password',
        validators=[
            DataRequired(),
            EqualTo('confirm', message='Passwords must match')
        ])
    confirm = PasswordField('Repeat Password')


class LoginForm(FlaskForm):
    """Form for Login."""

    username = StringField(
        "User Name: ",
        validators=[
            InputRequired(),
            Length(
                message='Length should be between 3 and 20 characters.',
                min=3,
                max=35)
        ])

    password = PasswordField('New Password', validators=[DataRequired()])


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
