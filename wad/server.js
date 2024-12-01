const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection URI
const mongoURI = "mongodb://localhost:27017/my_database";

// Connect to MongoDB
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define Item schema
const ItemSchema = new mongoose.Schema({
  name: String,
});

const Item = mongoose.model("Item", ItemSchema);

// Middleware to parse JSON
app.use(express.json());

// Routes
// GET all items
app.get("/api/items", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Server error" }); // Corrected error handling block
  }
});

// Assuming there are more routes for CRUD operations, you can add them here

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
