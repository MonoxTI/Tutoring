import { AppointmentModel } from "../Models/DB.js";


export const createAppointment = async (req, res) => {
  const {
    FullName,
    Email,
    Number,
    package: selectedPackage,
    Date,
    tutor,
  } = req.body;

  // Validate required fields
  if (
    !FullName ||
    !Email ||
    Number == null ||
    !selectedPackage ||
    !Date ||
    !tutor
  ) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  // Date validation
  const parsedDate = new Date(Date);
  if (isNaN(parsedDate.getTime())) {
    return res.status(400).json({
      success: false,
      message: "Invalid date format",
    });
  }

  try {
    const newAppointment = new AppointmentModel({
      userId: req.user.id,
      FullName,
      Email,
      Number,
      package: selectedPackage,
      date: parsedDate,
      tutor,
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
        error: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Server error occurred",
    });
  }
};
