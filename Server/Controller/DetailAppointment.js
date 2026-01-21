import mongoose from "mongoose";
import { AppointmentModel, AppointmentDetailsModel } from "../Models/DB.js";

export const getAppointmentDetails = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ success: false, message: "Appointment ID is required" });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid appointment ID format" });
  }

  try {
    const appointment = await AppointmentModel.findById(id);
    if (!appointment) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

    const paymentDetails = await AppointmentDetailsModel.findOne({
      appointmentId: appointment._id,
    });

    const responseData = {
      appointment: {
        id: appointment._id.toString(),
        fullName: appointment.fullName,   // make sure schema uses camelCase
        email: appointment.email,
        phoneNumber: appointment.phoneNumber,
        packageName: appointment.packageName,
        date: appointment.date?.toISOString().slice(0, 10) || null,
        tutor: appointment.tutor,
        createdAt: appointment.createdAt,
        updatedAt: appointment.updatedAt,
      },
      paymentDetails: paymentDetails
        ? {
            paymentStatus: paymentDetails.PaymentStatus,
            performance: paymentDetails.Performance,
            transactionId: paymentDetails.TransactionID,
            amountPaid: paymentDetails.AmountPaid,
            invoiceNumber: paymentDetails.invoiceNumber,
            note: paymentDetails.Note,
          }
        : null,
    };

    return res.status(200).json({
      success: true,
      message: "Appointment details retrieved successfully",
      data: responseData,
    });
  } catch (error) {
    console.error("Error fetching appointment details:", { appointmentId: id, error: error.message });
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};
