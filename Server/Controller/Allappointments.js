import { AppointmentModel } from "../Models/DB.js";

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
          fullName: apt.fullName,
          email: apt.email,
          phoneNumber: apt.phoneNumber,
          packageName: apt.packageName,
          date: apt.date?.toISOString().slice(0, 10) || null,
          tutor: apt.tutor,
          user: apt.userId, // Populated user info
          createdAt: apt.createdAt,
          updatedAt: apt.updatedAt,
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
