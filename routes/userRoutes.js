import express from "express"
const router = express.Router();
import { getUserBookings } from "../controllers/userController.js"

router.get("/:id/bookings", getUserBookings);

export default router;