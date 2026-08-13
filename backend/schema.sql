
CREATE DATABASE IF NOT EXISTS jobboard_za;
USE jobboard_za;

CREATE TABLE IF NOT EXISTS jobs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO jobs (title, company, location, description) 
VALUES 
('Junior Frontend Developer', 'Cape Digital Solutions', 'Cape Town, WC', 'Building responsive Web apps using Vue.js and Node.js.'),
('Backend Developer Trainee', 'Jozi Tech Labs', 'Johannesburg, GP', 'Developing RESTful APIs and optimizing database queries using MySQL.');