import express from "express";
//import authMiddleware from '../Middleware/JWT.js';
import {createAppointment} from '../Controller/Appointment.js';
//import { Login} from '../Controller/Login.js';
//import { Register} from '../Controller/Register.js';
import { getAppointmentDetails } from '../Controller/DetailAppointment.js';
import { getAllAppointments } from '../Controller/Allappointments.js';


const router = express.Router();

//router.post('/login', Login);
//router.post('/register', Register);
router.post('/appointment', createAppointment);
router.get('/getAppointments/:id', getAppointmentDetails);
router.get('/Allappointments', getAllAppointments); 

export default router;