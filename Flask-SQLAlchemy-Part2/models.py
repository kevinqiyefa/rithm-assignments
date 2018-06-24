from app import db


class User(db.Model):

    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.Text)
    last_name = db.Column(db.Text)
    profile_link = db.Column(db.Text)
    messages = db.relationship(
        'Message', backref='user', lazy="dynamic", cascade="all,delete")


class Message(db.Model):

    __tablename__ = "messages"

    id = db.Column(db.Integer, primary_key=True)
    msg = db.Column(db.Text)
    user_id = db.Column(db.Integer,
                        db.ForeignKey('users.id', ondelete="cascade"))

    def num_tags(self):
        return len(self.tags)


message_tag_table = db.Table(
    "message_tags", db.Column('id', db.Integer, primary_key=True),
    db.Column('message_id', db.Integer,
              db.ForeignKey('messages.id', ondelete="cascade")),
    db.Column('tag_id', db.Integer, db.ForeignKey(
        'tags.id', ondelete="cascade")))


class Tag(db.Model):
    __tablename__ = "tags"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, unique=True)
    message_tag = db.relationship(
        'Message',
        secondary=message_tag_table,
        backref='tags',
        lazy="dynamic",
        cascade="all,delete")


db.create_all()
