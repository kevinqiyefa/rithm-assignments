from flask import Flask, request, render_template, url_for, redirect
from flask_modus import Modus
from snack import Snack

app = Flask(__name__)
modus = Modus(app)

apple = Snack(name='Apple', kind='Fruit')
cake = Snack(name='Cake', kind='Dessert')
cookie = Snack(name='Cookie', kind='Dessert')

snacks = [apple, cake, cookie]


@app.route("/")
def root():
    return redirect(url_for('get_or_post_snacks'))


@app.route("/snacks", methods=['GET', 'POST'])
def get_or_post_snacks():
    if request.method == "POST":
        snacks.append(Snack(request.form['name'], request.form['kind']))
        return redirect(url_for('get_or_post_snacks'))
    return render_template('snacks.html', snacks=snacks)


@app.route('/snacks/new')
def new_snack():
    return render_template('new.html')


@app.route('/snacks/<int:id>', methods=["GET", "PATCH", "DELETE"])
def show_snack(id):
    # find a toy based on its id
    try:
        found_snack = [snack for snack in snacks if snack.id == id][0]
    except IndexError:
        return render_template('404.html', id=id)

    if request.method == b"PATCH":
        found_snack.name = request.form['name']
        found_snack.kind = request.form['kind']
    if request.method == b"DELETE":
        snacks.remove(found_snack)
        return redirect(url_for('get_or_post_snacks'))
    return render_template('show.html', snack=found_snack)


@app.route('/snacks/<int:id>/edit')
def edit_snack(id):
    try:
        found_snack = [snack for snack in snacks if snack.id == id][0]
    except IndexError:
        return render_template('404.html', id=id)
    return render_template('edit.html', snack=found_snack)
