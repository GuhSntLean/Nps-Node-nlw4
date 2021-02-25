import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysRepositories } from "../repositories/SurveysRepositories";

class SurveysController {
  async create(request:Request, response:Response){
    const {title, description} = request.body;
    const surveysRepositories = getCustomRepository(SurveysRepositories);
    const survey = surveysRepositories.create({
      title,
      description
    });
    await surveysRepositories.save(survey);
    return response.status(201).json(survey);
  }

  async show(request:Request, response:Response){
    const surveysRepositories = getCustomRepository(SurveysRepositories);
    const all = await surveysRepositories.find();
    return response.status(200).json(all);
  }
}

export {SurveysController};