# import necessary libraries
from flask import (
    Flask,
    render_template,
    jsonify,
    request)
import json
import requests
import pandas as pd
import os
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Resource, Api

# Innit app
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "postgres://postgres:postgres@localhost/Kanye"
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
    playcount = db.Column(db.Float)

    def __init__(self, album, song, sentiment, rating, playcount):
        self.album = album
        self.song = song
        self.sentiment = sentiment
        self.rating = rating
        self.playcount = playcount

    def __repr__(self):
        return '<Discography %r>' % (self.album)


@app.before_first_request
def setup():
    db.drop_all()
    db.create_all()
    if request.method == 'GET':

        albums = [
            "3ff2p3LnR6V7m6BinwhNaQ",
            "5ll74bqtkcXlKE7wwkMq4g",
            "3SZr5Pco2oqKFORCP3WNj9",
            "3WFTGIO6E3Xh4paEOBY9OU",
            "20r762YmB5HeofjMCiPMLv",
            "7D2NdGvBHIavgLhmcwhluK",
            "7gsWAHLeT0w7es6FofOXk1",
            "2Ek1q2haOnxVqhvVKqMvJe",
            "0FgZKfoU2Br5sHOfvZKTI9"
        ]

        playcount = []
        song = []
        for album in albums:
            i=0
            url=f"https://t4ils.dev:4433/api/beta/albumPlayCount/?albumid={album}"
            request_url = requests.get(url)
            request_json=request_url.json()
            song_name = request_json['data']
            i=0
            for i in range(0,len(song_name)):
                playcount.append(request_json['data'][i]['playcount'])
                song.append(request_json['data'][i]['name'])
                i=i+1
        playcount_df = pd.DataFrame({'Song':song, 'Playcount':playcount})
        playcount_df.replace({"Pt. 2":"Father Stretch My Hands Pt. 2"}, value=None, inplace=True)
        db_csv = pd.read_csv('wipcsv.csv')
        playcount_song = db_csv.merge(playcount_df, how='outer',on='Song')
        playcount_song['Playcount'] = playcount_song['Playcount'].fillna(0)
        playcount_song = playcount_song.dropna().reset_index(drop=True)
        db_csv = playcount_song
        json_ = db_csv.to_dict()

        for i in range(0, 131, 1):
            discography = Discography(
                album=json_['Album'][i],
                rating=json_['Rating'][i],
                sentiment=json_['Sentiment'][i],
                song=json_['Song'][i],
                playcount=json_['Playcount'][i])
            
            db.session.add(discography)

        db.session.commit()
    return None


@app.route('/result', methods=['GET', 'POST'])
def process():
    if request.method == 'GET':
        results = db.session.query(Discography.album, Discography.song, Discography.sentiment, Discography.rating, Discography.playcount).all()
        hits = []
        for result in results:
            hits.append({
                "Album": result[0],
                "Song": result[1],
                "Sentiment": result[2],
                "Rating": result[3],
                "Playcount":result[4]
            })

    return jsonify(hits)

@app.route('/jsontree', methods=['GET','POST'])
def tree():
    if request.method == 'GET':
        results = db.session.query(Discography.album, Discography.song, Discography.sentiment, Discography.rating, Discography.playcount).all()
        al_unique = {'name':'Discography', 'children':[]}
        for result in results:
            if {'name':result[0],'children':[]} not in al_unique['children']:
                al_unique['children'].append({'name':result[0],'children':[]})
        i=1
        for result in results:
            if al_unique['children'][i-1]['name'] == result[0]:
                al_unique['children'][i-1]['children'].append({'name':result[1],'children':[{'name':result[2],'value':100},{'name':result[3],'value':result[4]}]})

            else: i=i+1
    return jsonify(al_unique)

@app.route('/sunburst')
def test():
    return render_template('sunburst.html')

@app.route('/')
def index():
    return render_template('index.html')


# Run Server
if __name__ == '__main__':
    app.run(debug=True)
