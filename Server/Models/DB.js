import mongoose from "mongoose";
//import bcrypt from "bcrypt";
import bcrypt from 'bcryptjs';

const { Schema } = mongoose;

/* ─── User Schema ───────────────────────────────────────── */

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Hash password before save
UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);
});

// Compare password method
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

/* ─── Appointment Schema ────────────────────────────────── */

const AppointmentSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  FullName: { type: String, required: true },
  Email: { type: String, required: true },
  Number: { type: String, required: true },
  package: { type: String, required: true },
  date: { type: Date, required: true },
  tutor: { type: String, required: true }
});

/* ─── Appointment Details Schema ────────────────────────── */

const AppointmentDetailsSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  PaymentStatus: { type: String, required: true },
  Performance: { type: String, required: true },
  TransactionID: { type: String, required: true },
  AmountPaid: { type: Number, required: true },
  invoiceNumber: { type: String, required: true },
  Note: { type: String }
});

/* ─── Models ────────────────────────────────────────────── */

export const UserModel = mongoose.model("User", UserSchema);
export const AppointmentModel = mongoose.model("Appointment", AppointmentSchema);
export const AppointmentDetailsModel = mongoose.model(
  "AppointmentDetails",
  AppointmentDetailsSchema
);
