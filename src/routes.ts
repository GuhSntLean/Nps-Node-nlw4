import { Router } from "express";
import { UserController } from "./controller/UserControlles";
import { SurveysController } from "./controller/SurveyController";

const router = Router();
const userController = new UserController();
const surveysController = new SurveysController();

// Users
router.post("/users", userController.create);
// Surveys
router.post("/surveys", surveysController.create);
router.get("/surveys", surveysController.show)

export {router};