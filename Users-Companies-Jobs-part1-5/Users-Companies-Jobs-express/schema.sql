DROP DATABASE IF EXISTS  "linkin-db";
CREATE DATABASE "linkin-db";
\c "linkin-db"


CREATE TABLE companies
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  logo TEXT,
  handle TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE users
(
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  photo TEXT,
  current_company_id INTEGER REFERENCES companies (id) ON DELETE SET NULL
);


CREATE TABLE jobs
(
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  salary TEXT,
  equity FLOAT,
  company_id INTEGER REFERENCES companies(id) ON DELETE SET NULL
);

CREATE TABLE jobs_users
(
  id SERIAL PRIMARY KEY,
  job_id INTEGER REFERENCES jobs(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);


INSERT INTO companies
  (name, logo, handle, password)

VALUES('Google', 'https://cloud.google.com/_static/images/cloud/icons/favicons/onecloud/apple-icon.png', 'test1', '$2b$10$rLko4MzKDmeYQ10Rs5o6C.TAGfKNaFGlCxrXRAKFQRHcyPrI/K/iy');

INSERT INTO companies
  (name, logo, handle, password)
VALUES('Facebook', 'https://cdn.pixabay.com/photo/2017/10/04/11/58/facebook-2815970_960_720.jpg', 'test2', '$2b$10$rLko4MzKDmeYQ10Rs5o6C.TAGfKNaFGlCxrXRAKFQRHcyPrI/K/iy');


INSERT INTO users
  (first_name, last_name, email, photo, current_company_id, username, password)
VALUES('kevin', 'qi', 'test@gmail.com', 'https://i.imgur.com/gdWIxn2.jpg', 1, 'kevinqi', '$2b$10$rLko4MzKDmeYQ10Rs5o6C.TAGfKNaFGlCxrXRAKFQRHcyPrI/K/iy');

INSERT INTO users
  (first_name, last_name, email, photo, current_company_id, username, password)
VALUES('testing', 'tt', 'test@gmail.com', 'https://i.imgur.com/gdWIxn2.jpg', 1, 'test', '$2b$10$rLko4MzKDmeYQ10Rs5o6C.TAGfKNaFGlCxrXRAKFQRHcyPrI/K/iy');


INSERT INTO jobs
  (title, salary, equity, company_id)
VALUES('Software Engineer', '100000', 4.5, 1);

INSERT INTO jobs
  (title, salary, equity, company_id)
VALUES('Software Engineer II', '120000', 4.8, 1);

INSERT INTO jobs
  (title, salary, equity, company_id)
VALUES('Web Developer', '120000', 4.7, 1);

INSERT INTO jobs_users
  (job_id,user_id)
VALUES(3, 2);
INSERT INTO jobs_users
  (job_id,user_id)
VALUES(1, 2);
INSERT INTO jobs_users
  (job_id,user_id)
VALUES(1, 1);
INSERT INTO jobs_users
  (job_id,user_id)
VALUES(2, 1);
INSERT INTO jobs_users
  (job_id,user_id)
VALUES(3, 1);
\q