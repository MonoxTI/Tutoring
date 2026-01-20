import { AppointmentModel } from "../Models/DB.js";

// GET /api/appointments
export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await AppointmentModel.find()
      .sort({ date: -1 }) // Most recent first
      .populate('userId', 'username email'); // Include user info (optional)

    return res.status(200).json({
      success: true,
      message: "All appointments retrieved successfully",
      data: {
        count: appointments.length,
        appointments: appointments.map(apt => ({
          id: apt._id.toString(),
          fullName: apt.FullName,
          email: apt.Email,
          phoneNumber: apt.Number,
          package: apt.package,
          date: apt.date,
          tutor: apt.tutor,
          user: apt.userId, // Populated user info
          createdAt: apt.createdAt,
        })),
      },
    });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};