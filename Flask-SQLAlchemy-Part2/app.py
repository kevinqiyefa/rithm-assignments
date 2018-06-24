from flask import Flask, request, render_template, url_for, redirect
from flask_modus import Modus
from flask_debugtoolbar import DebugToolbarExtension
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SECRET_KEY'] = "abc123"

modus = Modus(app)
toolbar = DebugToolbarExtension(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://localhost/users'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
# app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

db = SQLAlchemy(app)

from models import User, Message, Tag


@app.route("/")
def root():
    return redirect(url_for('get_users'))


@app.route("/users", methods=['GET'])
def get_users():
    """Get users form users database."""

    return render_template('users.html', users=User.query.all())


@app.route("/users", methods=['POST'])
def add_user():
    """Add user into users database, then redirect back to the home page"""

    new_user = User(
        first_name=request.form['firstname'],
        last_name=request.form['lastname'],
        profile_link=request.form['profileLink'])
    db.session.add(new_user)
    db.session.commit()
    return redirect(url_for('get_users'))


@app.route('/users/new')
def new_user():
    """Render new.html template"""
    return render_template('new.html')


@app.route('/users/<int:id>', methods=["GET"])
def show_user(id):
    """Show the User info and render the show.html"""
    found_user = User.query.get_or_404(id)

    return render_template('show.html', user=found_user)


@app.route('/users/<int:id>', methods=["PATCH"])
def update_user(id):
    """Update the User info and redirect back to the show.html"""
    found_user = User.query.get_or_404(id)
    found_user.first_name = request.form['firstname']
    found_user.last_name = request.form['lastname']
    found_user.profile_link = request.form['profileLink']
    db.session.add(found_user)
    db.session.commit()

    return redirect(url_for('show_user', id=found_user.id))


@app.route('/users/<int:id>/edit', methods=["GET"])
def edit_user(id):
    """Render the edit.html for user to edit the info"""

    found_user = User.query.get_or_404(id)

    return render_template('edit.html', user=found_user)


@app.route('/users/<int:id>', methods=["DELETE"])
def delete_user(id):
    """Delete the User and redirect back to the home page"""
    found_user = User.query.get_or_404(id)
    db.session.delete(found_user)
    db.session.commit()

    return redirect(url_for('get_users'))


@app.route('/users/<int:id>/message', methods=["GET"])
def msg_index(id):
    """Show all the messages from that user"""
    found_user = User.query.get_or_404(id)

    return render_template('message/msg_index.html', user=found_user)


@app.route('/users/<int:id>/message/new', methods=["GET"])
def new_msg(id):
    """Render a form to create message"""
    found_user = User.query.get_or_404(id)
    return render_template(
        'message/new_msg.html', user=found_user, tags=Tag.query.all())


@app.route('/users/<int:id>/message', methods=['POST'])
def add_msg(id):
    """Add message into users database, then redirect back to the show_msg page"""
    new_msg = Message(msg=request.form['content'], user_id=id)

    tag_ids = request.form.getlist('tags')
    new_msg.tags = Tag.query.filter(Tag.id.in_(tag_ids)).all()

    db.session.add(new_msg)
    db.session.commit()
    return redirect(url_for('msg_index', id=id))


@app.route('/message/<int:message_id>', methods=['GET'])
def show_msg(message_id):
    """Show a specific message"""
    found_message = Message.query.get_or_404(message_id)
    return render_template('message/show_msg.html', msg=found_message)


@app.route('/message/<int:message_id>/edit', methods=["GET"])
def edit_msg(message_id):
    """Render a form page for updating the message"""

    found_message = Message.query.get_or_404(message_id)
    return render_template(
        'message/edit_msg.html', message=found_message, tags=Tag.query.all())


@app.route('/message/<int:message_id>', methods=["PATCH"])
def update_msg(message_id):
    """Update the message by a specific message id"""
    found_message = Message.query.get_or_404(message_id)
    tag_ids = request.form.getlist('tags')
    found_message.tags = Tag.query.filter(Tag.id.in_(tag_ids)).all()

    found_message.msg = request.form['content']
    db.session.add(found_message)
    db.session.commit()
    return redirect(url_for('msg_index', id=found_message.user_id))


@app.route('/message/<int:message_id>', methods=["DELETE"])
def delete_msg(message_id):
    """Delete the message and redirect back to the message index page"""

    found_message = Message.query.get_or_404(message_id)
    db.session.delete(found_message)
    db.session.commit()
    return redirect(url_for('msg_index', id=found_message.user_id))


@app.route('/tags', methods=["GET"])
def tag_index():
    """Display all the tags"""

    return render_template('tag/tag_index.html', tags=Tag.query.all())


@app.route('/tags/new', methods=["GET"])
def new_tag():
    """Render a form to create tag"""

    return render_template('tag/new_tag.html')


@app.route("/tag", methods=['POST'])
def add_tag():
    """Add tag into the tag table, then redirect back to the tag index page"""

    new_tag = Tag(name=request.form['tagname'])
    db.session.add(new_tag)
    db.session.commit()
    return redirect(url_for('tag_index'))


@app.route('/tag/<int:tag_id>', methods=['GET'])
def show_tag(tag_id):
    """Show a specific tag"""

    found_tag = Tag.query.get_or_404(tag_id)
    return render_template('tag/show_tag.html', tag=found_tag)


@app.route('/tag/<int:tag_id>/edit', methods=["GET"])
def edit_tag(tag_id):
    """Render a form for user to edit the tag"""

    found_tag = Tag.query.get_or_404(tag_id)
    return render_template('tag/edit_tag.html', tag=found_tag)


@app.route('/tag/<int:tag_id>', methods=["PATCH"])
def update_tag(tag_id):
    """Update the Tag info and redirect back to the show_tag.html"""
    found_tag = Tag.query.get_or_404(tag_id)
    found_tag.name = request.form['tagname']

    db.session.add(found_tag)
    db.session.commit()

    return redirect(url_for('show_tag', tag_id=tag_id))


@app.route('/tag/<int:tag_id>', methods=["DELETE"])
def delete_tag(tag_id):
    """Delete the Tag and redirect back to the home page"""
    found_tag = Tag.query.get_or_404(tag_id)
    db.session.delete(found_tag)
    db.session.commit()

    return redirect(url_for('tag_index'))
