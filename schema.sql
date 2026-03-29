CREATE DATABASE event_booking;
USE event_booking;

CREATE TABLE users (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(100),
email VARCHAR(100)
);

CREATE TABLE events (
id INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(255),
description TEXT,
date DATE,
totalTickets INT,
remainingTickets INT
);

CREATE TABLE bookings (
id INT AUTO_INCREMENT PRIMARY KEY,
userId INT,
eventId INT,
bookingCode VARCHAR(20),
bookingDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (userId) REFERENCES users(id),
FOREIGN KEY (eventId) REFERENCES events(id)
);
