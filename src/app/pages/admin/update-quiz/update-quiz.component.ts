import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from './../../../services/quiz.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import 'animate.css';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

  constructor(private snack : MatSnackBar, private _route: ActivatedRoute, private _quizService : QuizService,private _router : Router,private _categoryService : CategoryService) { }
  qId = 0;
  updateQuizData : any;
  selectCategories : any = [];
  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qid'];
    this._quizService.getQuiz(this.qId).subscribe((data : any)=>{
      this.updateQuizData = data;
    },(error)=>{
      console.log(error);
    });
    this._categoryService.getcategories().subscribe((data : any)=>{
      this.selectCategories = data;
    },(error)=>{
      console.error(error);
      Swal.fire('Error',"Error while loading categories!!",'error');
    })
  }
  updateQuiz()
  {
    if( this.updateQuizData.description.trim()=='' || this.updateQuizData.description==null || this.updateQuizData.title.trim()=='' || this.updateQuizData.title==null || this.updateQuizData.category.cid=='' || this.updateQuizData.category.cid==null || this.updateQuizData.numberOfQuestions==null || this.updateQuizData.description==null)
    {
      this.snack.open("All fields required!!!",'',{
        duration:2000
      });
      return;
    }
    this._quizService.updateQuiz(this.updateQuizData).subscribe((data)=>{
      Swal.fire({
        title: 'Success !',
        text: 'Quiz updated successfully!!',
        icon: 'success',
        showClass: {
          popup: 'animate__animated animate__zoomInDown'
        }
      }).then((e)=>{
        this._router.navigate(['/admin/quizzes']);
      });

    },(error)=>{
      Swal.fire({
        title: 'Error !',
        text: 'Failed to  update!!',
        icon: 'error',
        showClass: {
          popup: 'animate__animated animate__hinge animate__delay-2s'
        }
      });
      console.log(error);

    })


  }

}
