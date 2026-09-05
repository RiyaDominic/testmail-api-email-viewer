const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const axios = require("axios");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Health check route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Testmail API Email Viewer Server is running",
  });
});

// Get emails from Testmail
app.get("/api/emails", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.testmail.app/api/json",
      {
        params: {
          apikey: process.env.TESTMAIL_API_KEY,
          namespace: process.env.TESTMAIL_NAMESPACE,
          pretty: true,
        },
      }
    );

    const emails = response.data.emails || [];

    res.status(200).json({
      success: true,
      count: emails.length,
      emails,
    });
  } catch (error) {
    console.error(
      "Testmail API error:",
      error.response?.status,
      error.response?.data || error.message
    );

    res.status(error.response?.status || 500).json({
      success: false,
      message: "Unable to retrieve emails from Testmail",
    });
  }
});

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});