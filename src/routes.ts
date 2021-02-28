import { Router } from "express";
import { UserController } from "./controller/UserControlles";
import { SurveysController } from "./controller/SurveyController";
import { SendMailController } from "./controller/SendMailController";
import { AnswerController } from "./controller/AnswerController";
import { NpsController } from "./controller/NpsController";

const router = Router();
const userController = new UserController();
const surveysController = new SurveysController();
const sendEmailController = new SendMailController();
const answerController = new AnswerController();
const npsController = new NpsController();
// Users
router.post("/users", userController.create);
// Surveys
router.post("/surveys", surveysController.create);
router.get("/surveys", surveysController.show)
// UsersSurveys
router.post("sendmail", sendEmailController.execute);
//Answer
router.get("/answers/:value", answerController.execute);
// Nps
router.get("/nps/:survey_id", npsController.execute);
export {router};