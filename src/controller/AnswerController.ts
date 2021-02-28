import { Request, Response } from "express";
import { getCustomRepository, RepositoryNotTreeError } from "typeorm";
import { SurveysUsersRepositories } from "../repositories/SurveysUsersRepositories";

class AnswerController {
  async execute(request: Request, response: Response){
    const { value } = request.params;
    const { u } = request.query;

    const surveysUsersRepository = getCustomRepository(SurveysUsersRepositories);
    
    const surveyUser = await surveysUsersRepository.findOne({
      id: String(u)
    });

    if(!surveyUser){
      return response.status(400).json({
        error: "Seruvey User does not exists"
      });
    }

    surveyUser.value = Number(value);

    await surveysUsersRepository.save(surveyUser);

    return response.status(200).json(surveyUser);
  }
}

export {AnswerController}