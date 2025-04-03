import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { FirebaseData, InsertSensorData, insertSensorDataSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoint to save sensor data
  app.post("/api/sensor-data", async (req, res) => {
    try {
      const data = insertSensorDataSchema.parse(req.body);
      await storage.saveSensorData(data);
      return res.status(201).json({ message: "Sensor data saved successfully" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid sensor data", errors: error.errors });
      }
      console.error("Error saving sensor data:", error);
      return res.status(500).json({ message: "Failed to save sensor data" });
    }
  });

  // API endpoint to retrieve latest sensor data
  app.get("/api/sensor-data/latest", async (req, res) => {
    try {
      const latestData = await storage.getLatestSensorData();
      return res.status(200).json(latestData);
    } catch (error) {
      console.error("Error retrieving latest sensor data:", error);
      return res.status(500).json({ message: "Failed to retrieve latest sensor data" });
    }
  });

  // API endpoint to update pump status
  app.post("/api/pump-status", async (req, res) => {
    try {
      const { status } = req.body;
      
      if (typeof status !== "boolean") {
        return res.status(400).json({ message: "Invalid pump status" });
      }
      
      // Logic to update pump status
      // This would typically interact with Firebase or another service
      
      return res.status(200).json({ message: "Pump status updated", status });
    } catch (error) {
      console.error("Error updating pump status:", error);
      return res.status(500).json({ message: "Failed to update pump status" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
