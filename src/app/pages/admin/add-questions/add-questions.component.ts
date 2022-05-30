import { MatSnackBar } from '@angular/material/snack-bar';
import { Question } from './../../../services/question';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';
import 'animate.css';

@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.css']
})
export class AddQuestionsComponent implements OnInit {

  constructor(private _route: ActivatedRoute,private _questionService: QuestionService,private _snack : MatSnackBar) { }
  addQuesQuizId !: number;
  addQuesQuizTitle!: String;
  question : Question = new Question();
  // question={
  //   quiz:{
  //     qId : 0,
  //   },
  //   content: '',
  //   option1: '',
  //   option2: '',
  //   option3: '',
  //   option4: '',
  //   answer: '',
  // }
  ngOnInit(): void {
    this.addQuesQuizId = this._route.snapshot.params['qid'];
    this.addQuesQuizTitle = this._route.snapshot.params['title'];
    this.question.quiz.qId = this.addQuesQuizId;
  }

  addQuestion()
  {
    if(this.question.content=='' || this.question.content==null)
    {
        this._snack.open("Question can't be empty",'',{
          duration : 1000,
        });
        return;
    } else if(this.question.option1=='' || this.question.option1==null)
    {
      this._snack.open("Option 1 can't be empty",'',{
        duration : 1000,
      });
      return;
    }
     else if(this.question.option2=='' || this.question.option2==null)
    {
      this._snack.open("Option 2 can't be empty",'',{
        duration : 1000,
      });
      return;
    }
     else if(this.question.answer=='' || this.question.answer==null)
    {
      this._snack.open("Answer can't be empty",'',{
        duration : 1000,
      });
      return;
    }

    this._questionService.addQuestionsOfQuiz(this.question).subscribe((data)=>{
      Swal.fire({
        title: 'Success !',
        text: 'Question added successfully!!',
        icon: 'success',
        showClass: {
          popup: 'animate__animated animate__zoomInDown'
        }
      });
     // console.log(data);
     this.question.content = '';
     this.question.option1 = '';
     this.question.option2 = '';
     this.question.option3 = '';
     this.question.option4 = '';
     this.question.answer = '';
     this.question.image = '';
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
    })

  }
}
