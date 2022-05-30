import { Question } from './question';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseURL from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private _http : HttpClient) { }

  //get all questions
  public getQuestionsOfQuiz(qId : number)
  {
    return this._http.get(`${baseURL}/question/quiz/all/${qId}`);
  }
  //get single question to update
  public getQuestion(questionId : number)
  {
    return this._http.get(`${baseURL}/question/${questionId}`);
  }
  //add single question
  public addQuestionsOfQuiz(question : Question)
  {
    return this._http.post(`${baseURL}/question/`,question);
  }
  //update single question
  public updateQuestionOfQuiz(question : Question)
  {
    return this._http.put(`${baseURL}/question/`,question);
  }
}
