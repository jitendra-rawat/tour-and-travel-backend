import express from "express";
import Tour from "../models/tour.js";

const router = express.Router();

// Create a new tour
router.post("/add-tour", async (req, res) => {
  try {
    const {
      name,
      images,
      price,
      location,
      overview,
      difficulty,
      duration,
      altitude,
      ageLimit,
      highlights,
      itinerary,
      facilities,
      inclusions,
      note,
    } = req.body;

    const newTour = new Tour({
      name,
      price,
      images,
      location,
      overview,
      difficulty,
      duration,
      altitude,
      ageLimit,
      highlights,
      itinerary,
      facilities,
      inclusions,
      note,
    });

    await newTour.save();

    res.status(201).json({ message: "Tour created successfully", tour: newTour });
  } catch (error) {
    console.error("Error creating tour:", error);
    res.status(500).json({ message: "Error creating tour" });
  }
});

// Get all tours
router.get("/all", async (req, res) => {
  try {
    const tours = await Tour.find();
    res.status(200).json(tours);
  } catch (error) {
    console.error("Error fetching tours:", error);
    res.status(500).json({ message: "Error fetching tours" });
  }
});

// Get a single tour by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const tour = await Tour.findById(id);
    if (!tour) {
      return res.status(404).json({ message: "Tour not found" });
    }
    res.status(200).json(tour);
  } catch (error) {
    console.error("Error fetching tour:", error);
    res.status(500).json({ message: "Error fetching tour" });
  }
});

// Update a tour by ID
router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updatedTour = await Tour.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedTour) {
      return res.status(404).json({ message: "Tour not found" });
    }
    res.status(200).json({ message: "Tour updated successfully", tour: updatedTour });
  } catch (error) {
    console.error("Error updating tour:", error);
    res.status(500).json({ message: "Error updating tour" });
  }
});

// Delete a tour by ID
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTour = await Tour.findByIdAndDelete(id);
    if (!deletedTour) {
      return res.status(404).json({ message: "Tour not found" });
    }
    res.status(200).json({ message: "Tour deleted successfully", tour: deletedTour });
  } catch (error) {
    console.error("Error deleting tour:", error);
    res.status(500).json({ message: "Error deleting tour" });
  }
});



export default router;
