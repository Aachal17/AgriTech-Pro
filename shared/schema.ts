import { pgTable, text, serial, integer, boolean, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const sensorData = pgTable("sensor_data", {
  id: serial("id").primaryKey(),
  timestamp: text("timestamp").notNull(),
  temperature: real("temperature"),
  humidity: real("humidity"),
  soilMoisture: real("soil_moisture"),
  airQuality: real("air_quality"),
  pumpStatus: boolean("pump_status"),
  rainStatus: boolean("rain_status"),
  locationLat: real("location_lat"),
  locationLng: real("location_lng"),
});

export const alertLogs = pgTable("alert_logs", {
  id: serial("id").primaryKey(),
  timestamp: text("timestamp").notNull(),
  type: text("type").notNull(), // 'warning', 'error', 'info', 'success'
  title: text("title").notNull(),
  message: text("message").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertSensorDataSchema = createInsertSchema(sensorData).omit({
  id: true,
});

export const insertAlertLogSchema = createInsertSchema(alertLogs).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertSensorData = z.infer<typeof insertSensorDataSchema>;
export type SensorData = typeof sensorData.$inferSelect;

export type InsertAlertLog = z.infer<typeof insertAlertLogSchema>;
export type AlertLog = typeof alertLogs.$inferSelect;

// Firebase schema types
export interface FirebaseLocation {
  latitude: number;
  longitude: number;
}

export interface FirebaseSensors {
  airQuality: number;
  humidity: number;
  pump1: boolean;
  pump2: boolean;
  pump3: boolean;
  rain: boolean;
  soilMoisture: number;
  temperature: number;
}

export interface FirebaseData {
  location: FirebaseLocation;
  sensors: FirebaseSensors;
}
