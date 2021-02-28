import { Request, Response } from "express";
import { getCustomRepository, Not, IsNull } from "typeorm";
import { SurveysUsersRepositories } from "../repositories/SurveysUsersRepositories";

class NpsController {
  async execute(request: Request, response: Response){
    const { survey_id } = request.params;

    const serveysUsersRepository = getCustomRepository(SurveysUsersRepositories);

    const surveysUsers = await serveysUsersRepository.find({
      survey_id,
       value: Not(IsNull())
    });
  
    const detractor = surveysUsers.filter( 
        (survey) => survey.value >=0 && survey.value <= 6
    ).length;
    
    const promoters = surveysUsers.filter(
      (survey) => survey.value >= 9 && survey.value <= 10
    ).length;
      
    const passive = surveysUsers.filter(
      (survey) => survey.value >= 7 && survey.value <= 8
    ).length;

    const tatalAnsewers = surveysUsers.length;

    const calculate = Number((((promoters - detractor) / tatalAnsewers) * 100).toFixed(2));

    return response.json({
      detractor,
      promoters,
      passive,
      tatalAnsewers,
      nps: calculate
    });
  }
}

export { NpsController }