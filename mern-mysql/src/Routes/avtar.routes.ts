import express from "express";
import { avtarController } from "../Controller"
import { getRepository } from "typeorm";
const avtarRoutes = express.Router();

avtarRoutes.get("/", avtarController.avtar);
export default avtarRoutes;