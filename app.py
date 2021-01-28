import psycopg2
import sys
from flask import Flask,render_template
from flask import jsonify
from flask_cors import CORS, cross_origin


app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route("/danceability_by_year", methods=['GET', 'POST'])
@cross_origin()
def top_years():
    con = psycopg2.connect("host='localhost' dbname='project2' user='postgres' password='postgres'")
    cur = con.cursor()
    cur.execute("""select year, sum(danceability) as total_danceability from data_table group by year""")

    data = [{"year" : col[0], "total_danceability" : col[1]} for col in cur]
    cur.close()
    return jsonify(data)


@app.route("/most_danceable_genres", methods=['GET', 'POST'])
@cross_origin()
def top_genres():
    con = psycopg2.connect("host='localhost' dbname='project2' user='postgres' password='postgres'")
    cur = con.cursor()
    cur.execute("""select genres, sum(danceability) as total_danceability from genre_table group by genres order by total_danceability desc limit 10""")

    data = [{"genres" : col[0], "total_danceability" : col[1]} for col in cur]
    cur.close()
    return jsonify(data)


@app.route("/energy_vs_danceability", methods=['GET', 'POST'])
@cross_origin()
def energy_danceability():
    con = psycopg2.connect("host='localhost' dbname='project2' user='postgres' password='postgres'")
    cur = con.cursor()
    cur.execute("""select energy, danceability from data_table where energy between 0.05 and 0.07 order by energy""")

    data = [{"energy" : col[0], "danceability" : col[1]} for col in cur]
    cur.close()
    return jsonify(data)


@app.route("/popularity_vs_danceability", methods=['GET', 'POST'])
@cross_origin()
def popularity_danceability():
    con = psycopg2.connect("host='localhost' dbname='project2' user='postgres' password='postgres'")
    cur = con.cursor()
    cur.execute("""select popularity, avg(danceability) as danceability from data_table group by popularity order by popularity""")

    data = [{"popularity" : col[0], "danceability" : col[1]} for col in cur]
    cur.close()
    return jsonify(data)


@app.route("/edm", methods=['GET', 'POST'])
@cross_origin()
def edm():
    con = psycopg2.connect("host='localhost' dbname='project2' user='postgres' password='postgres'")
    cur = con.cursor()
    cur.execute("""select genres, acousticness, energy, instrumentalness, speechiness, danceability from genre_table where genres = 'edm'""")

    data = [{"genres" : col[0], "acousticness" : col[1], "energy" : col[2], "instrumentalness" : col[3], "speechiness" : col[4], "danceability" : col[5]} for col in cur]
    cur.close()
    return jsonify(data)


@app.route("/hiphop", methods=['GET', 'POST'])
@cross_origin()
def hiphop():
    con = psycopg2.connect("host='localhost' dbname='project2' user='postgres' password='postgres'")
    cur = con.cursor()
    cur.execute("""select genres, acousticness, energy, instrumentalness, speechiness, danceability from genre_table where genres = 'hip hop'""")

    data = [{"genres" : col[0], "acousticness" : col[1], "energy" : col[2], "instrumentalness" : col[3], "speechiness" : col[4], "danceability" : col[5]} for col in cur]
    cur.close()
    return jsonify(data)


@app.route("/rock", methods=['GET', 'POST'])
@cross_origin()
def rock():
    con = psycopg2.connect("host='localhost' dbname='project2' user='postgres' password='postgres'")
    cur = con.cursor()
    cur.execute("""select genres, acousticness, energy, instrumentalness, speechiness, danceability from genre_table where genres = 'rock'""")

    data = [{"genres" : col[0], "acousticness" : col[1], "energy" : col[2], "instrumentalness" : col[3], "speechiness" : col[4], "danceability" : col[5]} for col in cur]
    cur.close()
    return jsonify(data)


if __name__ == "__main__":
    app.run(debug=True)