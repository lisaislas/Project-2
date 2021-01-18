-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/d/Ue4cxH
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.

-- Physical

CREATE TABLE "data_table" (
    "id" serial   NOT NULL,
    "valence" FLOAT   NOT NULL,
    "year" INT   NOT NULL,
    "acousticness" FLOAT   NOT NULL,
    "artists" VARCHAR(100)   NOT NULL,
    "danceability" FLOAT   NOT NULL,
    "duration_ms" INT   NOT NULL,
    "energy" FLOAT   NOT NULL,
    "explicit" INT   NOT NULL,
    "instrumentalness" VARCHAR(30)   NOT NULL,
    "key" INT   NOT NULL,
    "liveness" FLOAT   NOT NULL,
    "loudness" FLOAT   NOT NULL,
    "mode" INT   NOT NULL,
    "name" VARCHAR(100)   NOT NULL,
    "popularity" INT   NOT NULL,
    "release_date" VARCHAR(20)   NOT NULL,
    "speechiness" FLOAT   NOT NULL,
    "tempo" FLOAT   NOT NULL,
    CONSTRAINT "pk_data_table" PRIMARY KEY (
        "id"
     )
);

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

