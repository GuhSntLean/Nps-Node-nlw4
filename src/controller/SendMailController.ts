import { Request, response, Response } from 'express';
import {resolve} from 'path';
import { getCustomRepository } from 'typeorm';
import { AppError } from '../errors/AppError';
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
    const surveysUserAlreadyExists = await surveysUsersRepository.findOne(
    {
        where: {
                user_id: userAlreadyExists.id,
                value: null
              },
        relations: ["user", "survey"],
    });

    if(!userAlreadyExists) {
      throw new AppError('User does not exists');
    }
    if(!surveyAlreadyExists){
      throw new AppError("Survey dows not exists");
    }
    
    const variables = {
      user: userAlreadyExists.name,
      title: surveyAlreadyExists.title,
      description: surveyAlreadyExists.description,
      id: "",
      link: process.env.URL_MAIL,
    }

    const npsPath = resolve(__dirname, "..","views","emails", "npsMail.hbs");
    if(surveysUserAlreadyExists) {
      variables.id = surveysUserAlreadyExists.id;
      await SendMailService.execute(email, surveyAlreadyExists.title, variables, npsPath);
      return response.status(200).json(surveyAlreadyExists);
    }

    const surveyUser = surveysUsersRepository.create({
      user_id: userAlreadyExists.id,
      survey_id,
    });

    await surveysUsersRepository.save(surveyUser);
    
    variables.id = surveyUser.id;
    await SendMailService.execute(email, surveyAlreadyExists.title ,variables, npsPath);

    return response.json(surveyUser);
  }
}

export {SendMailController}