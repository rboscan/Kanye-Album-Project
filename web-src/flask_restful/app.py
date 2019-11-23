# import necessary libraries
from flask import (
    Flask,
    render_template,
    jsonify,
    request)
import pandas as pd
import os
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Resource, Api

# Innit app
app = Flask(__name__)
password = os.environ.get('DB_PASS')
app.config['SQLALCHEMY_DATABASE_URI'] = "postgres://postgres:"+password+"@localhost/Kanye"
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

    def __init__ (self,album,song,sentiment,rating):
        self.album = album
        self.song = song
        self.sentiment = sentiment
        self.rating = rating

    def __repr__(self):
        return '<Discography %r>' % (self.album)

@app.before_first_request
def setup():
    db.drop_all()
    db.create_all()

@app.route('/', methods=['GET', 'POST'])
def process():
    if request.method == 'GET':
        
        db_csv = pd.read_csv('wipcsv.csv')
        json_ = db_csv.to_dict()
        
        for i in range(0,131,1):
            discography = Discography(
            album=json_['Album'][i],
            song=json_['Song'][i],
            sentiment=json_['Sentiment'][i],
            rating=json_['Rating'][i])
            db.session.add(discography)

        db.session.commit()
    return render_template('index.html')

@app.route('/result')
def list_hits():
    results = db.session.query(Discography.album, Discography.song, Discography.sentiment, Discography.rating).all()

    hits = []
    for result in results:
        hits.append({
            "Album": result[0],
            "Song": result[1],
            "Sentiment":result[2],
            "Rating":result[3]
        })
    return jsonify(hits)
    
# Run Server
if __name__ == '__main__':
    app.run(debug=True)
