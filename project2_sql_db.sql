
CREATE TABLE "year_table" (
    "mode" INT   NOT NULL,
    "year" INT   NOT NULL,
    "acousticness" FLOAT   NOT NULL,
    "danceability" FLOAT   NOT NULL,
    "duration_ms" FLOAT   NOT NULL,
    "energy" FLOAT   NOT NULL,
    "instrumentalness" FLOAT   NOT NULL,
    "liveness" FLOAT   NOT NULL,
    "loudness" FLOAT   NOT NULL,
    "speechiness" FLOAT   NOT NULL,
    "tempo" FLOAT   NOT NULL,
    "valence" FLOAT   NOT NULL,
    "popularity" FLOAT   NOT NULL,
    "key" INT   NOT NULL
);

CREATE TABLE "genre_table" (
    "mode" INT   NOT NULL,
    "genres" VARCHAR(100)   NOT NULL,
    "acousticness" FLOAT   NOT NULL,
    "danceability" FLOAT   NOT NULL,
    "duration_ms" FLOAT   NOT NULL,
    "energy" FLOAT   NOT NULL,
    "instrumentalness" FLOAT   NOT NULL,
    "liveness" FLOAT   NOT NULL,
    "loudness" FLOAT   NOT NULL,
    "speechiness" FLOAT   NOT NULL,
    "tempo" FLOAT   NOT NULL,
    "valence" FLOAT   NOT NULL,
    "popularity" FLOAT   NOT NULL,
    "key" INT   NOT NULL
);

SELECT * FROM data_table;

SELECT * FROM year_table;

SELECT * FROM genre_table;


