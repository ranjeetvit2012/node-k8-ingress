import express from "express";
import cors from "cors";
import prisma from "./db"; // Ensure this exports `new PrismaClient()`

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// Root route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// List all users
app.get("/list", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json({
      status: 200,
      data: users,
      message: users.length > 0 ? "Users fetched successfully" : "No users found",
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  }
});

// Create a new user
app.post("/create",async (req:any, res:any) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      status: 400,
      message: "Name and email are required",
    });
  }

  try {
    const newUser = await prisma.user.create({
      data: { name, email },
    });

    res.status(201).json({
      status: 201,
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({
      status: 500,
      message: "Failed to create user",
    });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

