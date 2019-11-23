# import necessary libraries
from flask import (
    Flask,
    render_template,
    jsonify,
    request)
import pandas as pd
import os
import csv
from flask_sqlalchemy import SQLAlchemy

# Innit app
app = Flask(__name__)
password = os.environ.get('DB_PASS')
app.config['SQLALCHEMY_DATABASE_URI'] = "postgres://postgres:7410733Rafael$@localhost/Kanye"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True
db = SQLAlchemy(app)


class Discography(db.Model):
    __tablename__ = 'discographies'
    id = db.Column(db.Integer, primary_key=True)
    album = db.Column(db.String(100))
    song = db.Column(db.String(100))
    sentiment = db.Column(db.Float)
    rating = db.Column(db.String(50))

    def __repr__(self):
        return '<Discography %r>' % (self.album)


@app.route("/", methods=['GET', 'POST'])
def index():
    data = []
    if request.method == 'GET':
        database = pd.read_csv('wipcsv.csv')
        json_ = database.to_dict()
        album_ind = json_["Album"]
        rating_ind = json_["Rating"]
        sentiment_ind = json_["Sentiment"]
        song_ind = json_["Song"]
        for row in json_:
            i = 0
            discography = Discography(album=album_ind[i], song=song_ind[i], sentiment=sentiment_ind[i], rating=rating_ind[i])
            i = i+1
            db.session.add(discography)
            db.session.commit()
        return "complete"


# Run Server
if __name__ == '__main__':
    app.run(debug=True)
