import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseURL from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private _http:HttpClient)
  { }

  public getQuizzes()
  {
    return this._http.get(`${baseURL}/quiz/`);
  }
  public addQuiz(addQuizData : any)
  {
    return this._http.post(`${baseURL}/quiz/`,addQuizData)
  }
  public deleteQuiz(quizId : number)
  {
    return this._http.delete(`${baseURL}/quiz/${quizId}`)
  }
  public getQuiz(quizId : number)
  {
    return this._http.get(`${baseURL}/quiz/${quizId}`)
  }
  public updateQuiz(quizData : any)
  {
    return this._http.put(`${baseURL}/quiz/`,quizData);
  }

}
