import {
  AppointmentModel,
  AppointmentDetailsModel,
} from "../Models/DB.js";

// GET /api/appointments/:id
export const getAppointmentDetails = async (req, res) => {
  const { id } = req.params;

  // Validate appointment ID presence
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Appointment ID is required",
    });
  }

  try {
    // Find the appointment by ID
    const appointment = await AppointmentModel.findById(id);
    
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    // Authorization: Ensure the logged-in user owns this appointment
    if (!appointment.userId.equals(req.user.id)) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to view this appointment",
      });
    }

    // Fetch associated payment details for THIS specific appointment
    const paymentDetails = await AppointmentDetailsModel.findOne({
      appointmentId: appointment._id, // Fixed: query by appointmentId, not userId
    });

    // Format response data
    const responseData = {
      appointment: {
        id: appointment._id.toString(),
        fullName: appointment.FullName,
        email: appointment.Email,
        phoneNumber: appointment.Number,
        package: appointment.package,
        date: appointment.date ? new Date(appointment.date).toISOString().split("T")[0] : null,
        tutor: appointment.tutor,
        createdAt: appointment.createdAt,
        updatedAt: appointment.updatedAt,
      },
    };

    // Include payment details if they exist
    if (paymentDetails) {
      responseData.paymentDetails = {
        paymentStatus: paymentDetails.PaymentStatus,
        performance: paymentDetails.Performance,
        transactionId: paymentDetails.TransactionID,
        amountPaid: paymentDetails.AmountPaid,
        invoiceNumber: paymentDetails.invoiceNumber,
        note: paymentDetails.Note,
      };
    }

    return res.status(200).json({
      success: true,
      message: "Appointment details retrieved successfully",
      data: responseData,
    });

  } catch (error) {
    console.error("Error fetching appointment details:", {
      appointmentId: id,
      userId: req.user?.id,
      error: error.message,
    });

    // Handle invalid MongoDB ObjectId format
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid appointment ID format",
      });
    }

    // General server error
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};