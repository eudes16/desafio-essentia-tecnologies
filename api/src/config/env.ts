import dotenv from "dotenv";
dotenv.config();

export const env = {
  host: process.env.HOST || "localhost",
  port: parseInt(process.env.PORT || "3000", 10),
};