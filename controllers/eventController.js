import db from "../config/db.js"

const getEvents = async (req, res) => {
  const [rows] = await db.query("SELECT * FROM events");
  res.json(rows);
};

const createEvent = async (req, res) => {
  const { title, description, date, totalTickets } = req.body;

  console.log("body", req.body)

  await db.query(
    "INSERT INTO events (title, description, date, totalTickets, remainingTickets) VALUES (?, ?, ?, ?, ?)",
    [title, description, date, totalTickets, totalTickets]
  );

  res.status(201).json({ message: "Event created" });
};

const checkAttendance = async (req, res) => {
  const { bookingCode } = req.body;
  const eventId = req.params.id;

  const [rows] = await db.query(
    "SELECT * FROM bookings WHERE bookingCode = ? AND eventId = ?",
    [bookingCode, eventId]
  );

  if (rows.length === 0)
    return res.status(404).json({ message: "Invalid code" });

  res.json({ ticketsBooked: 1 });
};

export { getEvents, createEvent, checkAttendance }