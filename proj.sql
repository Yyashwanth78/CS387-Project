DROP TABLE IF EXISTS user_password;
DROP TABLE IF EXISTS user_info;
DROP TABLE IF EXISTS schedule;
DROP TABLE IF EXISTS aircraft;

CREATE TABLE user_info(
  user_id varchar(5),
  name varchar(50),
  mobile_no bigint,
  PRIMARY KEY(user_id)
);

CREATE TABLE user_password(
  user_id varchar(5),
  password varchar(80),
  PRIMARY KEY(user_id),
  FOREIGN KEY(user_id) REFERENCES user_info ON DELETE set null
);

CREATE TABLE aircraft(
  aircraft_id varchar(5),
  aircraft_model varchar(30),
  capacity bigint,
  company varchar(30),
  PRIMARY KEY (aircraft_id)
);

CREATE TABLE schedule(
  schedule_id varchar(5),
  aircraft_id varchar(5),
  departure_loc varchar(20),
  departure_time timestamp without time zone,
  arrival_loc varchar(20),
  arrival_time timestamp without time zone,
  at_capacity boolean,
  PRIMARY KEY(schedule_id),
  FOREIGN KEY(aircraft_id) REFERENCES aircraft ON DELETE set null
);