from flask import Flask, request, render_template, url_for, redirect
from flask_modus import Modus
from flask_debugtoolbar import DebugToolbarExtension
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SECRET_KEY'] = "abc123"

modus = Modus(app)
toolbar = DebugToolbarExtension(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://localhost/my_snacks'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
db = SQLAlchemy(app)


class Snack(db.Model):

    __tablename__ = "snacks"  # table name will default to name of the model

    # Create the three columns for our table
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, unique=True)
    kind = db.Column(db.Text)

    # define what each instance or row in the DB will have (id is taken care of for you)
    def __init__(self, name, kind):
        self.name = name
        self.kind = kind


db.create_all()


@app.route("/")
def root():
    return redirect(url_for('get_or_post_snacks'))


@app.route("/snacks", methods=['GET', 'POST'])
def get_or_post_snacks():

    if request.method == "POST":

        # option 1: pre-check
        if Snack.query.filter(Snack.name == request.form['name']).first():
            return redirect(url_for('get_or_post_snacks'))

        # # option 2: handle error
        # import sqlalchemy.exc
        # try:
        #     db.session.commit()
        # except sqlalchemy.exc.IntegrityError  as e:
        #     ...

        new_snack = Snack(request.form['name'], request.form['kind'])
        db.session.add(new_snack)
        db.session.commit()
        return redirect(url_for('get_or_post_snacks'))
    return render_template('snacks.html', snacks=Snack.query.all())


@app.route('/snacks/new')
def new_snack():
    return render_template('new.html')


@app.route('/snacks/<int:id>', methods=["GET", "PATCH", "DELETE"])
def show_snack(id):

    found_snack = Snack.query.get(id)
    if found_snack is None:
        return render_template('404.html', id=id)

    if request.method == b"PATCH":
        found_snack.name = request.form['name']
        found_snack.kind = request.form['kind']
        db.session.add(found_snack)
        db.session.commit()

    if request.method == b"DELETE":
        db.session.delete(found_snack)
        db.session.commit()

        return redirect(url_for('get_or_post_snacks'))
    return render_template('show.html', snack=found_snack)


@app.route('/snacks/<int:id>/edit')
def edit_snack(id):
    found_snack = Snack.query.get(id)
    if found_snack is None:
        return render_template('404.html', id=id)

    return render_template('edit.html', snack=found_snack)
