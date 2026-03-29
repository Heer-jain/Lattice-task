import db from "../config/db.js";

const getUserBookings = async (req, res) => {
  const userId = req.params.id;

  const [rows] = await db.query(
    "SELECT * FROM bookings WHERE userId = ?",
    [userId]
  );

  res.json(rows);
};

export { getUserBookings };