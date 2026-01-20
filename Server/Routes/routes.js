import express from "express";

import {createAppointment} from '../Controller/Appointment.js';
import { Login} from '../Controller/Login.js';
import { Register} from '../Controller/Register.js';
import { getAppointmentDetails } from '../Controller/DetailAppointment.js';


const router = express.Router();

router.post('/login', Login);
router.post('/register', Register);
router.post('/appointment', createAppointment);
router.get('/getAppointments', getAppointmentDetails);

export default router;