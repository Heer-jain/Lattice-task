import express from "express"
const router = express.Router();
import {bookTicket} from "../controllers/bookingController.js"

router.post("/", bookTicket);

export default router;