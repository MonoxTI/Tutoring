import express from "express";
import {authenticate} from '../Middleware/JWT.js';
import {createAppointment} from '../Controller/Appointment.js';
import { Login} from '../Controller/Login.js';
import { Register} from '../Controller/Register.js';
import { getAppointmentDetails } from '../Controller/DetailAppointment.js';
import { getAllAppointments } from '../Controller/Allappointments.js';


const router = express.Router();

router.post('/login', Login);
router.post('/register', Register);
router.post('/appointment', createAppointment);
router.get('/getAppointments/:id',authenticate, getAppointmentDetails);
router.get('/appointments', getAllAppointments);
//get all appointments 

export default router;