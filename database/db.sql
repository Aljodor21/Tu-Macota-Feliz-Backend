CREATE DATABASE tumascotafeliz;

USE tumascotafeliz;

CREATE TABLE users(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    login VARCHAR(45) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(60) NOT NULL UNIQUE,
    nameu VARCHAR(60) NOT NULL,
    addres VARCHAR(60) NOT NULL
);

CREATE TABLE pets(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(45) NOT NULL,
    raza VARCHAR(45) NOT NULL,
    color VARCHAR(60) NOT NULL,
    historia VARCHAR(60) NOT NULL,
    user_id INT,
    plan_id INT
);

ALTER TABLE pets MODIFY historia LONGTEXT;

ALTER TABLE pets
ADD CONSTRAINT pets_usuarios
FOREIGN KEY (user_id)
REFERENCES users(id);

ALTER TABLE pets
ADD CONSTRAINT pets_plan
FOREIGN KEY (plan_id)
REFERENCES plans(id);


CREATE TABLE plans(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name CHAR(8) NOT NULL
);

CREATE TABLE services(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    service VARCHAR(255) NOT NULL,
    received CHAR(1),
    pl_id INT NOT NULL
);

ALTER TABLE services
ADD CONSTRAINT plane_services
FOREIGN KEY (pl_id)
REFERENCES plans(id);

