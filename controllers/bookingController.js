import db from "../config/db.js"
import {generateCode} from "../utils/generateCode.js";

const bookTicket = async (req, res) => {
  const { userId, eventId } = req.body;

  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    const [event] = await conn.query(
      "SELECT * FROM events WHERE id = ? FOR UPDATE",
      [eventId]
    );

    if (event.length === 0)
      throw new Error("Event not found");

    if (event[0].remainingTickets <= 0)
      throw new Error("No tickets left");

    const bookingCode = generateCode();

    await conn.query(
      "INSERT INTO bookings (userId, eventId, bookingCode) VALUES (?, ?, ?)",
      [userId, eventId, bookingCode]
    );

    await conn.query(
      "UPDATE events SET remainingTickets = remainingTickets - 1 WHERE id = ?",
      [eventId]
    );

    await conn.commit();

    res.json({ message: "Booking successful", bookingCode });

  } catch (err) {
    await conn.rollback();
    res.status(400).json({ error: err.message });
  } finally {
    conn.release();
  }
};

export {bookTicket}