from flask import Flask, render_template, redirect, url_for, flash, jsonify
from flask_debugtoolbar import DebugToolbarExtension
from flask_sqlalchemy import SQLAlchemy
import requests
import os

app = Flask(__name__)

app.config['SECRET_KEY'] = "abc123"

toolbar = DebugToolbarExtension(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://localhost/adopt'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
# app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

db = SQLAlchemy(app)

from models import Pet, AddPetForm, EditPetForm, RealPet

real_pet = []


@app.route("/")
def index():
    """List all pets."""

    pet_key = os.environ['MY_SECRET_KEY_FOR_PET_FINDER']
    i = 0

    while i < 3:
        r = requests.get('http://api.petfinder.com/pet.getRandom?', {
            "key": pet_key,
            "format": "json",
            "output": "basic"
        })

        pet_name = r.json()['petfinder']['pet']['name']['$t']
        try:
            pet_pic = r.json()['petfinder']['pet']['media']['photos']['photo'][
                2]["$t"]
        except KeyError:
            pet_pic = 'http://via.placeholder.com/300x300'

        real_pet.append(RealPet(pet_name=pet_name, pet_pic=pet_pic))

        i += 1

    temp_arr = real_pet.copy()
    real_pet.clear()

    return render_template(
        'index.html', pets=Pet.query.all(), real_pet=temp_arr)


@app.route("/add", methods=["GET", "POST"])
def add():
    """Show user the add form; handle adding."""

    form = AddPetForm()

    if form.validate_on_submit():
        kwarg = {k: v for k, v in form.data.items() if k != "csrf_token"}
        new_pet = Pet(**kwarg)

        db.session.add(new_pet)
        db.session.commit()
        flash(f"{new_pet.name} added.")
        return redirect(url_for('index'))

    else:
        return render_template("pet_add_form.html", form=form)


@app.route("/pet/<int:id>", methods=["GET", "POST"])
def edit(id):
    """Show user the edit form and handle edit."""

    pet = Pet.query.get_or_404(id)
    form = EditPetForm(obj=pet)

    if form.validate_on_submit():
        pet.photo_url = form.data["photo_url"]
        pet.notes = form.data["notes"]
        pet.available = form.data['available']
        db.session.commit()
        flash(f"{pet.name} updated.")
        return redirect(url_for('index'))

    else:
        return render_template("edit_pet_form.html", form=form, pet=pet)


@app.route("/api/pet/<int:id>", methods=["GET"])
def get_API_info(id):
    """Get info from my own database"""

    pet = Pet.query.get_or_404(id)

    my_api = {
        'name': pet.name,
        'species': pet.species,
        'photo_url': pet.photo_url,
        'age': pet.age,
        'notes': pet.notes,
        'available': pet.available
    }

    return jsonify(my_api)
