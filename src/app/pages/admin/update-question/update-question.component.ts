import { error } from '@angular/compiler/src/util';
import { QuestionService } from 'src/app/services/question.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/services/question';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css'],
})
export class UpdateQuestionComponent implements OnInit {
  questionId!: number;
  questionUpdateData: Question = new Question();
  constructor(
    private _route: ActivatedRoute,
    private _questionService: QuestionService
  ) {}

  ngOnInit(): void {
    this.questionId = this._route.snapshot.params['questionId'];
    this._questionService.getQuestion(this.questionId).subscribe(
      (data: any) => {
        this.questionUpdateData = data;
        // console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  updateQuestionData()
  {
    console.log(this.questionUpdateData);
      this._questionService.updateQuestionOfQuiz(this.questionUpdateData).subscribe((data)=>{
        Swal.fire({
          title: 'Success !',
          text: 'Question added successfully!!',
          icon: 'success',
          showClass: {
            popup: 'animate__animated animate__zoomInDown'
          }
        });
        console.log(data);
      },(error)=>{
        Swal.fire({
          title: 'Error !',
          text: 'Failed to  add question!!',
          icon: 'error',
          showClass: {
            popup: 'animate__animated animate__hinge animate__delay-1s'
          }
        });
        console.log(error);
      });
  }
}
