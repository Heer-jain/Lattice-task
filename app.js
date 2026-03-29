import express from "express"
import swaggerUi from "swagger-ui-express"
import YAML from "yamljs"

const app = express();
app.use(express.json());

import eventRoutes from "./routes/eventRoutes.js"
import bookingRoutes from "./routes/bookingRoutes.js"
import userRoutes from "./routes/userRoutes.js"

app.use("/events", eventRoutes);
app.use("/bookings", bookingRoutes);
app.use("/users", userRoutes);

// attendance route
import db from "./config/db.js"
app.post("/events/:id/attendance", async (req, res) => {
  const { bookingCode } = req.body;
  const eventId = req.params.id;

  const [rows] = await db.query(
    "SELECT * FROM bookings WHERE bookingCode=? AND eventId=?",
    [bookingCode, eventId]
  );

  if (!rows.length)
    return res.status(404).json({ message: "Invalid code" });

  res.json({ ticketsBooked: 1 });
});

// Swagger
const swaggerDocument = YAML.load("./swagger.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3000, () => console.log("Server running"));