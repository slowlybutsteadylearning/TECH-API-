
CREATE TABLE IF NOT EXISTS users(
            id INT NOT NULL AUTO_INCREMENT,
            firstName VARCHAR(50), 
            lastName VARCHAR(50) NOT NULL,
            password VARCHAR(255) NOT NULL,
            email VARCHAR(30) UNIQUE NOT NULL,
            roles VARCHAR(255) NOT NULL DEFAULT 'user' COMMENT 'user, admin',
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (id)
        );


-- DROP TABLE users


CREATE TABLE registrations (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  course_id INT NOT NULL,

  approved BOOLEAN NOT NULL DEFAULT false,
  FOREIGN KEY (course_id) REFERENCES courses(id)
);

CREATE TABLE bookings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  space_id INT NOT NULL,
  date DATE NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (space_id) REFERENCES spaces(id)
);



CREATE TABLE services(
  id INT PRIMARY KEY AUTO_INCREMENT,
  serviceName VARCHAR(255) NOT NULL,
  serviceDescription VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS admins(
            id INT NOT NULL AUTO_INCREMENT,
            email VARCHAR(30) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            roles VARCHAR(255) NOT NULL DEFAULT 'admin' COMMENT 'user, admin',
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (id)
        );

-- DROP TABLE admins


CREATE TABLE spaces (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  capacity INT NOT NULL
);


CREATE TABLE courses (
  id INT PRIMARY KEY AUTO_INCREMENT,
  course_name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL
);
