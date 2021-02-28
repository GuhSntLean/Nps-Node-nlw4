import { Request, response, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { SurveysRepositories } from '../repositories/SurveysRepositories';
import { SurveysUsersRepositories } from '../repositories/SurveysUsersRepositories';
import { UsersRepositories } from '../repositories/UsersRepositories';
import SendMailService from '../services/SendMailService';

class SendMailController{
  async execute(request: Request, reponse:Response){
    const { email, survey_id } = request.body;

    const usersRepository = getCustomRepository(UsersRepositories);
    const surveysRepository = getCustomRepository(SurveysRepositories);
    const surveysUsersRepository = getCustomRepository(SurveysUsersRepositories);

    const userAlreadyExists = await usersRepository.findOne({ email });
    const surveyAlreadyExists = await surveysRepository.findOne({ id: survey_id });

    if(!userAlreadyExists) {
      return response.sendStatus(400).json({
        error: 'User does not exists'
      });
    }
    if(!surveyAlreadyExists){
      return response.sendStatus(400).json({
        error: "Survey dows not exists"
      });
    }

    const surveyUser = surveysUsersRepository.create({
      user_id: userAlreadyExists.id,
      survey_id
    });
    await surveysUsersRepository.save(surveyUser);

    await SendMailService.execute(email, surveyAlreadyExists.title, surveyAlreadyExists.description);

    return response.json(surveyUser);
  }
}

export {SendMailController}