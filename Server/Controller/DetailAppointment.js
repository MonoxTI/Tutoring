import {
  AppointmentModel,
  AppointmentDetailsModel,
  UserModel,
} from "../Models/DB.js";

// GET /api/appointments/:id
export const getAppointmentDetails = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Appointment ID is required",
    });
  }

  // Check authentication
  if (!req.user || !req.user.id) {
    return res.status(401).json({
      success: false,
      message: "Authentication required",
    });
  }

  // Email validation
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(Email)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email format",
    });
  }

  try {
    // 1. Find the appointment
    const appointment = await AppointmentModel.findById(id);
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    // 2. Find associated payment details (optional)
    const paymentDetails = await AppointmentDetailsModel.findOne({
      userId: appointment.userId,
    });

    /* 3. Fetch user info (optional)
    Will be added to the dashboad
    const user = await UserModel.findById(appointment.userId).select(
      "username email"

      
    if (user) {
      responseData.user = {
        username: user.username,
        email: user.email,
      };
    }

    );
    */

    // 4. Format response
    const responseData = {
      appointment: {
        _id: appointment._id.toString(),
        FullName: appointment.FullName,
        Email: appointment.Email,
        Number: appointment.Number,
        package: appointment.package,
        date: appointment.date.toISOString().split("T")[0], // YYYY-MM-DD
        tutor: appointment.tutor,
      },
    };

    if (paymentDetails) {
      responseData.paymentDetails = {
        PaymentStatus: paymentDetails.PaymentStatus,
        Performance: paymentDetails.Performance,
        TransactionID: paymentDetails.TransactionID,
        AmountPaid: paymentDetails.AmountPaid,
        invoiceNumber: paymentDetails.invoiceNumber,
        Note: paymentDetails.Note,
      };
    }

    return res.status(200).json({
      success: true,
      message: "Appointment details retrieved successfully",
    });
  } catch (error) {
    console.error("Error fetching appointment details:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid appointment ID format",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
