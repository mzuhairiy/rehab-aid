import User from "../models/UserSchema.js";
import Booking from "../models/BookingSchema.js";
import Doctor from "../models/DoctorSchema.js";
import mongoose from "mongoose";

export const updateUser = async (req, res) => {
  const id = req.params.id;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Successfully Updated",
      data: updatedUser,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to update" });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    await User.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Successfully Deleted",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to delete" });
  }
};

export const getSingleUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id).select("-password");

    res.status(200).json({
      success: true,
      message: "User found",
      data: user,
    });
  } catch (err) {
    res.status(404).json({ success: false, message: "No user found" });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");

    res.status(200).json({
      success: true,
      message: "User found",
      data: users,
    });
  } catch (err) {
    res.status(404).json({ success: false, message: "Not found" });
  }
};

export const getUserProfile = async (req, res) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const { password, ...rest } = user._doc;

    res.status(200).json({
      success: true,
      message: "Profile info is getting",
      data: { ...rest },
    });
  } catch (err) {
    res
      .status(500)
      .json({ succes: false, message: "Something went wrong, cannot get" });
  }
};

export const getMyAppointments = async (req, res) => {
  try {
    const bookings = await Booking.find({
      user: new mongoose.Types.ObjectId(req.userId),
    })
      .populate("user")
      .populate({
        path: "doctor",
        select: "name email specialization photo experiences totalRating  ",
      })
      .lean();

    const doctors = bookings.map((el) => el.doctor);

    res.status(200).json({
      success: true,
      message: "Appointments are getting",
      data: bookings,
      doctors,
    });
  } catch (error) {
    console.error("Error saat fetch bookings:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
