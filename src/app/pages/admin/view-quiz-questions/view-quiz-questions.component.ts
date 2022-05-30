import { QuestionService } from './../../../services/question.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css'],
})
export class ViewQuizQuestionsComponent implements OnInit {
  constructor(
    private _route: ActivatedRoute,
    private _questionService: QuestionService
  ) {}
  qId = 0;
  quizTitle!: String;
  quizQuestions: any = [];
  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qid'];
    this.quizTitle = this._route.snapshot.params['title'];
    this._questionService.getQuestionsOfQuiz(this.qId).subscribe(
      (data) => {
        this.quizQuestions = data;
        // console.log(this.quizQuestions);
      },
      (error) => {
        Swal.fire({
          title: 'Error !',
          text: 'Failed to load questions!!',
          icon: 'error',
          showClass: {
            popup: 'animate__animated animate__hinge animate__delay-2s',
          },
        });
        console.log(error);
      }
    );
  }
  cl(quesId: number)
  {
    alert(quesId);
  }
}
