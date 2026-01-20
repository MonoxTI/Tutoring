import { AppointmentModel } from "../Models/DB.js";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const createAppointment = async (req, res) => {
  const {
    FullName,
    Email,
    Number,
    package: selectedPackage,
    Date: appointmentDate,
    tutor,
    // Optional: accept userId from frontend if needed
    userId,
  } = req.body;

  // Validate required fields
  if (
    !FullName?.trim() ||
    !Email?.trim() ||
    Number == null ||
    !selectedPackage?.trim() ||
    !appointmentDate ||
    !tutor?.trim()
  ) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  // Validate email
  if (!emailRegex.test(Email)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email format",
    });
  }

  // Validate phone
  const phoneNumber = String(Number).replace(/\D/g, '');
  if (phoneNumber.length < 9 || phoneNumber.length > 15) {
    return res.status(400).json({
      success: false,
      message: "Invalid phone number",
    });
  }

  // Parse date
  const parsedDate = new Date(appointmentDate);
  if (isNaN(parsedDate.getTime())) {
    return res.status(400).json({
      success: false,
      message: "Invalid date format",
    });
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (parsedDate < today) {
    return res.status(400).json({
      success: false,
      message: "Appointment date cannot be in the past",
    });
  }

  try {
    const newAppointment = new AppointmentModel({
      // If no userId is provided, store as null or omit (ensure schema allows it)
      userId: userId || null, // or remove this line if schema doesn't require it
      FullName: FullName.trim(),
      Email: Email.trim().toLowerCase(),
      Number: Number,
      package: selectedPackage.trim(),
      date: parsedDate,
      tutor: tutor.trim(),
    });

    const savedAppointment = await newAppointment.save();

    return res.status(201).json({
      success: true,
      message: "Appointment created successfully",
      data: {
        _id: savedAppointment._id.toString(),
        FullName: savedAppointment.FullName,
        Email: savedAppointment.Email,
        Number: savedAppointment.Number,
        package: savedAppointment.package,
        date: savedAppointment.date.toISOString().split("T")[0],
        tutor: savedAppointment.tutor,
      },
    });
  } catch (error) {
    console.error("Appointment creation error:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        error: Object.values(error.errors).map(e => e.message),
      });
    }

    return res.status(500).json({
      success: false,
      message: "Server error occurred while creating appointment",
    });
  }
};