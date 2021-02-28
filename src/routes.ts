import { Router } from "express";
import { UserController } from "./controller/UserControlles";
import { SurveysController } from "./controller/SurveyController";
import { SendMailController } from "./controller/SendMailController";

const router = Router();
const userController = new UserController();
const surveysController = new SurveysController();
const sendEmail = new SendMailController();

// Users
router.post("/users", userController.create);
// Surveys
router.post("/surveys", surveysController.create);
router.get("/surveys", surveysController.show)
// UsersSurveys
router.post("sendmail", sendEmail.execute);
export {router};